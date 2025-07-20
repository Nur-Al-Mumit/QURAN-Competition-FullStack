<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class OtpVerification extends Model
{
    use HasUuids;

    protected $primaryKey = 'uuid';
    protected $fillable = [
        'scope',
        'user_id',
        'attempts',
        'provider',
        'otp_code',
        'identity',
        'expires_at',
    ];
}
