<?php

namespace App\Http\Controllers\Api\V1\User;

use App\Lib\JsonResponse;
use App\Models\AttendanceAllocation;
use App\Models\Season;
use App\Models\User;
use App\Models\UserFinalAttendance;
use App\Models\UserProfile;
use App\Http\Controllers\Controller;
use App\Services\Registration\ReturningUserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function getProfile()
    {
        try {
            $user = Auth::user()->load('form');

            // if (!$user->form) {
            //     return JsonResponse::error('User form not found', 404);
            // }

            $userData = $user->toArray();

            // Attach a computed season/eligibility snapshot so the frontend has
            // a single source of truth for "returning user" UI decisions
            // (warning banner, direct-final pass-token, etc.).
            $returning = new ReturningUserService();
            $activeSeason = $returning->getActiveSeason();
            $userData['season_status'] = [
                'has_active_season' => (bool) $activeSeason,
                'on_active_season' => $returning->isOnActiveSeason($user, $activeSeason),
                'is_eligible_for_new_season' => $returning->isEligibleForNewSeason($user, $activeSeason),
                'is_direct_final' => $this->isDirectFinal($user, $activeSeason),
                'active_season_id' => $activeSeason?->id,
                'active_season_name' => $activeSeason?->name,
            ];

            return JsonResponse::success(['user' => $userData]);
        } catch (\Exception $e) {
            return JsonResponse::error('An error occurred while retrieving the profile', 500);
        }
    }

    /**
     * A "direct-final" participant is an Expert-group (criteria_id == 1)
     * returning competitor who, this season only, is admitted straight to the
     * final round without going through viva/primary again.
     *
     * Eligibility (all must hold):
     *   • criteria_id == 1 (Expert group — set by admins after last year's
     *     viva result),
     *   • has an attendance_allocation from a previous season — i.e. they DID
     *     go through the viva/primary track last year (which is precisely why
     *     they were promoted to Expert). The allocation — not the form — is
     *     the reliable "returning expert" signal (a user may have been
     *     re-registered onto the active season, leaving their only form on the
     *     active season while their allocation is still on the previous one).
     *   • has NO users_final_attendances row from a previous season — i.e.
     *     they did NOT reach the final last year (also enforced by
     *     ReturningUserService::isEligibleForNewSeason).
     *
     * The flag is keyed on stable signals, so it remains true after the user
     * updates their registration — required for the pass-token card to render
     * on the token page even once they are on the active season.
     */
    private function isDirectFinal(User $user, ?Season $activeSeason): bool
    {
        if (!$activeSeason || !$user->form) {
            return false;
        }

        if ((int) ($user->form->criteria_id ?? 0) !== 1) {
            return false;
        }

        // DID attend the viva/primary track in a previous season (that's how
        // they earned the Expert criteria_id == 1 promotion). The allocation
        // — not the form — is the reliable "returning expert" signal.
        $hasPreviousSeasonAllocation = AttendanceAllocation::where('user_id', $user->id)
            ->where('season_id', '!=', $activeSeason->id)
            ->exists();
        if (!$hasPreviousSeasonAllocation) {
            return false;
        }

        // Did NOT reach the final in a previous season. (Redundant with
        // isEligibleForNewSeason but kept explicit for clarity/robustness.)
        return !UserFinalAttendance::where('user_id', $user->id)
            ->where('season_id', '!=', $activeSeason->id)
            ->exists();
    }

    public function updateProfile(Request $request)
    {
        try {
            return JsonResponse::success(['message' => 'Profile updated successfully']);
        } catch (\Exception $e) {
            return JsonResponse::error($e, 500);
        }

    }
}
