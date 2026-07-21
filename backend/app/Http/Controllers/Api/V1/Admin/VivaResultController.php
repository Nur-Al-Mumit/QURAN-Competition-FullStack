<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Lib\JsonResponse;
use App\Models\Admin;
use App\Models\AttendanceAllocation;
use App\Models\ResultCategory;
use App\Models\Season;
use App\Models\TimelineEvent;
use App\Models\UserAttendance;
use App\Models\UserPreliminaryResult;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VivaResultController extends Controller
{
    /**
     * List all seasons + the active season id, for the season filter.
     * Mirrors DashboardController::getSeasons().
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
     * Full dynamic payload for the submit-viva-result page:
     *  - exam_day: timeline_events row (phase = exam_day) for the season
     *    → single source of truth for exam-day date / start / end time
     *  - result_categories: options for the Decision dropdown
     *  - examiners: active assigned_role=3 admins, tagged A/B/C... by order
     *  - groups: attendance_allocations grouped by examiner, with the
     *    student's current preliminary decision eager-loaded
     */
    public function data(Request $request)
    {
        $request->validate([
            'season_id' => 'nullable|integer|exists:seasons,id',
        ]);

        $seasonId = $request->filled('season_id')
            ? (int) $request->input('season_id')
            : (Season::where('is_active', 1)->latest()->value('id') ?? null);

        // Exam-day event (single source of truth for date/time).
        $examDay = null;
        if ($seasonId) {
            $event = TimelineEvent::where('season_id', $seasonId)
                ->where('phase', 'exam_day')
                ->latest()
                ->first();
            if ($event) {
                $examDay = [
                    'title'       => $event->title,
                    'start_date'  => $event->start_date,
                    'end_date'    => $event->end_date,
                    'description' => $event->description,
                ];
            }
        }

        // Decision dropdown options.
        $resultCategories = ResultCategory::orderBy('id')
            ->get(['id', 'name']);

        // Active examiners list (informational; cover lettering comes from
        // the canonical attendance_allocations.group column, not from here).
        $examiners = Admin::where('assigned_role', 3)
            ->where('is_active', 1)
            ->orderBy('id')
            ->get(['id', 'name', 'phone'])
            ->values();

        // Attendance allocations + current decision for the season.
        $query = AttendanceAllocation::with([
            'admin:id,name,phone',
            'userCompetitionForm:id,reg_no,name_en,phone,need_training,education_background',
            'userPreliminaryResult:result_category_id,comment,attendance_allocation_id',
        ]);

        if ($seasonId) {
            $query->where('season_id', $seasonId);
        }

        $allocations = $query->get();

        // Resolve the canonical group letter for every allocation. The
        // `group` column is preferred, but historical rows can have a
        // null/stale group when the active examiner set changed after
        // allocation — so we fall back to the serial prefix (e.g. the
        // "B" in "B-02"), which is always set and consistent. Anything
        // still unresolved is bucketed under "?".
        $letterOf = function ($item) {
            $g = trim((string) ($item->group ?? ''));
            if ($g !== '') {
                return strtoupper(substr($g, 0, 1));
            }
            if (preg_match('/^\s*([A-Za-z])/', (string) $item->serial, $m)) {
                return strtoupper($m[1]);
            }
            return '?';
        };

        // Re-key allocations by resolved letter so the cover order is
        // always A, B, C, ... regardless of data drift. Plain array used
        // for accumulation to avoid Collection's offsetGet notice when a
        // letter key is encountered for the first time.
        $byLetter = [];
        foreach ($allocations as $item) {
            $byLetter[$letterOf($item)][] = $item;
        }
        ksort($byLetter);

        // If no explicit exam-day event is configured, derive the cover
        // date / time range from the allocations themselves so the cover
        // is never empty.
        $derivedDate = null;
        $derivedStart = null;
        $derivedEnd = null;
        foreach ($allocations as $item) {
            if (!$item->exam_time) {
                continue;
            }
            $parts = array_map('trim', explode('-', $item->exam_time));
            if (count($parts) === 2) {
                $derivedStart = $derivedStart ?? $parts[0];
                $derivedEnd = $parts[1];
            }
            if (!$derivedDate) {
                $derivedDate = $item->created_at?->toDateString();
            }
        }

        $groups = [];

        // Load exam-day attendance for every student in this season in one
        // query, keyed by user_id, so each result row can show the status
        // captured on exam day (Present / Absent / Late). This is the
        // single source of truth — the viva page reads it, never writes it.
        $userIds = $allocations->pluck('user_id')->unique()->all();
        $attendanceByUser = [];
        if ($userIds) {
            $attendanceByUser = UserAttendance::whereIn('user_id', $userIds)
                ->when($seasonId, fn ($q) => $q->where('season_id', $seasonId))
                ->get()
                ->keyBy('user_id');
        }

        foreach ($byLetter as $groupLetter => $items) {
            $first = collect($items)->first();
            $admin = $first->admin;

            $students = collect($items)
                ->sortBy(function ($item) {
                    if (preg_match('/(\d+)\s*$/', (string) $item->serial, $m)) {
                        return (int) $m[1];
                    }
                    return (string) $item->serial;
                })
                ->map(function ($item) use ($attendanceByUser) {
                    $form = $item->userCompetitionForm;
                    $decision = $item->userPreliminaryResult;
                    $attendance = $attendanceByUser[$item->user_id] ?? null;
                    $attendanceStatus = $attendance?->attendance_status;

                    return [
                        'serial'                  => $item->serial,
                        'reg_no'                  => $form->reg_no ?? '',
                        'name_en'                 => $form->name_en ?? '',
                        'need_training'           => $form && $form->need_training ? 'Yes' : 'No',
                        'education_background'    => $this->getEducationType($form->education_background ?? null),
                        'phone'                   => $form->phone ?? '',
                        'exam_time'               => $item->exam_time,
                        'user_id'                 => $item->user_id,
                        'user_competition_form_id' => $item->user_competition_form_id,
                        'attendance_allocation_id' => $item->id,
                        'attendance_status'       => $attendanceStatus,
                        'attendance_label'        => $this->getAttendanceLabel($attendanceStatus),
                        'result_category_id'      => $decision?->result_category_id,
                        'comment'                 => $decision?->comment,
                    ];
                })->values();

            $groups[] = [
                'examiner' => [
                    'id'          => $admin?->id,
                    // Trim stray whitespace/newlines sometimes present in names.
                    'name'        => $admin ? trim(preg_replace('/\s+/', ' ', $admin->name)) : null,
                    'phone'       => $admin?->phone,
                    'room_number' => $first->room_number,
                    // Canonical letter, resolved from group/serial.
                    'letter'      => $groupLetter,
                ],
                'students' => $students,
            ];
        }

        // Normalise exam_day: prefer the timeline_events row; otherwise
        // synthesise one from the allocations so the cover is never empty.
        if (!$examDay) {
            $examDay = [
                'title'      => null,
                'start_date' => $derivedStart ? ($derivedDate . ' ' . $derivedStart) : null,
                'end_date'   => $derivedEnd ? ($derivedDate . ' ' . $derivedEnd) : null,
                'description'=> null,
            ];
            if (!$derivedStart && !$derivedEnd) {
                $examDay = null;
            }
        }

        return JsonResponse::success([
            'season_id'         => $seasonId,
            'exam_day'          => $examDay,
            'result_categories' => $resultCategories,
            'examiners'         => $examiners,
            'groups'            => $groups,
        ]);
    }

    /**
     * Auto-save (upsert) a single student's viva decision.
     * No Save button on the client — every dropdown change calls this.
     */
    public function storeDecision(Request $request)
    {
        $data = $request->validate([
            'user_id'                  => 'required|integer|exists:users,id',
            'user_competition_form_id' => 'required|integer|exists:user_competition_forms,id',
            'season_id'                => 'required|integer|exists:seasons,id',
            'attendance_allocation_id' => 'nullable|integer|exists:attendance_allocations,id',
            'result_category_id'       => 'nullable|integer|exists:result_categories,id',
            'comment'                  => 'nullable|string',
        ]);

        $admin = Auth::guard('admin-api')->user();

        // Pull the exam-day attendance_status (from user_attendances, the
        // single source of truth) so the result row stays self-consistent.
        $attendanceStatus = UserAttendance::where('user_id', $data['user_id'])
            ->where('season_id', $data['season_id'])
            ->value('attendance_status');

        $row = UserPreliminaryResult::updateOrCreate(
            [
                'user_id'   => $data['user_id'],
                'season_id' => $data['season_id'],
            ],
            [
                'user_competition_form_id' => $data['user_competition_form_id'],
                'attendance_allocation_id' => $data['attendance_allocation_id'] ?? null,
                'result_category_id'       => $data['result_category_id'] ?? null,
                'comment'                  => $data['comment'] ?? null,
                'attendance_status'        => $attendanceStatus ?? 5,
                'examiner_id'              => $admin?->id,
            ]
        );

        return JsonResponse::success([
            'id'                 => $row->id,
            'result_category_id' => $row->result_category_id,
            'comment'            => $row->comment,
            'attendance_status'  => $row->attendance_status,
            'attendance_label'   => $this->getAttendanceLabel($row->attendance_status),
            'examiner_id'        => $row->examiner_id,
        ], 'Decision saved');
    }

    private function getEducationType($value)
    {
        switch ($value) {
            case 1:
                return 'General';
            case 2:
                return 'Madrasah';
            case 3:
                return 'Both';
            default:
                return 'N/A';
        }
    }

    private function getAttendanceLabel($value)
    {
        switch ((int) $value) {
            case 1:
                return 'Present';
            case 2:
                return 'Absent';
            case 3:
                return 'Late';
            default:
                return '—';
        }
    }
}
