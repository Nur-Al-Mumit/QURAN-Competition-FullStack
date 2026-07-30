<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Lib\JsonResponse;
use App\Models\FinalConfirmation;
use App\Models\Season;
use App\Models\UserPreliminaryResult;
use Illuminate\Http\Request;

/**
 * Builds the printable final-round ID-card roster.
 *
 * Eligible students:
 *   - criteria_id = 1 (Mahir / Expert) — from ALL seasons, no confirmation needed
 *   - criteria_id = 2 (Mubtadi / Beginner) — from the ACTIVE season only,
 *     AND must have a row in user_final_confirmations
 *
 * Each card shows the student's reg_no, name, group, serial, season,
 * and their criteria label (Mahir / Mubtadi).
 */
class FinalRoundIdCardController extends Controller
{
    /**
     * Season list + active season id.
     */
    public function seasons()
    {
        $seasons = Season::orderByDesc('year')
            ->orderByDesc('id')
            ->get(['id', 'name', 'year', 'gender', 'is_active']);

        $activeSeason = Season::where('is_active', 1)->latest()->first();

        return JsonResponse::success([
            'seasons'          => $seasons,
            'active_season_id' => $activeSeason?->id,
        ]);
    }

    /**
     * Final-round ID-card roster.
     *
     * Mahir (criteria_id=1): all seasons, no confirmation required.
     * Mubtadi (criteria_id=2): active season only, must exist in user_final_confirmations.
     */
    public function data(Request $request)
    {
        $activeSeason = Season::where('is_active', 1)->latest()->first();
        $activeSeasonId = $activeSeason?->id;

        // 1. Mahir — criteria_id = 1, ALL seasons
        $mahirResults = UserPreliminaryResult::where('criteria_id', 1)
            ->with([
                'userCompetitionForm:id,user_id,season_id,reg_no,name_en,name_bn,dob,phone,criteria_id',
                'userCompetitionForm.season:id,name,year',
                'attendanceAllocation:id,user_competition_form_id,group,serial',
            ])
            ->get();

        // 2. Mubtadi — criteria_id = 2, active season only, must have final_confirmation
        $confirmedFormIds = FinalConfirmation::where('season_id', $activeSeasonId)
            ->where('criteria_id', 2)
            ->pluck('user_competition_form_id')
            ->toArray();

        $mubtadiResults = UserPreliminaryResult::where('criteria_id', 2)
            ->where('season_id', $activeSeasonId)
            ->whereIn('user_competition_form_id', $confirmedFormIds)
            ->with([
                'userCompetitionForm:id,user_id,season_id,reg_no,name_en,name_bn,dob,phone,criteria_id',
                'userCompetitionForm.season:id,name,year',
                'attendanceAllocation:id,user_competition_form_id,group,serial',
            ])
            ->get();

        $criteriaLabels = [
            1 => ['bn' => 'মাহির', 'en' => 'Mahir', 'ar' => 'الماهر'],
            2 => ['bn' => 'মুবতাদী', 'en' => 'Mubtadi', 'ar' => 'المبتدئ'],
        ];

        $mapRow = function (UserPreliminaryResult $result) use ($criteriaLabels) {
            $form = $result->userCompetitionForm;
            $allocation = $result->attendanceAllocation;
            $seasonId = $result->season_id;
            $season = $form?->season;

            $criteriaId = $form?->criteria_id ?? $result->criteria_id;
            $label = $criteriaLabels[$criteriaId] ?? ['bn' => '', 'en' => ''];

            return [
                'reg_no'         => $form?->reg_no ?? '',
                'name_en'        => $form?->name_en ?? '',
                'name_bn'        => $form?->name_bn ?? '',
                'phone'          => $form?->phone ?? '',
                'dob'            => $form?->dob,
                'group'          => $allocation?->group,
                'serial'         => $allocation?->serial,
                'season_id'      => $seasonId ?? '',
                'season_name'    => $season?->name ?? '',
                'season_year'    => $season?->year ?? '',
                'criteria_id'    => $criteriaId,
                'criteria_label' => $label,
                'criteria_ar'   => $label['ar'] ?? '',
            ];
        };

        $rows = $mahirResults->map($mapRow)
            ->merge($mubtadiResults->map($mapRow))
            ->values()
            ->all();

        // Sort by letter prefix then numeric suffix of serial
        usort($rows, function ($a, $b) {
            $letter = function ($serial) {
                if (preg_match('/^\s*([A-Za-z])/', (string) $serial, $m)) {
                    return strtoupper($m[1]);
                }
                return '';
            };
            $num = function ($serial) {
                if (preg_match('/(\d+)\s*$/', (string) $serial, $m)) {
                    return (int) $m[1];
                }
                return 0;
            };

            $la = $letter($a['serial']);
            $lb = $letter($b['serial']);
            if ($la !== $lb) {
                return strcmp($la, $lb);
            }
            return $num($a['serial']) <=> $num($b['serial']);
        });

        return JsonResponse::success([
            'cards' => $rows,
        ]);
    }
}
