<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Lib\JsonResponse;
use App\Models\Admin;
use App\Models\AttendanceAllocation;
use App\Models\ResultCategory;
use App\Models\Season;
use App\Models\TimelineEvent;
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

        // Active examiners in deterministic order, each tagged with a
        // serial letter (A, B, C, ...) by position.
        $examiners = Admin::where('assigned_role', 3)
            ->where('is_active', 1)
            ->orderBy('id')
            ->get(['id', 'name', 'phone'])
            ->values()
            ->map(function ($admin, $index) {
                return [
                    'id'     => $admin->id,
                    'name'   => $admin->name,
                    'phone'  => $admin->phone,
                    'letter' => chr(65 + $index), // A, B, C, ...
                ];
            });

        // Map admin_id => letter for quick lookup when building groups.
        $letterByAdminId = $examiners->pluck('letter', 'id');

        // Attendance allocations + current decision for the season.
        $query = AttendanceAllocation::with([
            'admin:id,name,phone',
            'userCompetitionForm:id,reg_no,name_en,phone,need_training,education_background',
            'userPreliminaryResult:result_category_id,comment,attendance_allocation_id',
        ]);

        if ($seasonId) {
            $query->where('season_id', $seasonId);
        }

        $allocations = $query->get()->groupBy('admin_id');

        $groups = [];
        foreach ($allocations as $adminId => $items) {
            $admin = $items->first()->admin;

            $students = $items->map(function ($item) {
                $form = $item->userCompetitionForm;
                $decision = $item->userPreliminaryResult;

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
                    'result_category_id'      => $decision?->result_category_id,
                    'comment'                 => $decision?->comment,
                ];
            })->values();

            $groups[] = [
                'examiner' => [
                    'id'          => $admin->id,
                    'name'        => $admin->name,
                    'phone'       => $admin->phone,
                    'room_number' => $items->first()->room_number,
                    'letter'      => $letterByAdminId[$admin->id] ?? null,
                ],
                'students' => $students,
            ];
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
                'examiner_id'              => $admin?->id,
            ]
        );

        return JsonResponse::success([
            'id'                 => $row->id,
            'result_category_id' => $row->result_category_id,
            'comment'            => $row->comment,
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
}
