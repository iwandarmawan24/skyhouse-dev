<?php

namespace Database\Seeders;

use App\Models\ArticleCategory;
use Illuminate\Database\Seeder;

class ArticleCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Tips Properti', 'description' => 'Tips dan trik seputar dunia properti'],
            ['name' => 'Berita Properti', 'description' => 'Update berita terkini dunia properti'],
            ['name' => 'Panduan Investasi', 'description' => 'Panduan investasi properti'],
            ['name' => 'Lifestyle', 'description' => 'Gaya hidup dan interior rumah'],
        ];

        foreach ($categories as $category) {
            ArticleCategory::create($category);
        }
    }
}
