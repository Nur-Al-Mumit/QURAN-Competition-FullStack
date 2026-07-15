<?php

namespace App\Console\Commands;

use App\Models\AttendanceAllocation;
use App\Models\UserCompetitionForm;
use App\Services\Registration\RegistrationSlotService;
use Illuminate\Console\Command;

class AssignGroupsCommand extends Command
{
    protected $signature = 'app:assign-groups-command';
    protected $description = 'Re-sync groups, serials, and fixed rooms per examiner based on the registration config';

    public function handle(RegistrationSlotService $slotService)
    {
        $season = $slotService->getActiveSeason();

        if (!$season) {
            $this->error('No active season found!');
            return;
        }

        $seasonId = $season->id;

        $userForms = $slotService->activeSeasonForms()
            ->orderBy('id')
            ->get();

        if ($userForms->isEmpty()) {
            $this->error('No active users found!');
            return;
        }

        // Clear previous allocations
        AttendanceAllocation::where('season_id', $seasonId)->delete();

        foreach ($userForms as $index => $form) {
            $slot = $slotService->computeSlot($index + 1);

            AttendanceAllocation::create([
                'season_id' => $seasonId,
                'user_id' => $form->user_id,
                'user_competition_form_id' => $form->id,
                'admin_id' => $slot['admin_id'],
                'room_number' => $slot['room_number'],
                'group' => $slot['group'],
                'serial' => $slot['serial'],
                'exam_time' => $form->exam_time ?: $slot['exam_time'],
            ]);
        }

        $this->info("Groups & serials re-synced successfully for season: {$season->name}");
    }
}
