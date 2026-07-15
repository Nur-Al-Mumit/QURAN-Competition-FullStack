<?php

namespace App\Http\Controllers\Api\V1\User;

use App\Http\Controllers\Controller;
use App\Lib\JsonResponse;
use App\Models\ProgressStage;
use App\Models\TimelineEvent;
use App\Models\UserProgressStage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Return the dynamic dashboard content for the logged-in student:
     *  - timeline_events : the competition schedule (visible rows only)
     *  - progress_stages : the competitor progress tracker, with the
     *                      `completed` flag computed per-stage based on the
     *                      stage `code`, the user's data and the per-user
     *                      `user_progress_stages` override.
     *  - current_phase   : the phase that drives the header countdown banner
     *                      and the "বর্তমান অবস্থা" card (fully DB-driven).
     */
    public function getUserDashboard()
    {
        try {
            $user = Auth::user()?->load('form');
            $form = $user?->form;

            // ---- Timeline + current phase ----
            $timelineEvents = TimelineEvent::where('is_active', true)
                ->where('show_in_timeline', true)
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get([
                    'id',
                    'title',
                    'description',
                    'image_name',
                    'start_date',
                    'end_date',
                    'sort_order',
                ]);

            $currentPhase = $this->computeCurrentPhase();

            // ---- Progress stages (user-specific) ----
            $stages = ProgressStage::where('is_active', true)
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get();

            // Per-user overrides keyed by progress_stage_id.
            $userOverrides = $user
                ? UserProgressStage::where('user_id', $user->id)
                    ->whereIn('progress_stage_id', $stages->pluck('id'))
                    ->get()
                    ->keyBy('progress_stage_id')
                : collect();

            $progressStages = $stages->map(function (ProgressStage $stage) use ($user, $form, $userOverrides) {
                $override = $userOverrides->get($stage->id);

                return [
                    'id'          => $stage->id,
                    'code'        => $stage->code,
                    'title'       => $stage->title,
                    'description' => $stage->description,
                    'icon'        => $stage->image_name,
                    'start_date'  => $stage->start_date,
                    'end_date'    => $stage->end_date,
                    'completed'   => $this->isStageCompleted($stage, $user, $form, $override),
                ];
            })->values();

            return JsonResponse::success([
                'dashboard' => [
                    'timeline_events' => $timelineEvents,
                    'progress_stages' => $progressStages,
                    'current_phase'   => $currentPhase,
                ],
            ]);
        } catch (\Throwable $th) {
            \Log::error('Dashboard Error', ['error' => $th]);
            return JsonResponse::error($th->getMessage(), 500);
        }
    }

    /**
     * Decide whether a given progress stage is completed for the user.
     *
     * Resolution order:
     *   1. Per-user `user_progress_stages.is_complete === true`  -> completed
     *      (manual / attendance-driven override, e.g. training, final).
     *   2. Known `code` auto-rules (account_created, competition_registration,
     *      primary_round, sms_received, ...).
     *   3. Manual flag on the global stage definition.
     *   4. Date range -> completed when now > end_date.
     */
    protected function isStageCompleted(ProgressStage $stage, $user, $form, $override = null): bool
    {
        // 1. Per-user override
        if ($override && $override->is_complete === true) {
            return true;
        }

        $now = now();

        // 2. Known auto-rules
        switch ($stage->code) {
            case 'account_created':
                return (bool) $user;

            case 'competition_registration':
            case 'token_downloaded':
                return (bool) ($form?->reg_no ?? false);

            case 'primary_round':
                return $this->userHasPreliminaryResult($user?->id);

            case 'sms_received':
                return $this->userHasSmsSent($user?->id);

            case 'training':
            case 'final_round':
                // Date-driven, but a per-user override can complete it early
                // (handled above). Otherwise completed when the end date
                // has passed.
                if ($stage->is_complete === true) {
                    return true;
                }
                return $stage->end_date !== null && $now->gt($stage->end_date);
        }

        // 3. Manual global flag
        if ($stage->is_complete === true) {
            return true;
        }

        // 4. Date range fallback
        return $stage->end_date !== null && $now->gt($stage->end_date);
    }

    /**
     * Compute the current competition phase from the timeline_events table.
     *
     * The current phase is the first event (by sort_order) whose end_date
     * has not yet passed. If we are before its start_date the phase is
     * "upcoming" (and the upcoming status message is used); otherwise it
     * is "active". If no event qualifies, the competition is "completed".
     */
    protected function computeCurrentPhase(): ?array
    {
        $now = now();

        $events = TimelineEvent::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get([
                'id',
                'title',
                'banner_message',
                'status_message',
                'status_message_upcoming',
                'start_date',
                'end_date',
            ]);

        foreach ($events as $event) {
            $end = $event->end_date;
            if ($end && $now->lte($end)) {
                $start = $event->start_date;
                $upcoming = $start && $now->lt($start);

                return [
                    'title'          => $event->title,
                    'banner_message' => $event->banner_message,
                    'status_message' => $upcoming && $event->status_message_upcoming
                        ? $event->status_message_upcoming
                        : $event->status_message,
                    'target_date'    => $end,
                    'status'         => $upcoming ? 'upcoming' : 'active',
                ];
            }
        }

        return [
            'title'          => null,
            'banner_message' => null,
            'status_message' => 'প্রতিযোগিতা সম্পন্ন হয়েছে।',
            'target_date'    => null,
            'status'         => 'completed',
        ];
    }

    protected function userHasPreliminaryResult($userId): bool
    {
        if (!$userId) {
            return false;
        }
        return DB::table('user_preliminary_results')
            ->where('user_id', $userId)
            ->exists();
    }

    protected function userHasSmsSent($userId): bool
    {
        if (!$userId) {
            return false;
        }
        return DB::table('attendance_allocations')
            ->where('user_id', $userId)
            ->where('is_sms_sent', 1)
            ->exists();
    }
}
