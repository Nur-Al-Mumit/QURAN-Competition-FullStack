<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Lib\AuthTokenClient;
use App\Http\Controllers\Controller;
use App\Lib\JsonResponse;
use App\Models\Admin;
use App\Models\UserCompetitionForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Laravel\Passport\Client;

class AdminAuthController extends Controller
{
    protected AuthTokenClient $client;

    public function __construct(Client $client)
    {
        $provider = 'admins';

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

    public function login(Request $request)
    {
        $request->validate([
            'phone' => 'required|string|regex:/^01[0-9]{9}$/',
            'password' => 'required|string',
        ]);
        try {

            $response = $this->client->issueTokenForPassword(
                $request->phone,
                $request->password,
                'admin'
            );

            $admin = Admin::where('phone', $request->phone)->first();

            $response['admin_role'] = $admin->role;
            if ($response) {
                return JsonResponse::success($response);
            }

        } catch (\Exception $exception) {
            return JsonResponse::error($exception);
        }

    }

    public function refresh(Request $request)
    {
        $request->validate([
            'refresh_token' => 'required',
        ]);
        try {
            $token = $this->client->issueTokenForRefreshToken(
                $request->refresh_token,
            );
            return JsonResponse::success($token);
        } catch (\Exception $exception) {
            return JsonResponse::error($exception->getMessage());
        }
    }

    public function logout()
    {
        $accessToken = Auth::guard('admin-api')->user()->token();

        DB::table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update(['revoked' => true]);

        $accessToken->revoke();

        return JsonResponse::success([], 'Logout');
    }

}
