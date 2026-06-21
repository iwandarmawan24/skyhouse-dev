<?php

namespace App\Exports\Sheets;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class RecentEventsSheet implements FromArray, WithTitle, WithHeadings, ShouldAutoSize, WithStyles
{
    public function title(): string
    {
        return 'All Events';
    }

    public function headings(): array
    {
        return [
            'ID', 'Timestamp', 'Event Type', 'Target Category', 'Target ID', 'Target Label',
            'Page URL', 'Referrer', 'Device', 'Browser', 'OS', 'Properties',
        ];
    }

    public function array(): array
    {
        return DB::table('tracker_events')
            ->leftJoin('tracker_sessions', 'tracker_events.session_id', '=', 'tracker_sessions.id')
            ->select(
                'tracker_events.id',
                'tracker_events.created_at',
                'tracker_events.event_type',
                'tracker_events.event_target',
                'tracker_events.target_id',
                'tracker_events.target_label',
                'tracker_events.page_url',
                'tracker_events.referrer',
                'tracker_events.properties',
                'tracker_sessions.device_type',
                'tracker_sessions.browser',
                'tracker_sessions.os',
            )
            ->orderByDesc('tracker_events.created_at')
            ->get()
            ->map(fn($r) => [
                $r->id,
                $r->created_at,
                $r->event_type,
                $r->event_target  ?? '—',
                $r->target_id     ?? '—',
                $r->target_label  ?? '—',
                $r->page_url      ?? '—',
                $r->referrer      ?? '—',
                $r->device_type   ?? '—',
                $r->browser       ?? '—',
                $r->os            ?? '—',
                is_string($r->properties) ? $r->properties : json_encode($r->properties),
            ])
            ->toArray();
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => ['font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']], 'fill' => ['fillType' => 'solid', 'startColor' => ['rgb' => '1E3A8A']]],
        ];
    }
}
