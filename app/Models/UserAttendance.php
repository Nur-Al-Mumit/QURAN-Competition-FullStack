<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserAttendance extends Model
{
    protected $fillable = [
        'user_id',
        'user_competition_form_id',
        'season_id',
        'attendance',
        'updated_by'
    ];

    /**
     * Relationships
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function competitionForm()
    {
        return $this->belongsTo(UserCompetitionForm::class, 'user_competition_form_id');
    }

    public function season()
    {
        return $this->belongsTo(Season::class);
    }

    public function updatedBy()
    {
        return $this->belongsTo(Admin::class, 'updated_by');
    }
}
