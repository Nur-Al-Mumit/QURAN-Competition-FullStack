<?php

use App\Http\Controllers\Api\V1\Auth\AuthorizeController;
use Illuminate\Support\Facades\Route;

Route::controller(AuthorizeController::class)->group(function () {
    Route::post('send-otp', 'sendOtp');
    Route::post('otp-login', 'otpLogin');
    Route::post('otp-resend', 'resendOtp');
    Route::post('register', 'register');

    // Routes for AUTHENTICATED users
    Route::post('login', 'login');
    Route::post('refresh', 'refresh');
    Route::post('logout', 'logout');
});