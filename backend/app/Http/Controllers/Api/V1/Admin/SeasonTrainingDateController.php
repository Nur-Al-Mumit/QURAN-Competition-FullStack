<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Lib\JsonResponse;
use App\Models\Season;
use App\Models\SeasonTrainingDate;
use App\Models\UserPreliminaryResult;
use App\Models\UserTrainingAttendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * Manages per-season training dates and serves the data the printable
 * attendance sheet + recorded-attendance view consume.
 *
 * Training dates are stored as explicit individual rows (one date per row),
 * not a start/end range — so an off-day inside the training period (e.g.
 * 24 July within 22-27 July) is simply a row with is_off_day = true.
 *
 * CRUD mirrors DashboardSettingController; the sheet/attendance-view read
 * endpoints mirror TrainingIdCardController.
 */
class SeasonTrainingDateController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Season helper (shared by every page that consumes training dates)
    |--------------------------------------------------------------------------
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

    /*
    |--------------------------------------------------------------------------
    | CRUD
    |--------------------------------------------------------------------------
    */
    public function index(Request $request)
    {
        $data = $request->validate([
            'season_id' => 'nullable|integer|exists:seasons,id',
        ]);

        $seasonId = $this->resolveSeasonId($request);

        $dates = SeasonTrainingDate::where('season_id', $seasonId)
            ->orderBy('date')
            ->get();

        return JsonResponse::success([
            'season_id'      => $seasonId,
            'training_dates' => $dates,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'season_id'  => 'required|integer|exists:seasons,id',
            'date'       => 'required|date',
            'is_off_day' => 'nullable|boolean',
            'note'       => 'nullable|string|max:191',
            'sort_order' => 'nullable|integer',
        ]);

        try {
            $date = SeasonTrainingDate::create($data);

            return JsonResponse::success(['training_date' => $date], 'Created', null, 201);
        } catch (\Throwable $th) {
            // Most likely a unique(season_id, date) violation.
            return JsonResponse::error('That date already exists for this season.');
        }
    }

    public function update(Request $request, SeasonTrainingDate $trainingDate)
    {
        $data = $request->validate([
            'date'       => 'sometimes|required|date',
            'is_off_day' => 'nullable|boolean',
            'note'       => 'nullable|string|max:191',
            'sort_order' => 'nullable|integer',
        ]);

        $trainingDate->update($data);

        return JsonResponse::success(['training_date' => $trainingDate->fresh()]);
    }

    public function destroy(SeasonTrainingDate $trainingDate)
    {
        $trainingDate->delete();

        return JsonResponse::success(['message' => 'Deleted']);
    }

    /*
    |--------------------------------------------------------------------------
    | Read endpoints for the printable sheet + recorded-attendance view
    |--------------------------------------------------------------------------
    */

    /**
     * Printable attendance sheet payload: the Mubtadi training-pass roster +
     * the season's training dates. The sheet itself stays blank (filled by
     * hand on paper) — only roster + dates come from here.
     */
    public function sheet(Request $request)
    {
        $seasonId = $this->resolveSeasonId($request);

        return JsonResponse::success([
            'season_id'      => $seasonId,
            'students'       => $this->mubtadiRoster($seasonId),
            'training_dates' => $this->trainingDates($seasonId),
        ]);
    }

    /**
     * Recorded-attendance view payload: roster + dates + a map of the
     * attendance captured by the QR scanner, keyed by user_id -> [date => status].
     */
    public function attendanceView(Request $request)
    {
        $seasonId = $this->resolveSeasonId($request);

        $students = $this->mubtadiRoster($seasonId);
        $dates = $this->trainingDates($seasonId);

        // One query for every attendance row that touches this season's dates
        // for these users, then group in PHP into the user_id -> [date] map.
        $userIdToFormId = [];
        foreach ($students as $s) {
            if (!empty($s['user_id'])) {
                $userIdToFormId[$s['user_id']] = $s['user_id'];
            }
        }
        $userIds = array_keys($userIdToFormId);
        $dateStrings = $dates->pluck('date')->map(fn ($d) => $d instanceof \DateTime ? $d->format('Y-m-d') : (string) $d)->all();

        $attendanceMap = [];
        if ($userIds && $dateStrings) {
            $rows = UserTrainingAttendance::whereIn('user_id', $userIds)
                ->whereIn(DB::raw('DATE(date)'), $dateStrings)
                ->get(['user_id', 'date', 'attendance_status']);

            foreach ($rows as $row) {
                $key = $row->date instanceof \DateTime ? $row->date->format('Y-m-d') : (string) $row->date;
                $attendanceMap[$row->user_id][$key] = (int) $row->attendance_status;
            }
        }

        return JsonResponse::success([
            'season_id'      => $seasonId,
            'students'       => $students,
            'training_dates' => $dates,
            'attendance'     => $attendanceMap,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Helpers
    |--------------------------------------------------------------------------
    */

    private function resolveSeasonId(Request $request): ?int
    {
        if ($request->filled('season_id')) {
            return (int) $request->input('season_id');
        }
        return Season::where('is_active', 1)->latest()->value('id') ?? null;
    }

    /**
     * The Mubtadi training-pass roster: criteria_id = 2 AND
     * result_category_id = 2. Mirrors TrainingIdCardController::data().
     */
    private function mubtadiRoster(?int $seasonId): array
    {
        $results = UserPreliminaryResult::where('criteria_id', 2)
            ->where('result_category_id', 2)
            ->when($seasonId, fn ($q) => $q->where('season_id', $seasonId))
            ->with([
                'userCompetitionForm:id,user_id,reg_no,name_en,name_bn,phone,criteria_id',
                'attendanceAllocation:id,user_competition_form_id,group,serial',
            ])
            ->get();

        $rows = $results->map(function (UserPreliminaryResult $result) {
            $form = $result->userCompetitionForm;
            $allocation = $result->attendanceAllocation;

            return [
                'user_id' => $form?->user_id,
                'reg_no'  => $form?->reg_no ?? '',
                'name_en' => $form?->name_en ?? '',
                'name_bn' => $form?->name_bn ?? '',
                'phone'   => $form?->phone ?? '',
                'group'   => $allocation?->group,
                'serial'  => $allocation?->serial,
            ];
        })->values()->all();

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

        return $rows;
    }

    private function trainingDates(?int $seasonId)
    {
        if (!$seasonId) {
            return collect();
        }
        // Normalize `date` to a plain Y-m-d string. Without this the model's
        // `date` cast serializes the column to an ISO-8601 UTC string (e.g.
        // "2026-07-21T18:00:00.000000Z" for a 2026-07-22 local date), which
        // then does NOT match the Y-m-d keys used in the attendance map — so
        // the frontend's per-date lookup silently fails and shows nothing.
        return SeasonTrainingDate::where('season_id', $seasonId)
            ->orderBy('date')
            ->get(['id', 'date', 'is_off_day', 'note'])
            ->map(function (SeasonTrainingDate $d) {
                return [
                    'id'        => $d->id,
                    'date'      => $d->date instanceof \DateTime
                        ? $d->date->format('Y-m-d')
                        : (string) $d->date,
                    'is_off_day' => (bool) $d->is_off_day,
                    'note'      => $d->note,
                ];
            })
            ->values();
    }
}
