<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use App\Models\MediaLibrary;
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
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,webp,svg|max:2048',
            'logo_uid' => 'nullable|exists:media_library,uid',
            'is_active' => 'required|boolean',
        ]);

        // Handle logo upload or media library selection
        if ($request->hasFile('logo')) {
            // Direct file upload
            $logoPath = $request->file('logo')->store('media/logos', 'public');
            $validated['logo'] = $logoPath;
            $validated['logo_uid'] = null; // Clear media library reference
        } elseif (!empty($validated['logo_uid'])) {
            // Using media from library - get the file path
            $mediaItem = MediaLibrary::find($validated['logo_uid']);
            if ($mediaItem && $mediaItem->filepath) {
                $validated['logo'] = $mediaItem->filepath;
            } else {
                return redirect()->back()->withErrors(['logo' => 'Selected media does not have a valid file.'])->withInput();
            }
        } else {
            // Neither file upload nor media library selection - validation error
            return redirect()->back()->withErrors(['logo' => 'Logo is required. Please upload a file or select from media library.'])->withInput();
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
            'logo_uid' => 'nullable|exists:media_library,uid',
            'is_active' => 'required|boolean',
        ]);

        // Handle logo upload or media library selection
        if ($request->hasFile('logo')) {
            // Direct file upload - delete old logo if exists and not from media library
            if ($medium->logo && !$medium->logo_uid) {
                Storage::disk('public')->delete($medium->logo);
            }
            $logoPath = $request->file('logo')->store('media/logos', 'public');
            $validated['logo'] = $logoPath;
            $validated['logo_uid'] = null; // Clear media library reference
        } elseif (!empty($validated['logo_uid'])) {
            // Using media from library
            $mediaItem = MediaLibrary::find($validated['logo_uid']);
            if ($mediaItem && $mediaItem->filepath) {
                // Delete old uploaded file if exists and switching to media library
                if ($medium->logo && !$medium->logo_uid) {
                    Storage::disk('public')->delete($medium->logo);
                }
                $validated['logo'] = $mediaItem->filepath;
            } else {
                return redirect()->back()->withErrors(['logo' => 'Selected media does not have a valid file.'])->withInput();
            }
        } else {
            // If no new file uploaded and no media selected, keep the existing logo
            unset($validated['logo']);
            unset($validated['logo_uid']);
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
