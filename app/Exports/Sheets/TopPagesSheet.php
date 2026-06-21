<?php

namespace App\Exports\Sheets;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class TopPagesSheet implements FromQuery, WithTitle, WithHeadings, WithMapping, ShouldAutoSize, WithStyles
{
    public function title(): string
    {
        return 'Top Pages';
    }

    public function headings(): array
    {
        return ['Page URL', 'Total Views', 'Last 30 Days', 'Last 7 Days', 'Today'];
    }

    public function query()
    {
        return DB::table('tracker_events')
            ->where('event_type', 'page_view')
            ->whereNotNull('page_url')
            ->select('page_url', DB::raw('count(*) as total'))
            ->groupBy('page_url')
            ->orderByDesc('total');
    }

    public function map($row): array
    {
        $now   = now();
        $today = $now->copy()->startOfDay();
        $week  = $now->copy()->subDays(7);
        $month = $now->copy()->subDays(30);

        $base = DB::table('tracker_events')
            ->where('event_type', 'page_view')
            ->where('page_url', $row->page_url);

        return [
            $row->page_url,
            $row->total,
            (clone $base)->where('created_at', '>=', $month)->count(),
            (clone $base)->where('created_at', '>=', $week)->count(),
            (clone $base)->where('created_at', '>=', $today)->count(),
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => ['font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']], 'fill' => ['fillType' => 'solid', 'startColor' => ['rgb' => '1E3A8A']]],
        ];
    }
}
