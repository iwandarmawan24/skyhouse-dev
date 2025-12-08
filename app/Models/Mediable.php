<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mediable extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'mediables';
    protected $primaryKey = 'uid';

    protected $fillable = [
        'media_uid',
        'mediable_uid',
        'mediable_type',
        'field_name',
        'order',
    ];

    protected $casts = [
        'order' => 'integer',
    ];

    /**
     * Get the media
     */
    public function media()
    {
        return $this->belongsTo(MediaLibrary::class, 'media_uid', 'uid');
    }

    /**
     * Get the owning mediable model
     */
    public function mediable()
    {
        return $this->morphTo(__FUNCTION__, 'mediable_type', 'mediable_uid');
    }
}
