<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class TopSales extends Model
{
    protected $table = 'top_sales';
    protected $primaryKey = 'uid';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'name',
        'position',
        'image_uid',
        'is_active',
    ];

    protected $casts = [
        'position' => 'integer',
        'is_active' => 'boolean',
    ];

    protected $appends = [
        'image_url',
    ];

    /**
     * Boot method to handle UUID generation
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($topSales) {
            if (empty($topSales->uid)) {
                $topSales->uid = (string) Str::uuid();
            }
        });
    }

    /**
     * Get the media image
     */
    public function mediaImage(): BelongsTo
    {
        return $this->belongsTo(MediaLibrary::class, 'image_uid', 'uid');
    }

    /**
     * Get image URL from media library
     */
    public function getImageUrlAttribute()
    {
        return $this->mediaImage?->url;
    }

    /**
     * Scope to get active top sales
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to order by position
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('position', 'asc');
    }

    /**
     * Get the next available position
     */
    public static function getNextPosition(): int
    {
        $maxPosition = self::max('position');
        return $maxPosition ? $maxPosition + 1 : 1;
    }

    /**
     * Get available positions (filled positions + next position)
     */
    public static function getAvailablePositions(?string $excludeUid = null): array
    {
        $query = self::query();
        if ($excludeUid) {
            $query->where('uid', '!=', $excludeUid);
        }

        $filledPositions = $query->pluck('position')->toArray();
        $maxPosition = count($filledPositions) > 0 ? max($filledPositions) : 0;
        $nextPosition = $maxPosition + 1;

        // If excluding a uid (editing), we need to include current positions
        $positions = range(1, $nextPosition);

        return $positions;
    }

    /**
     * Shift positions down starting from a given position
     */
    public static function shiftPositionsDown(int $fromPosition, ?string $excludeUid = null): void
    {
        $query = self::where('position', '>=', $fromPosition);

        if ($excludeUid) {
            $query->where('uid', '!=', $excludeUid);
        }

        // Get all items that need to be shifted, ordered by position descending
        // to avoid unique constraint issues
        $items = $query->orderBy('position', 'desc')->get();

        foreach ($items as $item) {
            $item->position = $item->position + 1;
            $item->save();
        }
    }
}
