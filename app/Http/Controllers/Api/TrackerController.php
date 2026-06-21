<?php

namespace App\Http\Controllers\Api;

use App\Helpers\UserAgentParser;
use App\Http\Controllers\Controller;
use App\Models\TrackerEvent;
use App\Models\TrackerSession;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TrackerController extends Controller
{
    public function track(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'event_type'   => 'required|string|max:60',
            'event_target' => 'nullable|string|max:60',
            'target_id'    => 'nullable|string|max:100',
            'target_label' => 'nullable|string|max:200',
            'page_url'     => 'nullable|string|max:1000',
            'referrer'     => 'nullable|string|max:1000',
            'properties'   => 'nullable|array',
        ]);

        $session = $this->resolveSession($request, $validated);

        TrackerEvent::create([
            'session_id'   => $session->id,
            'event_type'   => $validated['event_type'],
            'event_target' => $validated['event_target'] ?? null,
            'target_id'    => $validated['target_id'] ?? null,
            'target_label' => $validated['target_label'] ?? null,
            'page_url'     => $validated['page_url'] ?? null,
            'referrer'     => $validated['referrer'] ?? null,
            'properties'   => $validated['properties'] ?? null,
            'created_at'   => now(),
        ]);

        // Slide cookie 30 minutes on every hit
        return response()
            ->json(['ok' => true])
            ->cookie('tracker_sid', $session->id, 30, '/', null, false, true);
    }

    private function resolveSession(Request $request, array $validated): TrackerSession
    {
        $sid = $request->cookie('tracker_sid');

        if ($sid) {
            $session = TrackerSession::find($sid);
            if ($session) {
                $session->update(['last_seen' => now()]);
                return $session;
            }
        }

        // Hash IP with a daily-rotating salt — raw IP never touches the DB or logs
        $dailySalt = hash('sha256', date('Y-m-d') . config('app.key'));
        $ipHash    = hash('sha256', ($request->ip() ?? '') . $dailySalt);

        // Parse UA, discard the raw string immediately after
        $ua = UserAgentParser::parse($request->userAgent() ?? '');

        $props = $validated['properties'] ?? [];

        return TrackerSession::create([
            'id'           => Str::uuid()->toString(),
            'ip_hash'      => $ipHash,
            'device_type'  => $ua['device_type'],
            'browser'      => $ua['browser'],
            'os'           => $ua['os'],
            'landing_page' => $validated['page_url'] ?? null,
            'referrer'     => $validated['referrer'] ?? null,
            'utm_source'   => $props['utm_source'] ?? null,
            'utm_medium'   => $props['utm_medium'] ?? null,
            'utm_campaign' => $props['utm_campaign'] ?? null,
            'first_seen'   => now(),
            'last_seen'    => now(),
        ]);
    }
}
