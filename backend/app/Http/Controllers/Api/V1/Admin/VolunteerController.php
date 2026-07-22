<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Lib\JsonResponse;
use App\Models\AttendanceAllocation;
use App\Models\Season;
use App\Models\User;
use App\Models\UserAttendance;
use App\Models\UserCompetitionForm;
use App\Models\UserTrainingAttendance;
use App\Services\Registration\ReturningUserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VolunteerController extends Controller
{
    protected ReturningUserService $returningUserService;

    public function __construct(ReturningUserService $returningUserService){
        $this->returningUserService = $returningUserService;
    }

    public function verifyRegistration(Request $request)
    {
        $validate = $request->validate([
            'reg_no' => 'required',
        ]);

        $admin = Auth::guard('admin-api')->user();
        if (!$admin) {
            return JsonResponse::error('Unauthorized', 401);
        }

        $formId = UserCompetitionForm::where('reg_no', $validate['reg_no'])
            ->where('is_active', 1)
            ->value('id');

        if (!$formId) {
            return JsonResponse::error('Registration not found', 404);
        }

        $user = AttendanceAllocation::where('user_competition_form_id', $formId)
            ->first();

        if (!$user) {
            return JsonResponse::error('Allocation not found', 404);
        }

        $user->load('userCompetitionForm');

        // Include the participant's current attendance record (if any) so the
        // volunteer can see whether attendance was already taken — this avoids
        // confusion when a QR code is scanned more than once.
        $currentAttendance = UserAttendance::where('user_id', $user->user_id)
            ->where('user_competition_form_id', $user->user_competition_form_id)
            ->where('season_id', $user->season_id)
            ->orderByDesc('updated_at')
            ->first();

        return JsonResponse::success([
            'allocation' => $user,
            'current_attendance' => $currentAttendance,
        ]);
    }

    public function submitUserAttendance(Request $request)
    {
        $validate = $request->validate([
            'form_id' => 'required',
            'attendance_status' => 'required',
        ]);

        $admin = Auth::guard('admin-api')->user();
        if (!$admin) {
            return JsonResponse::error('Unauthorized', 401);
        }

        $form = UserCompetitionForm::where('id', $validate['form_id'])
            ->where('is_active', 1)
            ->first();

        if (!$form) {
            return JsonResponse::error('Registration not found', 404);
        }

        // Resolve the attendance allocation (room/serial/exam time) this record
        // belongs to, so we can link the attendance to it.
        $allocation = AttendanceAllocation::where('user_competition_form_id', $form->id)->first();

        try {
            $attendance = UserAttendance::updateOrCreate(
                [
                    'user_id' => $form->user_id,
                    'user_competition_form_id' => $form->id,
                    'season_id' => $form->season_id,
                ],
                [
                    'attendance_allocation_id' => $allocation?->id,
                    'attendance_status' => $request->input('attendance_status'),
                    'updated_by' => $admin->id,
                ]
            );

            return JsonResponse::success(data: $attendance);

        } catch (\Throwable $th) {
            return JsonResponse::error($th->getMessage());
        }

    }

    /**
     * Look up a participant by registration code for the training-attendance
     * flow. Unlike verifyRegistration(), training attendance has no allocation,
     * so participant details are sourced from the form + user. Also returns the
     * participant's current training attendance for today so the volunteer can
     * see whether attendance was already taken — avoids confusion on re-scan.
     */
    public function verifyTrainingRegistration(Request $request)
    {
        $validate = $request->validate([
            'reg_no' => 'required',
        ]);

        $admin = Auth::guard('admin-api')->user();
        if (!$admin) {
            return JsonResponse::error('Unauthorized', 401);
        }

        $form = UserCompetitionForm::where('reg_no', $validate['reg_no'])
            ->where('is_active', 1)
            ->first();

        if (!$form) {
            return JsonResponse::error('Registration not found', 404);
        }

        $form->load('user');

        $currentAttendance = UserTrainingAttendance::where('user_id', $form->user_id)
            ->whereDate('date', today())
            ->latest()
            ->first();

        return JsonResponse::success([
            'participant' => $form,
            'current_attendance' => $currentAttendance,
        ]);
    }

    /**
     * Record training attendance for a participant for today. Uses
     * updateOrCreate on (user_id, date) so a re-scan of the same QR on the
     * same day updates the row instead of throwing on the unique constraint.
     * NOTE: the older submitTrainingAttendanceLegacy() route below is kept for
     * backward compatibility with the ReturningUserService-based flow.
     */
    public function submitTrainingAttendance(Request $request)
    {
        $validate = $request->validate([
            'user_id' => 'required|exists:users,id',
            'attendance_status' => 'required|in:1,2,3',
        ]);

        $admin = Auth::guard('admin-api')->user();
        if (!$admin) {
            return JsonResponse::error('Unauthorized', 401);
        }

        $user = User::find($validate['user_id']);
        if (!$user) {
            return JsonResponse::error('User not found', 404);
        }

        // Prefer the currently active season; fall back to the user's own
        // season_id when no season is marked active.
        $seasonId = Season::where('is_active', 1)->latest()->value('id')
            ?? $user->season_id;

        try {
            $attendance = UserTrainingAttendance::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'date' => today(),
                ],
                [
                    'season_id' => $seasonId,
                    'attendance_status' => (int) $validate['attendance_status'],
                    'updated_by' => $admin->id,
                ]
            );

            return JsonResponse::success(data: $attendance);
        } catch (\Throwable $th) {
            return JsonResponse::error($th->getMessage());
        }
    }

    /**
     * Legacy training-attendance endpoint. Uses ReturningUserService which
     * advances the user's season_id and is relied on by eligibility logic.
     * Kept for backward compatibility.
     */
    public function submitTrainingAttendanceLegacy(Request $request)
    {
        $validate = $request->validate([
            'reg_no' => 'required',
            'attendance_status' => 'required|in:1,2,3',
        ]);

        $admin = Auth::guard('admin-api')->user();
        if (!$admin) {
            return JsonResponse::error('Unauthorized', 401);
        }

        $user = User::whereHas('form', function ($query) use ($validate) {
            $query->where('reg_no', $validate['reg_no']);
        })->first();

        if (!$user) {
            return JsonResponse::error('User not found', 404);
        }

        try {
            $attendance = $this->returningUserService->recordTrainingAttendance(
                $user,
                $user->season_id,
                (int) $request->input('attendance_status'),
                $admin->id
            );

            return JsonResponse::success($attendance);
        } catch (\Throwable $th) {
            return JsonResponse::error($th->getMessage());
        }
    }

}
