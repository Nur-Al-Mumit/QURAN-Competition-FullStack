<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Lib\JsonResponse;
use App\Models\AttendanceAllocation;
use App\Models\FinalConfirmation;
use App\Models\Season;
use App\Models\UserPreliminaryResult;
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

        $seasonId = $request->filled('season_id')
            ? (int) $request->input('season_id')
            : (Season::where('is_active', 1)->latest()->value('id') ?? null);

        // Canonical result-category ids: 1 = Mahir, 2 = Mubtadi.
        $mahirId = 1;
        $mubtadiId = 2;

        // Fetch all final_confirmation records for the season, eager-load
        // the competition form (for reg_no, name_en) and the preliminary result
        // (for result_category_id to determine mahir/mubtadi grouping).
        $confirmations = FinalConfirmation::with([
            'userCompetitionForm:id,reg_no,name_en',
        ])
            ->when($seasonId, fn ($q) => $q->where('season_id', $seasonId))
            ->get();

        if ($confirmations->isEmpty()) {
            return JsonResponse::success([
                'season_id' => $seasonId,
                'sections'  => [
                    'mahir'   => [],
                    'mubtadi' => [],
                ],
            ]);
        }

        // Collect all user_ids to fetch preliminary results in bulk.
        $userIds = $confirmations->pluck('user_id')->unique()->all();

        $preliminaryMap = UserPreliminaryResult::whereIn('user_id', $userIds)
            ->when($seasonId, fn ($q) => $q->where('season_id', $seasonId))
            ->get()
            ->keyBy('user_id');

        // Build a map of criteria_id from preliminary results (the source of truth).
        $criteriaMap = [];
        foreach ($preliminaryMap as $uid => $prelim) {
            if ($prelim->criteria_id) {
                $criteriaMap[$uid] = $prelim->criteria_id;
            }
        }

        // Collect allocation serials for display order.
        $allocationMap = AttendanceAllocation::whereIn('user_id', $userIds)
            ->when($seasonId, fn ($q) => $q->where('season_id', $seasonId))
            ->get()
            ->keyBy('user_id');

        $mahir = [];
        $mubtadi = [];

        foreach ($confirmations as $conf) {
            $form = $conf->userCompetitionForm;
            $preliminary = $preliminaryMap[$conf->user_id] ?? null;
            $allocation = $allocationMap[$conf->user_id] ?? null;

            $row = [
                'serial'                    => $allocation?->serial ?? '',
                'reg_no'                    => $form?->reg_no ?? '',
                'name_en'                   => $form?->name_en ?? '',
                'criteria_id'               => $criteriaMap[$conf->user_id] ?? null,
                'status'                    => $conf->status,
            ];

            // Group by result_category_id from preliminary results.
            if ($preliminary && $preliminary->result_category_id === $mahirId) {
                $mahir[] = $row;
            } elseif ($preliminary && $preliminary->result_category_id === $mubtadiId) {
                $mubtadi[] = $row;
            } elseif ($preliminary) {
                // Has a preliminary result but neither mahir nor mubtadi (e.g. Fail).
                // Place in mubtadi bucket as fallback since they were still confirmed.
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

        $seasonId = $request->filled('season_id')
            ? (int) $request->input('season_id')
            : (Season::where('is_active', 1)->latest()->value('id') ?? null);

        $mahirId = 1;
        $mubtadiId = 2;

        // Roster: every allocated seat for the season.
        $allocations = AttendanceAllocation::with([
            'userCompetitionForm:id,reg_no,name_en',
            'userPreliminaryResult:id,user_id,season_id,criteria_id,result_category_id,attendance_status,attendance_allocation_id',
        ])
            ->when($seasonId, fn ($q) => $q->where('season_id', $seasonId))
            ->get();

        // Existing confirmation records for the season.
        $allocationUserIds = $allocations->pluck('user_id')->unique()->all();
        $confirmations = FinalConfirmation::whereIn('user_id', $allocationUserIds)
            ->when($seasonId, fn ($q) => $q->where('season_id', $seasonId))
            ->get()
            ->keyBy('user_id');

        $mahir = [];
        $mubtadi = [];

        foreach ($allocations as $item) {
            $form = $item->userCompetitionForm;
            $decision = $item->userPreliminaryResult;
            $conf = $confirmations[$item->user_id] ?? null;

            $row = [
                'user_id'                => $item->user_id,
                'user_competition_form_id' => $item->user_competition_form_id,
                'serial'                 => $item->serial,
                'reg_no'                 => $form?->reg_no ?? '',
                'name_en'                => $form?->name_en ?? '',
                'criteria_id'            => $decision?->criteria_id,
                'result_category_id'     => $decision?->result_category_id,
                'confirmation_status'     => $conf?->status ?? null,
                'confirmation_id'        => $conf?->id ?? null,
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
            'season_id' => $seasonId,
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
            'status'      => 'required|integer|in:1,2',
            'criteria_id' => 'nullable|integer|exists:criteria,id',
        ]);

        $record = FinalConfirmation::findOrFail($id);
        $record->status     = $request->input('status');
        $record->criteria_id = $request->input('criteria_id', $record->criteria_id);
        $record->admin_id   = auth('admin-api')->id();
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
