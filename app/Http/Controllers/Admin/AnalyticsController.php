<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AnalyticsController extends Controller
{
    public function index()
    {
        $now   = now();
        $today = $now->copy()->startOfDay();
        $week  = $now->copy()->subDays(7);
        $month = $now->copy()->subDays(30);

        $eventTypes = [
            'page_view', 'contact_submit', 'whatsapp_click',
            'brochure_download', 'unit_contact', 'unit_brochure',
            'article_view', 'media_highlight_click',
        ];

        $summary = [];
        foreach ($eventTypes as $type) {
            $summary[$type] = [
                'today'   => DB::table('tracker_events')->where('event_type', $type)->where('created_at', '>=', $today)->count(),
                'week'    => DB::table('tracker_events')->where('event_type', $type)->where('created_at', '>=', $week)->count(),
                'month'   => DB::table('tracker_events')->where('event_type', $type)->where('created_at', '>=', $month)->count(),
                'total'   => DB::table('tracker_events')->where('event_type', $type)->count(),
            ];
        }

        $topPages = DB::table('tracker_events')
            ->where('event_type', 'page_view')
            ->whereNotNull('page_url')
            ->select('page_url', DB::raw('count(*) as count'))
            ->groupBy('page_url')
            ->orderByDesc('count')
            ->limit(10)
            ->get();

        $eventBreakdown = DB::table('tracker_events')
            ->where('created_at', '>=', $month)
            ->select('event_type', DB::raw('count(*) as count'))
            ->groupBy('event_type')
            ->orderByDesc('count')
            ->get();

        $uniqueVisitors = [
            'today' => DB::table('tracker_events')->where('created_at', '>=', $today)->distinct('ip_address')->count('ip_address'),
            'week'  => DB::table('tracker_events')->where('created_at', '>=', $week)->distinct('ip_address')->count('ip_address'),
            'month' => DB::table('tracker_events')->where('created_at', '>=', $month)->distinct('ip_address')->count('ip_address'),
        ];

        $recentEvents = DB::table('tracker_events')
            ->orderByDesc('created_at')
            ->paginate(20);

        return Inertia::render('Admin/Analytics/Index', [
            'summary'        => $summary,
            'topPages'       => $topPages,
            'eventBreakdown' => $eventBreakdown,
            'uniqueVisitors' => $uniqueVisitors,
            'recentEvents'   => $recentEvents,
        ]);
    }
}
