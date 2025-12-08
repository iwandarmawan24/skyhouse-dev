<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class MediaVariant extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'media_variants';
    protected $primaryKey = 'uid';

    protected $fillable = [
        'media_uid',
        'variant_name',
        'filepath',
        'width',
        'height',
        'file_size',
        'mime_type',
    ];

    protected $casts = [
        'width' => 'integer',
        'height' => 'integer',
        'file_size' => 'integer',
    ];

    protected $appends = ['url'];

    /**
     * Get the parent media
     */
    public function media()
    {
        return $this->belongsTo(MediaLibrary::class, 'media_uid', 'uid');
    }

    /**
     * Get full URL
     */
    public function getUrlAttribute()
    {
        if (str_starts_with($this->filepath, 'http')) {
            return $this->filepath;
        }

        $disk = $this->media->disk ?? 'public';
        return Storage::disk($disk)->url($this->filepath);
    }
}
