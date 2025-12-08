<?php

namespace App\Traits;

use Hashids\Hashids;

trait HasHashId
{
    /**
     * Get the HashID instance
     */
    protected function getHashIds(): Hashids
    {
        return new Hashids(config('app.key'), 10);
    }

    /**
     * Get the hashed ID attribute
     */
    public function getHashIdAttribute(): string
    {
        return $this->getHashIds()->encode($this->id);
    }

    /**
     * Get the UID attribute (alias for hash_id)
     */
    public function getUidAttribute(): string
    {
        return $this->hash_id;
    }

    /**
     * Find a model by hash ID
     */
    public static function findByHashId(string $hashId)
    {
        $hashids = new Hashids(config('app.key'), 10);
        $ids = $hashids->decode($hashId);

        if (empty($ids)) {
            return null;
        }

        return static::find($ids[0]);
    }

    /**
     * Find a model by hash ID or fail
     */
    public static function findByHashIdOrFail(string $hashId)
    {
        $model = static::findByHashId($hashId);

        if (!$model) {
            abort(404);
        }

        return $model;
    }

    /**
     * Scope to find by hash ID
     */
    public function scopeWhereHashId($query, string $hashId)
    {
        $hashids = new Hashids(config('app.key'), 10);
        $ids = $hashids->decode($hashId);

        if (empty($ids)) {
            return $query->whereRaw('1 = 0'); // Return empty query
        }

        return $query->where('id', $ids[0]);
    }

    /**
     * Get route key name (for route model binding)
     */
    public function getRouteKeyName(): string
    {
        return 'uid';
    }

    /**
     * Resolve route binding (for route model binding)
     */
    public function resolveRouteBinding($value, $field = null)
    {
        if ($field === 'uid' || $field === null) {
            return static::findByHashId($value);
        }

        return parent::resolveRouteBinding($value, $field);
    }
}
