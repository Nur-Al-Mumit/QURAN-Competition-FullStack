<?php

use App\Http\Controllers\Api\V1\Admin\ProfileController;
use Illuminate\Support\Facades\Route;

Route::controller(ProfileController::class)->prefix('profile')->group(function () {
    Route::get('get', 'getProfile');
    Route::post('update', 'update');
});