<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use App\Models\MediaHighlight;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MediaHighlightController extends Controller
{
    public function index(Request $request)
    {
        $query = MediaHighlight::with('media')->latest('publish_date');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('title', 'ilike', "%{$search}%");
        }

        if ($request->filled('media')) {
            $query->where('media_uid', $request->media);
        }

        $highlights = $query->paginate(15)->withQueryString();
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
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'article_url' => 'required|url|max:500',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('media/highlights', 'public');
            $validated['image'] = $imagePath;
        }

        MediaHighlight::create($validated);

        return redirect()->route('admin.media-highlights.index')
            ->with('success', 'Media highlight created successfully.');
    }

    public function edit(MediaHighlight $mediaHighlight)
    {
        $mediaHighlight->load('media');
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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'article_url' => 'required|url|max:500',
        ]);

        if ($request->hasFile('image')) {
            if ($mediaHighlight->image) {
                Storage::disk('public')->delete($mediaHighlight->image);
            }
            $imagePath = $request->file('image')->store('media/highlights', 'public');
            $validated['image'] = $imagePath;
        }

        $mediaHighlight->update($validated);

        return redirect()->route('admin.media-highlights.index')
            ->with('success', 'Media highlight updated successfully.');
    }

    public function destroy(MediaHighlight $mediaHighlight)
    {
        if ($mediaHighlight->image) {
            Storage::disk('public')->delete($mediaHighlight->image);
        }

        $mediaHighlight->delete();

        return redirect()->route('admin.media-highlights.index')
            ->with('success', 'Media highlight deleted successfully.');
    }
}
