<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Lib\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function getProfile()
    {
        $admin = Auth::guard('admin-api')->user();

        return JsonResponse::success(['admin' => $admin]);
    }

    public function update(Request $request)
    {
        return JsonResponse::success(['message' => 'Profile Updated']);
    }
}
