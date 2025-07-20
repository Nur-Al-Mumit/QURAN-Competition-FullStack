<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Models\Season;
use App\Models\User;
use App\Lib\JsonResponse;
use App\Lib\AuthTokenClient;
use App\Models\userSeason;
use App\Services\Auth\AuthorizeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Laravel\Passport\Client;
use App\Services\Auth\OtpService;
use App\Services\Auth\LoginLogService;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;

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
            // 'email' => 'required|string|email',
            'phone' => 'required|string|unique:users,phone|regex:/^01[0-9]{9}$/',
        ]);
        $user = User::where('phone', $request->phone)->first();
        if ($user) {
            return JsonResponse::error('User already exists', 400);
        }

        try {
            $otp = $this->otpService->createOtp(['phone' => $request->phone]);

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

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'gender' => $request->gender,
            'password' => Hash::make($request->password),
        ]);

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
}
