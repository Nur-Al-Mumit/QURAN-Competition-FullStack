<?php

namespace App\Services\Auth;

use App\Lib\JsonResponse;
use App\Models\Season;
use App\Models\User;
use App\Services\Dashboard\ProgressStageService;
use Laravel\Passport\Client;
use App\Lib\AuthTokenClient;
use Illuminate\Support\Facades\DB;

class AuthorizeService
{
    protected AuthTokenClient $client;
    protected OtpService $otpService;

    public function __construct($provider, $scope)
    {
        // Initialize the OtpService
        $this->otpService = new OtpService($provider, $scope);

        // Client for the user authentication
        $client = Client::query()
            ->where('provider', 'users')
            ->latest()
            ->first();

        if (!$client) {
            throw new \RuntimeException('User Auth Client Not Found');
        }

        $this->client = new AuthTokenClient($client);
    }
    public function authorizeUser($request, $data)
    {
        try {
            $otp = $this->otpService->verifyOTP($request);

            if ($otp['success']) {
                $user = $this->createUser($data);

                $authResponse = $this->client->issueTokenForOTP(
                    $otp['otp_record']['identity'],
                    $request->otp,
                );

                LoginLogService::userLoginLogs($user, $request, 'otp');

                return ['authResponse' => $authResponse, 'user' => $user];
            } else {
                return $otp;
            }
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function createUser($userInfo)
    {
        DB::beginTransaction();
        try {
            $season = Season::where('is_active', 1)->first();

            if (!$season) {
                throw new \RuntimeException('No active season found.');
            }

            $user = User::create([
                'phone' => $userInfo['phone'],
                'email' => $userInfo['email'],
                'name_bn' => $userInfo['name_bn'],
                'name_en' => $userInfo['name_en'],
                'password' => $userInfo['password'],
                'gender' => $userInfo['gender'],
                'phone_verified_at' => now(),
                'season_id' => $season->id,
                'registered_season_id' => $season->id,
            ]);

            // Mark the "account_created" progress stage as completed for
            // this new user.
            (new ProgressStageService())->markCompleted($user->id, 'account_created');

            DB::commit();

            return $user;
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}