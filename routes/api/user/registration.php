<?php

use App\Http\Controllers\Api\V1\User\RegistrationController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'registration'], function () {
    Route::controller(RegistrationController::class)->group(function () {

        //Routes for GUEST (unauthenticated) users
        // OTP authorize + form submit
        Route::post('complete', 'completeRegistration'); 

        //Routes for AUTHENTICATED users
        Route::middleware('auth:api')->group(function () {
            Route::post('submit', 'submitForm');
            Route::get('status', 'registrationStatus');
            Route::post('update', 'updateForm');
        });


        Route::post('store', 'registrationStore');
        Route::post('authorize-store', 'authorizeRegistrationStore');
    });
});
