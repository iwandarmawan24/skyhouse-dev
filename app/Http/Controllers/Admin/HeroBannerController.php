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
        $banners = HeroBanner::with(['bannerImage', 'mobileBannerImage'])->ordered()->get();

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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'image_uid' => 'nullable|exists:media_library,uid',
            'mobile_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'mobile_image_uid' => 'nullable|exists:media_library,uid',
            'banner_link' => 'nullable|string|max:255',
            'is_active' => 'required|boolean',
        ]);

        // Validate that either image or image_uid is provided
        if (!$request->hasFile('image') && !$request->filled('image_uid')) {
            return back()->withErrors(['image' => 'Please provide an image either by uploading or selecting from media library.']);
        }

        // Handle desktop image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('hero-banners', 'public');
            $validated['image'] = $imagePath;
            $validated['image_uid'] = null;
        }

        // Handle mobile image upload
        if ($request->hasFile('mobile_image')) {
            $mobilePath = $request->file('mobile_image')->store('hero-banners', 'public');
            $validated['mobile_image'] = $mobilePath;
            $validated['mobile_image_uid'] = null;
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
        $heroBanner->load(['bannerImage', 'mobileBannerImage']);

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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'image_uid' => 'nullable|exists:media_library,uid',
            'mobile_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'mobile_image_uid' => 'nullable|exists:media_library,uid',
            'banner_link' => 'nullable|string|max:255',
            'is_active' => 'required|boolean',
        ]);

        $oldImage = $heroBanner->image;
        $oldMobileImage = $heroBanner->mobile_image;

        // Handle desktop image
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('hero-banners', 'public');
            $validated['image'] = $imagePath;
            $validated['image_uid'] = null;
            if ($oldImage) {
                Storage::disk('public')->delete($oldImage);
            }
        } elseif ($request->filled('image_uid')) {
            $validated['image'] = null;
            if ($oldImage) {
                Storage::disk('public')->delete($oldImage);
            }
        } else {
            unset($validated['image']);
            unset($validated['image_uid']);
        }

        // Handle mobile image
        if ($request->hasFile('mobile_image')) {
            $mobilePath = $request->file('mobile_image')->store('hero-banners', 'public');
            $validated['mobile_image'] = $mobilePath;
            $validated['mobile_image_uid'] = null;
            if ($oldMobileImage) {
                Storage::disk('public')->delete($oldMobileImage);
            }
        } elseif ($request->filled('mobile_image_uid')) {
            $validated['mobile_image'] = null;
            if ($oldMobileImage) {
                Storage::disk('public')->delete($oldMobileImage);
            }
        } else {
            unset($validated['mobile_image']);
            unset($validated['mobile_image_uid']);
        }

        $heroBanner->update($validated);

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
