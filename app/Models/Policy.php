<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Policy extends Model
{
    protected $fillable = [
        'type',
        'content',
        'version',
    ];

    /**
     * Get terms and conditions
     */
    public static function terms()
    {
        return self::where('type', 'terms')->first();
    }

    /**
     * Get privacy policy
     */
    public static function privacy()
    {
        return self::where('type', 'privacy')->first();
    }

    /**
     * Update policy content
     */
    public static function updatePolicy(string $type, string $content, string $version = null)
    {
        $policy = self::where('type', $type)->first();

        if ($policy && $version) {
            $policy->update([
                'content' => $content,
                'version' => $version,
            ]);
        } else {
            self::updateOrCreate(
                ['type' => $type],
                [
                    'content' => $content,
                    'version' => $version ?? '1.0',
                ]
            );
        }
    }
}
