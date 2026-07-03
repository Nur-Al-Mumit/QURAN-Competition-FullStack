<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SmsLog extends Model
{
    protected $fillable = [
        'phone',
        'message',
        'status',
        'response',
        'reason',
        'sender_id'
    ];
}
