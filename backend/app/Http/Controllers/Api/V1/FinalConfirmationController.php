<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Lib\JsonResponse;
use App\Models\AttendanceAllocation;
use App\Models\FinalConfirmation;
use App\Models\Season;
use App\Models\SeasonTrainingDate;
use App\Models\UserPreliminaryResult;
use App\Models\UserTrainingAttendance;
use Illuminate\Http\Request;

/**
 * Final Confirmation — public read endpoints and admin write endpoints.
 *
 * Displays participants grouped into Mahir / Mubtadi sections with their
 * confirmation status (YES=1, NO=2). Within each group, YES rows come first.
 * Only participants who have a record in the final_confirmations table are shown.
 */
class FinalConfirmationController extends Controller
{
    /**
     * Season list + active season id — mirrors ResultCardController::seasons().
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
     * Full final-confirmation payload for a season.
     *
     * Returns two buckets — mahir, mubtadi — each sorted by status
     * (YES first, then NO), then by serial.
     */
    public function data(Request $request)
    {
        $request->validate([
            'season_id' => 'nullable|integer|exists:seasons,id',
        ]);

        // TODO: Starting next year, only fetch the active season.
        // Uncomment the two lines below and remove the hardcoded fallback.
        // $seasonId = $request->filled('season_id')
        //     ? (int) $request->input('season_id')
        //     : (Season::where('is_active', 1)->latest()->value('id') ?? null);

        // This year only: hardcode season 1 (mahir) + season 2 (mubtadi).
        $seasonId = null;

        // Canonical result-category ids: 1 = Mahir, 2 = Mubtadi.
        $mahirId = 1;
        $mubtadiId = 2;

        // This year: fetch all allocations from both seasons.
        // Mahir and mubtadi can exist in either season.
        // TODO: Next year, remove this and use single $seasonId above.
        $allocations = AttendanceAllocation::with([
            'userCompetitionForm:id,reg_no,name_en',
            'userPreliminaryResult:id,user_id,season_id,criteria_id,result_category_id,attendance_status,attendance_allocation_id',
        ])
            ->whereIn('season_id', [1, 2])
            ->get();

        // Confirmation records for both seasons.
        $allUserIds = $allocations->pluck('user_id')->unique()->all();
        $confirmationMap = FinalConfirmation::whereIn('user_id', $allUserIds)
            ->whereIn('season_id', [1, 2])
            ->get()
            ->keyBy('user_id');

        $mahir = [];
        $mubtadi = [];

        foreach ($allocations as $item) {
            $form = $item->userCompetitionForm;
            $decision = $item->userPreliminaryResult;
            $conf = $confirmationMap[$item->user_id] ?? null;

            $row = [
                'serial'   => $item->serial,
                'reg_no'   => $form?->reg_no ?? '',
                'name_en'  => $form?->name_en ?? '',
                'season_id' => $item->season_id,
                'status'   => $conf ? $conf->status : 2,
            ];

            if ($decision && $decision->result_category_id === $mahirId) {
                $mahir[] = $row;
            } elseif ($decision && $decision->result_category_id === $mubtadiId) {
                $mubtadi[] = $row;
            }
        }

        // Sort: YES (status=1) first, then NO (status=2), then by serial.
        $sortByStatusThenSerial = function ($a, $b) {
            if ($a['status'] !== $b['status']) {
                return $a['status'] <=> $b['status'];
            }
            return strcmp((string) $a['serial'], (string) $b['serial']);
        };

        usort($mahir, $sortByStatusThenSerial);
        usort($mubtadi, $sortByStatusThenSerial);

        // Per-section running serial numbers.
        $numbered = function (array $rows) {
            return array_map(function ($row, $i) {
                return array_merge($row, ['sl' => $i + 1]);
            }, $rows, array_keys($rows));
        };

        return JsonResponse::success([
            'season_id' => $seasonId,
            'sections'  => [
                'mahir'   => $numbered($mahir),
                'mubtadi' => $numbered($mubtadi),
            ],
        ]);
    }

    /**
     * Admin: full participant list with confirmation status.
     *
     * Returns all mahir/mubtadi participants (from preliminary results)
     * with their criteria_id, serial, reg_no, name_en, and current
     * confirmation status (if any). Used by the admin management page.
     */
    public function adminData(Request $request)
    {
        $request->validate([
            'season_id' => 'nullable|integer|exists:seasons,id',
        ]);

        $mahirId = 1;
        $mubtadiId = 2;

        // Fetch all allocations from both seasons.
        $allocations = AttendanceAllocation::with([
            'userCompetitionForm:id,reg_no,name_en',
            'userPreliminaryResult:id,user_id,season_id,criteria_id,result_category_id,attendance_status,attendance_allocation_id',
        ])
            ->whereIn('season_id', [1, 2])
            ->get();

        $allocationUserIds = $allocations->pluck('user_id')->unique()->all();

        // Existing confirmation records for both seasons.
        $confirmations = FinalConfirmation::whereIn('user_id', $allocationUserIds)
            ->whereIn('season_id', [1, 2])
            ->get()
            ->keyBy('user_id');

        // Total training days (non-off days) summed across both seasons.
        $totalTrainingDays = SeasonTrainingDate::whereIn('season_id', [1, 2])
            ->where('is_off_day', false)
            ->count();

        // Training attendance: count present (1) + late (3) per user across both seasons.
        $attendanceCounts = UserTrainingAttendance::whereIn('user_id', $allocationUserIds)
            ->whereIn('season_id', [1, 2])
            ->whereIn('attendance_status', [1, 3]) // Present or Late
            ->selectRaw('user_id, COUNT(*) as present_count')
            ->groupBy('user_id')
            ->get()
            ->keyBy('user_id');

        $mahir = [];
        $mubtadi = [];

        foreach ($allocations as $item) {
            $form = $item->userCompetitionForm;
            $decision = $item->userPreliminaryResult;
            $conf = $confirmations[$item->user_id] ?? null;
            $attendance = $attendanceCounts[$item->user_id] ?? null;

            $row = [
                'user_id'                => $item->user_id,
                'user_competition_form_id' => $item->user_competition_form_id,
                'serial'                 => $item->serial,
                'reg_no'                 => $form?->reg_no ?? '',
                'name_en'                => $form?->name_en ?? '',
                'season_id'              => $item->season_id,
                'criteria_id'            => $decision?->criteria_id,
                'result_category_id'     => $decision?->result_category_id,
                'confirmation_status'     => $conf?->status ?? null,
                'confirmation_id'        => $conf?->id ?? null,
                'attendance_present'     => $attendance ? (int) $attendance->present_count : 0,
                'attendance_total'       => $totalTrainingDays,
            ];

            if ($decision && $decision->result_category_id === $mahirId) {
                $mahir[] = $row;
            } elseif ($decision && $decision->result_category_id === $mubtadiId) {
                $mubtadi[] = $row;
            }
        }

        $sortBySerial = function ($a, $b) {
            return strcmp((string) $a['serial'], (string) $b['serial']);
        };

        usort($mahir, $sortBySerial);
        usort($mubtadi, $sortBySerial);

        $numbered = function (array $rows) {
            return array_map(function ($row, $i) {
                return array_merge($row, ['sl' => $i + 1]);
            }, $rows, array_keys($rows));
        };

        return JsonResponse::success([
            'season_id' => null,
            'sections'  => [
                'mahir'   => $numbered($mahir),
                'mubtadi' => $numbered($mubtadi),
            ],
        ]);
    }

    /**
     * Admin: store (create or update) a final confirmation record.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id'                => 'required|integer|exists:users,id',
            'user_competition_form_id' => 'required|integer|exists:user_competition_forms,id',
            'season_id'              => 'required|integer|exists:seasons,id',
            'criteria_id'            => 'nullable|integer|exists:criteria,id',
            'status'                 => 'required|integer|in:1,2',
            'has_consideration'      => 'nullable|string',
        ]);

        $adminId = auth('admin-api')->id();

        $record = FinalConfirmation::updateOrCreate(
            [
                'user_id'   => $validated['user_id'],
                'season_id' => $validated['season_id'],
            ],
            array_merge($validated, ['admin_id' => $adminId])
        );

        return JsonResponse::success([
            'final_confirmation' => $record,
        ], 'Final confirmation saved successfully.');
    }

    /**
     * Admin: update an existing final confirmation record.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'status'           => 'required|integer|in:1,2',
            'criteria_id'      => 'nullable|integer|exists:criteria,id',
            'has_consideration' => 'nullable|string',
        ]);

        $record = FinalConfirmation::findOrFail($id);
        $record->status           = $request->input('status');
        $record->criteria_id      = $request->input('criteria_id', $record->criteria_id);
        $record->has_consideration = $request->input('has_consideration', $record->has_consideration);
        $record->admin_id         = auth('admin-api')->id();
        $record->save();

        return JsonResponse::success([
            'final_confirmation' => $record,
        ], 'Final confirmation updated successfully.');
    }

    /**
     * Admin: bulk store/update multiple confirmation records.
     */
    public function bulkStore(Request $request)
    {
        $request->validate([
            'confirmations' => 'required|array|min:1',
            'confirmations.*.user_id'                => 'required|integer|exists:users,id',
            'confirmations.*.user_competition_form_id' => 'required|integer|exists:user_competition_forms,id',
            'confirmations.*.season_id'              => 'required|integer|exists:seasons,id',
            'confirmations.*.criteria_id'            => 'nullable|integer|exists:criteria,id',
            'confirmations.*.status'                 => 'required|integer|in:1,2',
        ]);

        $adminId = auth('admin-api')->id();
        $results = [];

        foreach ($request->input('confirmations') as $data) {
            $results[] = FinalConfirmation::updateOrCreate(
                [
                    'user_id'   => $data['user_id'],
                    'season_id' => $data['season_id'],
                ],
                array_merge($data, ['admin_id' => $adminId])
            );
        }

        return JsonResponse::success([
            'count'               => count($results),
            'final_confirmations' => $results,
        ], 'Final confirmations saved successfully.');
    }
}
