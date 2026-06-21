<?php

namespace App\Helpers;

// Minimal regex-based UA parser. No Composer dep needed.
// Returns only device_type / browser / os — raw string is NEVER stored.
class UserAgentParser
{
    public static function parse(string $ua): array
    {
        return [
            'device_type' => self::device($ua),
            'browser'     => self::browser($ua),
            'os'          => self::os($ua),
        ];
    }

    private static function device(string $ua): string
    {
        if (preg_match('/tablet|ipad|playbook|silk/i', $ua)) return 'tablet';
        if (preg_match('/mobile|android|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/i', $ua)) return 'mobile';
        return 'desktop';
    }

    private static function browser(string $ua): string
    {
        // Order matters — Edge and Opera ship Chromium tokens, check them first
        if (preg_match('/Edg(?:e|\/)/i', $ua))    return 'Edge';
        if (preg_match('/OPR\//i', $ua))           return 'Opera';
        if (preg_match('/SamsungBrowser/i', $ua))  return 'Samsung';
        if (preg_match('/Chrome\//i', $ua))        return 'Chrome';
        if (preg_match('/Firefox\//i', $ua))       return 'Firefox';
        if (preg_match('/Safari\//i', $ua))        return 'Safari';
        if (preg_match('/MSIE|Trident/i', $ua))    return 'IE';
        return 'Other';
    }

    private static function os(string $ua): string
    {
        if (preg_match('/Windows NT/i', $ua))        return 'Windows';
        if (preg_match('/iPhone|iPad|iPod/i', $ua)) return 'iOS';
        if (preg_match('/Android/i', $ua))           return 'Android';
        if (preg_match('/Mac OS X/i', $ua))         return 'macOS';
        if (preg_match('/Linux/i', $ua))             return 'Linux';
        if (preg_match('/CrOS/i', $ua))             return 'ChromeOS';
        return 'Other';
    }
}
