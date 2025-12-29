<?php

namespace App\Console\Commands;

use App\Models\Article;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class PublishScheduledArticles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'articles:publish-scheduled';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Publish articles that are scheduled for publication';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $now = now();

        // Find articles that are scheduled to be published
        $articles = Article::where('is_published', false)
            ->whereNotNull('scheduled_at')
            ->where('scheduled_at', '<=', $now)
            ->get();

        if ($articles->isEmpty()) {
            $this->info('No articles scheduled for publication at this time.');
            return 0;
        }

        $count = 0;

        foreach ($articles as $article) {
            try {
                $article->update([
                    'is_published' => true,
                    'published_at' => $article->scheduled_at,
                    'status' => 'published',
                ]);

                $count++;

                Log::info('Article published via scheduler', [
                    'article_uid' => $article->uid,
                    'title' => $article->title,
                    'scheduled_at' => $article->scheduled_at,
                    'published_at' => $article->published_at,
                ]);

                $this->info("Published: {$article->title}");
            } catch (\Exception $e) {
                Log::error('Failed to publish scheduled article', [
                    'article_uid' => $article->uid,
                    'title' => $article->title,
                    'error' => $e->getMessage(),
                ]);

                $this->error("Failed to publish: {$article->title} - {$e->getMessage()}");
            }
        }

        $this->info("Total articles published: {$count}");

        return 0;
    }
}
