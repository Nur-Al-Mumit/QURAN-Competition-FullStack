<?php

namespace App\Console\Commands;

use App\Models\UserCompetitionForm;
use App\Services\Registration\RegistrationSlotService;
use Illuminate\Console\Command;

class AssignExamTimesCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:assign-exam-times-command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Re-sync exam times for all active users based on the registration config';

    /**
     * Execute the console command.
     */
    public function handle(RegistrationSlotService $slotService)
    {
        $users = $slotService->activeSeasonForms()
            ->orderBy('id')
            ->get();

        if ($users->isEmpty()) {
            $this->error('No active users found!');
            return;
        }

        foreach ($users as $index => $user) {
            $slot = $slotService->computeSlot($index + 1);
            $user->exam_time = $slot['exam_time'];
            $user->save();
        }

        $this->info('Exam times re-synced successfully!');
    }
}
