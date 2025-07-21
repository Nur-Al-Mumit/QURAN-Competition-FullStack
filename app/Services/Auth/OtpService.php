<?php

namespace App\Services\Auth;

use App\Models\OtpVerification;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\EmailVerificationByOtp;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class OtpService
{
    protected string $provider;
    protected string|null $scope = 'phone_verified';

    public function __construct($provider, $scope = null)
    {
        $this->provider = $provider;
        $this->scope = $scope;
    }
    public function generateOTP($user)
    {
        $code = rand(111111, 999999);
        $expiresAt = now()->addMinutes(50);

        if (is_array($user)) {
            $userId = $user['id'] ?? null;
            $userPhone = $user['phone'] ?? null;
        }

        $where = $userId
            ? ['user_id' => $userId]
            : ['identity' => $userPhone];


        $otpRecord = OtpVerification::updateOrCreate(
            $where,
            [
                'uuid' => Str::uuid(),
                'otp_code' => Hash::make($code),
                'provider' => $this->provider,
                'scope' => $this->scope,
                'identity' => $user['phone'],
                'expires_at' => $expiresAt,
                'attempts' => 0
            ]
        );

        $otp = [
            'uuid' => $otpRecord->uuid,
            'code' => $code,
            'expires_at' => $expiresAt,
            'attempts' => $otpRecord->attempts
        ];
        return $otp;
    }

    public function createOtp($user)
    {
        $otp = $this->generateOTP($user);
        $this->notify($user['phone'], $otp['code']);
        return $otp;
    }

    public function resendOtp($uuid)
    {
        $otpRecord = OtpVerification::where('uuid', $uuid)->first();

        if (!$otpRecord) {
            return [
                'success' => false,
                'message' => 'OTP record not found',
                'data' => null
            ];
        }

        $lastResendTime = $otpRecord->updated_at;
        $cooldownMinutes = 1; // Minimum 1 minute between resends

        if ($lastResendTime->addMinutes($cooldownMinutes) > now()) {
            $remainingSeconds = $lastResendTime->addMinutes($cooldownMinutes)->diffInSeconds(now());
            return [
                'success' => false,
                'message' => "Please wait {$remainingSeconds} seconds before requesting another OTP",
                'data' => null
            ];
        }

        // Generate new OTP code
        $newCode = rand(111111, 999999);
        $newExpiresAt = now()->addMinutes(15);

        $otpRecord->update([
            'otp_code' => Hash::make($newCode),
            'expires_at' => $newExpiresAt,
            'attempts' => 0
        ]);

        try {
            $this->notify($otpRecord->identity, $newCode);

            return [
                'uuid' => $otpRecord->uuid,
                'expires_at' => $newExpiresAt,
                'attempts' => 0
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Failed to resend OTP. Please try again.',
                'data' => null
            ];
        }
    }

    public function verifyOTP($request)
    {
        $maxAttempts = 3;
        $isOtpRef = OtpVerification::where('uuid', $request->otp_ref)->first();
        $otpRecord = OtpVerification::where('identity', $request->identity)
            ->first();

        // No OTP uuid found
        if (!$isOtpRef) {
            return [
                'success' => false,
                'message' => 'OTP id not found',
                'remainingAttempts' => null
            ];
        }

        // No OTP record found
        if (!$otpRecord) {
            return [
                'success' => false,
                'message' => 'No active OTP found',
                'remainingAttempts' => null
            ];
        }

        // OTP expired
        if ($otpRecord->expires_at < now()) {
            $otpRecord->delete();
            return [
                'success' => false,
                'message' => 'OTP has expired',
                'remainingAttempts' => null
            ];
        }

        // Incorrect OTP
        if (!Hash::check($request->otp, $otpRecord->otp_code)) {
            $otpRecord->increment('attempts');
            $remaining = $maxAttempts - $otpRecord->attempts;

            return [
                'success' => false,
                'message' => $remaining > 0
                    ? 'Invalid OTP'
                    : 'Maximum attempts reached',
                'remainingAttempts' => max(0, $remaining)
            ];
        }

        return [
            'success' => true,
            'otp_record' => $otpRecord,
            'message' => 'OTP verified successfully',
            'remainingAttempts' => null
        ];
    }


    private function notify($phone, $otp)
    {

        try {
            $message = "আসসালামুয়ালাইকুম,\nআপনার এককালিক যাচাইকরণ কোড: {$otp}, এই কোডটি কারো সাথে শেয়ার করবেন না এবং নিরাপদে সংরক্ষণ করুন। এটি দিয়ে আপনি ভবিষ্যতে লগইন করতে পারবেন। কোডের মেয়াদ: ৫ মিনিট\nধন্যবাদান্তে, বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা টিম";

            $response = Http::get('http://api.boom-cast.com/boomcast/WebFramework/boomCastWebService/externalApiSendTextMessage.php', [
                'masking' => 'NOMASK',
                'userName' => 'quranlessons.org',
                'password' => '08f246b1c6c11d739954f0dce3e601a5',
                'MsgType' => 'TEXT',
                'receiver' => $phone,
                'message' => $message,
            ]);

            if (!$response->successful()) {
                throw new \Exception("BoomCast API failed: " . $response->body());
            }
        } catch (\Exception $e) {
            throw new \Exception("Couldn't send the OTP, Please try again. Error: " . $e->getMessage());
        }
    }
}