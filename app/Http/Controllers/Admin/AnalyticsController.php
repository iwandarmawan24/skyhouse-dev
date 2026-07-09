<?php

namespace App\Http\Controllers\Admin;

use App\Exports\AnalyticsExport;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class AnalyticsController extends Controller
{
    public function index()
    {
        $now   = now();
        $today = $now->copy()->startOfDay();
        $week  = $now->copy()->subDays(7);
        $month = $now->copy()->subDays(30);

        // --- Stat cards (frontend visitor traffic only — admin dashboard clicks excluded) ---
        $eventTypes = [
            'page_view', 'page_view_server', 'contact_submit', 'wa_click',
            'download_click', 'contact_click',
            'article_view', 'media_highlight_click',
            'outbound_link', 'nav_click', 'button_click',
            'phone_click', 'email_click', 'form_submit',
            'scroll_depth', 'time_on_page', 'copy',
        ];

        $summary = [];
        foreach ($eventTypes as $type) {
            $q = DB::table('tracker_events')
                ->where('event_type', $type)
                ->where('page_url', 'not like', '/admin%');
            $summary[$type] = [
                'today' => (clone $q)->where('created_at', '>=', $today)->count(),
                'week'  => (clone $q)->where('created_at', '>=', $week)->count(),
                'month' => (clone $q)->where('created_at', '>=', $month)->count(),
            ];
        }

        // --- Unique sessions (frontend visitors — landing page not an admin route) ---
        $frontendSessions = DB::table('tracker_sessions')
            ->where(function ($q) {
                $q->whereNull('landing_page')->orWhere('landing_page', 'not like', '/admin%');
            });

        $uniqueSessions = [
            'today' => (clone $frontendSessions)->where('first_seen', '>=', $today)->count(),
            'week'  => (clone $frontendSessions)->where('first_seen', '>=', $week)->count(),
            'month' => (clone $frontendSessions)->where('first_seen', '>=', $month)->count(),
        ];

        // --- Top pages (frontend only, counts either page_view source) ---
        $topPages = DB::table('tracker_events')
            ->whereIn('event_type', ['page_view', 'page_view_server'])
            ->whereNotNull('page_url')
            ->where('page_url', 'not like', '/admin%')
            ->select('page_url', DB::raw('count(*) as count'))
            ->groupBy('page_url')
            ->orderByDesc('count')
            ->limit(10)
            ->get();

        // --- Event breakdown (30 days, frontend only) ---
        $eventBreakdown = DB::table('tracker_events')
            ->where('created_at', '>=', $month)
            ->where('page_url', 'not like', '/admin%')
            ->select('event_type', DB::raw('count(*) as count'))
            ->groupBy('event_type')
            ->orderByDesc('count')
            ->get();

        // --- Device breakdown (frontend sessions only) ---
        $deviceBreakdown = DB::table('tracker_sessions')
            ->whereNotNull('device_type')
            ->where(function ($q) {
                $q->whereNull('landing_page')->orWhere('landing_page', 'not like', '/admin%');
            })
            ->select('device_type', 'browser', 'os', DB::raw('count(*) as count'))
            ->groupBy('device_type', 'browser', 'os')
            ->orderByDesc('count')
            ->get();

        // --- Sankey: visitor journey transitions ---
        // Builds source→target flow by looking at consecutive events per session
        $sankeyRaw = DB::select("
            WITH ordered AS (
                SELECT
                    session_id,
                    event_type || COALESCE(':' || event_target, '') AS node,
                    LAG(event_type || COALESCE(':' || event_target, '')) OVER (
                        PARTITION BY session_id ORDER BY created_at, id
                    ) AS prev_node
                FROM tracker_events
                WHERE created_at >= NOW() - INTERVAL '30 days'
                  AND page_url NOT LIKE '/admin%'
            ),
            flows AS (
                SELECT
                    prev_node  AS source,
                    node       AS target,
                    COUNT(DISTINCT session_id) AS value
                FROM ordered
                WHERE prev_node IS NOT NULL
                  AND prev_node <> node
                GROUP BY source, target
            )
            SELECT source, target, value::int
            FROM flows
            WHERE value >= 2
            ORDER BY value DESC
            LIMIT 80
        ");

        // Build unique node list from the flow edges
        $nodeSet = [];
        foreach ($sankeyRaw as $row) {
            $nodeSet[$row->source] = true;
            $nodeSet[$row->target] = true;
        }
        $nodeNames  = array_values(array_keys($nodeSet));
        $nodeIndex  = array_flip($nodeNames);

        $sankeyData = [
            'nodes' => array_map(fn($n) => ['name' => $n], $nodeNames),
            'links' => array_map(fn($r) => [
                'source' => $nodeIndex[$r->source],
                'target' => $nodeIndex[$r->target],
                'value'  => $r->value,
            ], $sankeyRaw),
        ];

        // --- Recent events (split: frontend visitors vs admin dashboard activity) ---
        $recentEventsBase = DB::table('tracker_events')
            ->leftJoin('tracker_sessions', 'tracker_events.session_id', '=', 'tracker_sessions.id')
            ->select(
                'tracker_events.id',
                'tracker_events.event_type',
                'tracker_events.event_target',
                'tracker_events.target_label',
                'tracker_events.page_url',
                'tracker_events.properties',
                'tracker_events.created_at',
                'tracker_sessions.device_type',
                'tracker_sessions.browser',
                'tracker_sessions.os',
            );

        $recentEvents = (clone $recentEventsBase)
            ->where('tracker_events.page_url', 'not like', '/admin%')
            ->orderByDesc('tracker_events.created_at')
            ->paginate(20, ['*'], 'frontend_page');

        $recentAdminEvents = (clone $recentEventsBase)
            ->where('tracker_events.page_url', 'like', '/admin%')
            ->orderByDesc('tracker_events.created_at')
            ->paginate(20, ['*'], 'admin_page');

        return Inertia::render('Admin/Analytics/Index', [
            'summary'           => $summary,
            'uniqueSessions'    => $uniqueSessions,
            'topPages'          => $topPages,
            'eventBreakdown'    => $eventBreakdown,
            'deviceBreakdown'   => $deviceBreakdown,
            'sankeyData'        => $sankeyData,
            'recentEvents'      => $recentEvents,
            'recentAdminEvents' => $recentAdminEvents,
        ]);
    }

    public function export()
    {
        $filename = 'analytics-' . now()->format('Y-m-d_His') . '.xlsx';

        return Excel::download(new AnalyticsExport(), $filename);
    }
}
