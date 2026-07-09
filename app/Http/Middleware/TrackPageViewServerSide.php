<?php

namespace App\Http\Middleware;

use App\Models\TrackerEvent;
use App\Services\VisitorSessionResolver;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Records a page_view_server event for every frontend page hit, independent of
 * whether the client-side tracker.js actually ran. Companion to the client-side
 * page_view event (resources/js/tracker.js) — kept as a separate event_type so
 * the two sources can be compared rather than merged.
 */
class TrackPageViewServerSide
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if ($this->shouldTrack($request, $response)) {
            $pageUrl  = '/' . ltrim($request->path(), '/') . ($request->getQueryString() ? '?' . $request->getQueryString() : '');
            $referrer = $request->header('referer');

            $session = VisitorSessionResolver::resolve($request, $pageUrl, $referrer);

            TrackerEvent::create([
                'session_id'   => $session->id,
                'event_type'   => 'page_view_server',
                'event_target' => 'page',
                'page_url'     => $pageUrl,
                'referrer'     => $referrer,
                'created_at'   => now(),
            ]);

            $response->headers->setCookie(
                cookie('tracker_sid', $session->id, 30, '/', null, false, true)
            );
        }

        return $response;
    }

    private function shouldTrack(Request $request, Response $response): bool
    {
        if (! $request->isMethod('get')) return false;
        if ($request->is('admin*')) return false;
        if ($request->is('api/*')) return false;
        if ($request->is('up')) return false;
        if ($response->getStatusCode() >= 400) return false;

        return true;
    }
}
