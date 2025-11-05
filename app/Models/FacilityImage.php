<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FacilityImage extends Model
{
    protected $fillable = [
        'facility_id',
        'image_path',
        'order',
    ];

    /**
     * Get the facility that owns the image
     */
    public function facility(): BelongsTo
    {
        return $this->belongsTo(Facility::class);
    }
}
