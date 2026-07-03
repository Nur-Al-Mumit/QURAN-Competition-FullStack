<?php

namespace App\Console\Commands;

use App\Models\Admin;
use App\Models\AttendanceAllocation;
use App\Models\Season;
use App\Models\UserCompetitionForm;
use Illuminate\Console\Command;

class AssignGroupsCommand extends Command
{
    protected $signature = 'app:assign-groups-command';
    protected $description = 'Assign groups, serials, and fixed rooms per admin';

    public function handle()
    {
        // Active season detect
        $season = Season::where('is_active', 1)->first();

        if (!$season) {
            $this->error('No active season found!');
            return;
        }

        $seasonId = $season->id;

        // Active admins
        $admins = Admin::where('assigned_role', 3)
            ->where('is_active', 1)
            ->get();

        $adminsCount = $admins->count();

        if ($adminsCount === 0) {
            $this->error('No active admins found!');
            return;
        }

        // Active students (competition form)
        $userForms = UserCompetitionForm::where('is_active', 1)
            ->orderBy('id')
            ->get();

        if ($userForms->isEmpty()) {
            $this->error('No active users found!');
            return;
        }

        // Clear previous allocations
        AttendanceAllocation::where('season_id', $seasonId)->delete();

        // Groups letters (A, B, C...)
        $groups = range('A', chr(ord('A') + $adminsCount - 1));

        // প্রতিটি Admin এর জন্য Room fix (201, 202, 203...)
        $adminRoomMap = [];
        $roomStart = 201;

        foreach ($admins as $index => $admin) {
            $adminRoomMap[$admin->id] = $roomStart + $index;
        }

        // Serial counter initialize per group
        $serialCounters = [];
        $groupIndex = 0;

        foreach ($userForms as $form) {
            $group = $groups[$groupIndex];
            $admin = $admins[$groupIndex];

            // Room = এই admin এর fixed room
            $roomNumber = $adminRoomMap[$admin->id];

            // Serial initialize
            if (!isset($serialCounters[$group])) {
                $serialCounters[$group] = 1;
            }

            // Serial generate (A-01, B-02...)
            $serial = sprintf("%s-%02d", $group, $serialCounters[$group]);

            // Insert allocation
            AttendanceAllocation::create([
                'season_id' => $seasonId,
                'user_id' => $form->user_id,
                'user_competition_form_id' => $form->id,
                'admin_id' => $admin->id,
                'room_number' => $roomNumber,
                'group' => $group,
                'serial' => $serial,
                'exam_time' => $form->exam_time,
            ]);

            // Increment serial
            $serialCounters[$group]++;

            // পরের admin (group) এ move
            $groupIndex = ($groupIndex + 1) % $adminsCount;
        }

        $this->info("Groups & serials assigned successfully (Room fixed per Admin) for season: {$season->name}");
    }
}
