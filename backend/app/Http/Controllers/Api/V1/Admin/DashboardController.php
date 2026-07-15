<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Lib\JsonResponse;
use App\Models\AttendanceAllocation;
use App\Models\Season;
use App\Models\UserCompetitionForm;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * List all seasons for the season filter dropdown.
     */
    public function getSeasons()
    {
        $seasons = Season::orderByDesc('year')
            ->orderByDesc('id')
            ->get(['id', 'name', 'year', 'gender', 'is_active']);

        $activeSeason = Season::where('is_active', 1)->latest()->first();

        return JsonResponse::success([
            'seasons' => $seasons,
            'active_season_id' => $activeSeason?->id,
        ]);
    }

    /**
     * Paginated, filtered list of competition forms.
     * All filters are applied server-side.
     */
    public function getRegistrationForms(Request $request)
    {
        $request->validate([
            'search'                => 'nullable|string|max:100',
            'season_id'             => 'nullable|integer',
            'gender'                => 'nullable|integer|in:1,2',
            'education_background'  => 'nullable|integer|in:1,2,3',
            'is_recitation'         => 'nullable|in:0,1',
            'need_training'         => 'nullable|in:0,1',
            'is_active'             => 'nullable|in:0,1',
            'is_sms_sent'           => 'nullable|in:0,1',
            'page'                  => 'nullable|integer|min:1',
            'per_page'              => 'nullable|integer|in:10,25,50,100',
        ]);

        $perPage = (int) $request->input('per_page', 10);

        // LEFT JOIN with attendance_allocations so we can filter / show
        // is_sms_sent which actually lives on that table (the form's own
        // is_sms_sent column is unused/always NULL). The computed value is
        // aliased to `sms_sent` to avoid a "duplicate column" clash with the
        // form's own is_sms_sent column; we map it back onto the model below.
        $query = UserCompetitionForm::query()
            ->leftJoin(
                'attendance_allocations',
                'attendance_allocations.user_competition_form_id',
                '=',
                'user_competition_forms.id'
            )
            ->select('user_competition_forms.*')
            ->selectRaw('MAX(attendance_allocations.is_sms_sent) as sms_sent')
            ->groupBy('user_competition_forms.id');

        // Search across name (en/bn), phone, reg_no
        if ($search = trim((string) $request->input('search', ''))) {
            $query->where(function ($q) use ($search) {
                $q->where('user_competition_forms.name_en', 'like', "%{$search}%")
                    ->orWhere('user_competition_forms.name_bn', 'like', "%{$search}%")
                    ->orWhere('user_competition_forms.phone', 'like', "%{$search}%")
                    ->orWhere('user_competition_forms.reg_no', 'like', "%{$search}%");
            });
        }

        if ($request->filled('season_id')) {
            $query->where('user_competition_forms.season_id', (int) $request->input('season_id'));
        }

        if ($request->filled('gender')) {
            $query->where('user_competition_forms.gender', (int) $request->input('gender'));
        }

        if ($request->filled('education_background')) {
            $query->where('user_competition_forms.education_background', (int) $request->input('education_background'));
        }

        if ($request->filled('is_recitation')) {
            $query->where('user_competition_forms.is_recitation', (int) $request->input('is_recitation'));
        }

        if ($request->filled('need_training')) {
            if ((int) $request->input('need_training') === 1) {
                $query->where('user_competition_forms.need_training', 1);
            } else {
                $query->where(function ($q) {
                    $q->whereNull('user_competition_forms.need_training')
                        ->orWhere('user_competition_forms.need_training', 0);
                });
            }
        }

        if ($request->filled('is_active')) {
            if ((int) $request->input('is_active') === 1) {
                $query->where('user_competition_forms.is_active', 1);
            } else {
                // is_active is nullable; "Inactive" means null
                $query->whereNull('user_competition_forms.is_active');
            }
        }

        if ($request->filled('is_sms_sent')) {
            if ((int) $request->input('is_sms_sent') === 1) {
                $query->havingRaw('MAX(attendance_allocations.is_sms_sent) = 1');
            } else {
                $query->havingRaw('MAX(attendance_allocations.is_sms_sent) IS NULL');
            }
        }

        $query->orderBy('user_competition_forms.created_at', 'desc');

        $forms = $query->paginate($perPage)->withQueryString();

        // Replace the form's (unused) is_sms_sent column with the real value
        // coming from attendance_allocations.
        $forms->getCollection()->transform(function ($form) {
            $form->is_sms_sent = $form->sms_sent;
            unset($form->sms_sent);
            return $form;
        });

        return JsonResponse::success([
            'forms' => $forms,
        ]);
    }

    /**
     * Aggregate statistics for the dashboard summary cards,
     * optionally scoped to a single season.
     */
    public function getStatistics(Request $request)
    {
        $request->validate([
            'season_id' => 'nullable|integer',
        ]);

        $seasonId = $request->input('season_id');

        $base = UserCompetitionForm::query();
        if ($seasonId) {
            $base->where('season_id', $seasonId);
        }

        $total       = (clone $base)->count();
        $active      = (clone $base)->where('is_active', 1)->count();
        $inactive    = (clone $base)->whereNull('is_active')->count();
        $recitation  = (clone $base)->where('is_recitation', 1)->count();
        $needTrain   = (clone $base)->where('need_training', 1)->count();
        $male        = (clone $base)->where('gender', 1)->count();
        $female      = (clone $base)->where('gender', 2)->count();

        $smsBase = AttendanceAllocation::query();
        if ($seasonId) {
            $smsBase->where('season_id', $seasonId);
        }
        $smsSent    = (clone $smsBase)->where('is_sms_sent', 1)->count();
        $smsPending = (clone $smsBase)->where(function ($q) {
            $q->whereNull('is_sms_sent')->orWhere('is_sms_sent', 0);
        })->count();

        return JsonResponse::success([
            'statistics' => [
                'total'         => $total,
                'active'        => $active,
                'inactive'      => $inactive,
                'recitation'    => $recitation,
                'need_training' => $needTrain,
                'male'          => $male,
                'female'        => $female,
                'sms_sent'      => $smsSent,
                'sms_pending'   => $smsPending,
            ],
        ]);
    }
}
