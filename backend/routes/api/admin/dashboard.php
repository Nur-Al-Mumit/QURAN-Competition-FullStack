<?php

use App\Http\Controllers\Api\V1\Admin\DashboardController;
use Illuminate\Support\Facades\Route;

Route::controller(DashboardController::class)->prefix('dashboard')->group(function () {
    Route::get('seasons', 'getSeasons');
    Route::get('statistics', 'getStatistics');
    Route::get('registration-forms', 'getRegistrationForms');
});
