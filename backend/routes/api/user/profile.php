<?php

use App\Http\Controllers\Api\V1\User\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->prefix('user')->group(function () {
    Route::controller(ProfileController::class)->group(function () {
        Route::get('/get-profile', 'getProfile')->name('user.profile.get');
        Route::post('/update-profile', 'updateProfile')->name('user.profile.update');
    });
});