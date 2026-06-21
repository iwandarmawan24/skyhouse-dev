<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrackerEvent extends Model
{
    protected $fillable = [
        'event_type',
        'page_url',
        'referrer',
        'ip_address',
        'user_agent',
        'meta',
    ];

    protected $casts = [
        'meta' => 'array',
    ];
}
