<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
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
        'description',
        'price',
        'land_area',
        'building_area',
        'bedrooms',
        'bathrooms',
        'floors',
        'garage',
        'location',
        'city',
        'province',
        'latitude',
        'longitude',
        'facilities',
        'video_url',
        'video_360_url',
        'primary_image',
        'featured_image_uid',
        'gallery_uids',
        'views',
        'is_featured',
        'is_sold',
        'is_active',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'land_area' => 'decimal:2',
        'building_area' => 'decimal:2',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'facilities' => 'array',
        'gallery_uids' => 'array',
        'is_featured' => 'boolean',
        'is_sold' => 'boolean',
        'is_active' => 'boolean',
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
     * Get product images (old way - ProductImage table)
     */
    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class, 'product_uid', 'uid')->orderBy('order');
    }

    /**
     * Get featured image from media library
     */
    public function featuredImage()
    {
        return $this->belongsTo(MediaLibrary::class, 'featured_image_uid', 'uid');
    }

    /**
     * Get gallery images from media library
     */
    public function getGalleryImagesAttribute()
    {
        if (empty($this->gallery_uids) || !is_array($this->gallery_uids)) {
            return collect();
        }

        return MediaLibrary::whereIn('uid', $this->gallery_uids)
            ->get()
            ->sortBy(function ($media) {
                return array_search($media->uid, $this->gallery_uids);
            })
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
