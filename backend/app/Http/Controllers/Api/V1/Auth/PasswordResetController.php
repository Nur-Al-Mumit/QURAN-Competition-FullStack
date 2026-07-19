<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use App\Lib\JsonResponse;
use App\Lib\AuthTokenClient;
use App\Models\OtpVerification;
use App\Models\User;
use App\Services\Auth\OtpService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\Client;

class PasswordResetController extends Controller
{
    protected AuthTokenClient $client;
    protected OtpService $otpService;

    /**
     * How long after OTP verification the user has to actually reset the
     * password (the "reset window").
     */
    protected int $resetWindowMinutes = 15;

    public function __construct(Client $client)
    {
        $provider = 'users';
        $scope = 'password_reset';

        $this->otpService = new OtpService($provider, $scope);

        $client = Client::query()
            ->where('provider', $provider)
            ->latest()
            ->first();

        if (!$client) {
            throw new \RuntimeException('User Auth Client Not Found');
        }

        $this->client = new AuthTokenClient($client);
    }

    /**
     * Send a password-reset OTP via SMS to the given phone.
     *
     * For security we never reveal whether a phone is registered: if the phone
     * is unknown we still return a success-shaped response but send no SMS.
     */
    public function sendResetOtp(Request $request)
    {
        $request->validate([
            'phone' => 'required|string|regex:/^01[0-9]{9}$/',
        ]);

        $phone = $request->phone;

        $user = User::where('phone', $phone)->first();

        // Don't leak which phones are registered. Return a fake-shaped success
        // payload so the UI can move on without revealing account existence.
        if (!$user) {
            return JsonResponse::success(
                [
                    'uuid' => null,
                    'expires_at' => null,
                    'attempts' => 0,
                ],
                'If an account exists for this phone, an OTP has been sent.'
            );
        }

        try {
            $otp = $this->otpService->createOtp(['phone' => $phone], 'password_reset');

            return JsonResponse::success(
                [
                    'uuid' => $otp['uuid'],
                    'expires_at' => $otp['expires_at'],
                    'attempts' => $otp['attempts'],
                ],
                'OTP sent to your phone.'
            );
        } catch (\Throwable $th) {
            return JsonResponse::error($th->getMessage() ?: 'Could not send OTP.');
        }
    }

    /**
     * Verify the password-reset OTP. On success the OTP record is kept and
     * stamped with a short-lived "verified" window so the subsequent
     * resetPassword() call can trust it.
     *
     * We look the record up by uuid + phone + scope directly (instead of
     * OtpService::verifyOTP's identity-only lookup) so a password-reset OTP
     * can never be matched against a stale OTP of a different scope for the
     * same phone.
     */
    public function verifyResetOtp(Request $request)
    {
        $request->validate([
            'phone' => 'required|string|regex:/^01[0-9]{9}$/',
            'otp' => 'required|string',
            'otp_ref' => 'required|string',
        ]);

        $maxAttempts = 10;

        $otpRecord = OtpVerification::where('uuid', $request->otp_ref)
            ->where('identity', $request->phone)
            ->where('scope', 'password_reset')
            ->first();

        if (!$otpRecord) {
            return JsonResponse::error('OTP record not found.', 400, [400]);
        }

        if ($otpRecord->expires_at < Carbon::now()) {
            $otpRecord->delete();
            return JsonResponse::error('OTP has expired.', 400, [400]);
        }

        if (!Hash::check($request->otp, $otpRecord->otp_code)) {
            $otpRecord->increment('attempts');
            $remaining = max(0, $maxAttempts - $otpRecord->attempts);

            return JsonResponse::error(
                $remaining > 0 ? 'Invalid OTP' : 'Maximum attempts reached',
                400,
                [400, 429],
                ['remainingAttempts' => $remaining]
            );
        }

        // Stamp the record so resetPassword() can confirm it was verified and
        // give the user a bounded window to actually change the password.
        $otpRecord->forceFill([
            'expires_at' => Carbon::now()->addMinutes($this->resetWindowMinutes),
        ])->save();

        return JsonResponse::success(
            [
                'verified' => true,
                'reset_ref' => $otpRecord->uuid,
            ],
            'OTP verified successfully.'
        );
    }

    /**
     * Reset the password using a verified OTP reference, then issue a fresh
     * auth token so the user lands on the dashboard already logged in.
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'phone' => 'required|string|regex:/^01[0-9]{9}$/',
            'password' => 'required|string|min:6|confirmed',
            'reset_ref' => 'required|string',
        ]);

        $otpRecord = OtpVerification::where('uuid', $request->reset_ref)
            ->where('identity', $request->phone)
            ->where('scope', 'password_reset')
            ->first();

        if (!$otpRecord || $otpRecord->expires_at < Carbon::now()) {
            return JsonResponse::error(
                'Session expired, please try again.',
                401,
                [401]
            );
        }

        $user = User::where('phone', $request->phone)->first();

        if (!$user) {
            return JsonResponse::error('Account not found.', 404, [404]);
        }

        // Update the password.
        $user->password = Hash::make($request->password);
        $user->save();

        // The reset OTP is single-use.
        $otpRecord->delete();

        try {
            // Issue a fresh token with the NEW password (same grant as login).
            $token = $this->client->issueTokenForPassword(
                $request->phone,
                $request->password,
            );

            return JsonResponse::success($token, 'Password reset successfully.');
        } catch (\Exception $exception) {
            // Password was changed but auto-login failed — send them to sign-in.
            return JsonResponse::error(
                'Password reset successfully. Please sign in.',
                200,
                [200],
                ['redirect' => '/sign-in']
            );
        }
    }
}
