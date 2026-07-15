<?php

namespace App\Services\Registration;

use App\Models\Admin;
use App\Models\AttendanceAllocation;
use App\Models\Season;
use App\Models\UserCompetitionForm;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class RegistrationSlotService
{
    protected ?Collection $examiners = null;

    protected ?int $roomStart = null;

    public function getRoomStart(): int
    {
        if ($this->roomStart === null) {
            $this->roomStart = (int) config('registration.room_start', 201);
        }
        return $this->roomStart;
    }

    public function getActiveExaminers(): Collection
    {
        if ($this->examiners === null) {
            $this->examiners = Admin::where('assigned_role', 3)
                ->where('is_active', 1)
                ->orderBy('id')
                ->get()
                ->values();
        }
        return $this->examiners;
    }

    public function getActiveSeason(): ?Season
    {
        return Season::where('is_active', 1)->latest()->first();
    }

    public function getActiveSeasonId(): ?int
    {
        return $this->getActiveSeason()?->id;
    }

    /**
     * Query builder for active competition forms, scoped to the currently
     * active season only (so counts/positions are not polluted by other
     * seasons' data).
     */
    public function activeSeasonForms()
    {
        $query = UserCompetitionForm::where('is_active', 1);
        $seasonId = $this->getActiveSeasonId();
        if ($seasonId) {
            $query->where('season_id', $seasonId);
        }
        return $query;
    }

    public function getMaxRegistrations(): int
    {
        return (int) config('registration.max_registrations', 50);
    }

    /**
     * Compute the slot (group, serial, exam time, room, examiner) for a
     * 1-indexed registration position.
     *
     * Round-robin distribution across groups (A, B, C ...). Each time slot
     * holds <examiner count> registrations, then the time advances by
     * (batch_duration + gap). Break windows are skipped automatically.
     */
    public function computeSlot(int $position): array
    {
        if ($position < 1) {
            throw new \InvalidArgumentException('Position must be 1-indexed (>= 1).');
        }

        $examiners = $this->getActiveExaminers();
        $count = $examiners->count();

        if ($count === 0) {
            throw new \RuntimeException('No active examiners found to assign groups.');
        }

        $groupIndex = ($position - 1) % $count;
        $slotIndex = intdiv($position - 1, $count);

        $groups = range('A', chr(ord('A') + $count - 1));
        $group = $groups[$groupIndex];
        $examiner = $examiners[$groupIndex];
        $roomNumber = $this->getRoomStart() + $groupIndex;
        $serial = sprintf('%s-%02d', $group, $slotIndex + 1);

        $startTime = Carbon::parse(config('registration.schedule.start_time'));
        $duration = (int) config('registration.schedule.batch_duration', 5);
        $gap = (int) config('registration.schedule.gap', 2);
        $breaks = config('registration.breaks', []);
        $step = $duration + $gap;

        $currentTime = $startTime->copy();

        for ($i = 0; $i <= $slotIndex; $i++) {
            $currentTime = $this->skipBreaks($currentTime, $breaks);
            if ($i < $slotIndex) {
                $currentTime = $currentTime->copy()->addMinutes($step);
            }
        }

        $endTime = $currentTime->copy()->addMinutes($duration);
        $examTime = $currentTime->format('h:i A') . ' - ' . $endTime->format('h:i A');

        return [
            'group' => $group,
            'serial' => $serial,
            'exam_time' => $examTime,
            'admin_id' => $examiner->id,
            'room_number' => $roomNumber,
        ];
    }

    /**
     * If the given time falls inside any break window [start, end), jump to
     * that break's end. Loops to support overlapping / consecutive breaks.
     * Half-open on the end so a slot landing exactly on a break end is left
     * as-is (avoids an infinite loop).
     */
    protected function skipBreaks(Carbon $time, array $breaks): Carbon
    {
        $result = $time->copy();
        $changed = true;
        while ($changed) {
            $changed = false;
            foreach ($breaks as $break) {
                $start = Carbon::parse($break['start']);
                $end = Carbon::parse($break['end']);
                if ($result->greaterThanOrEqualTo($start) && $result->lessThan($end)) {
                    $result = $end->copy();
                    $changed = true;
                }
            }
        }
        return $result;
    }

    /**
     * Determine the next registration position (1-indexed) based on the
     * current number of active forms in the active season. Must be called
     * inside a transaction with a lock to be concurrency-safe.
     */
    public function nextPosition(): int
    {
        return $this->activeSeasonForms()
            ->lockForUpdate()
            ->count() + 1;
    }

    /**
     * Assign exam time to a form + create its AttendanceAllocation for the
     * given 1-indexed position.
     */
    public function assignToForm(UserCompetitionForm $form, int $position): AttendanceAllocation
    {
        $slot = $this->computeSlot($position);
        $season = $this->getActiveSeason();

        $form->exam_time = $slot['exam_time'];
        $form->save();

        return AttendanceAllocation::create([
            'season_id' => $season ? $season->id : $form->season_id,
            'user_id' => $form->user_id,
            'user_competition_form_id' => $form->id,
            'admin_id' => $slot['admin_id'],
            'room_number' => $slot['room_number'],
            'group' => $slot['group'],
            'serial' => $slot['serial'],
            'exam_time' => $slot['exam_time'],
        ]);
    }
}
