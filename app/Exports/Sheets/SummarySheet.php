<?php

namespace App\Exports\Sheets;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class SummarySheet implements FromArray, WithTitle, WithHeadings, ShouldAutoSize, WithStyles
{
    public function title(): string
    {
        return 'Summary';
    }

    public function headings(): array
    {
        return ['Event Type', 'Today', 'Last 7 Days', 'Last 30 Days', 'All Time'];
    }

    public function array(): array
    {
        $now   = now();
        $today = $now->copy()->startOfDay();
        $week  = $now->copy()->subDays(7);
        $month = $now->copy()->subDays(30);

        $types = [
            'page_view'             => 'Page View',
            'contact_submit'        => 'Contact Submit',
            'wa_click'              => 'WhatsApp Click',
            'download_click'        => 'Brochure Download',
            'contact_click'         => 'Unit → Contact',
            'article_view'          => 'Article View',
            'media_highlight_click' => 'Media Highlight Click',
            'click'                 => 'Generic Click',
        ];

        $rows = [];
        foreach ($types as $type => $label) {
            $q = DB::table('tracker_events')->where('event_type', $type);
            $rows[] = [
                $label,
                (clone $q)->where('created_at', '>=', $today)->count(),
                (clone $q)->where('created_at', '>=', $week)->count(),
                (clone $q)->where('created_at', '>=', $month)->count(),
                (clone $q)->count(),
            ];
        }

        // Totals row
        $rows[] = [''];
        $q = DB::table('tracker_events');
        $rows[] = [
            'TOTAL (all events)',
            (clone $q)->where('created_at', '>=', $today)->count(),
            (clone $q)->where('created_at', '>=', $week)->count(),
            (clone $q)->where('created_at', '>=', $month)->count(),
            (clone $q)->count(),
        ];

        $rows[] = [''];
        $rows[] = ['Unique Sessions', '', '', '', ''];

        $s = DB::table('tracker_sessions');
        $rows[] = [
            'Sessions (new visitors)',
            (clone $s)->where('first_seen', '>=', $today)->count(),
            (clone $s)->where('first_seen', '>=', $week)->count(),
            (clone $s)->where('first_seen', '>=', $month)->count(),
            (clone $s)->count(),
        ];

        $rows[] = [''];
        $rows[] = ['Export generated at: ' . now()->format('Y-m-d H:i:s') . ' WIB'];

        return $rows;
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => ['font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']], 'fill' => ['fillType' => 'solid', 'startColor' => ['rgb' => '1E3A8A']]],
        ];
    }
}
