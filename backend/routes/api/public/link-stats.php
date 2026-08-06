<?php

use App\Http\Controllers\Api\V1\PublicLinkStatController;
use Illuminate\Support\Facades\Route;

// PUBLIC link-page tracking endpoints — NO auth middleware.
// Fire-and-forget on the client; failures never block the UI.
Route::controller(PublicLinkStatController::class)->prefix('link-stats')->group(function () {
    Route::post('visit', 'trackVisit');
    Route::post('click/{platform}', 'trackClick');
});
