<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserProgressStage extends Model
{
    protected $fillable = [
        'user_id',
        'progress_stage_id',
        'is_complete',
        'completed_at',
    ];

    protected $casts = [
        'is_complete'  => 'boolean',
        'completed_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function progressStage()
    {
        return $this->belongsTo(ProgressStage::class);
    }
}
