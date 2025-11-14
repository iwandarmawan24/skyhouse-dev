<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Media extends Model
{
    protected $table = 'media';
    protected $primaryKey = 'uid';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'name',
        'logo',
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
                $model->uid = (string) Str::uuid();
            }
        });
    }

    /**
     * Get media highlights for this media
     */
    public function highlights(): HasMany
    {
        return $this->hasMany(MediaHighlight::class, 'media_uid', 'uid');
    }

    /**
     * Scope active media
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
