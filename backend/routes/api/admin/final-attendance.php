<?php

use App\Http\Controllers\Api\V1\Admin\VolunteerController;
use Illuminate\Support\Facades\Route;

Route::controller(VolunteerController::class)->prefix('volunteer')->group(function () {
    // Final attendance (users_final_attendances) — QR-scan flow
    Route::post('verify-final-registration', 'verifyFinalRegistration');
    Route::post('submit-final-attendance', 'submitFinalAttendance');
});
