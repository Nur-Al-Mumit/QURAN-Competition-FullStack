<?php

namespace App\Services\Auth;

use App\Models\User;
use App\Models\userLoginLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class LoginLogService
{
    public static function userLoginLogs(User $user, Request $request, $loginMethod): void
    {
        $store = new userLoginLog();

        $geoDetails = LoginLogService::getGeoLocationFromIp($request->ip());

        $store->user_id = $user->id;
        $store->login_at = now();
        $store->device = $request->header('User-Agent');
        $store->ip_address = $request->ip();
        $store->location_lat  = $geoDetails['lat'];
        $store->location_long  = $geoDetails['lon'];
        $store->login_method = $loginMethod;
        $store->created_at = now();
        $store->updated_at = now();
        $store->save();
    }

    public static function getGeoLocationFromIp(string $ip): array
    {
        $latitude = null;
        $longitude = null;
        try {
            $response = Http::get("https://ipinfo.io/{$ip}/geo");
            if ($response->ok()) {
                $result = $response->json();
                $coordinates = explode(',', $result['loc']);
                $latitude = $coordinates[0];
                $longitude = $coordinates[1];
            }
        } catch (\Exception $e) {
        }

        return [
            'lat' => $latitude,
            'lon' => $longitude,
        ];
    }
}
