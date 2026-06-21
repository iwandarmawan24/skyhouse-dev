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

class RecentEventsSheet implements FromQuery, WithTitle, WithHeadings, WithMapping, ShouldAutoSize, WithStyles
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

    public function query()
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
            ->orderByDesc('tracker_events.created_at');
    }

    public function map($row): array
    {
        return [
            $row->id,
            $row->created_at,
            $row->event_type,
            $row->event_target  ?? '—',
            $row->target_id     ?? '—',
            $row->target_label  ?? '—',
            $row->page_url      ?? '—',
            $row->referrer      ?? '—',
            $row->device_type   ?? '—',
            $row->browser       ?? '—',
            $row->os            ?? '—',
            $row->properties    ?? '—',
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => ['font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']], 'fill' => ['fillType' => 'solid', 'startColor' => ['rgb' => '1E3A8A']]],
        ];
    }
}
