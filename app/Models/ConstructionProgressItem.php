<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConstructionProgressItem extends Model
{
    protected $table = 'construction_progress_items';
    protected $primaryKey = 'uid';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'construction_progress_uid',
        'progress_date',
        'image_uid',
        'is_active',
    ];

    protected $casts = [
        'progress_date' => 'date',
        'is_active' => 'boolean',
    ];

    public function getRouteKeyName()
    {
        return 'uid';
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->uid)) {
                $model->uid = (string) \Illuminate\Support\Str::uuid();
            }
        });
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function constructionProgress()
    {
        return $this->belongsTo(ConstructionProgress::class, 'construction_progress_uid', 'uid');
    }

    public function itemImage()
    {
        return $this->belongsTo(MediaLibrary::class, 'image_uid', 'uid');
    }
}
