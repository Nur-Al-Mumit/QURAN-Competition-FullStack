<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserPreliminaryResult extends Model
{
    protected $table = 'user_preliminary_results';

    protected $fillable = [
        'user_id',
        'user_competition_form_id',
        'season_id',
        'criteria_id',
        'attendance_allocation_id',
        'attendance_status',
        'result_category_id',
        'comment',
        'examiner_id',
    ];

    public function resultCategory(): BelongsTo
    {
        return $this->belongsTo(ResultCategory::class, 'result_category_id');
    }

    public function examiner(): BelongsTo
    {
        return $this->belongsTo(Admin::class, 'examiner_id');
    }

    public function attendanceAllocation(): BelongsTo
    {
        return $this->belongsTo(AttendanceAllocation::class, 'attendance_allocation_id');
    }

    public function userCompetitionForm(): BelongsTo
    {
        return $this->belongsTo(UserCompetitionForm::class, 'user_competition_form_id');
    }
}
