<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model
{
    protected $primaryKey = 'uid';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'name',
        'slug',
        'type',
        'short_description',
        'description',
        'price',
        'bedrooms',
        'bathrooms',
        'living_room',
        'is_balcon_exist',
        'kitchen',
        'is_furnished',
        'facilities',
        'video_url',
        'video_360_url',
        'featured_image_uid',
        'card_image_uid',
        'gallery_uids',
        'views',
        'is_featured',
        'is_sold',
        'is_active',
        'order',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'living_room' => 'boolean',
        'is_balcon_exist' => 'boolean',
        'kitchen' => 'boolean',
        'is_furnished' => 'string',
        'facilities' => 'array',
        'gallery_uids' => 'array',
        'is_featured' => 'boolean',
        'is_sold' => 'boolean',
        'is_active' => 'boolean',
    ];

    protected $appends = [
        'gallery_images',
    ];

    /**
     * Boot method to handle slug generation and UUID
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($product) {
            if (empty($product->uid)) {
                $product->uid = (string) Str::uuid();
            }
            if (empty($product->slug)) {
                $product->slug = Str::slug($product->name);
            }
        });

        static::updating(function ($product) {
            if ($product->isDirty('name') && empty($product->slug)) {
                $product->slug = Str::slug($product->name);
            }
        });
    }

    /**
     * Get featured image from media library
     */
    public function featuredImage()
    {
        return $this->belongsTo(MediaLibrary::class, 'featured_image_uid', 'uid');
    }

    /**
     * Get card image from media library
     */
    public function cardImage()
    {
        return $this->belongsTo(MediaLibrary::class, 'card_image_uid', 'uid');
    }

    /**
     * Get sliders for this product
     */
    public function sliders()
    {
        return $this->hasMany(ProductSlider::class, 'product_uid', 'uid');
    }

    /**
     * Get gallery images from media library, each annotated with its
     * gallery-specific caption (e.g. "Kitchen", "Bedroom").
     *
     * gallery_uids entries support both the legacy plain-uid-string format
     * and the newer {uid, caption} object format.
     */
    public function getGalleryImagesAttribute()
    {
        if (empty($this->gallery_uids) || !is_array($this->gallery_uids)) {
            return collect();
        }

        $entries = collect($this->gallery_uids)
            ->map(function ($entry) {
                return is_array($entry)
                    ? ['uid' => $entry['uid'] ?? null, 'caption' => $entry['caption'] ?? null]
                    : ['uid' => $entry, 'caption' => null];
            })
            ->filter(fn ($entry) => !empty($entry['uid']))
            ->values();

        $media = MediaLibrary::whereIn('uid', $entries->pluck('uid'))->get()->keyBy('uid');

        return $entries
            ->map(function ($entry) use ($media) {
                $item = $media->get($entry['uid']);
                if (!$item) {
                    return null;
                }
                $item->setAttribute('gallery_caption', $entry['caption']);
                return $item;
            })
            ->filter()
            ->values();
    }

    /**
     * Scope active products
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true)->where('is_sold', false);
    }

    /**
     * Scope featured products
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope by type
     */
    public function scopeOfType($query, $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Increment views
     */
    public function incrementViews()
    {
        $this->increment('views');
    }
}
