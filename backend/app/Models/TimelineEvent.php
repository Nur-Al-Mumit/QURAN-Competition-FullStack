<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TimelineEvent extends Model
{
    protected $fillable = [
        'title',
        'description',
        'banner_message',
        'status_message',
        'status_message_upcoming',
        'image_name',
        'start_date',
        'end_date',
        'show_in_timeline',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date'   => 'datetime',
        'is_active'  => 'boolean',
        'show_in_timeline' => 'boolean',
    ];
}
