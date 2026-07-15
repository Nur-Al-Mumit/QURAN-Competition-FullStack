<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProgressStage extends Model
{
    protected $fillable = [
        'code',
        'title',
        'description',
        'image_name',
        'start_date',
        'end_date',
        'is_complete',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'start_date'  => 'datetime',
        'end_date'    => 'datetime',
        'is_complete' => 'boolean',
        'is_active'   => 'boolean',
    ];

    /**
     * Scope to only active stages, ordered by their display order.
     */
    public function scopeActiveOrdered($query)
    {
        return $query->where('is_active', true)->orderBy('sort_order')->orderBy('id');
    }
}
