<?php

use App\Http\Controllers\Api\V1\Admin\FinalContestIdCardController;
use Illuminate\Support\Facades\Route;

Route::controller(FinalContestIdCardController::class)->prefix('final-contest-id-card')->group(function () {
    Route::get('seasons', 'seasons');
    Route::get('data', 'data');
});
