<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\ArticleCategory;
use App\Services\SeoScoreCalculator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Article::with(['category', 'author'])->latest();

        // Filter by multiple categories
        if ($request->filled('categories')) {
            $categories = is_array($request->categories)
                ? $request->categories
                : array_filter(explode(',', $request->categories));

            if (!empty($categories)) {
                $query->whereIn('article_category_uid', $categories);
            }
        }

        // Filter by multiple statuses
        if ($request->filled('statuses')) {
            $statuses = is_array($request->statuses)
                ? $request->statuses
                : array_filter(explode(',', $request->statuses));

            if (!empty($statuses)) {
                $query->where(function ($q) use ($statuses) {
                    foreach ($statuses as $status) {
                        if ($status === 'published') {
                            $q->orWhere('is_published', true);
                        } elseif ($status === 'draft') {
                            $q->orWhere('is_published', false);
                        }
                    }
                });
            }
        }

        // Search by title or excerpt
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'ilike', "%{$search}%")
                    ->orWhere('excerpt', 'ilike', "%{$search}%");
            });
        }

        // Server-side pagination (5 items per page)
        $articles = $query->paginate(5)->withQueryString();
        $categories = ArticleCategory::all();

        return Inertia::render('Admin/Articles/Index', [
            'articles' => $articles,
            'categories' => $categories,
            'filters' => $request->only(['categories', 'statuses', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = ArticleCategory::active()->get();
        $users = \App\Models\User::where('status', 'active')->orderBy('full_name')->get();

        return Inertia::render('Admin/Articles/Form', [
            'article' => null,
            'categories' => $categories,
            'users' => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:500',
            'article_category_uid' => 'required|exists:article_categories,uid',
            'slug' => 'nullable|string|max:255|unique:articles',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'featured_image_uid' => 'nullable|exists:media,uid',
            'video_url' => 'nullable|url|max:500',
            'tags' => 'nullable|string',
            'author_uid' => 'nullable|exists:users,uid',
            'editor_uid' => 'nullable|exists:users,uid',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string',
            'focus_keywords' => 'nullable|string|max:255',
            'status' => 'required|in:draft,scheduled,published',
            'scheduled_at' => 'nullable|date|after:now',
        ]);

        // Generate slug if not provided
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        } else {
            $validated['slug'] = Str::slug($validated['slug']);
        }

        // Convert tags string to array
        if (!empty($validated['tags'])) {
            $validated['tags'] = array_map('trim', explode(',', $validated['tags']));
        }

        // Convert empty strings to null for nullable fields
        $nullableFields = ['author_uid', 'editor_uid', 'video_url', 'meta_title',
                          'meta_description', 'meta_keywords', 'focus_keywords', 'scheduled_at'];
        foreach ($nullableFields as $field) {
            if (isset($validated[$field]) && $validated[$field] === '') {
                $validated[$field] = null;
            }
        }

        // Set creator
        $validated['user_uid'] = auth()->id();

        // Handle status and publishing
        if ($validated['status'] === 'published') {
            $validated['is_published'] = true;
            $validated['published_at'] = now();
        } elseif ($validated['status'] === 'scheduled' && !empty($validated['scheduled_at'])) {
            $validated['is_published'] = false;
        } else {
            $validated['is_published'] = false;
        }

        // Handle image upload or media library selection
        if ($request->hasFile('featured_image')) {
            // Direct file upload
            $imagePath = $request->file('featured_image')->store('articles', 'public');
            $validated['featured_image'] = $imagePath;
            $validated['featured_image_uid'] = null; // Clear media library reference
        } elseif (!empty($validated['featured_image_uid'])) {
            // Using media from library - get the URL
            $media = \App\Models\Media::find($validated['featured_image_uid']);
            if ($media) {
                $validated['featured_image'] = $media->file_path;
            }
        }

        // Calculate SEO score
        if (!empty($validated['focus_keywords'])) {
            $calculator = new SeoScoreCalculator([
                'title' => $validated['title'],
                'subtitle' => $validated['subtitle'] ?? '',
                'slug' => $validated['slug'],
                'content' => $validated['content'],
                'meta_title' => $validated['meta_title'] ?? '',
                'meta_description' => $validated['meta_description'] ?? '',
                'meta_keywords' => $validated['meta_keywords'] ?? '',
                'focus_keyword' => $validated['focus_keywords'],
                'tags' => $validated['tags'] ?? [],
            ]);
            $result = $calculator->calculate();
            $validated['seo_score'] = $result['score'];
        }

        Article::create($validated);

        return redirect()->route('admin.articles.index')
            ->with('success', 'Article created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        $article->load(['category', 'author', 'editor', 'user']);
        $categories = ArticleCategory::active()->get();
        $users = \App\Models\User::where('status', 'active')->orderBy('full_name')->get();

        // Convert tags array to comma-separated string for form
        if (is_array($article->tags)) {
            $article->tags = implode(', ', $article->tags);
        }

        // Ensure featured_image is accessible
        // If it's a relative path, it will be handled by the frontend
        // If it starts with http, it's already a full URL

        return Inertia::render('Admin/Articles/Form', [
            'article' => $article,
            'categories' => $categories,
            'users' => $users,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:500',
            'article_category_uid' => 'required|exists:article_categories,uid',
            'slug' => 'nullable|string|max:255|unique:articles,slug,' . $article->uid . ',uid',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'featured_image_uid' => 'nullable|exists:media,uid',
            'video_url' => 'nullable|url|max:500',
            'tags' => 'nullable|string',
            'author_uid' => 'nullable|exists:users,uid',
            'editor_uid' => 'nullable|exists:users,uid',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string',
            'focus_keywords' => 'nullable|string|max:255',
            'status' => 'required|in:draft,scheduled,published',
            'scheduled_at' => 'nullable|date|after:now',
        ]);

        // Generate slug if not provided
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        } else {
            $validated['slug'] = Str::slug($validated['slug']);
        }

        // Convert tags string to array
        if (!empty($validated['tags'])) {
            $validated['tags'] = array_map('trim', explode(',', $validated['tags']));
        }

        // Convert empty strings to null for nullable fields
        $nullableFields = ['author_uid', 'editor_uid', 'video_url', 'meta_title',
                          'meta_description', 'meta_keywords', 'focus_keywords', 'scheduled_at'];
        foreach ($nullableFields as $field) {
            if (isset($validated[$field]) && $validated[$field] === '') {
                $validated[$field] = null;
            }
        }

        // Handle status and publishing
        if ($validated['status'] === 'published') {
            $validated['is_published'] = true;
            if (!$article->is_published) {
                $validated['published_at'] = now();
            }
        } elseif ($validated['status'] === 'scheduled' && !empty($validated['scheduled_at'])) {
            $validated['is_published'] = false;
        } else {
            $validated['is_published'] = false;
        }

        // Set last edited timestamp
        $validated['last_edited_at'] = now();

        // Handle image upload or media library selection
        if ($request->hasFile('featured_image')) {
            // Direct file upload - delete old image if exists and not from media library
            if ($article->featured_image && !$article->featured_image_uid) {
                Storage::disk('public')->delete($article->featured_image);
            }
            $imagePath = $request->file('featured_image')->store('articles', 'public');
            $validated['featured_image'] = $imagePath;
            $validated['featured_image_uid'] = null; // Clear media library reference
        } elseif (!empty($validated['featured_image_uid'])) {
            // Using media from library
            $media = \App\Models\Media::find($validated['featured_image_uid']);
            if ($media) {
                // Delete old uploaded file if exists and switching to media library
                if ($article->featured_image && !$article->featured_image_uid) {
                    Storage::disk('public')->delete($article->featured_image);
                }
                $validated['featured_image'] = $media->file_path;
            }
        } else {
            // If no new file uploaded and no media selected, keep the existing image
            unset($validated['featured_image']);
            unset($validated['featured_image_uid']);
        }

        // Calculate SEO score
        if (!empty($validated['focus_keywords'])) {
            $calculator = new SeoScoreCalculator([
                'title' => $validated['title'],
                'subtitle' => $validated['subtitle'] ?? '',
                'slug' => $validated['slug'],
                'content' => $validated['content'],
                'meta_title' => $validated['meta_title'] ?? '',
                'meta_description' => $validated['meta_description'] ?? '',
                'meta_keywords' => $validated['meta_keywords'] ?? '',
                'focus_keyword' => $validated['focus_keywords'],
                'tags' => $validated['tags'] ?? [],
            ]);
            $result = $calculator->calculate();
            $validated['seo_score'] = $result['score'];
        }

        $article->update($validated);

        return redirect()->route('admin.articles.index')
            ->with('success', 'Article updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        // Delete image
        if ($article->featured_image) {
            Storage::disk('public')->delete($article->featured_image);
        }

        $article->delete();

        return redirect()->route('admin.articles.index')
            ->with('success', 'Article deleted successfully.');
    }

    /**
     * Analyze SEO score for article content
     */
    public function analyzeSeo(Request $request)
    {
        $data = $request->validate([
            'title' => 'nullable|string',
            'subtitle' => 'nullable|string',
            'slug' => 'nullable|string',
            'content' => 'nullable|string',
            'meta_title' => 'nullable|string',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'focus_keyword' => 'required|string',
            'tags' => 'nullable',
        ]);

        $calculator = new SeoScoreCalculator($data);
        $result = $calculator->calculate();

        return response()->json($result);
    }
}
