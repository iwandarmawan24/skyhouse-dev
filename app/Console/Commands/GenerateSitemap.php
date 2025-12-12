<?php

namespace App\Console\Commands;

use App\Services\SitemapService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate sitemap for the website';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('Generating sitemap...');

        try {
            $sitemap = app(SitemapService::class)->generate();

            // Cache the sitemap for 7 days
            Cache::put('sitemap', $sitemap->render(), now()->addDays(7));

            $this->info('Sitemap generated and cached successfully!');

            return Command::SUCCESS;
        } catch (\Exception $e) {
            $this->error('Failed to generate sitemap: ' . $e->getMessage());

            return Command::FAILURE;
        }
    }
}
