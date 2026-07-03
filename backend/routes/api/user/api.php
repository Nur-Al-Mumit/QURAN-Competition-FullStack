<?php

use Illuminate\Support\Facades\Route;

Route::group([], function () {
    include __DIR__ . '/profile.php';
    include __DIR__ . '/dashboard.php';
    include __DIR__ . '/registration.php';

});
