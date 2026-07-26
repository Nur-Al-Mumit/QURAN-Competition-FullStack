<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Lib\JsonResponse;
use App\Models\AttendanceAllocation;
use App\Models\ResultCategory;
use App\Models\Season;
use App\Models\UserAttendance;
use App\Models\UserPreliminaryResult;
use Illuminate\Http\Request;

/**
 * Builds the printable result card for a season.
 *
 * The roster is driven by attendance_allocations (it owns the serial /
 * group / room_number used on the printed sheet). Every student who was
 * allocated a seat is then bucketed into one of three sections:
 *
 *   1. Mahir (result_category_id = 1)  — "Expert"
 *   2. Mubtadi (result_category_id = 2) — "Beginner"
 *   3. Absent — no user_preliminary_results row AND no user_attendances
 *      row for the season. (Any result_category_id other than 1/2, e.g.
 *      the "Fail" category id 3, is also reported but kept separate.)
 *
 * Reuses the seasons() helper from VivaResultController's payload shape
 * so the frontend season filter behaves identically across pages.
 */
class ResultCardController extends Controller
{
    /**
     * Season list + active season id, for the season filter.
     * Mirrors VivaResultController::seasons().
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
     * Full result-card payload for a season.
     *
     * Returns three buckets — mahir, mubtadi, absent — plus the raw
     * result_categories list so the UI can label sections dynamically.
     */
    public function data(Request $request)
    {
        $request->validate([
            'season_id' => 'nullable|integer|exists:seasons,id',
        ]);

        $seasonId = $request->filled('season_id')
            ? (int) $request->input('season_id')
            : (Season::where('is_active', 1)->latest()->value('id') ?? null);

        // Canonical result-category ids, hardcoded per the result_categories
        // table: 1 = Mahir, 2 = Mubtadi, 3 = Fail.
        $mahirId = 1;
        $mubtadiId = 2;

        $resultCategories = ResultCategory::orderBy('id')
            ->get(['id', 'name']);

        // Roster: every allocated seat for the season, with the student's
        // form fields for reg_no / name and the preliminary decision.
        // NOTE: the eager-load select list MUST include the relation's
        // foreign key (attendance_allocation_id) — without it Eloquent
        // cannot stitch the related models back onto their parents and
        // the relation resolves to null for every row.
        $allocations = AttendanceAllocation::with([
            'userCompetitionForm:id,reg_no,name_en',
            'userPreliminaryResult:id,user_id,season_id,result_category_id,attendance_status,attendance_allocation_id',
        ])
            ->when($seasonId, fn ($q) => $q->where('season_id', $seasonId))
            ->get();

        // Index of users that have ANY record for the season in either
        // user_attendances or user_preliminary_results. Anyone in the
        // roster who is in NEITHER set is "Absent".
        $rosterUserIds = $allocations->pluck('user_id')->unique()->all();

        $attendanceUserIds = $rosterUserIds
            ? UserAttendance::whereIn('user_id', $rosterUserIds)
                ->when($seasonId, fn ($q) => $q->where('season_id', $seasonId))
                ->pluck('user_id')
                ->unique()
                ->all()
            : [];

        $preliminaryUserIds = $rosterUserIds
            ? UserPreliminaryResult::whereIn('user_id', $rosterUserIds)
                ->when($seasonId, fn ($q) => $q->where('season_id', $seasonId))
                ->pluck('user_id')
                ->unique()
                ->all()
            : [];

        $presentUserIds = array_unique(array_merge($attendanceUserIds, $preliminaryUserIds));
        $presentSet = array_flip($presentUserIds);

        // Helper: sort by the trailing numeric portion of the serial
        // (A-01 < A-02 < B-01 ...), falling back to the raw string.
        $sortBySerial = function ($a, $b) {
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
        };

        $mahir = [];
        $mubtadi = [];
        $absent = [];
        $other = [];

        foreach ($allocations as $item) {
            $form = $item->userCompetitionForm;
            $decision = $item->userPreliminaryResult;

            $row = [
                'serial'  => $item->serial,
                'reg_no'  => $form?->reg_no ?? '',
                'name_en' => $form?->name_en ?? '',
                // 'phone'   => $form?->phone ?? '',
                'result_category_id' => $decision?->result_category_id,
            ];

            $hasRecord = isset($presentSet[$item->user_id]);

            if (!$hasRecord) {
                // No attendance row AND no preliminary row → Absent.
                $absent[] = $row;
            } elseif ($decision && $decision->result_category_id === $mahirId) {
                $mahir[] = $row;
            } elseif ($decision && $decision->result_category_id === $mubtadiId) {
                $mubtadi[] = $row;
            } else {
                // Present but neither Mahir nor Mubtadi (e.g. "Fail", or a
                // present student with no decision yet). Kept separate so
                // the main three sections stay clean; surfaced as "other".
                $other[] = $row;
            }
        }

        usort($mahir, $sortBySerial);
        usort($mubtadi, $sortBySerial);
        usort($absent, $sortBySerial);
        usort($other, $sortBySerial);

        // Per-section running serial numbers (1, 2, 3, ...) as requested.
        $numbered = function (array $rows) {
            return array_map(function ($row, $i) {
                return array_merge($row, ['sl' => $i + 1]);
            }, $rows, array_keys($rows));
        };

        return JsonResponse::success([
            'season_id'        => $seasonId,
            'result_categories' => $resultCategories,
            'mahir_id'         => $mahirId,
            'mubtadi_id'       => $mubtadiId,
            'sections'         => [
                'mahir'   => $numbered($mahir),
                'mubtadi' => $numbered($mubtadi),
                'absent'  => $numbered($absent),
            ],
            // Present-but-neither-Mahir-nor-Mubtadi rows (e.g. Fail).
            // Surfaced separately so the UI can show them if needed.
            'other'            => $numbered($other),
        ]);
    }
}
