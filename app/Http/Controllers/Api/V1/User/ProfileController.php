<?php

namespace App\Http\Controllers\Api\V1\User;

use App\Lib\JsonResponse;
use App\Models\User;
use App\Models\UserProfile;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function getProfile()
    {
        try {
            $user = auth()->user()->load('profile');

            if (!$user->profile) {
                return JsonResponse::error('User profile not found', 404);
            }

            return JsonResponse::success(['user' => $user]);
        } catch (\Exception $e) {
            return JsonResponse::error('An error occurred while retrieving the profile', 500);
        }
    }

    public function updateProfile(Request $request)
    {
        try {
            return JsonResponse::success(['message' => 'Profile updated successfully']);
        } catch (\Exception $e) {
            return JsonResponse::error($e, 500);
        }

    }
}
