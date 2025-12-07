<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroBanner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HeroBannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $banners = HeroBanner::ordered()->get();

        return Inertia::render('Admin/HeroBanners/Index', [
            'banners' => [
                'data' => $banners
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/HeroBanners/Form', [
            'banner' => null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'button_text' => 'nullable|string|max:100',
            'button_link' => 'nullable|string|max:255',
            'is_active' => 'required|boolean',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('hero-banners', 'public');
            $validated['image'] = $imagePath;
        }

        HeroBanner::create($validated);

        return redirect()->route('admin.hero-banners.index')
            ->with('success', 'Hero banner created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HeroBanner $heroBanner)
    {
        return Inertia::render('Admin/HeroBanners/Form', [
            'banner' => $heroBanner,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HeroBanner $heroBanner)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'button_text' => 'nullable|string|max:100',
            'button_link' => 'nullable|string|max:255',
            'is_active' => 'required|boolean',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Store new image first
            $imagePath = $request->file('image')->store('hero-banners', 'public');

            // Only delete old image after new one is successfully stored
            $oldImage = $heroBanner->image;

            $validated['image'] = $imagePath;

            // Update the record
            $heroBanner->update($validated);

            // Delete old image after successful update
            if ($oldImage) {
                Storage::disk('public')->delete($oldImage);
            }
        } else {
            // Remove image from validated data if no new file uploaded
            unset($validated['image']);

            // Update the record
            $heroBanner->update($validated);
        }

        return redirect()->route('admin.hero-banners.index')
            ->with('success', 'Hero banner updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HeroBanner $heroBanner)
    {
        // Delete image
        if ($heroBanner->image) {
            Storage::disk('public')->delete($heroBanner->image);
        }

        $heroBanner->delete();

        return redirect()->route('admin.hero-banners.index')
            ->with('success', 'Hero banner deleted successfully.');
    }

    /**
     * Bulk delete hero banners.
     */
    public function bulkDelete(Request $request)
    {
        $validated = $request->validate([
            'uids' => 'required|array',
            'uids.*' => 'required|string|exists:hero_banners,uid',
        ]);

        $banners = HeroBanner::whereIn('uid', $validated['uids'])->get();

        $deletedCount = 0;
        foreach ($banners as $banner) {
            // Delete image
            if ($banner->image) {
                Storage::disk('public')->delete($banner->image);
            }

            $banner->delete();
            $deletedCount++;
        }

        return redirect()->route('admin.hero-banners.index')
            ->with('success', $deletedCount . ' banner(s) deleted successfully.');
    }

    /**
     * Update banner order.
     */
    public function updateOrder(Request $request)
    {
        $validated = $request->validate([
            'updates' => 'required|array',
            'updates.*.uid' => 'required|string|exists:hero_banners,uid',
            'updates.*.order' => 'required|integer',
        ]);

        foreach ($validated['updates'] as $update) {
            HeroBanner::where('uid', $update['uid'])->update(['order' => $update['order']]);
        }

        return redirect()->route('admin.hero-banners.index')
            ->with('success', 'Banner order updated successfully.');
    }
}
