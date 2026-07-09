<?php

namespace App\Services;

use App\Helpers\UserAgentParser;
use App\Models\TrackerSession;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class VisitorSessionResolver
{
    /**
     * Find the session tied to the request's tracker_sid cookie, or create a new one.
     * Shared by the client-side /api/track endpoint and the server-side page_view middleware
     * so both write to the same session record.
     */
    public static function resolve(Request $request, ?string $landingPage = null, ?string $referrer = null, array $utm = []): TrackerSession
    {
        $sid = $request->cookie('tracker_sid');

        if ($sid && Str::isUuid($sid)) {
            $session = TrackerSession::find($sid);
            if ($session) {
                $session->update(['last_seen' => now()]);
                return $session;
            }
        }

        // Hash IP with a daily-rotating salt — raw IP never touches the DB or logs
        $dailySalt = hash('sha256', date('Y-m-d') . config('app.key'));
        $ipHash    = hash('sha256', ($request->ip() ?? '') . $dailySalt);

        $ua = UserAgentParser::parse($request->userAgent() ?? '');

        return TrackerSession::create([
            'id'           => Str::uuid()->toString(),
            'ip_hash'      => $ipHash,
            'device_type'  => $ua['device_type'],
            'browser'      => $ua['browser'],
            'os'           => $ua['os'],
            'landing_page' => $landingPage,
            'referrer'     => $referrer,
            'utm_source'   => $utm['utm_source'] ?? null,
            'utm_medium'   => $utm['utm_medium'] ?? null,
            'utm_campaign' => $utm['utm_campaign'] ?? null,
            'first_seen'   => now(),
            'last_seen'    => now(),
        ]);
    }
}
