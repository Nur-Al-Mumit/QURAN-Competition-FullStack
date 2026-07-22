<?php

use App\Http\Controllers\Api\V1\Admin\TrainingIdCardController;
use Illuminate\Support\Facades\Route;

Route::controller(TrainingIdCardController::class)->prefix('training-id-card')->group(function () {
    Route::get('seasons', 'seasons');
    Route::get('data', 'data');
});
