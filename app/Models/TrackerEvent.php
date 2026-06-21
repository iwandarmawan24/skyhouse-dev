<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TrackerEvent extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'session_id',
        'event_type',
        'event_target',
        'target_id',
        'target_label',
        'page_url',
        'referrer',
        'properties',
        'created_at',
    ];

    protected $casts = [
        'properties' => 'array',
        'created_at' => 'datetime',
    ];

    public function session(): BelongsTo
    {
        return $this->belongsTo(TrackerSession::class, 'session_id');
    }
}
