<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Event extends Model
{
    protected $primaryKey = 'uid';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'title',
        'description',
        'image',
        'image_uid',
        'event_date',
        'location',
        'registration_link',
        'max_participants',
        'current_participants',
        'is_active',
        'slug',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'focus_keyword',
    ];

    protected $casts = [
        'event_date' => 'datetime',
        'is_active' => 'boolean',
    ];

    protected $appends = [
        'event_date_formatted',
        'event_date_only',
        'event_time',
        'is_past',
        'image_url',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->uid)) {
                $model->uid = (string) \Illuminate\Support\Str::uuid();
            }
        });
    }

    /**
     * Get the media library image
     */
    public function mediaImage(): BelongsTo
    {
        return $this->belongsTo(MediaLibrary::class, 'image_uid', 'uid');
    }

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
     * Scope past events
     */
    public function scopePast($query)
    {
        return $query->where('event_date', '<', now())->orderBy('event_date', 'desc');
    }

    /**
     * Get formatted event date
     */
    public function getEventDateFormattedAttribute()
    {
        return $this->event_date->format('M d, Y');
    }

    /**
     * Get event date only (for form input)
     */
    public function getEventDateOnlyAttribute()
    {
        return $this->event_date->format('Y-m-d');
    }

    /**
     * Get event time only
     */
    public function getEventTimeAttribute()
    {
        return $this->event_date->format('H:i');
    }

    /**
     * Check if event is past
     */
    public function getIsPastAttribute()
    {
        return $this->event_date->isPast();
    }

    /**
     * Get image URL from media library or fallback to old image field
     */
    public function getImageUrlAttribute()
    {
        if ($this->image_uid && $this->mediaImage) {
            return $this->mediaImage->url;
        }

        if ($this->image) {
            return $this->image;
        }

        return null;
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
