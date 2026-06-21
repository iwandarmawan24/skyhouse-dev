<?php

namespace App\Exports\Sheets;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class TopPagesSheet implements FromArray, WithTitle, WithHeadings, ShouldAutoSize, WithStyles
{
    public function title(): string
    {
        return 'Top Pages';
    }

    public function headings(): array
    {
        return ['Page URL', 'All Time', '30 Days', '7 Days', 'Today'];
    }

    public function array(): array
    {
        $rows = DB::select("
            SELECT
                page_url,
                COUNT(*) AS total,
                COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') AS month,
                COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days')  AS week,
                COUNT(*) FILTER (WHERE created_at >= DATE_TRUNC('day', NOW()))   AS today
            FROM tracker_events
            WHERE event_type = 'page_view'
              AND page_url IS NOT NULL
            GROUP BY page_url
            ORDER BY total DESC
            LIMIT 100
        ");

        return array_map(fn($r) => [
            $r->page_url,
            $r->total,
            $r->month,
            $r->week,
            $r->today,
        ], $rows);
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => ['font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']], 'fill' => ['fillType' => 'solid', 'startColor' => ['rgb' => '1E3A8A']]],
        ];
    }
}
