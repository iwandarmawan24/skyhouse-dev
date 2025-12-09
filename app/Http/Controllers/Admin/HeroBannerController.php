<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\HeroBannerResource;
use App\Models\HeroBanner;
use App\Services\MediaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HeroBannerController extends Controller
{
    protected MediaService $mediaService;

    public function __construct(MediaService $mediaService)
    {
        $this->mediaService = $mediaService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Load bannerImage relationship to get media library images
        $banners = HeroBanner::with('bannerImage')->ordered()->get();

        return Inertia::render('Admin/HeroBanners/Index', [
            'banners' => HeroBannerResource::collection($banners)->resolve(),
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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'image_uid' => 'nullable|exists:media_library,uid',
            'button_text' => 'nullable|string|max:100',
            'button_link' => 'nullable|string|max:255',
            'is_active' => 'required|boolean',
        ]);

        // Validate that either image or image_uid is provided
        if (!$request->hasFile('image') && !$request->filled('image_uid')) {
            return back()->withErrors(['image' => 'Please provide an image either by uploading or selecting from media library.']);
        }

        // Handle direct image upload (backward compatibility)
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('hero-banners', 'public');
            $validated['image'] = $imagePath;
            // Clear image_uid if direct upload is used
            $validated['image_uid'] = null;
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
        // Load the banner image relationship
        $heroBanner->load('bannerImage');

        return Inertia::render('Admin/HeroBanners/Form', [
            'banner' => (new HeroBannerResource($heroBanner))->resolve(),
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
            'image_uid' => 'nullable|exists:media_library,uid',
            'button_text' => 'nullable|string|max:100',
            'button_link' => 'nullable|string|max:255',
            'is_active' => 'required|boolean',
        ]);

        $oldImage = $heroBanner->image;

        // Priority 1: Handle direct image upload
        if ($request->hasFile('image')) {
            // Store new image first
            $imagePath = $request->file('image')->store('hero-banners', 'public');
            $validated['image'] = $imagePath;
            // Clear image_uid when using direct upload
            $validated['image_uid'] = null;

            // Update the record
            $heroBanner->update($validated);

            // Delete old image after successful update
            if ($oldImage) {
                Storage::disk('public')->delete($oldImage);
            }
        }
        // Priority 2: Handle media library selection
        elseif ($request->filled('image_uid')) {
            // Clear old image field when using media library
            $validated['image'] = null;

            // Update the record
            $heroBanner->update($validated);

            // Delete old direct upload image if exists
            if ($oldImage) {
                Storage::disk('public')->delete($oldImage);
            }
        }
        // Priority 3: No new image, keep existing
        else {
            // Remove image fields from validated data if no new file/uid provided
            unset($validated['image']);
            unset($validated['image_uid']);

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
