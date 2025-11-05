<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
        'event_date',
        'location',
        'registration_link',
        'max_participants',
        'current_participants',
        'is_active',
    ];

    protected $casts = [
        'event_date' => 'datetime',
        'is_active' => 'boolean',
    ];

    /**
     * Scope active events
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope upcoming events
     */
    public function scopeUpcoming($query)
    {
        return $query->where('event_date', '>=', now())->orderBy('event_date', 'asc');
    }

    /**
     * Check if event is full
     */
    public function isFull(): bool
    {
        return $this->max_participants && $this->current_participants >= $this->max_participants;
    }

    /**
     * Increment participants
     */
    public function incrementParticipants()
    {
        if (!$this->isFull()) {
            $this->increment('current_participants');
        }
    }
}
