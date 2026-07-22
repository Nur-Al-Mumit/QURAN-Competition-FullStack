<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeasonTrainingDate extends Model
{
    protected $table = 'season_training_dates';

    protected $fillable = [
        'season_id',
        'date',
        'is_off_day',
        'note',
        'sort_order',
    ];

    protected $casts = [
        'date' => 'date',
        'is_off_day' => 'boolean',
    ];

    public function season()
    {
        return $this->belongsTo(Season::class);
    }
}
