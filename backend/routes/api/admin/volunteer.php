<?php

use App\Http\Controllers\Api\V1\Admin\VolunteerController;
use Illuminate\Support\Facades\Route;

Route::controller(VolunteerController::class)->prefix('volunteer')->group(function () {
    Route::post('verify-registration', 'verifyRegistration');
    Route::post('submit-user-attendance', 'submitUserAttendance');

    // Training attendance (users_training_attendances) — QR-scan flow
    Route::post('verify-training-registration', 'verifyTrainingRegistration');
    Route::post('submit-training-attendance-v2', 'submitTrainingAttendance');

    // Legacy training-attendance endpoint (ReturningUserService-based)
    Route::post('submit-training-attendance', 'submitTrainingAttendanceLegacy');
});