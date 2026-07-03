<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'name',
        'email',
        'age_group',
        'weight',
        'weight_unit',
        'height',
        'height_unit',
    ];

    protected function serializeDate(DateTimeInterface $date): string
    {
        return $date->format('M d, Y');
    }

    /**
     * Get the age group attribute (json decode)
     *
     * @param  string|null  $value
     * @return array|null
     */
    public function getAgeGroupAttribute($value)
    {
        return $value ? json_decode($value, true) : null;
    }

    /**
     * Set the age group attribute (json encode)
     *
     * @param  array|string|null  $value
     * @return void
     */
    public function setAgeGroupAttribute($value)
    {
        $this->attributes['age_group'] = is_array($value) ? json_encode($value) : $value;
    }

    /**
     * Get the user that owns the profile.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
