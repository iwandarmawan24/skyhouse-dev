<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use App\Models\MediaHighlight;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MediaHighlightController extends Controller
{
    public function index(Request $request)
    {
        $query = MediaHighlight::with(['media', 'highlightImage'])->latest('publish_date');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('title', 'ilike', "%{$search}%");
        }

        if ($request->filled('media')) {
            $query->where('media_uid', $request->media);
        }

        $highlights = $query->paginate(5)->withQueryString();
        $mediaList = Media::active()->orderBy('name')->get();

        return Inertia::render('Admin/MediaHighlights/Index', [
            'highlights' => $highlights,
            'mediaList' => $mediaList,
            'filters' => $request->only(['search', 'media']),
        ]);
    }

    public function create()
    {
        $mediaList = Media::active()->orderBy('name')->get();

        return Inertia::render('Admin/MediaHighlights/Form', [
            'highlight' => null,
            'mediaList' => $mediaList,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'media_uid' => 'required|exists:media,uid',
            'title' => 'required|string|max:255',
            'publish_date' => 'required|date',
            'image_uid' => 'required|exists:media_library,uid',
            'article_url' => 'required|url|max:500',
        ]);

        MediaHighlight::create($validated);

        return redirect()->route('admin.media-highlights.index')
            ->with('success', 'Media highlight created successfully.');
    }

    public function edit(MediaHighlight $mediaHighlight)
    {
        $mediaHighlight->load(['media', 'highlightImage']);
        $mediaList = Media::active()->orderBy('name')->get();

        return Inertia::render('Admin/MediaHighlights/Form', [
            'highlight' => $mediaHighlight,
            'mediaList' => $mediaList,
        ]);
    }

    public function update(Request $request, MediaHighlight $mediaHighlight)
    {
        $validated = $request->validate([
            'media_uid' => 'required|exists:media,uid',
            'title' => 'required|string|max:255',
            'publish_date' => 'required|date',
            'image_uid' => 'required|exists:media_library,uid',
            'article_url' => 'required|url|max:500',
        ]);

        $mediaHighlight->update($validated);

        return redirect()->route('admin.media-highlights.index')
            ->with('success', 'Media highlight updated successfully.');
    }

    public function destroy(MediaHighlight $mediaHighlight)
    {
        $mediaHighlight->delete();

        return redirect()->route('admin.media-highlights.index')
            ->with('success', 'Media highlight deleted successfully.');
    }
}
