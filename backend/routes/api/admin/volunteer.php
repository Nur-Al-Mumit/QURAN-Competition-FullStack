<?php

use App\Http\Controllers\Api\V1\Admin\VolunteerController;
use Illuminate\Support\Facades\Route;

Route::controller(VolunteerController::class)->prefix('volunteer')->group(function () {
    Route::post('verify-registration', 'verifyRegistration');
    Route::post('submit-user-attendance', 'submitUserAttendance');
    Route::post('submit-training-attendance', 'submitTrainingAttendance');
});