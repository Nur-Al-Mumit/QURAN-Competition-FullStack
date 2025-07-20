<?php

namespace App\Http\Controllers\Api\V1\User;

use App\Http\Controllers\Controller;
use App\Lib\JsonResponse;
use App\Models\UserCompetitionForm;
use App\Models\userSeason;
use App\Services\Auth\AuthorizeService;
use Illuminate\Http\Request;
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
            // return $response;

            if ($response['authResponse']) {
                $submitForm = $this->submitForm($competitionForm, $response['user']);

                if ($submitForm) {
                    $response['form'] = $submitForm;
                }

                return JsonResponse::success(
                    $response
                );
            }

        } catch (\Throwable $th) {
            return JsonResponse::error($th);
        }
    }

    public function submitForm($competitionForm, $user)
    {
        DB::beginTransaction();

        try {
            $userSeason = userSeason::where('user_id', $user->id)->latest()->first();

            if (!$userSeason) {
                throw new \Exception("User season record not found.");
            }

            $seasonId = $userSeason->season_id;
            $userId = $user->id;

            // Prevent duplicate entry
            if (UserCompetitionForm::where('user_id', $userId)->where('season_id', $seasonId)->exists()) {
                throw new \Exception("You have already submitted the form for this season.");
            }

            // Generate unique registration number
            do {
                $randomDigits = rand(100, 999);
                $regNo = 'RC' . $seasonId . $userId . $randomDigits;
            } while (UserCompetitionForm::where('reg_no', $regNo)->exists());

            // Save form
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

            DB::commit();

            return $form;
        } catch (\Throwable $th) {
            DB::rollBack();
            return JsonResponse::error($th->getMessage());
        }
    }
}
