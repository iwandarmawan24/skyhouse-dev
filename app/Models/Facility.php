<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Facility extends Model
{
    protected $primaryKey = 'uid';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'name',
        'description',
        'banner_image',
        'icon',
        'order',
        'is_active',
        'slug',
        'image_uids',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'image_uids' => 'array',
    ];

    protected $appends = [
        'media_images',
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
     * Get facility images (old method with FacilityImage model)
     */
    public function images(): HasMany
    {
        return $this->hasMany(FacilityImage::class, 'facility_uid', 'uid')->orderBy('order');
    }

    /**
     * Get media library images
     */
    public function getMediaImagesAttribute()
    {
        if (!$this->image_uids || !is_array($this->image_uids) || empty($this->image_uids)) {
            return [];
        }

        // Get all images that match the UIDs
        $images = MediaLibrary::whereIn('uid', $this->image_uids)->get();

        // Sort them manually according to the order in image_uids array
        $sortedImages = collect([]);
        foreach ($this->image_uids as $uid) {
            $image = $images->firstWhere('uid', $uid);
            if ($image) {
                $sortedImages->push($image);
            }
        }

        return $sortedImages;
    }

    /**
     * Scope active facilities
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope ordered facilities
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc');
    }
}
