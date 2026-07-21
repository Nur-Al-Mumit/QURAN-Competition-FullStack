<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResultCategory extends Model
{
    protected $table = 'result_categories';

    protected $fillable = [
        'name',
        'description',
    ];
}
