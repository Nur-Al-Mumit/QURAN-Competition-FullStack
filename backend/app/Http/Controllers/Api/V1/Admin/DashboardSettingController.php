<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Lib\JsonResponse;
use App\Models\ProgressStage;
use App\Models\TimelineEvent;
use App\Models\UserProgressStage;
use Illuminate\Http\Request;

class DashboardSettingController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Timeline events
    |--------------------------------------------------------------------------
    */
    public function timelineIndex()
    {
        $events = TimelineEvent::orderBy('sort_order')->orderBy('id')->get();

        return JsonResponse::success(['timeline_events' => $events]);
    }

    public function timelineStore(Request $request)
    {
        $data = $this->validateTimeline($request);

        $event = TimelineEvent::create($data);

        return JsonResponse::success(['timeline_event' => $event], 'Created', null, 201);
    }

    public function timelineUpdate(Request $request, TimelineEvent $timelineEvent)
    {
        $data = $this->validateTimeline($request);

        $timelineEvent->update($data);

        return JsonResponse::success(['timeline_event' => $timelineEvent]);
    }

    public function timelineDestroy(TimelineEvent $timelineEvent)
    {
        $timelineEvent->delete();

        return JsonResponse::success(['message' => 'Deleted']);
    }

    /*
    |--------------------------------------------------------------------------
    | Progress stages (global definitions)
    |--------------------------------------------------------------------------
    */
    public function stageIndex()
    {
        $stages = ProgressStage::orderBy('sort_order')->orderBy('id')->get();

        return JsonResponse::success(['progress_stages' => $stages]);
    }

    public function stageStore(Request $request)
    {
        $data = $this->validateStage($request);

        $stage = ProgressStage::create($data);

        return JsonResponse::success(['progress_stage' => $stage], 'Created', null, 201);
    }

    public function stageUpdate(Request $request, ProgressStage $progressStage)
    {
        $data = $this->validateStage($request, $progressStage);

        $progressStage->update($data);

        return JsonResponse::success(['progress_stage' => $progressStage]);
    }

    public function stageDestroy(ProgressStage $progressStage)
    {
        $progressStage->delete();

        return JsonResponse::success(['message' => 'Deleted']);
    }

    /*
    |--------------------------------------------------------------------------
    | User progress stages (per-user completion overrides)
    |--------------------------------------------------------------------------
    */
    public function userStageIndex(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer|exists:users,id',
        ]);

        $records = UserProgressStage::where('user_id', $request->input('user_id'))
            ->with('progressStage:id,code,title')
            ->get();

        return JsonResponse::success(['user_progress_stages' => $records]);
    }

    public function userStageUpsert(Request $request)
    {
        $data = $request->validate([
            'user_id'            => 'required|integer|exists:users,id',
            'progress_stage_id'  => 'required|integer|exists:progress_stages,id',
            'is_complete'        => 'required|boolean',
        ]);

        $record = UserProgressStage::updateOrCreate(
            [
                'user_id'           => $data['user_id'],
                'progress_stage_id' => $data['progress_stage_id'],
            ],
            [
                'is_complete'  => $data['is_complete'],
                'completed_at' => $data['is_complete'] ? now() : null,
            ]
        );

        $record->load('progressStage:id,code,title');

        return JsonResponse::success(['user_progress_stage' => $record]);
    }

    /*
    |--------------------------------------------------------------------------
    | Validation helpers
    |--------------------------------------------------------------------------
    */
    protected function validateTimeline(Request $request): array
    {
        return $request->validate([
            'title'                 => 'required|string|max:191',
            'description'           => 'nullable|string',
            'banner_message'        => 'nullable|string|max:191',
            'status_message'        => 'nullable|string',
            'status_message_upcoming' => 'nullable|string',
            'image_name'            => 'nullable|string|max:191',
            'start_date'            => 'nullable|date',
            'end_date'              => 'nullable|date|after_or_equal:start_date',
            'show_in_timeline'      => 'nullable|boolean',
            'sort_order'            => 'nullable|integer',
            'is_active'             => 'nullable|boolean',
        ]);
    }

    protected function validateStage(Request $request, ProgressStage $stage = null): array
    {
        $codeRule = 'required|string|max:191|unique:progress_stages,code';
        $codeRule .= $stage ? ',' . $stage->id : '';

        return $request->validate([
            'code'        => $codeRule,
            'title'       => 'required|string|max:191',
            'description' => 'nullable|string',
            'image_name'  => 'nullable|string|max:191',
            'start_date'  => 'nullable|date',
            'end_date'    => 'nullable|date|after_or_equal:start_date',
            'is_complete' => 'nullable|boolean',
            'sort_order'  => 'nullable|integer',
            'is_active'   => 'nullable|boolean',
        ]);
    }
}
