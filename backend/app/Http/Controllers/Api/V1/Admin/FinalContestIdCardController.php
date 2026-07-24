<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Lib\JsonResponse;
use App\Models\Season;
use App\Models\UserCompetitionForm;
use App\Models\UserPreliminaryResult;
use Illuminate\Http\Request;

/**
 * Builds the printable final-contest ID-card roster.
 *
 * Eligible students are those in user_preliminary_results with:
 *   criteria_id = 1  (the expert / Mahir tier — final contest)
 *
 * The season is taken from the preliminary result itself (not from the form),
 * so contestants from ALL seasons are included.
 *
 * The QR printed on each card encodes the student's reg_no so the existing
 * volunteer scanners (verify-registration / final-attendance) can read it.
 */
class FinalContestIdCardController extends Controller
{
    /**
     * Season list + active season id, for consistency with other card pages.
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
     * Final-contest ID-card roster (all seasons, no season filter).
     */
    public function data(Request $request)
    {
        $results = UserPreliminaryResult::where('criteria_id', 1)
            ->with([
                'userCompetitionForm:id,user_id,season_id,reg_no,name_en,name_bn,dob,phone,criteria_id',
                'userCompetitionForm.season:id,name,year',
                'attendanceAllocation:id,user_competition_form_id,group,serial',
            ])
            ->get();

        $rows = $results->map(function (UserPreliminaryResult $result) {
            $form = $result->userCompetitionForm;
            $allocation = $result->attendanceAllocation;

            // Take season_id from the preliminary result, not from the form
            $seasonId = $result->season_id;
            $season = Season::where('id', $seasonId)->first(['id', 'name', 'year']);

            return [
                'reg_no'      => $form?->reg_no ?? '',
                'name_en'     => $form?->name_en ?? '',
                'name_bn'     => $form?->name_bn ?? '',
                'phone'       => $form?->phone ?? '',
                'dob'         => $form?->dob,
                'group'       => $allocation?->group,
                'serial'      => $allocation?->serial,
                'season_id'   => $seasonId ?? '',
                'season_name' => $season?->name ?? '',
                'season_year' => $season?->year ?? '',
            ];
        })->values()->all();

        // Sort by the trailing numeric portion of the serial (A-01 < A-02 <
        // B-01 ...), falling back to the raw string.
        usort($rows, function ($a, $b) {
            $num = function ($serial) {
                if (preg_match('/(\d+)\s*$/', (string) $serial, $m)) {
                    return (int) $m[1];
                }
                return 0;
            };
            $letter = function ($serial) {
                if (preg_match('/^\s*([A-Za-z])/', (string) $serial, $m)) {
                    return strtoupper($m[1]);
                }
                return '';
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
