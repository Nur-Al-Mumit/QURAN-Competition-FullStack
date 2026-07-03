<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AttendanceAllocation extends Model
{
    protected $fillable = [
        'season_id',
        'user_id',
        'admin_id',
        'room_number',
        'group',
        'serial',
        'exam_time',
        'user_competition_form_id',
        'is_sms_sent',
    ];

    public function admin()
    {
        return $this->belongsTo(Admin::class, 'admin_id');
    }

    public function userCompetitionForm()
    {
        return $this->belongsTo(UserCompetitionForm::class, 'user_competition_form_id', 'id');
    }
}
