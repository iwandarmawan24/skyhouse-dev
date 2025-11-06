<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductImage extends Model
{
    protected $primaryKey = 'uid';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'product_uid',
        'image_path',
        'order',
        'is_primary',
    ];

    protected $casts = [
        'is_primary' => 'boolean',
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
     * Get the product that owns the image
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_uid', 'uid');
    }

    /**
     * Scope primary image
     */
    public function scopePrimary($query)
    {
        return $query->where('is_primary', true);
    }
}
