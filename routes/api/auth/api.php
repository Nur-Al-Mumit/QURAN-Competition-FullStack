<?php

use App\Http\Controllers\Api\V1\Auth\AuthorizeController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'auth'], function () {
    Route::controller(AuthorizeController::class)->group(function () {
        Route::post('send-otp', 'sendOtp');
        Route::post('otp-login', 'otpLogin');
        Route::post('otp-resend', 'resendOtp');

        Route::post('login', 'login');
        Route::post('refresh', 'refresh');
        Route::post('register', 'register');
    });
});
