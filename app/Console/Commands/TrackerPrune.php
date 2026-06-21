<?php

namespace App\Console\Commands;

use App\Models\TrackerEvent;
use App\Models\TrackerSession;
use Illuminate\Console\Command;

class TrackerPrune extends Command
{
    protected $signature = 'tracker:prune {--days=90 : Retain data younger than this many days}';
    protected $description = 'Delete tracker events and orphaned sessions older than the retention window';

    public function handle(): int
    {
        $days      = (int) $this->option('days');
        $cutoff    = now()->subDays($days);

        $events   = TrackerEvent::where('created_at', '<', $cutoff)->delete();
        $sessions = TrackerSession::whereDoesntHave('events')
            ->where('last_seen', '<', $cutoff)
            ->delete();

        $this->info("Pruned {$events} events and {$sessions} orphaned sessions older than {$days} days.");

        return self::SUCCESS;
    }
}
