<?php

use App\Http\Controllers\Api\V1\FinalConfirmationController;
use Illuminate\Support\Facades\Route;

Route::controller(FinalConfirmationController::class)->prefix('final-confirmation')->group(function () {
    Route::get('seasons', 'seasons');
    Route::get('data', 'data');
});
