<?php

namespace App\Exports\Sheets;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class VisitorJourneySheet implements FromArray, WithTitle, WithHeadings, ShouldAutoSize, WithStyles
{
    public function title(): string
    {
        return 'Visitor Journey';
    }

    public function headings(): array
    {
        return ['From (Source)', 'To (Target)', 'Unique Sessions', 'Period'];
    }

    public function array(): array
    {
        $rows = DB::select("
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
            ORDER BY value DESC
            LIMIT 200
        ");

        return array_map(
            fn($r) => [$r->source, $r->target, $r->value, 'Last 30 days'],
            $rows
        );
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => ['font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']], 'fill' => ['fillType' => 'solid', 'startColor' => ['rgb' => '1E3A8A']]],
        ];
    }
}
