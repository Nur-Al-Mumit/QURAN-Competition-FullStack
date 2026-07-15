<?php

use App\Http\Controllers\Api\V1\Admin\DashboardSettingController;
use Illuminate\Support\Facades\Route;

Route::controller(DashboardSettingController::class)->prefix('dashboard-settings')->group(function () {
    // Timeline events
    Route::get('timeline-events', 'timelineIndex');
    Route::post('timeline-events', 'timelineStore');
    Route::put('timeline-events/{timeline_event}', 'timelineUpdate');
    Route::delete('timeline-events/{timeline_event}', 'timelineDestroy');

    // Progress stages
    Route::get('progress-stages', 'stageIndex');
    Route::post('progress-stages', 'stageStore');
    Route::put('progress-stages/{progress_stage}', 'stageUpdate');
    Route::delete('progress-stages/{progress_stage}', 'stageDestroy');

    // Per-user progress stage completion overrides
    Route::get('user-progress-stages', 'userStageIndex');
    Route::post('user-progress-stages', 'userStageUpsert');
});
