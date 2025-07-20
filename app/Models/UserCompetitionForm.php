<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserCompetitionForm extends Model
{
    protected $fillable = [
        'user_id',
        'season_id',
        'reg_no',
        'name_bn',
        'name_en',
        'dob',
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
    ];
}
