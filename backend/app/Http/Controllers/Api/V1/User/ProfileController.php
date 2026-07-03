<?php

namespace App\Http\Controllers\Api\V1\User;

use App\Lib\JsonResponse;
use App\Models\User;
use App\Models\UserProfile;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function getProfile()
    {
        try {
            $user = Auth::user()->load('form');

            // if (!$user->form) {
            //     return JsonResponse::error('User form not found', 404);
            // }

            $userData = $user->toArray();

            return JsonResponse::success(['user' => $userData]);
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
