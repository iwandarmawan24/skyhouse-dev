<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Setting extends Model
{
    protected $primaryKey = 'uid';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'key',
        'value',
        'type',
        'group',
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
     * Get setting value by key
     */
    public static function get(string $key, $default = null)
    {
        return Cache::remember("setting_{$key}", 3600, function () use ($key, $default) {
            $setting = self::where('key', $key)->first();
            return $setting ? $setting->value : $default;
        });
    }

    /**
     * Set setting value
     */
    public static function set(string $key, $value, string $type = 'text', string $group = 'general')
    {
        Cache::forget("setting_{$key}");

        return self::updateOrCreate(
            ['key' => $key],
            [
                'value' => $value,
                'type' => $type,
                'group' => $group,
            ]
        );
    }

    /**
     * Get all settings by group
     */
    public static function getGroup(string $group): array
    {
        return Cache::remember("settings_group_{$group}", 3600, function () use ($group) {
            return self::where('group', $group)
                ->pluck('value', 'key')
                ->toArray();
        });
    }

    /**
     * Clear all settings cache
     */
    public static function clearCache()
    {
        Cache::flush();
    }
}
