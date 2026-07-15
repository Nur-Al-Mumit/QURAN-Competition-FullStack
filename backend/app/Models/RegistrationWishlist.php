<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RegistrationWishlist extends Model
{
    protected $table = 'registration_wishlists';

    protected $fillable = [
        'phone',
        'name',
    ];
}
