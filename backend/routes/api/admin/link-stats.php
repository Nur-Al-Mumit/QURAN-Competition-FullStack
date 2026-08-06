<?php

use App\Http\Controllers\Api\V1\Admin\PublicLinkStatController;
use Illuminate\Support\Facades\Route;

// Admin read-only view of the /links page stats.
Route::controller(PublicLinkStatController::class)->prefix('link-stats')->group(function () {
    Route::get('/', 'index');
});
