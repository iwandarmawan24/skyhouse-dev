<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Faq extends Model
{
    protected $primaryKey = 'uid';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'question',
        'answer',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName()
    {
        return 'uid';
    }

    /**
     * Boot method to handle UUID generation
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($faq) {
            if (empty($faq->uid)) {
                $faq->uid = (string) Str::uuid();
            }

            // Auto-set order to be the last
            if (is_null($faq->order)) {
                $maxOrder = static::max('order') ?? -1;
                $faq->order = $maxOrder + 1;
            }
        });
    }

    /**
     * Scope active FAQs
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope ordered FAQs
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc');
    }
}
