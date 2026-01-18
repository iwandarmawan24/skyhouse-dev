<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LocationMap extends Model
{
    protected $primaryKey = 'uid';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'title',
        'image',
        'image_uid',
        'google_maps_link',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
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
     * Scope a query to only include active location maps.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get the map image from media library.
     */
    public function mapImage()
    {
        return $this->belongsTo(MediaLibrary::class, 'image_uid', 'uid');
    }
}
