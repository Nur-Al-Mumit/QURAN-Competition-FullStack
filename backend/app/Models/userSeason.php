<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class userSeason extends Model
{
    protected $fillable = [
        "user_id",
        "season_id",
        "registered_season_id",
        "registered_at",
    ];
}
