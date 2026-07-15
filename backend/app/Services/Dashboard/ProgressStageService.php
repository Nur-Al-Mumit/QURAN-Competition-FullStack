<?php

namespace App\Services\Dashboard;

use App\Models\ProgressStage;
use App\Models\UserProgressStage;

class ProgressStageService
{
    /**
     * Mark a progress stage (identified by its code) as completed for the
     * given user. Creates or updates the per-user binding row.
     *
     * Safe to call multiple times for the same user/code (idempotent).
     *
     * @param int    $userId
     * @param string $code
     * @return UserProgressStage|null
     */
    public function markCompleted(int $userId, string $code): ?UserProgressStage
    {
        $stage = ProgressStage::where('code', $code)->first();

        if (!$stage) {
            return null;
        }

        return UserProgressStage::updateOrCreate(
            [
                'user_id'           => $userId,
                'progress_stage_id' => $stage->id,
            ],
            [
                'is_complete'  => true,
                'completed_at' => now(),
            ]
        );
    }
}
