<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use DateTimeInterface;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name_bn',
        'name_en',
        'phone',
        'email',
        'password',
        'gender',
        'phone_verified_at',
        'season_id',
        'registered_season_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Format dates when accessed
     *
     * @param DateTimeInterface $date
     * @return string
     */
    protected function serializeDate(DateTimeInterface $date): string
    {
        return $date->format('M d, Y');
    }

    /**
     * Find the user instance for the given username.
     *
     * @param  string  $username
     * @return \App\Models\User
     */
    public function findForPassport($username)
    {
        return $this->where('phone', $username)
            ->orWhere('email', $username)
            ->first();

    }

    public function form()
    {
        return $this->hasOne(UserCompetitionForm::class);
    }

    public function season()
    {
        return $this->belongsTo(Season::class, 'season_id');
    }

    public function registeredSeason()
    {
        return $this->belongsTo(Season::class, 'registered_season_id');
    }

    public function trainingAttendances()
    {
        return $this->hasMany(UserTrainingAttendance::class);
    }
}
