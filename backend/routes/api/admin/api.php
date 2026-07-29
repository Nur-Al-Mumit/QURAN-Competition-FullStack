<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth:admin-api'])->prefix('admin')->group(function () {
    include __DIR__ . '/profile.php';
    include __DIR__ . '/volunteer.php';
    include __DIR__ . '/dashboard.php';
    include __DIR__ . '/dashboard-settings.php';
    include __DIR__ . '/viva-result.php';
    include __DIR__ . '/result-card.php';
    include __DIR__ . '/training-id-card.php';
    include __DIR__ . '/final-contest-id-card.php';
    include __DIR__ . '/season-training-dates.php';
    include __DIR__ . '/final-confirmation.php';
});
