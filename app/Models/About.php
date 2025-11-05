<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class About extends Model
{
    protected $table = 'about';

    protected $fillable = [
        'opening_statement',
        'vision',
        'mission',
        'milestones',
        'team',
    ];

    protected $casts = [
        'milestones' => 'array',
        'team' => 'array',
    ];

    /**
     * Get the about page content (singleton pattern)
     */
    public static function content()
    {
        return self::first() ?? self::create([
            'opening_statement' => 'Welcome to SkyHouse Property',
            'vision' => 'Our vision...',
            'mission' => 'Our mission...',
        ]);
    }
}
