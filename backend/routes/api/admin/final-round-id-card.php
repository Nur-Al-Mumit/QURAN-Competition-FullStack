<?php

use App\Http\Controllers\Api\V1\Admin\FinalRoundIdCardController;
use Illuminate\Support\Facades\Route;

Route::controller(FinalRoundIdCardController::class)->prefix('final-round-id-card')->group(function () {
    Route::get('seasons', 'seasons');
    Route::get('data', 'data');
});
