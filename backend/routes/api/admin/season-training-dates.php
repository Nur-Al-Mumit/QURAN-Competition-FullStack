<?php

use App\Http\Controllers\Api\V1\Admin\SeasonTrainingDateController;
use Illuminate\Support\Facades\Route;

Route::controller(SeasonTrainingDateController::class)->prefix('training-dates')->group(function () {
    // Shared season list (filter dropdown)
    Route::get('seasons', 'seasons');

    // CRUD
    Route::get('index', 'index');
    Route::post('store', 'store');
    Route::put('{training_date}', 'update');
    Route::delete('{training_date}', 'destroy');

    // Read endpoints for the printable sheet + recorded-attendance view
    Route::get('sheet', 'sheet');
    Route::get('attendance-view', 'attendanceView');
});
