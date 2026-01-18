<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Brochure extends Model
{
    protected $primaryKey = 'uid';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'file_uid',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Boot method to handle UUID generation
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($brochure) {
            if (empty($brochure->uid)) {
                $brochure->uid = (string) Str::uuid();
            }
        });
    }

    /**
     * Get the file from media library
     */
    public function file()
    {
        return $this->belongsTo(MediaLibrary::class, 'file_uid', 'uid');
    }

    /**
     * Scope active brochure
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
