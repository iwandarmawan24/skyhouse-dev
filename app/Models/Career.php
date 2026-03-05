<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Career extends Model
{
    protected $primaryKey = 'uid';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'title',
        'position',
        'body',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    public function getRouteKeyName()
    {
        return 'uid';
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($career) {
            if (empty($career->uid)) {
                $career->uid = (string) Str::uuid();
            }

            if (is_null($career->order)) {
                $maxOrder = static::max('order') ?? -1;
                $career->order = $maxOrder + 1;
            }
        });
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc');
    }
}
