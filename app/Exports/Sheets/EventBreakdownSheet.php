<?php

namespace App\Exports\Sheets;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class EventBreakdownSheet implements FromArray, WithTitle, WithHeadings, ShouldAutoSize, WithStyles
{
    public function title(): string
    {
        return 'Event Breakdown';
    }

    public function headings(): array
    {
        return ['Event Type', 'Event Target', 'Count (30d)', 'Count (7d)', 'Count (Today)', 'Count (All Time)'];
    }

    public function array(): array
    {
        $now   = now();
        $today = $now->copy()->startOfDay();
        $week  = $now->copy()->subDays(7);
        $month = $now->copy()->subDays(30);

        $rows = DB::table('tracker_events')
            ->select('event_type', 'event_target', DB::raw('count(*) as total'))
            ->groupBy('event_type', 'event_target')
            ->orderByDesc('total')
            ->get();

        return $rows->map(function ($row) use ($today, $week, $month) {
            $base = DB::table('tracker_events')
                ->where('event_type', $row->event_type)
                ->where(function ($q) use ($row) {
                    $row->event_target
                        ? $q->where('event_target', $row->event_target)
                        : $q->whereNull('event_target');
                });

            return [
                $row->event_type,
                $row->event_target ?? '—',
                (clone $base)->where('created_at', '>=', $month)->count(),
                (clone $base)->where('created_at', '>=', $week)->count(),
                (clone $base)->where('created_at', '>=', $today)->count(),
                $row->total,
            ];
        })->toArray();
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => ['font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']], 'fill' => ['fillType' => 'solid', 'startColor' => ['rgb' => '1E3A8A']]],
        ];
    }
}
