<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserTrainingAttendance extends Model
{
    protected $table = 'users_training_attendances';

    public const STATUS_PRESENT = 1;
    public const STATUS_ABSENT = 2;
    public const STATUS_LATE = 3;

    protected $fillable = [
        'user_id',
        'season_id',
        'attendance_status',
        'date',
        'updated_by',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
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
