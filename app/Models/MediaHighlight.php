<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class MediaHighlight extends Model
{
    protected $primaryKey = 'uid';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'media_uid',
        'title',
        'publish_date',
        'image',
        'image_uid',
        'article_url',
    ];

    protected $casts = [
        'publish_date' => 'date',
    ];

    /**
     * Prepare a date for array / JSON serialization.
     */
    protected function serializeDate(\DateTimeInterface $date): string
    {
        return $date->format('Y-m-d');
    }

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
     * Get the media outlet
     */
    public function media(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'media_uid', 'uid');
    }

    /**
     * Get the highlight image from media library
     */
    public function highlightImage(): BelongsTo
    {
        return $this->belongsTo(MediaLibrary::class, 'image_uid', 'uid');
    }
}
