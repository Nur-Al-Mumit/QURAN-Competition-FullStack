<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Lib\JsonResponse;
use App\Models\AttendanceAllocation;
use App\Models\Season;
use App\Models\UserPreliminaryResult;
use Illuminate\Http\Request;

/**
 * Builds the printable training-pass ID-card roster for a season.
 *
 * Eligible students are those in user_preliminary_results with:
 *   criteria_id        = 2  (the regular/beginner tier — Mubtadi)
 *   result_category_id = 2  (Mubtadi outcome)
 *
 * The QR printed on each card encodes the student's reg_no so the existing
 * volunteer scanners (verify-registration / training-attendance) can read it.
 *
 * Mirrors the ResultCardController payload shape (seasons + data) so the
 * frontend season filter behaves identically across pages.
 */
class TrainingIdCardController extends Controller
{
    /**
     * Season list + active season id, for the season filter.
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
     * Training-pass ID-card roster for a season.
     *
     * Returns one entry per eligible Mubtadi student, carrying the fields the
     * printed card needs (name, reg_no, group/serial) plus the QR payload
     * (reg_no).
     */
    public function data(Request $request)
    {
        $request->validate([
            'season_id' => 'nullable|integer|exists:seasons,id',
        ]);

        $seasonId = $request->filled('season_id')
            ? (int) $request->input('season_id')
            : (Season::where('is_active', 1)->latest()->value('id') ?? null);

        // NOTE: the eager-load select list MUST include the relations' foreign
        // keys (user_competition_form_id on the allocation) — without it
        // Eloquent cannot stitch the related models back onto their parents
        // and the relation resolves to null for every row.
        $results = UserPreliminaryResult::where('criteria_id', 2)
            ->where('result_category_id', 2)
            ->when($seasonId, fn ($q) => $q->where('season_id', $seasonId))
            ->with([
                'userCompetitionForm:id,user_id,reg_no,name_en,name_bn,dob,phone,criteria_id',
                'attendanceAllocation:id,user_competition_form_id,group,serial',
            ])
            ->get();

        $rows = $results->map(function (UserPreliminaryResult $result) {
            $form = $result->userCompetitionForm;
            $allocation = $result->attendanceAllocation;

            return [
                'reg_no'  => $form?->reg_no ?? '',
                'name_en' => $form?->name_en ?? '',
                'name_bn' => $form?->name_bn ?? '',
                'phone'   => $form?->phone ?? '',
                'dob'     => $form?->dob,
                'group'   => $allocation?->group,
                'serial'  => $allocation?->serial,
            ];
        })->values()->all();

        // Sort by the trailing numeric portion of the serial (A-01 < A-02 <
        // B-01 ...), falling back to the raw string. Mirrors ResultCardController.
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
            'season_id' => $seasonId,
            'cards'     => $rows,
        ]);
    }
}
