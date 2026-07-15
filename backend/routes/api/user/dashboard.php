<?php

use App\Http\Controllers\Api\V1\User\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->prefix('user')->group(function () {
    Route::controller(DashboardController::class)->group(function () {
        Route::get('dashboard', 'getUserDashboard');
    });
});
