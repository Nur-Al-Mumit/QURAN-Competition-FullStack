<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Lib\JsonResponse;
use App\Models\AttendanceAllocation;
use App\Models\UserAttendance;
use App\Models\UserCompetitionForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VolunteerController extends Controller
{
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

        $user->load('userCompetitionForm');

        return JsonResponse::success($user);
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

        try {
            $attendance = UserAttendance::updateOrCreate(
                [
                    'user_id' => $form->user_id,
                    'user_competition_form_id' => $form->id,
                    'season_id' => $form->season_id,
                ],
                [
                    'attendance_status' => $request->input('attendance_status'),
                    'updated_by' => $admin->id,
                ]
            );

            return JsonResponse::success(data: $attendance);

        } catch (\Throwable $th) {
            return JsonResponse::error($th->getMessage());
        }

    }
}
