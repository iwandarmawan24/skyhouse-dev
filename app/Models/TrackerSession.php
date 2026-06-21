<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TrackerSession extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'ip_hash',
        'device_type',
        'browser',
        'os',
        'landing_page',
        'referrer',
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'first_seen',
        'last_seen',
    ];

    protected $casts = [
        'first_seen' => 'datetime',
        'last_seen'  => 'datetime',
    ];

    public function events(): HasMany
    {
        return $this->hasMany(TrackerEvent::class, 'session_id');
    }
}
