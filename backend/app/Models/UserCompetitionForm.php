<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserCompetitionForm extends Model
{
    protected $fillable = [
        'user_id',
        'season_id',
        'reg_no',
        'criteria_id',
        'name_bn',
        'name_en',
        'dob',
        'gender',
        'phone',
        'address',
        'education_background',
        'school_name',
        'college_name',
        'university_name',
        'madrasah_name',
        'madrasah_study_details',
        'occupation',
        'is_recitation',
        'need_training',
        'is_active',
        'exam_time',
    ];

    public function attendanceAllocation()
    {
        return $this->hasOne(AttendanceAllocation::class, 'user_competition_form_id', 'id');
    }

    public function season()
    {
        return $this->belongsTo(Season::class, 'season_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
