<?php

use App\Http\Controllers\Api\V1\Admin\ResultCardController;
use Illuminate\Support\Facades\Route;

// PUBLIC result endpoints — NO auth middleware. Anyone can view the
// published result sheet. Reuses the same controller as the admin
// result-card page (read-only data() + seasons()).
Route::controller(ResultCardController::class)->prefix('result-card')->group(function () {
    Route::get('seasons', 'seasons');
    Route::get('data', 'data');
});
