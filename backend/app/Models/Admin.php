<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class Admin extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'name',
        'phone',
        'password',
        'role',
        'weight',
        'is_active',
        'gender',
        'creator_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function findForPassport($username)
    {
        return $this->where('phone', $username)->first();
    }


}
