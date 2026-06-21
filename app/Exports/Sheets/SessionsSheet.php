<?php

namespace App\Exports\Sheets;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class SessionsSheet implements FromArray, WithTitle, WithHeadings, ShouldAutoSize, WithStyles
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

    public function array(): array
    {
        return DB::table('tracker_sessions')
            ->orderByDesc('first_seen')
            ->get()
            ->map(fn($r) => [
                $r->id,
                $r->device_type  ?? '—',
                $r->browser      ?? '—',
                $r->os           ?? '—',
                $r->landing_page ?? '—',
                $r->referrer     ?? '—',
                $r->utm_source   ?? '—',
                $r->utm_medium   ?? '—',
                $r->utm_campaign ?? '—',
                $r->first_seen,
                $r->last_seen,
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
