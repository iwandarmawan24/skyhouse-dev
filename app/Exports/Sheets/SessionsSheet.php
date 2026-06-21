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

class SessionsSheet implements FromQuery, WithTitle, WithHeadings, WithMapping, ShouldAutoSize, WithStyles
{
    public function title(): string
    {
        return 'Sessions';
    }

    public function headings(): array
    {
        return [
            'Session ID', 'Device', 'Browser', 'OS',
            'Landing Page', 'Referrer',
            'UTM Source', 'UTM Medium', 'UTM Campaign',
            'First Seen', 'Last Seen',
        ];
    }

    public function query()
    {
        return DB::table('tracker_sessions')->orderByDesc('first_seen');
    }

    public function map($row): array
    {
        return [
            $row->id,
            $row->device_type ?? '—',
            $row->browser     ?? '—',
            $row->os          ?? '—',
            $row->landing_page ?? '—',
            $row->referrer     ?? '—',
            $row->utm_source   ?? '—',
            $row->utm_medium   ?? '—',
            $row->utm_campaign ?? '—',
            $row->first_seen,
            $row->last_seen,
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => ['font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']], 'fill' => ['fillType' => 'solid', 'startColor' => ['rgb' => '1E3A8A']]],
        ];
    }
}
