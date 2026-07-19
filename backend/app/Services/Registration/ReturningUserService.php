<?php

namespace App\Services\Registration;

use App\Models\Season;
use App\Models\User;
use App\Models\UserFinalAttendance;
use App\Models\UserTrainingAttendance;

class ReturningUserService
{
    /**
     * Max training-attendance seasons a user may have before they are
     * barred from entering a new competition season.
     */
    public const MAX_TRAINING_ATTENDANCES = 3;

    public function getActiveSeason(): ?Season
    {
        return Season::where('is_active', 1)->latest()->first();
    }

    public function getPreviousSeason(?Season $activeSeason = null): ?Season
    {
        $activeSeason = $activeSeason ?: $this->getActiveSeason();
        if (!$activeSeason) {
            return null;
        }

        return Season::where('id', '<', $activeSeason->id)
            ->orderByDesc('id')
            ->first();
    }

    public function participatedInLastFinalCompetition(User $user): bool
    {
        return UserFinalAttendance::where('user_id', $user->id)->exists();
    }

    public function trainingAttendanceCount(User $user): int
    {
        return UserTrainingAttendance::where('user_id', $user->id)->count();
    }

    /**
     * True when the user has a Present or Late training attendance for the
     * season immediately before the currently active one.
     */
    public function participatedInLastTrainingSeason(User $user, ?Season $activeSeason = null): bool
    {
        $previous = $this->getPreviousSeason($activeSeason);
        if (!$previous) {
            return false;
        }

        return UserTrainingAttendance::where('user_id', $user->id)
            ->where('season_id', $previous->id)
            ->whereIn('attendance_status', [
                UserTrainingAttendance::STATUS_PRESENT,
                UserTrainingAttendance::STATUS_LATE,
            ])
            ->exists();
    }

    /**
     * Returning users may re-enter when they have fewer than 3 training
     * attendance rows and did not join (Present/Late) the last training season.
     */
    public function isEligibleForNewSeason(User $user, ?Season $activeSeason = null): bool
    {
        if ($this->participatedInLastFinalCompetition($user)) {
            return false;
        }

        if ($this->trainingAttendanceCount($user) >= self::MAX_TRAINING_ATTENDANCES) {
            return false;
        }

        if ($this->participatedInLastTrainingSeason($user, $activeSeason)) {
            return false;
        }

        return true;
    }

    /**
     * Whether this user already belongs to the currently active season
     * (already re-registered / brand-new for this season).
     */
    public function isOnActiveSeason(User $user, ?Season $activeSeason = null): bool
    {
        $activeSeason = $activeSeason ?: $this->getActiveSeason();
        if (!$activeSeason) {
            return false;
        }

        return (int) $user->season_id === (int) $activeSeason->id;
    }

    /**
     * Create or update a training attendance row and move the user's
     * current season_id to the attendance's season.
     */
    public function recordTrainingAttendance(
        User $user,
        int $seasonId,
        int $attendanceStatus,
        ?int $adminId = null
    ): UserTrainingAttendance {
        $attendance = UserTrainingAttendance::Create(
            [
                'user_id' => $user->id,
                'season_id' => $seasonId,
                'attendance_status' => $attendanceStatus,
                'updated_by' => $adminId,
            ]
        );

        $user->update(['season_id' => $seasonId]);

        return $attendance;
    }
}
