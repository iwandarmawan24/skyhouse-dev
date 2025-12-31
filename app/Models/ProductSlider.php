<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class ProductSlider extends Model
{
    protected $primaryKey = 'uid';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'product_uid',
        'image_uid',
        'title',
        'description',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
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

        static::creating(function ($slider) {
            if (empty($slider->uid)) {
                $slider->uid = (string) Str::uuid();
            }
        });
    }

    /**
     * Get the product that owns the slider
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_uid', 'uid');
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
     * Scope to get active sliders
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to order sliders
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc');
    }
}
