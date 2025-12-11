<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class MediaLibrary extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table = 'media_library';
    protected $primaryKey = 'uid';

    protected $fillable = [
        'filename',
        'filepath',
        'file_type',
        'mime_type',
        'file_size',
        'disk',
        'width',
        'height',
        'alt_text',
        'caption',
        'description',
        'metadata',
        'folder',
        'tags',
        'uploaded_by',
    ];

    protected $casts = [
        'metadata' => 'array',
        'tags' => 'array',
        'file_size' => 'integer',
        'width' => 'integer',
        'height' => 'integer',
    ];

    protected $appends = ['url', 'thumbnail_url', 'file_size_human'];

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName()
    {
        return 'uid';
    }

    /**
     * Get the user who uploaded this media
     */
    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by', 'uid');
    }

    /**
     * Get all variants for this media
     */
    public function variants()
    {
        return $this->hasMany(MediaVariant::class, 'media_uid', 'uid');
    }

    /**
     * Get specific variant
     */
    public function variant($name)
    {
        return $this->variants()->where('variant_name', $name)->first();
    }

    /**
     * Get all usage records
     */
    public function usage()
    {
        return $this->hasMany(MediaUsage::class, 'media_uid', 'uid');
    }

    /**
     * Polymorphic relationships
     */
    public function mediables()
    {
        return $this->hasMany(Mediable::class, 'media_uid', 'uid');
    }

    /**
     * Get full URL to the media file
     */
    public function getUrlAttribute()
    {
        if (str_starts_with($this->filepath, 'http')) {
            return $this->filepath;
        }

        return Storage::disk($this->disk)->url($this->filepath);
    }

    /**
     * Get thumbnail URL
     */
    public function getThumbnailUrlAttribute()
    {
        $thumbnail = $this->variant('thumbnail');

        if ($thumbnail) {
            if (str_starts_with($thumbnail->filepath, 'http')) {
                return $thumbnail->filepath;
            }
            return Storage::disk($this->disk)->url($thumbnail->filepath);
        }

        // Fallback to original if no thumbnail
        return $this->url;
    }

    /**
     * Get human readable file size
     */
    public function getFileSizeHumanAttribute()
    {
        $bytes = $this->file_size;
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];

        for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
            $bytes /= 1024;
        }

        return round($bytes, 2) . ' ' . $units[$i];
    }

    /**
     * Scope for images only
     */
    public function scopeImages($query)
    {
        return $query->where('file_type', 'image');
    }

    /**
     * Scope for videos only
     */
    public function scopeVideos($query)
    {
        return $query->where('file_type', 'video');
    }

    /**
     * Scope for documents only
     */
    public function scopeDocuments($query)
    {
        return $query->where('file_type', 'document');
    }

    /**
     * Scope for searching
     */
    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('filename', 'ilike', "%{$search}%")
              ->orWhere('alt_text', 'ilike', "%{$search}%")
              ->orWhere('caption', 'ilike', "%{$search}%")
              ->orWhere('description', 'ilike', "%{$search}%");
        });
    }

    /**
     * Check if media is being used
     */
    public function isInUse()
    {
        return $this->usage()->exists() || $this->mediables()->exists();
    }

    /**
     * Get usage count
     */
    public function getUsageCount()
    {
        return $this->usage()->count();
    }

    /**
     * Delete media file and all variants from storage
     */
    public function deleteFiles()
    {
        // Delete original file
        if (Storage::disk($this->disk)->exists($this->filepath)) {
            Storage::disk($this->disk)->delete($this->filepath);
        }

        // Delete all variants
        foreach ($this->variants as $variant) {
            if (Storage::disk($this->disk)->exists($variant->filepath)) {
                Storage::disk($this->disk)->delete($variant->filepath);
            }
        }
    }

    /**
     * Boot method
     */
    protected static function boot()
    {
        parent::boot();

        // When deleting, also delete files from storage
        static::deleting(function ($media) {
            if ($media->isForceDeleting()) {
                $media->deleteFiles();
            }
        });
    }
}
