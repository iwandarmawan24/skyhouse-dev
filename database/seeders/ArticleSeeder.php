<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\User;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();

        $articles = [
            [
                'article_category_id' => 1,
                'user_id' => $user->id,
                'title' => '10 Tips Memilih Rumah Idaman',
                'excerpt' => 'Panduan lengkap memilih rumah yang tepat untuk keluarga Anda',
                'content' => '<p>Membeli rumah adalah investasi besar. Berikut 10 tips untuk memilih rumah idaman...</p>',
                'featured_image' => 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
                'tags' => ['rumah', 'tips', 'properti'],
                'is_featured' => true,
                'is_published' => true,
                'published_at' => now()->subDays(5),
            ],
            [
                'article_category_id' => 3,
                'user_id' => $user->id,
                'title' => 'Investasi Properti untuk Pemula',
                'excerpt' => 'Cara memulai investasi properti dengan modal terbatas',
                'content' => '<p>Investasi properti tidak selalu memerlukan modal besar...</p>',
                'featured_image' => 'https://images.unsplash.com/photo-1554224311-9632166d5da5?w=800',
                'tags' => ['investasi', 'properti', 'pemula'],
                'is_featured' => true,
                'is_published' => true,
                'published_at' => now()->subDays(3),
            ],
            [
                'article_category_id' => 4,
                'user_id' => $user->id,
                'title' => 'Desain Interior Minimalis Modern',
                'excerpt' => 'Inspirasi desain interior untuk rumah minimalis',
                'content' => '<p>Desain minimalis modern semakin populer...</p>',
                'featured_image' => 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800',
                'tags' => ['interior', 'desain', 'minimalis'],
                'is_featured' => false,
                'is_published' => true,
                'published_at' => now()->subDays(1),
            ],
        ];

        foreach ($articles as $article) {
            Article::create($article);
        }
    }
}
