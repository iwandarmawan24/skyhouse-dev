<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MediaController extends Controller
{
    public function index(Request $request)
    {
        $query = Media::withCount('highlights')->latest();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('name', 'ilike', "%{$search}%");
        }

        $media = $query->paginate(15)->withQueryString();

        return Inertia::render('Admin/Media/Index', [
            'media' => $media,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Media/Form', [
            'media' => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'required|image|mimes:jpeg,png,jpg,webp,svg|max:2048',
            'is_active' => 'required|boolean',
        ]);

        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('media/logos', 'public');
            $validated['logo'] = $logoPath;
        }

        Media::create($validated);

        return redirect()->route('admin.media.index')
            ->with('success', 'Media created successfully.');
    }

    public function edit(Media $medium)
    {
        return Inertia::render('Admin/Media/Form', [
            'media' => $medium,
        ]);
    }

    public function update(Request $request, Media $medium)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,webp,svg|max:2048',
            'is_active' => 'required|boolean',
        ]);

        if ($request->hasFile('logo')) {
            if ($medium->logo) {
                Storage::disk('public')->delete($medium->logo);
            }
            $logoPath = $request->file('logo')->store('media/logos', 'public');
            $validated['logo'] = $logoPath;
        }

        $medium->update($validated);

        return redirect()->route('admin.media.index')
            ->with('success', 'Media updated successfully.');
    }

    public function destroy(Media $medium)
    {
        if ($medium->highlights()->count() > 0) {
            return back()->with('error', 'Cannot delete media with existing highlights.');
        }

        if ($medium->logo) {
            Storage::disk('public')->delete($medium->logo);
        }

        $medium->delete();

        return redirect()->route('admin.media.index')
            ->with('success', 'Media deleted successfully.');
    }
}
