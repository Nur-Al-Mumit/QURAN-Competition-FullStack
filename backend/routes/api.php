<?php

use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'v1'], function () {
    include __DIR__ . '/api/admin/api.php';
    include __DIR__ . '/api/auth/api.php';
    include __DIR__ . '/api/user/api.php';
    include __DIR__ . '/api/public/result.php';
    include __DIR__ . '/api/public/final-confirmation.php';
    include __DIR__ . '/api/public/link-stats.php';
});
