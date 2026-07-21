<?php

use App\Http\Controllers\Api\V1\Admin\VivaResultController;
use Illuminate\Support\Facades\Route;

Route::controller(VivaResultController::class)->prefix('viva-result')->group(function () {
    Route::get('seasons', 'seasons');
    Route::get('data', 'data');
    Route::post('decision', 'storeDecision');
});
