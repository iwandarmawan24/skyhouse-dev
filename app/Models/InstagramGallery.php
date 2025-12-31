<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class InstagramGallery extends Model
{
    protected $primaryKey = 'uid';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'image_uid',
        'position',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'position' => 'integer',
    ];

    protected $appends = [
        'image_url',
    ];

    /**
     * Boot method to handle UUID generation
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($gallery) {
            if (empty($gallery->uid)) {
                $gallery->uid = (string) Str::uuid();
            }
        });
    }

    /**
     * Get the media image
     */
    public function mediaImage(): BelongsTo
    {
        return $this->belongsTo(MediaLibrary::class, 'image_uid', 'uid');
    }

    /**
     * Get image URL from media library
     */
    public function getImageUrlAttribute()
    {
        return $this->mediaImage?->url;
    }

    /**
     * Scope to get active galleries
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to order by position
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('position', 'asc');
    }
}
