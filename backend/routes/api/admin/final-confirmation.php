<?php

use App\Http\Controllers\Api\V1\FinalConfirmationController;
use Illuminate\Support\Facades\Route;

Route::controller(FinalConfirmationController::class)->prefix('final-confirmation')->group(function () {
    Route::get('data', 'adminData');
    Route::post('store', 'store');
    Route::put('update/{id}', 'update');
    Route::post('bulk-store', 'bulkStore');
});
