<?php

namespace App\Services;

use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use App\Models\Product;
use App\Models\Article;

class SitemapService
{
    /**
     * Generate sitemap for the entire website
     *
     * @return Sitemap
     */
    public function generate(): Sitemap
    {
        $sitemap = Sitemap::create();

        // Add static pages
        $this->addStaticPages($sitemap);

        // Add dynamic product pages
        $this->addProductPages($sitemap);

        // Add dynamic article/news pages
        $this->addArticlePages($sitemap);

        return $sitemap;
    }

    /**
     * Add static pages to sitemap
     *
     * @param Sitemap $sitemap
     * @return void
     */
    protected function addStaticPages(Sitemap $sitemap): void
    {
        $sitemap->add(
            Url::create('/')
                ->setPriority(1.0)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
        );

        $sitemap->add(
            Url::create('/project')
                ->setPriority(0.9)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
        );

        $sitemap->add(
            Url::create('/news')
                ->setPriority(0.8)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY)
        );

        $sitemap->add(
            Url::create('/about')
                ->setPriority(0.7)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
        );

        $sitemap->add(
            Url::create('/contact-us')
                ->setPriority(0.6)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
        );
    }

    /**
     * Add product pages to sitemap
     *
     * @param Sitemap $sitemap
     * @return void
     */
    protected function addProductPages(Sitemap $sitemap): void
    {
        Product::active()
            ->orderBy('updated_at', 'desc')
            ->each(function (Product $product) use ($sitemap) {
                $sitemap->add(
                    Url::create("/products/{$product->slug}")
                        ->setLastModificationDate($product->updated_at)
                        ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
                        ->setPriority(0.8)
                );
            });
    }

    /**
     * Add article/news pages to sitemap
     *
     * @param Sitemap $sitemap
     * @return void
     */
    protected function addArticlePages(Sitemap $sitemap): void
    {
        Article::published()
            ->orderBy('published_at', 'desc')
            ->each(function (Article $article) use ($sitemap) {
                $sitemap->add(
                    Url::create("/articles/{$article->slug}")
                        ->setLastModificationDate($article->updated_at)
                        ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
                        ->setPriority(0.7)
                );
            });
    }
}
