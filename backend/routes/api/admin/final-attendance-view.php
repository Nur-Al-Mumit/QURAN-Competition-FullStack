<?php

use App\Http\Controllers\Api\V1\Admin\VolunteerController;
use Illuminate\Support\Facades\Route;

Route::controller(VolunteerController::class)->prefix('volunteer')->group(function () {
    // Final attendance view — read-only listing of all attendance + confirmation data
    Route::get('final-attendance-view', 'finalAttendanceView');
});
