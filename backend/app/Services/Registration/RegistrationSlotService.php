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
     * Determine the next registration position (1-indexed).
     *
     * The position is NOT derived from the current active-form count, because
     * that regresses when a registration is removed (deactivating/deleting a
     * user would make the next registrant collide with an already-assigned
     * serial, e.g. produce a duplicate "C-05").
     *
     * Instead we:
     *   1. Inspect the serials actually held by currently-active forms in the
     *      active season, decoding them to a 1-indexed round-robin position.
     *   2. If any position in [1 .. maxPositionUsed] is now vacant (its
     *      registrant was removed), return the earliest such vacancy so the
     *      freed serial is reused first ("fill the missing serial").
     *   3. Otherwise continue on the next round-robin position after the last
     *      one ever issued ("follow the last created group & time").
     *
     * Must be called inside a transaction with a lock to be concurrency-safe.
     */
    public function nextPosition(): int
    {
        $examiners = $this->getActiveExaminers();
        $count = $examiners->count();

        if ($count === 0) {
            throw new \RuntimeException('No active examiners found to assign groups.');
        }

        $seasonId = $this->getActiveSeasonId();

        // Lock the active forms for the active season so two concurrent
        // registrations can't pick the same slot. The COUNT itself is not
        // used to derive the position; it only forces row-level locks.
        $this->activeSeasonForms()->lockForUpdate()->count();

        // Serials currently held by active forms in the active season. A
        // removed registrant either has its form's is_active cleared or its
        // allocation row deleted, so its serial drops out here and becomes a
        // fillable vacancy.
        $allocations = AttendanceAllocation::query()
            ->where('season_id', $seasonId)
            ->whereHas('userCompetitionForm', function ($q) {
                $q->where('is_active', 1);
            })
            ->get(['serial']);

        if ($allocations->isEmpty()) {
            return 1;
        }

        $groups = range('A', chr(ord('A') + $count - 1));

        $usedSerials = [];
        $maxSlotIndex = 0;

        foreach ($allocations as $alloc) {
            $usedSerials[$alloc->serial] = true;

            if (preg_match('/^([A-Z])-(\d+)$/', $alloc->serial, $m)) {
                $idx = (int) $m[2] - 1;
                if ($idx > $maxSlotIndex) {
                    $maxSlotIndex = $idx;
                }
            }
        }

        // 1) Reuse the earliest vacancy within slots already opened. This
        //    handles the "delete a user, then a new registrant must take that
        //    freed serial instead of duplicating the last one" case, and the
        //    "8 or 7 users out of 9 → next registrant fills the missing one"
        //    case.
        for ($slotIndex = 0; $slotIndex <= $maxSlotIndex; $slotIndex++) {
            foreach ($groups as $groupIndex => $group) {
                $serial = sprintf('%s-%02d', $group, $slotIndex + 1);
                if (!isset($usedSerials[$serial])) {
                    return $slotIndex * $count + $groupIndex + 1;
                }
            }
        }

        // 2) No gaps — continue on the next round-robin position after the
        //    last issued one (e.g. last was C-03 → next is A-04).
        return ($maxSlotIndex + 1) * $count + 1;
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
