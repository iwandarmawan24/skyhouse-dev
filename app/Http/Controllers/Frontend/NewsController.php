<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\MediaHighlight;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function index(Request $request)
    {
        $type = $request->get('type', 'media_highlights'); // default to media highlights (news)
        $page = $request->get('page', 1);
        $perPage = 6;

        if ($type === 'articles') {
            // Fetch published articles
            $items = Article::with(['category', 'author'])
                ->where('is_published', true)
                ->whereNotNull('published_at')
                ->orderBy('published_at', 'desc')
                ->paginate($perPage);

            // Transform articles data
            $transformedItems = $items->map(function ($article) {
                return [
                    'id' => $article->uid,
                    'type' => 'article',
                    'title' => $article->title,
                    'excerpt' => $article->excerpt,
                    'image' => $article->featured_image
                        ? (str_starts_with($article->featured_image, 'http')
                            ? $article->featured_image
                            : asset('storage/' . $article->featured_image))
                        : 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop',
                    'date' => $article->published_at ? $article->published_at->format('F d, Y') : null,
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
            // Fetch media highlights (news)
            $items = MediaHighlight::where('is_published', true)
                ->orderBy('publication_date', 'desc')
                ->paginate($perPage);

            // Transform media highlights data
            $transformedItems = $items->map(function ($highlight) {
                return [
                    'id' => $highlight->uid,
                    'type' => 'media_highlight',
                    'title' => $highlight->title,
                    'description' => $highlight->description,
                    'image' => $highlight->image_url
                        ? (str_starts_with($highlight->image_url, 'http')
                            ? $highlight->image_url
                            : asset('storage/' . $highlight->image_url))
                        : 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop',
                    'date' => $highlight->publication_date ? $highlight->publication_date->format('F d, Y') : null,
                    'mediaLogo' => $highlight->media_logo_url
                        ? (str_starts_with($highlight->media_logo_url, 'http')
                            ? $highlight->media_logo_url
                            : asset('storage/' . $highlight->media_logo_url))
                        : 'https://placehold.co/120x40/1E3A8A/white?text=NEWS',
                    'url' => $highlight->url,
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
        // Get featured media highlight or article
        $featuredHighlight = MediaHighlight::where('is_published', true)
            ->where('is_featured', true)
            ->orderBy('publication_date', 'desc')
            ->first();

        $featuredArticle = Article::where('is_published', true)
            ->where('is_featured', true)
            ->orderBy('published_at', 'desc')
            ->first();

        // Prepare featured item
        $featured = null;
        if ($featuredHighlight) {
            $featured = [
                'type' => 'media_highlight',
                'title' => $featuredHighlight->title,
                'description' => $featuredHighlight->description,
                'image' => $featuredHighlight->image_url
                    ? (str_starts_with($featuredHighlight->image_url, 'http')
                        ? $featuredHighlight->image_url
                        : asset('storage/' . $featuredHighlight->image_url))
                    : 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop',
                'date' => $featuredHighlight->publication_date ? $featuredHighlight->publication_date->format('F d, Y') : null,
                'mediaLogo' => $featuredHighlight->media_logo_url
                    ? (str_starts_with($featuredHighlight->media_logo_url, 'http')
                        ? $featuredHighlight->media_logo_url
                        : asset('storage/' . $featuredHighlight->media_logo_url))
                    : 'https://placehold.co/120x40/1E3A8A/white?text=NEWS',
            ];
        } elseif ($featuredArticle) {
            $featured = [
                'type' => 'article',
                'title' => $featuredArticle->title,
                'description' => $featuredArticle->excerpt,
                'image' => $featuredArticle->featured_image
                    ? (str_starts_with($featuredArticle->featured_image, 'http')
                        ? $featuredArticle->featured_image
                        : asset('storage/' . $featuredArticle->featured_image))
                    : 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop',
                'date' => $featuredArticle->published_at ? $featuredArticle->published_at->format('F d, Y') : null,
                'category' => $featuredArticle->category->name ?? null,
            ];
        }

        return Inertia::render('News', [
            'featured' => $featured,
        ]);
    }
}
