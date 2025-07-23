<?php

use App\Http\Controllers\Api\V1\Auth\AdminAuthController;
use Illuminate\Support\Facades\Route;

Route::controller(AdminAuthController::class)->prefix('admin')->group(function () {
    // Routes for AUTHENTICATE users
    Route::post('login', 'login');
    Route::post('refresh', 'refresh');

    //Routes for AUTHENTICATED users
    Route::middleware('auth:admin-api')->group(function () {
        Route::post('logout', 'logout');
    });

});