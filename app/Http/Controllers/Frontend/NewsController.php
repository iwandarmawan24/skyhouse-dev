<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\MediaHighlight;
use App\Models\MediaHighlightsPageInfo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    public function index(Request $request)
    {
        $type = $request->get('type', 'media_highlights'); // default to media highlights (news)
        $page = $request->get('page', 1);
        $perPage = 6;

        if ($type === 'articles') {
            // Fetch articles
            $items = Article::with(['category', 'author', 'featuredImageMedia'])
                ->orderByDesc('published_at')
                ->orderByDesc('created_at')
                ->paginate($perPage);

            // Transform articles data
            $transformedItems = $items->map(function ($article) {
                return [
                    'id' => $article->uid,
                    'type' => 'article',
                    'slug' => $article->slug,
                    'title' => $article->title,
                    'excerpt' => $article->excerpt,
                    'image' => $article->featured_image_url,
                    'date' => $article->published_at
                        ? $article->published_at->format('F d, Y')
                        : $article->created_at->format('F d, Y'),
                    'category' => $article->category->name ?? null,
                    'author' => $article->author->full_name ?? null,
                ];
            });

            return response()->json([
                'items' => $transformedItems,
                'hasMore' => $items->hasMorePages(),
                'currentPage' => $items->currentPage(),
                'total' => $items->total(),
            ]);
        } else {
            // Fetch media highlights (news) with media and image relationships
            $items = MediaHighlight::with(['media', 'highlightImage'])
                ->orderBy('publish_date', 'desc')
                ->paginate($perPage);

            // Transform media highlights data
            $transformedItems = $items->map(function ($highlight) {
                return [
                    'id' => $highlight->uid,
                    'type' => 'media_highlight',
                    'title' => $highlight->title,
                    'description' => $highlight->title, // No description field, use title
                    'image' => $highlight->highlightImage?->url
                        ?? ($highlight->image
                            ? (str_starts_with($highlight->image, 'http')
                                ? $highlight->image
                                : asset('storage/' . $highlight->image))
                            : null),
                    'date' => $highlight->publish_date ? $highlight->publish_date->format('F d, Y') : null,
                    'mediaLogo' => $highlight->media && $highlight->media->logo
                        ? (str_starts_with($highlight->media->logo, 'http')
                            ? $highlight->media->logo
                            : asset('storage/' . $highlight->media->logo))
                        : 'https://placehold.co/120x40/1E3A8A/white?text=NEWS',
                    'url' => $highlight->article_url,
                ];
            });

            return response()->json([
                'items' => $transformedItems,
                'hasMore' => $items->hasMorePages(),
                'currentPage' => $items->currentPage(),
                'total' => $items->total(),
            ]);
        }
    }

    public function show()
    {
        // Get featured article (is_featured first, fallback to latest)
        $featuredArticle = Article::with(['category', 'featuredImageMedia'])
            ->orderByDesc('is_featured')
            ->orderByDesc('published_at')
            ->orderByDesc('created_at')
            ->first();

        $featured = null;
        if ($featuredArticle) {
            $featured = [
                'type' => 'article',
                'slug' => $featuredArticle->slug,
                'title' => $featuredArticle->title,
                'description' => $featuredArticle->excerpt,
                'image' => $featuredArticle->featured_image_url,
                'date' => $featuredArticle->published_at
                    ? $featuredArticle->published_at->format('F d, Y')
                    : $featuredArticle->created_at->format('F d, Y'),
                'category' => $featuredArticle->category->name ?? null,
                'url' => route('articles.detail', $featuredArticle->slug),
            ];
        }

        return Inertia::render('News', [
            'featured' => $featured,
        ]);
    }

    public function mediaHighlights()
    {
        // Get featured media highlight (latest one)
        $featuredHighlight = MediaHighlight::with(['media', 'highlightImage'])
            ->orderBy('publish_date', 'desc')
            ->first();

        // Prepare featured item
        $featured = null;
        if ($featuredHighlight) {
            $featured = [
                'type' => 'media_highlight',
                'title' => $featuredHighlight->title,
                'description' => $featuredHighlight->title,
                'image' => $featuredHighlight->highlightImage?->url
                    ?? ($featuredHighlight->image
                        ? (str_starts_with($featuredHighlight->image, 'http')
                            ? $featuredHighlight->image
                            : asset('storage/' . $featuredHighlight->image))
                        : null),
                'date' => $featuredHighlight->publish_date ? $featuredHighlight->publish_date->format('F d, Y') : null,
                'mediaLogo' => $featuredHighlight->media && $featuredHighlight->media->logo
                    ? (str_starts_with($featuredHighlight->media->logo, 'http')
                        ? $featuredHighlight->media->logo
                        : asset('storage/' . $featuredHighlight->media->logo))
                    : 'https://placehold.co/120x40/1E3A8A/white?text=NEWS',
                'url' => $featuredHighlight->article_url,
            ];
        }

        $info = MediaHighlightsPageInfo::with('bannerImage')->first();
        $pageInfo = [
            'banner_image' => $info?->bannerImage?->url ?? '/images/banner/Media-Banner.webp',
            'title' => $info?->title ?? 'Media Highlights',
            'subtitle' => $info?->subtitle ?? 'Stay informed with our latest media coverage and press releases',
        ];

        return Inertia::render('MediaHighlights', [
            'featured' => $featured,
            'pageInfo' => $pageInfo,
        ]);
    }

    public function detail(string $slug): Response
    {
        // Find article by slug
        $article = Article::with(['category', 'author', 'editor'])
            ->where('slug', $slug)
            ->firstOrFail();

        // Increment views
        $article->increment('views');

        // Get related articles from same category
        $relatedArticles = Article::with(['category', 'author'])
            ->where('article_category_uid', $article->article_category_uid)
            ->where('uid', '!=', $article->uid)
            ->where('is_published', true)
            ->whereNotNull('published_at')
            ->orderBy('published_at', 'desc')
            ->limit(3)
            ->get()
            ->map(function ($relatedArticle) {
                return [
                    'uid' => $relatedArticle->uid,
                    'slug' => $relatedArticle->slug,
                    'title' => $relatedArticle->title,
                    'excerpt' => $relatedArticle->excerpt,
                    'image' => $relatedArticle->featured_image
                        ? (str_starts_with($relatedArticle->featured_image, 'http')
                            ? $relatedArticle->featured_image
                            : asset('storage/' . $relatedArticle->featured_image))
                        : null,
                    'published_at' => $relatedArticle->published_at ? $relatedArticle->published_at->format('F d, Y') : null,
                    'category' => $relatedArticle->category->name ?? null,
                ];
            });

        // Prepare SEO data
        $seoTitle = $article->meta_title ?: $article->title;
        $seoDescription = $article->meta_description ?: $article->excerpt;
        $seoKeywords = $article->meta_keywords ?: $article->focus_keywords;
        $seoImage = $article->featured_image
            ? (str_starts_with($article->featured_image, 'http')
                ? $article->featured_image
                : asset('storage/' . $article->featured_image))
            : asset('images/default-og-image.jpg');

        // Prepare article data
        $articleData = [
            'uid' => $article->uid,
            'title' => $article->title,
            'subtitle' => $article->subtitle,
            'slug' => $article->slug,
            'content' => $article->content,
            'excerpt' => $article->excerpt,
            'featured_image' => $article->featured_image
                ? (str_starts_with($article->featured_image, 'http')
                    ? $article->featured_image
                    : asset('storage/' . $article->featured_image))
                : null,
            'video_url' => $article->video_url,
            'tags' => is_array($article->tags) ? $article->tags : [],
            'published_at' => $article->published_at ? $article->published_at->format('F d, Y') : null,
            'published_at_iso' => $article->published_at ? $article->published_at->toIso8601String() : null,
            'updated_at' => $article->updated_at ? $article->updated_at->format('F d, Y') : null,
            'updated_at_iso' => $article->updated_at ? $article->updated_at->toIso8601String() : null,
            'views' => $article->views,
            'category' => [
                'uid' => $article->category->uid ?? null,
                'name' => $article->category->name ?? null,
                'slug' => $article->category->slug ?? null,
            ],
            'author' => [
                'name' => $article->author->full_name ?? $article->author->name ?? 'Unknown',
                'email' => $article->author->email ?? null,
            ],
        ];

        return Inertia::render('ArticleDetail', [
            'article' => $articleData,
            'relatedArticles' => $relatedArticles,
            'seo' => [
                'title' => $seoTitle,
                'description' => $seoDescription,
                'keywords' => $seoKeywords,
                'image' => $seoImage,
                'url' => url()->current(),
                'type' => 'article',
                'author' => $article->author->full_name ?? $article->author->name ?? 'Unknown',
                'published_time' => $article->published_at ? $article->published_at->toIso8601String() : null,
                'modified_time' => $article->updated_at ? $article->updated_at->toIso8601String() : null,
            ],
        ]);
    }
}
