<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Contact extends Model
{
    protected $primaryKey = 'uid';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'subject',
        'product_uid',
        'message',
        'is_read',
    ];

    protected $casts = [
        'is_read' => 'boolean',
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
     * Get the product this contact is interested in
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_uid', 'uid');
    }

    /**
     * Scope unread contacts
     */
    public function scopeUnread($query)
    {
        return $query->where('is_read', false);
    }

    /**
     * Scope recent contacts
     */
    public function scopeRecent($query)
    {
        return $query->orderBy('created_at', 'desc');
    }

    /**
     * Mark as read
     */
    public function markAsRead()
    {
        $this->update(['is_read' => true]);
    }
}
