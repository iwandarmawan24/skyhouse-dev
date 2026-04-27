<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class NewsPageInfo extends Model
{
    protected $table = 'news_page_info';
    protected $primaryKey = 'uid';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'banner_image_uid',
        'title',
        'subtitle',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->uid)) {
                $model->uid = (string) Str::uuid();
            }
        });
    }

    public function bannerImage()
    {
        return $this->belongsTo(MediaLibrary::class, 'banner_image_uid', 'uid');
    }
}
