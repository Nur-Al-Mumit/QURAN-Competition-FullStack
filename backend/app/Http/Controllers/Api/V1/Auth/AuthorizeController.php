<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Models\User;
use App\Lib\JsonResponse;
use App\Lib\AuthTokenClient;
use App\Services\Auth\AuthorizeService;
use App\Services\Dashboard\ProgressStageService;
use App\Services\Registration\ReturningUserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Laravel\Passport\Client;
use App\Services\Auth\OtpService;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AuthorizeController extends Controller
{
    protected AuthTokenClient $client;
    protected OtpService $otpService;
    protected AuthorizeService $authorizeService;

    public function __construct(Client $client)
    {
        $provider = 'users';
        $scope = 'phone_verified';

        // Initialize AuthorizeService
        $this->authorizeService = new AuthorizeService($provider, $scope);

        // Initialize the OtpService
        $this->otpService = new OtpService($provider, $scope);

        // Client for the user authentication
        $client = Client::query()
            ->where('provider', $provider)
            ->latest()
            ->first();

        if (!$client) {
            throw new \RuntimeException('User Auth Client Not Found');
        }

        $this->client = new AuthTokenClient($client);
    }

    public function sendOtp(Request $request)
    {
        $request->validate([
            'email' => 'nullable|email|max:255',
            'phone' => 'required|string|regex:/^01[0-9]{9}$/',
        ]);

        $phone = $request->phone;
        $email = $request->filled('email') ? trim($request->email) : null;

        // Hardcoded registration time-out: stop new registrations before any
        // OTP is created. The frontend reads this response and shows the
        // "registration closed" popup modal.
        if ((new \App\Http\Controllers\Api\V1\User\RegistrationController())->isRegistrationClosedPublic()) {
            return JsonResponse::error(
                'রেজিস্ট্রেশনের নির্ধারিত সময় শেষ হয়ে গেছে। নতুন রেজিস্ট্রেশন গ্রহণ করা হচ্ছে না।',
                403,
                [403],
                ['code' => 'REGISTRATION_CLOSED']
            );
        }

        // Check existing accounts BEFORE creating/sending any OTP so returning
        // users never receive a login SMS after a confusing "already taken" error.
        $existingByPhone = User::where('phone', $phone)->first();
        if ($existingByPhone) {
            return $this->existingUserRegistrationResponse($existingByPhone);
        }

        if ($email) {
            $existingByEmail = User::where('email', $email)->first();
            if ($existingByEmail) {
                return $this->existingUserRegistrationResponse($existingByEmail, 'email');
            }
        }

        try {
            $otp = $this->otpService->createOtp(['phone' => $phone]);

            return JsonResponse::success([
                'otp' => $otp['code'],
                'uuid' => $otp['uuid'],
                'expires_at' => $otp['expires_at'],
                'attempts' => $otp['attempts']
            ], "OTP sent to your email");
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Friendly response for users who already have an account (typically from
     * a previous season). Never sends an OTP.
     */
    private function existingUserRegistrationResponse(User $user, string $matchedBy = 'phone')
    {
        $returning = new ReturningUserService();
        $activeSeason = $returning->getActiveSeason();
        $eligible = $returning->isEligibleForNewSeason($user, $activeSeason);
        $onActiveSeason = $returning->isOnActiveSeason($user, $activeSeason);

        $code = $eligible
            ? 'ALREADY_REGISTERED_ELIGIBLE'
            : 'ALREADY_REGISTERED_INELIGIBLE';

        if ($onActiveSeason) {
            $message = $matchedBy === 'email'
                ? 'এই ইমেইল দিয়ে ইতোমধ্যে একটি অ্যাকাউন্ট আছে। সাইন ইন করে আপনার রেজিস্ট্রেশন দেখুন বা আপডেট করুন।'
                : 'এই মোবাইল নম্বর দিয়ে ইতোমধ্যে একটি অ্যাকাউন্ট আছে। সাইন ইন করে আপনার রেজিস্ট্রেশন দেখুন বা আপডেট করুন।';
        } elseif ($eligible) {
            $message = 'আপনি পূর্ববর্তী সিজনের নিবন্ধিত প্রতিযোগী। নতুন করে রেজিস্ট্রেশন করার প্রয়োজন নেই — সাইন ইন করে ফর্ম আপডেট করুন এবং অবশ্যই নতুন রেজিস্ট্রেশন টোকেন ডাউনলোড করুন।';
        } else {
            $message = 'আন্তরিকভাবে দুঃখিত, এই প্রতিযোগিতায় আপনার নতুন করে নিবন্ধন করার সুযোগ নেই। আমাদের নিয়ম অনুযায়ী, যারা গত প্রতিযোগিতার ফাইনাল পর্বে অংশগ্রহণ করেছিলেন, তারা এবারের প্রতিযোগিতায় অংশ নিতে পারবেন না। আপনার আগ্রহের জন্য অসংখ্য ধন্যবাদ, জাজাকাল্লাহু খাইরান।';
        }

        return JsonResponse::error($message, 409, [409], [
            'code' => $code,
            'eligible' => $eligible,
            'on_active_season' => $onActiveSeason,
            'matched_by' => $matchedBy,
            'redirect' => '/sign-in',
        ]);
    }

    public function resendOtp(Request $request)
    {
        $request->validate([
            'uuid' => 'required|string'
        ]);

        $otp = $this->otpService->resendOtp($request->uuid);

        return JsonResponse::success($otp, "OTP resent successfully");
    }
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'string|email|unique:users,email',
            'phone' => 'required|string|unique:users,phone|regex:/^01[0-9]{9}$/',
            'password' => 'required|string|min:6|confirmed'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'gender' => $request->gender,
            'password' => Hash::make($request->password),
        ]);

        // Mark the "account_created" progress stage as completed.
        (new ProgressStageService())->markCompleted($user->id, 'account_created');

        return JsonResponse::success([], "Alhamdulillah Registration successful");
    }

    public function login(Request $request)
    {
        $request->validate([
            // 'email' => 'required|string|email',
            'phone' => 'required',
            'password' => 'required|string',
        ]);

        try {
            // Get the response from AuthTokenClient
            $response = $this->client->issueTokenForPassword(
                // $request->email,
                $request->phone,
                $request->password,
            );

            // Return success response with the token data
            return JsonResponse::success($response);
        } catch (\Exception $exception) {
            // Return error response in case of exception
            return JsonResponse::error($exception);
        }
    }

    public function otpLogin(Request $request)
    {
        $request->validate([
            'phone' => 'required|digits:11|regex:/^01[0-9]{9}$/',
            'otp' => 'required|string',
            'otp_ref' => 'required|string',
        ]);

        try {
            $registrationForm = json_decode($request->registrationForm);

            $data = [
                'identity' => $request->phone,
                'password' => $request->otp,
                // 'name_bn' => $registrationForm->name_bn,
                'name_en' => $registrationForm->name_en,
                'phone' => $registrationForm->phone,
                'email' => $registrationForm->email,
                'gender' => $registrationForm->gender,
            ];

            $request->merge([
                'identity' => $request->phone,
            ]);

            $response = $this->authorizeService->authorizeUser($request, $data);

            return JsonResponse::success($response['authResponse']);
        } catch (\Throwable $th) {
            return JsonResponse::error($th);
        }
    }

    public function refresh(Request $request)
    {
        $request->validate([
            'refresh_token' => 'required',
        ]);
        try {
            $token = $this->client->issueTokenForRefreshToken(
                refresh_token: $request->refresh_token,
            );
            return JsonResponse::success($token);
        } catch (\Exception $exception) {
            return JsonResponse::error($exception->getMessage());
        }
    }

    public function logout()
    {
        $accessToken = Auth::guard('api')->user()->token();

        DB::table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update(['revoked' => true]);

        $accessToken->revoke();

        return JsonResponse::success([], 'Logout');
    }
}
