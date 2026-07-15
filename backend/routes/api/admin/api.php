<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth:admin-api'])->prefix('admin')->group(function () {
    include __DIR__ . '/profile.php';
    include __DIR__ . '/volunteer.php';
    include __DIR__ . '/dashboard.php';
    include __DIR__ . '/dashboard-settings.php';
});
