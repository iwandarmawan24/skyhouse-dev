<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Facility extends Model
{
    protected $primaryKey = 'uid';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'name',
        'description',
        'banner_image',
        'order',
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
     * Get facility images
     */
    public function images(): HasMany
    {
        return $this->hasMany(FacilityImage::class, 'facility_uid', 'uid')->orderBy('order');
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
