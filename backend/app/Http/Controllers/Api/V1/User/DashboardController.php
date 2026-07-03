<?php

namespace App\Http\Controllers\Api\V1\User;

use App\Http\Controllers\Controller;
use App\Lib\JsonResponse;

class DashboardController extends Controller
{
    protected $service;

    public function __construct()
    {
    }
    public function getUserDashboard()
    {
        try {
            $dashboard = null;

            return JsonResponse::success([
                'dashboard' => $dashboard,
            ]);
        } catch (\Throwable $th) {
            \Log::error('Dashboard Error', ['error' => $th]);
            return JsonResponse::error($th, 500);
        }
    }
}
