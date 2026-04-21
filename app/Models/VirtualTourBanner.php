<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class VirtualTourBanner extends Model
{
    protected $primaryKey = 'uid';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'image_uid',
        'url',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($banner) {
            if (empty($banner->uid)) {
                $banner->uid = (string) Str::uuid();
            }
        });
    }

    public function image()
    {
        return $this->belongsTo(MediaLibrary::class, 'image_uid', 'uid');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
