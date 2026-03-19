<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConstructionProgress extends Model
{
    protected $table = 'construction_progress';
    protected $primaryKey = 'uid';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'title',
        'description',
        'image',
        'image_uid',
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
     * Scope a query to only include active records.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get the image from media library.
     */
    public function progressImage()
    {
        return $this->belongsTo(MediaLibrary::class, 'image_uid', 'uid');
    }
}
