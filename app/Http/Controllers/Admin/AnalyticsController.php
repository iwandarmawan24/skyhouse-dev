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

        // --- Stat cards ---
        $eventTypes = [
            'page_view', 'contact_submit', 'wa_click',
            'download_click', 'contact_click',
            'article_view', 'media_highlight_click',
        ];

        $summary = [];
        foreach ($eventTypes as $type) {
            $q = DB::table('tracker_events')->where('event_type', $type);
            $summary[$type] = [
                'today' => (clone $q)->where('created_at', '>=', $today)->count(),
                'week'  => (clone $q)->where('created_at', '>=', $week)->count(),
                'month' => (clone $q)->where('created_at', '>=', $month)->count(),
            ];
        }

        // --- Unique sessions ---
        $uniqueSessions = [
            'today' => DB::table('tracker_sessions')->where('first_seen', '>=', $today)->count(),
            'week'  => DB::table('tracker_sessions')->where('first_seen', '>=', $week)->count(),
            'month' => DB::table('tracker_sessions')->where('first_seen', '>=', $month)->count(),
        ];

        // --- Top pages ---
        $topPages = DB::table('tracker_events')
            ->where('event_type', 'page_view')
            ->whereNotNull('page_url')
            ->select('page_url', DB::raw('count(*) as count'))
            ->groupBy('page_url')
            ->orderByDesc('count')
            ->limit(10)
            ->get();

        // --- Event breakdown (30 days) ---
        $eventBreakdown = DB::table('tracker_events')
            ->where('created_at', '>=', $month)
            ->select('event_type', DB::raw('count(*) as count'))
            ->groupBy('event_type')
            ->orderByDesc('count')
            ->get();

        // --- Device breakdown (sessions) ---
        $deviceBreakdown = DB::table('tracker_sessions')
            ->whereNotNull('device_type')
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

        // --- Recent events ---
        $recentEvents = DB::table('tracker_events')
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
            )
            ->orderByDesc('tracker_events.created_at')
            ->paginate(20);

        return Inertia::render('Admin/Analytics/Index', [
            'summary'         => $summary,
            'uniqueSessions'  => $uniqueSessions,
            'topPages'        => $topPages,
            'eventBreakdown'  => $eventBreakdown,
            'deviceBreakdown' => $deviceBreakdown,
            'sankeyData'      => $sankeyData,
            'recentEvents'    => $recentEvents,
        ]);
    }

    public function export()
    {
        $filename = 'analytics-' . now()->format('Y-m-d_His') . '.xlsx';

        return Excel::download(new AnalyticsExport(), $filename);
    }
}
