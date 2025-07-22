<?php

use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'auth'], function () {

    include __DIR__ . '/admin.php';
    include __DIR__ . '/user.php';

});
