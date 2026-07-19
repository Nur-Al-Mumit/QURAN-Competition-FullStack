<?php

namespace App\Http\Controllers\Api\V1\User;

use App\Http\Controllers\Controller;
use App\Lib\JsonResponse;
use App\Models\Admin;
use App\Models\AttendanceAllocation;
use App\Models\Season;
use App\Models\RegistrationWishlist;
use App\Models\SmsLog;
use App\Models\UserCompetitionForm;
use App\Services\Auth\AuthorizeService;
use App\Services\Dashboard\ProgressStageService;
use App\Services\Registration\RegistrationSlotService;
use App\Services\Registration\ReturningUserService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class RegistrationController extends Controller
{
    protected AuthorizeService $authorizeService;
    protected RegistrationSlotService $slotService;
    protected ReturningUserService $returningUserService;

    public function __construct()
    {
        $provider = 'users';
        $scope = 'phone_verified';

        // Initialize AuthorizeService
        $this->authorizeService = new AuthorizeService($provider, $scope);
        $this->slotService = new RegistrationSlotService();
        $this->returningUserService = new ReturningUserService();

    }

    public function completeRegistration(Request $request)
    {
        $request->validate([
            'phone' => 'required|digits:11|regex:/^01[0-9]{9}$/',
            'email' => 'nullable|email|max:255|unique:users,email',
            'otp' => 'required|string',
            'otp_ref' => 'required|string',
            'competitionForm' => 'required|array',
            'competitionForm.name_bn' => 'required|string|max:255',
            'competitionForm.phone' => 'required|digits:11|regex:/^01[0-9]{9}$/',
        ]);

        try {
            // Always coerce the competition form to a plain array so that
            // submitOrUpdateForm() can safely use null-coalescing on every key
            // regardless of the request shape sent by the client.
            $competitionForm = is_array($request->competitionForm)
                ? $request->competitionForm
                : (array) $request->competitionForm;

            $data = [
                'identity' => $request->phone,
                'password' => $request->otp,
                'phone' => $request->phone,
                'name_bn' => $competitionForm['name_bn'] ?? null,
                'name_en' => $competitionForm['name_en'] ?? null,
                'email' => $competitionForm['email'] ?? null,
                'gender' => $competitionForm['gender'] ?? null,
            ];

            $request->merge([
                'identity' => $request->phone,
            ]);

            $response = $this->authorizeService->authorizeUser($request, $data);

            if ($response instanceof \Illuminate\Http\Response || $response instanceof \Symfony\Component\HttpFoundation\Response) {
                return $response;
            }

            if (is_array($response) && isset($response['authResponse']) && $response['authResponse']) {
                try {
                    $submitForm = $this->submitOrUpdateForm($competitionForm, $response['user']);

                    $response['form'] = $submitForm['form'] ?? null;
                    $response['allocation'] = $submitForm['allocation'] ?? null;

                } catch (\Exception $e) {
                    $response['form'] = null;
                    $response['allocation'] = null;
                    $response['form_error'] = $e->getMessage();
                }

                return JsonResponse::success($response);
            } else {
                $msg = is_array($response) ? ($response['message'] ?? 'Authorization failed.') : 'Authorization failed.';
                throw new \Exception($msg);
            }

        } catch (\Throwable $th) {
            Log::error($th);

            $message = config('app.debug')
                ? $th->getMessage() . ' in ' . $th->getFile() . ':' . $th->getLine()
                : 'Something went wrong during registration. Please try again.';

            return JsonResponse::error($message, 500);
        }
    }

    public function submitOrUpdateForm($competitionForm, $user)
    {
        DB::beginTransaction();

        try {
            $activeSeason = $this->returningUserService->getActiveSeason();
            if (!$activeSeason) {
                throw new \Exception("No active season found.");
            }

            $seasonId = $activeSeason->id;
            $userId = $user->id;

            // Normalize the incoming form payload into a plain array so that
            // every field access below is safe regardless of whether the
            // caller passed a Request instance (ArrayAccess, forgiving) or a
            // raw array (throws "Undefined array key" on missing keys in PHP 8).
            // Using ?? null guarantees we never throw on a missing key — the
            // database columns are all nullable except the truly required ones,
            // which are validated upstream in updateForm() / completeRegistration().
            $form = is_array($competitionForm)
                ? $competitionForm
                : (method_exists($competitionForm, 'all') ? $competitionForm->all() : (array) $competitionForm);

            $name_bn = $form['name_bn'] ?? null;
            $name_en = $form['name_en'] ?? null;
            $dob = $form['dob'] ?? null;
            $phone = $form['phone'] ?? null;
            $address = $form['address'] ?? null;
            $education_background = $form['education_background'] ?? null;
            $school_name = $form['school_name'] ?? null;
            $college_name = $form['college_name'] ?? null;
            $university_name = $form['university_name'] ?? null;
            $madrasah_name = $form['madrasah_name'] ?? null;
            $madrasah_study_details = $form['madrasah_study_details'] ?? null;
            $occupation = $form['occupation'] ?? null;
            $is_recitation = $form['is_recitation'] ?? null;
            $need_training = $form['need_training'] ?? null;

            $formFields = [
                'name_bn' => $name_bn,
                'name_en' => $name_en,
                'dob' => $dob,
                'phone' => $phone,
                'address' => $address,
                'education_background' => $education_background,
                'school_name' => $school_name,
                'college_name' => $college_name,
                'university_name' => $university_name,
                'madrasah_name' => $madrasah_name,
                'madrasah_study_details' => $madrasah_study_details,
                'occupation' => $occupation,
                'is_recitation' => $is_recitation,
                'need_training' => $need_training,
            ];

            // Prefer the active-season form; otherwise reuse the user's latest
            // form from a previous season (returning competitor).
            $existingForm = UserCompetitionForm::where('user_id', $userId)
                ->where('season_id', $seasonId)
                ->first();

            $isReturningSeasonEntry = false;

            if (!$existingForm) {
                $existingForm = UserCompetitionForm::where('user_id', $userId)
                    ->latest()
                    ->first();

                if ($existingForm && (int) $existingForm->season_id !== (int) $seasonId) {
                    $isReturningSeasonEntry = true;

                    if (!$this->returningUserService->isEligibleForNewSeason($user, $activeSeason)) {
                        throw new \Exception(
                            'আন্তরিকভাবে দুঃখিত, এই প্রতিযোগিতায় আপনার নতুন করে নিবন্ধন করার সুযোগ নেই। আমাদের নিয়ম অনুযায়ী, যারা গত প্রতিযোগিতার ফাইনাল পর্বে অংশগ্রহণ করেছিলেন, তারা এবারের প্রতিযোগিতায় অংশ নিতে পারবেন না। আপনার আগ্রহের জন্য অসংখ্য ধন্যবাদ, জাজাকাল্লাহু খাইরান।'
                        );
                    }
                }
            }

            if ($existingForm) {
                // UPDATE EXISTING FORM (same season, or promote previous-season form)
                $updatePayload = $formFields;
                if ($isReturningSeasonEntry) {
                    $updatePayload['season_id'] = $seasonId;
                }

                $existingForm->update($updatePayload);
                $form = $existingForm->fresh();

                $user->update([
                    'name_bn' => $name_bn,
                    'name_en' => $name_en,
                    'season_id' => $seasonId,
                ]);

                // Returning users need a fresh attendance_allocation for the
                // new season; same-season updates reuse the existing one.
                $allocation = AttendanceAllocation::where('user_id', $form->user_id)
                    ->where('season_id', $seasonId)
                    ->first();

                if (!$allocation) {
                    $max = $this->slotService->getMaxRegistrations();
                    $position = $this->slotService->nextPosition();

                    if ($position > $max) {
                        throw new \Exception("Registration is closed. All {$max} seats are already full.");
                    }

                    $allocation = $this->slotService->assignToForm($form, $position);
                }
            } else {
                // CREATE NEW FORM
                $max = $this->slotService->getMaxRegistrations();
                $position = $this->slotService->nextPosition();

                if ($position > $max) {
                    throw new \Exception("Registration is closed. All {$max} seats are already full.");
                }

                do {
                    $randomDigits = rand(100, 999);
                    $regNo = 'RC' . $seasonId . $userId . $randomDigits;
                } while (UserCompetitionForm::where('reg_no', $regNo)->exists());

                $form = UserCompetitionForm::create(array_merge($formFields, [
                    'user_id' => $userId,
                    'season_id' => $seasonId,
                    'reg_no' => $regNo,
                ]));

                $user->update([
                    'name_bn' => $name_bn,
                    'name_en' => $name_en,
                    'season_id' => $seasonId,
                ]);

                // Mark the "competition_registration" progress stage as
                // completed for this user (only when a new form is created,
                // not on every update).
                (new ProgressStageService())->markCompleted($userId, 'competition_registration');

                // Assign exam time + group immediately at registration time
                $allocation = $this->slotService->assignToForm($form, $position);
            }

            DB::commit();

            return [
                'form' => $form,
                'allocation' => $allocation,
            ];
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function getRegistrationForm()
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return JsonResponse::error('User not authenticated', 401);
            }

            $activeSeason = Season::where('is_active', 1)->latest()->first();

            // Prefer the active season's form; fall back to the user's most
            // recent form in any season so returning users still see their
            // registration card instead of a 404.
            $form = null;
            if ($activeSeason) {
                $form = UserCompetitionForm::where('user_id', $user->id)
                    ->where('season_id', $activeSeason->id)
                    ->latest()
                    ->first();
            }
            if (!$form) {
                $form = UserCompetitionForm::where('user_id', $user->id)
                    ->latest()
                    ->first();
            }

            if (!$form) {
                return JsonResponse::error('Registration form not found', 404);
            }

            $allocation = null;
            if ($activeSeason) {
                $allocation = AttendanceAllocation::where('user_competition_form_id', $form->id)
                    ->where('season_id', $activeSeason->id)
                    ->first();
            }
            if (!$allocation) {
                $allocation = AttendanceAllocation::where('user_competition_form_id', $form->id)
                    ->latest()
                    ->first();
            }

            return JsonResponse::success([
                'form' => $form,
                'allocation' => $allocation,
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Mark the "Registration Token Downloaded" progress stage as completed
     * for the authenticated user. Called by the frontend once the user
     * downloads / views their registration card.
     */
    public function markTokenDownloaded()
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return JsonResponse::error('User not authenticated', 401);
            }

            (new ProgressStageService())->markCompleted($user->id, 'token_downloaded');

            return JsonResponse::success(['message' => 'Token download recorded']);
        } catch (\Throwable $th) {
            return JsonResponse::error($th->getMessage(), 500);
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
            // Allow updating the active-season form OR a previous-season form
            // that a returning user is about to promote into the new season.
            $form = UserCompetitionForm::where('user_id', $user->id)
                ->where('reg_no', $request->reg_no)
                ->first();

            if (!$form) {
                return JsonResponse::error('Registration form not found', 404);
            }

            if ((int) $form->season_id !== (int) $season_id) {
                $returning = $this->returningUserService;
                if (!$returning->isEligibleForNewSeason($user)) {
                    return JsonResponse::error(
                        'দুঃখিত, এই প্রতিযোগিতায় আপনার অংশগ্রহণের করার সুযোগ নেই',
                        403,
                        [403]
                    );
                }
            }
        }

        $res = $this->submitOrUpdateForm($request, $user);

        return JsonResponse::success($res);
    }

    public function getRegistrationCount()
    {
        try {
            $count = $this->slotService->activeSeasonForms()->count();
            $max = $this->slotService->getMaxRegistrations();

            return JsonResponse::success([
                'registration_count' => $count,
                'max_registrations' => $max,
                'remaining' => max(0, $max - $count),
                'is_full' => $count >= $max,
            ]);
        } catch (\Throwable $th) {
            return JsonResponse::error($th->getMessage());
        }
    }

    public function storeWishlist(Request $request)
    {
        $request->validate([
            'phone' => 'required|digits:11|regex:/^01[0-9]{9}$/',
            'name' => 'nullable|string|max:255',
        ]);

        try {
            $wishlist = RegistrationWishlist::firstOrCreate(
                ['phone' => $request->phone],
                ['name' => $request->name]
            );

            return JsonResponse::success(
                ['wishlist' => $wishlist],
                'You have been added to the waitlist. We will inform you about the next season, In sha Allah.'
            );
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
            $message = "আসসালামু আলাইকুম।\nজনাব {$name_bn}, বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা - ১৪৪৮ হিজরির প্রাথমিক বাছাই পর্বে অংশগ্রহণের জন্য আপনার রেজিস্ট্রেশন নম্বর: {$reg_no}. পরীক্ষার তারিখ ও সময়: ২ আগস্ট ২০২৫, {$exam_time} পর্যন্ত। সিরিয়াল নম্বর: {$serial}, স্থান: আত-তাক্বওয়া মাসজিদ এন্ড ইসলামিক সেন্টার, কুমারপাড়া, সিলেট। অনুগ্রহ করে নির্ধারিত সময়ের পূর্বে উপস্থিত থাকবেন জাযাকাল্লাহু খইরন।\n\n— বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা টিম";

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
