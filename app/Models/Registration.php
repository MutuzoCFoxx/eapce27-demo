<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    protected $fillable = [
        'badge_id', 'first_name', 'last_name', 'email',
        'organisation', 'country', 'phone', 'reg_type',
        'price', 'dietary', 'hotel', 'accreditation_done',
    ];

    protected $casts = [
        'accreditation_done' => 'boolean',
    ];

    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
