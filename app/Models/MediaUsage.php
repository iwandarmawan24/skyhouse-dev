<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MediaUsage extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'media_usage';
    protected $primaryKey = 'uid';

    protected $fillable = [
        'media_uid',
        'used_in_type',
        'used_in_uid',
        'used_in_field',
        'last_used_at',
    ];

    protected $casts = [
        'last_used_at' => 'datetime',
    ];

    /**
     * Get the media
     */
    public function media()
    {
        return $this->belongsTo(MediaLibrary::class, 'media_uid', 'uid');
    }

    /**
     * Update last used timestamp
     */
    public function touch($attribute = null)
    {
        $this->last_used_at = now();
        $this->save();

        return parent::touch($attribute);
    }
}
