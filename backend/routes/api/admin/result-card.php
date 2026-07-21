<?php

use App\Http\Controllers\Api\V1\Admin\ResultCardController;
use Illuminate\Support\Facades\Route;

Route::controller(ResultCardController::class)->prefix('result-card')->group(function () {
    Route::get('seasons', 'seasons');
    Route::get('data', 'data');
});
