<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ArticleCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ArticleCategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = ArticleCategory::withCount('articles')->latest();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('name', 'ilike', "%{$search}%");
        }

        $categories = $query->paginate(15)->withQueryString();

        return Inertia::render('Admin/ArticleCategories/Index', [
            'categories' => $categories,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/ArticleCategories/Form', [
            'category' => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:article_categories',
            'description' => 'nullable|string',
            'is_active' => 'required|boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        ArticleCategory::create($validated);

        return redirect()->route('admin.article-categories.index')
            ->with('success', 'Category created successfully.');
    }

    public function edit(ArticleCategory $articleCategory)
    {
        return Inertia::render('Admin/ArticleCategories/Form', [
            'category' => $articleCategory,
        ]);
    }

    public function update(Request $request, ArticleCategory $articleCategory)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:article_categories,name,' . $articleCategory->uid . ',uid',
            'description' => 'nullable|string',
            'is_active' => 'required|boolean',
        ]);

        if ($validated['name'] !== $articleCategory->name) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $articleCategory->update($validated);

        return redirect()->route('admin.article-categories.index')
            ->with('success', 'Category updated successfully.');
    }

    public function destroy(ArticleCategory $articleCategory)
    {
        if ($articleCategory->articles()->count() > 0) {
            return back()->with('error', 'Cannot delete category with existing articles.');
        }

        $articleCategory->delete();

        return redirect()->route('admin.article-categories.index')
            ->with('success', 'Category deleted successfully.');
    }
}
