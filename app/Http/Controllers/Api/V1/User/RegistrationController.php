<?php

namespace App\Http\Controllers\Api\V1\User;

use App\Http\Controllers\Controller;
use App\Lib\JsonResponse;
use App\Models\Season;
use App\Models\UserCompetitionForm;
use App\Models\userSeason;
use App\Services\Auth\AuthorizeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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

            if (is_array($response) && $response['authResponse']) {
                try {
                    $submitForm = $this->submitOrUpdateForm($competitionForm, $response['user']);

                    $response['form'] = $submitForm ?? null;

                } catch (\Exception $e) {
                    $response['form'] = null;
                    $response['form_error'] = $e->getMessage();
                }

                return JsonResponse::success($response);
            } elseif ($response instanceof \Illuminate\Http\JsonResponse) {
                return JsonResponse::success($response);
            } else {
                return JsonResponse::error('Unexpected response from authorization');
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
            $count = UserCompetitionForm::count();
            return JsonResponse::success(['registration_count' => $count]);
        } catch (\Throwable $th) {
            return JsonResponse::error($th->getMessage());
        }
    }
}
