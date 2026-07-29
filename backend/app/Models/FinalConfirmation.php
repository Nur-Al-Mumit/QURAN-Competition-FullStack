<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FinalConfirmation extends Model
{
    protected $table = 'user_final_confirmations';

    protected $fillable = [
        'user_id',
        'user_competition_form_id',
        'season_id',
        'criteria_id',
        'status',
        'admin_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function userCompetitionForm(): BelongsTo
    {
        return $this->belongsTo(UserCompetitionForm::class, 'user_competition_form_id');
    }

    public function season(): BelongsTo
    {
        return $this->belongsTo(Season::class, 'season_id');
    }

    public function admin(): BelongsTo
    {
        return $this->belongsTo(Admin::class, 'admin_id');
    }
}
