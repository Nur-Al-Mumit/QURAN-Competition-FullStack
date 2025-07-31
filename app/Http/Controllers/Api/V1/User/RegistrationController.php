<?php

namespace App\Http\Controllers\Api\V1\User;

use App\Http\Controllers\Controller;
use App\Lib\JsonResponse;
use App\Models\Admin;
use App\Models\AttendanceAllocation;
use App\Models\Season;
use App\Models\SmsLog;
use App\Models\UserCompetitionForm;
use App\Models\userSeason;
use App\Services\Auth\AuthorizeService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class RegistrationController extends Controller
{
    protected AuthorizeService $authorizeService;

    public function __construct()
    {
        $provider = 'users';
        $scope = 'phone_verified';

        // Initialize AuthorizeService
        $this->authorizeService = new AuthorizeService($provider, $scope);

    }

    public function completeRegistration(Request $request)
    {
        return;
        $request->validate([
            'phone' => 'required|digits:11|regex:/^01[0-9]{9}$/',
            'otp' => 'required|string',
            'otp_ref' => 'required|string',
        ]);

        try {
            // $competitionForm = json_decode($request->competitionForm);
            $competitionForm = $request->competitionForm;

            $data = [
                'identity' => $request->phone,
                'password' => $request->otp,
                'phone' => $request->phone,
                'name_bn' => $competitionForm['name_bn'],
                'name_en' => $competitionForm['name_en'],
                'email' => $competitionForm['email'],
                'gender' => $competitionForm['gender'],
            ];

            $request->merge([
                'identity' => $request->phone,
            ]);

            $response = $this->authorizeService->authorizeUser($request, $data);

            if (is_array($response) && isset($response['authResponse']) && $response['authResponse']) {
                try {
                    $submitForm = $this->submitOrUpdateForm($competitionForm, $response['user']);

                    $response['form'] = $submitForm ?? null;

                } catch (\Exception $e) {
                    $response['form'] = null;
                    $response['form_error'] = $e->getMessage();
                }

                return JsonResponse::success($response);
            } else {
                throw new \Exception($response['message']);
            }

        } catch (\Throwable $th) {
            return JsonResponse::error($th);
        }
    }

    public function submitOrUpdateForm($competitionForm, $user)
    {
        DB::beginTransaction();

        try {
            $userSeason = userSeason::where('user_id', $user->id)->latest()->first();

            if (!$userSeason) {
                throw new \Exception("User season record not found.");
            }

            $seasonId = $userSeason->season_id;
            $userId = $user->id;

            // Check if form already exists
            $form = UserCompetitionForm::where('user_id', $userId)
                ->where('season_id', $seasonId)
                ->first();

            if ($form) {
                // UPDATE EXISTING FORM
                $form->update([
                    'name_bn' => $competitionForm['name_bn'],
                    'name_en' => $competitionForm['name_en'],
                    'dob' => $competitionForm['dob'],
                    'phone' => $competitionForm['phone'],
                    'address' => $competitionForm['address'],
                    'education_background' => $competitionForm['education_background'],
                    'school_name' => $competitionForm['school_name'],
                    'college_name' => $competitionForm['college_name'],
                    'university_name' => $competitionForm['university_name'],
                    'madrasah_name' => $competitionForm['madrasah_name'],
                    'madrasah_study_details' => $competitionForm['madrasah_study_details'],
                    'occupation' => $competitionForm['occupation'],
                    'is_recitation' => $competitionForm['is_recitation'],
                    'need_training' => $competitionForm['need_training'],
                ]);

                $user->update([
                    'name_bn' => $competitionForm['name_bn'],
                    'name_en' => $competitionForm['name_en'],
                ]);
            } else {
                // CREATE NEW FORM
                do {
                    $randomDigits = rand(100, 999);
                    $regNo = 'RC' . $seasonId . $userId . $randomDigits;
                } while (UserCompetitionForm::where('reg_no', $regNo)->exists());

                $form = UserCompetitionForm::create([
                    'user_id' => $userId,
                    'season_id' => $seasonId,
                    'reg_no' => $regNo,

                    'name_bn' => $competitionForm['name_bn'],
                    'name_en' => $competitionForm['name_en'],
                    'dob' => $competitionForm['dob'],
                    'phone' => $competitionForm['phone'],
                    'address' => $competitionForm['address'],
                    'education_background' => $competitionForm['education_background'],
                    'school_name' => $competitionForm['school_name'],
                    'college_name' => $competitionForm['college_name'],
                    'university_name' => $competitionForm['university_name'],
                    'madrasah_name' => $competitionForm['madrasah_name'],
                    'madrasah_study_details' => $competitionForm['madrasah_study_details'],
                    'occupation' => $competitionForm['occupation'],
                    'is_recitation' => $competitionForm['is_recitation'],
                    'need_training' => $competitionForm['need_training'],
                ]);
            }

            DB::commit();

            return $form;
        } catch (\Throwable $th) {
            DB::rollBack();
            return JsonResponse::error($th->getMessage());
        }
    }

    public function getRegistrationForm()
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return JsonResponse::error('User not authenticated', 401);
            }


            $season_id = Season::where('is_active', 1)->latest()->first()->id;

            $form = UserCompetitionForm::where('user_id', $user->id)
                ->where('season_id', $season_id)
                ->first();

            if (!$form) {
                return JsonResponse::error('Registration form not found', 404);
            }

            return JsonResponse::success([
                'form' => $form
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function updateForm(Request $request)
    {
        $request->validate([
            'name_bn' => 'required|string|max:255',
            'dob' => 'required|date',
            'phone' => 'required|digits:11|regex:/^01[0-9]{9}$/',
            'address' => 'required|string|max:255',
            'education_background' => 'required',
            'school_name' => 'nullable|string|max:255',
            'college_name' => 'nullable|string|max:255',
            'university_name' => 'nullable|string|max:255',
            'madrasah_name' => 'nullable|string|max:255',
            'madrasah_study_details' => 'nullable|string|max:500',
            'occupation' => 'required|string|max:255',
        ]);

        $user = Auth::user();
        if (!$user) {
            return JsonResponse::error('User not authenticated', 401);
        }

        $season_id = Season::where('is_active', 1)->latest()->first()->id;


        if ($request->reg_no) {
            $form = UserCompetitionForm::where('user_id', $user->id)
                ->where('season_id', $season_id)
                ->where('reg_no', $request->reg_no)
                ->first();

            if (!$form) {
                return JsonResponse::error('Registration form not found', 404);
            }
        }

        $res = $this->submitOrUpdateForm($request, $user);

        return JsonResponse::success($res);
    }

    public function getRegistrationCount()
    {
        try {
            $count = UserCompetitionForm::where('is_active', 1)->count();
            return JsonResponse::success(['registration_count' => $count]);
        } catch (\Throwable $th) {
            return JsonResponse::error($th->getMessage());
        }
    }

    public function getRegistrationForms()
    {
        try {
            $count = UserCompetitionForm::paginate(20);
            return JsonResponse::success(['registration_count' => $count]);
        } catch (\Throwable $th) {
            return JsonResponse::error($th->getMessage());
        }
    }

    public function getAttendanceSheet()
    {
        $examiners = Admin::where('assigned_role', 3)
            ->where('is_active', operator: 1)
            ->get()
            ->values();

        $students = UserCompetitionForm::where('is_active', 1)
            ->get()
            ->sortBy(function ($student) {
                [$start, $end] = explode('-', $student->exam_time);
                $startTime = Carbon::parse(trim($start));

                if (
                    $startTime->between(
                        Carbon::createFromTime(13, 30),
                        Carbon::createFromTime(14, 59)
                    )
                ) {
                    return '2-' . $startTime->timestamp;
                }
                return '1-' . $startTime->timestamp;
            })
            ->values();


        $data = [];
        $serialCounters = [];
        $examinerIndex = 0;

        foreach ($students as $student) {
            $examiner = $examiners[$examinerIndex];

            // Initialize examiner group
            if (!isset($data[$examiner->id])) {
                $data[$examiner->id] = [
                    'examiner' => [
                        'id' => $examiner->id,
                        'name' => $examiner->name,
                        'phone' => $examiner->phone,
                    ],
                    'students' => []
                ];
                $serialCounters[$examiner->id] = 1;
            }

            // Add student to examiner's list
            $data[$examiner->id]['students'][] = [
                'serial' => $serialCounters[$examiner->id]++,
                'reg_no' => $student->reg_no,
                // 'name_bn' => $student->name_bn,
                'name_en' => $student->name_en,
                'phone' => $student->phone,
                'need_training' => $student->need_training ? 'Yes' : 'No',
                'education_background' => $this->getEducationType($student->education_background),
                'exam_time' => $student->exam_time,
                'comment' => ''
            ];

            // Move to next examiner
            $examinerIndex = ($examinerIndex + 1) % $examiners->count();
        }

        return JsonResponse::success($data);
    }

    public function getAttendanceAllocation()
    {
        $seasonId = 1;

        // Attendance allocation গুলো examiner অনুযায়ী group করে load করা
        $allocations = AttendanceAllocation::with('admin', 'userCompetitionForm')
            ->where('season_id', $seasonId)
            ->get()
            ->groupBy('admin_id');

        $data = [];

        foreach ($allocations as $adminId => $items) {
            $admin = $items->first()->admin;

            $students = $items->map(function ($item) {
                return [
                    'serial' => $item->serial,
                    'reg_no' => $item->userCompetitionForm->reg_no ?? '',
                    'name_en' => $item->userCompetitionForm->name_en ?? '',
                    'need_training' => $item->userCompetitionForm->need_training ? 'Yes' : 'No',
                    'education_background' => $this->getEducationType($item->userCompetitionForm->education_background),
                    'phone' => $item->userCompetitionForm->phone ?? '',
                    'exam_time' => $item->exam_time,
                ];
            })->values();

            $data[] = [
                'examiner' => [
                    'id' => $admin->id,
                    'name' => $admin->name,
                    'phone' => $admin->phone,
                    'room_number' => $items->first()->room_number,
                ],
                'students' => $students,
            ];
        }

        return JsonResponse::success($data);
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


    public function sendSmsToParticipants()
    {
        $allocations = AttendanceAllocation::with('userCompetitionForm')->where('is_sms_sent', null)->get();

        // return $allocations;
        foreach ($allocations as $allocation) {
            $name_bn = $allocation->userCompetitionForm->name_bn;
            $reg_no = $allocation->userCompetitionForm->reg_no;
            $phone = $allocation->userCompetitionForm->phone;
            $exam_time = $allocation->exam_time;
            $serial = $allocation->serial;
            $room = $allocation->room_number;

            // SMS body
            $message = "আসসালামু আলাইকুম।\nজনাব {$name_bn}, বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা - ১৪৪৭ হিজরির প্রাথমিক বাছাই পর্বে অংশগ্রহণের জন্য আপনার রেজিস্ট্রেশন নম্বর: {$reg_no}. পরীক্ষার তারিখ ও সময়: ২ আগস্ট ২০২৫, {$exam_time} পর্যন্ত। সিরিয়াল নম্বর: {$serial}, স্থান: আত-তাক্বওয়া মাসজিদ এন্ড ইসলামিক সেন্টার, কুমারপাড়া, সিলেট। অনুগ্রহ করে নির্ধারিত সময়ের পূর্বে উপস্থিত থাকবেন জাযাকাল্লাহু খইরন।\n\n— বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা টিম";

            $smsResult = $this->sendSms($phone, $message);

            if ($smsResult) {
                $allocation->update(['is_sms_sent' => 1]);
            }
        }
    }

    private function sendSms($phone, $message)
    {

        // \Log::info("Sending SMS to {$phone}: {$message}");
        try {
            $response = Http::get('http://api.boom-cast.com/boomcast/WebFramework/boomCastWebService/externalApiSendTextMessage.php', [
                'masking' => 'NOMASK',
                'userName' => 'quranlessons.org',
                'password' => '08f246b1c6c11d739954f0dce3e601a5',
                'MsgType' => 'TEXT',
                'receiver' => $phone,
                'message' => $message,
            ]);

            // Log SMS attempt
            SmsLog::create([
                'phone' => $phone,
                'message' => $message,
                'response' => json_encode($response->json()),
                'status' => $response->successful() ? 'success' : 'failed',
                'reason' => 'Send SMS to inform viva information',
                'sender_id' => 1,
            ]);

            if (!$response->successful()) {
                throw new \Exception("BoomCast API failed: " . $response->body());
            }

            return true;
        } catch (\Exception $e) {
            throw new \Exception("Couldn't send the viva information, Please try again. Error: " . $e->getMessage());
        }
    }
}
