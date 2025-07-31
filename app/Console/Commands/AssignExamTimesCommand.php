<?php

namespace App\Console\Commands;

use App\Models\Admin;
use App\Models\UserCompetitionForm;
use Carbon\Carbon;
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
    protected $description = 'Assign exam times to active users';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $adminsCount = Admin::where('assigned_role', 3)
            ->where('is_active', 1)
            ->count();

        $users = UserCompetitionForm::where('is_active', 1)
            ->orderBy('id')
            ->get();

        // শুরু সময়
        $currentTime = Carbon::createFromTime(10, 0); // 10:00 AM

        // Break টাইম লিস্ট
        $breaks = [
            ['start' => Carbon::createFromTime(12, 40), 'end' => Carbon::createFromTime(13, 30)],
            ['start' => Carbon::createFromTime(16, 5), 'end' => Carbon::createFromTime(16, 35)],
        ];

        $batchSize = $adminsCount; // একসাথে কতজন বসবে
        $batchDuration = 5; // মিনিট
        $gap = 2; // ব্যাচের মধ্যে গ্যাপ

        $counter = 0;

        foreach ($users as $user) {
            // যদি break time হয় তাহলে break এর পরে নিন
            foreach ($breaks as $break) {
                if ($currentTime->between($break['start'], $break['end'])) {
                    $currentTime = $break['end'];
                }
            }

            // ব্যাচের প্রথমজনের জন্য সময় সেট
            if ($counter % $batchSize === 0) {
                $startTime = $currentTime->copy();
                $endTime = $currentTime->copy()->addMinutes($batchDuration);

                // ব্যাচ শেষ হলে সময় এগিয়ে নিন
                $currentTime->addMinutes($batchDuration + $gap);
            }

            // exam_time সেট করুন
            $user->exam_time = $startTime->format('h:i A') . ' - ' . $endTime->format('h:i A');
            $user->save();

            $counter++;
        }

        $this->info('Exam times assigned successfully!');
    }
}
