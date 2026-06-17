<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class HomepageExperience extends Model
{
    protected $table = 'homepage_experience';
    protected $primaryKey = 'uid';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'main_description',
        'card_daily_title',
        'card_daily_description',
        'card_entertainment_title',
        'card_entertainment_description',
        'card_university_title',
        'card_university_description',
        'card_business_title',
        'card_business_description',
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
}
