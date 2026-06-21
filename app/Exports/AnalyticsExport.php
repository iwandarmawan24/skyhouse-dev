<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class AnalyticsExport implements WithMultipleSheets
{
    public function sheets(): array
    {
        return [
            new Sheets\SummarySheet(),
            new Sheets\SessionsSheet(),
            new Sheets\TopPagesSheet(),
            new Sheets\EventBreakdownSheet(),
            new Sheets\VisitorJourneySheet(),
            new Sheets\RecentEventsSheet(),
        ];
    }
}
