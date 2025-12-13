<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Facility;
use App\Models\FacilityImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class FacilityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Facility::latest();

        // Filter by statuses (can be multiple, comma-separated)
        if ($request->filled('statuses')) {
            $statuses = explode(',', $request->statuses);
            $statuses = array_filter($statuses); // Remove empty values

            if (!empty($statuses)) {
                $query->where(function ($q) use ($statuses) {
                    foreach ($statuses as $status) {
                        if ($status === 'active') {
                            $q->orWhere('is_active', true);
                        } elseif ($status === 'inactive') {
                            $q->orWhere('is_active', false);
                        }
                    }
                });
            }
        }

        // Search by name
        if ($request->filled('search')) {
            $query->where('name', 'ilike', "%{$request->search}%");
        }

        $facilities = $query->paginate(10)->withQueryString();

        return Inertia::render('Admin/Facilities/Index', [
            'facilities' => $facilities,
            'filters' => $request->only(['statuses', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Facilities/Form', [
            'facility' => null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|string|max:100',
            'is_active' => 'required|boolean',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
            'image_uids' => 'nullable|array',
            'image_uids.*' => 'string|exists:media_library,uid',
        ]);

        // Generate slug
        $validated['slug'] = Str::slug($validated['name']);

        // Handle images from media library or file uploads
        $fileImages = $validated['images'] ?? [];
        unset($validated['images']);

        $facility = Facility::create($validated);

        // Handle old file upload method (fallback)
        if (!empty($fileImages)) {
            foreach ($fileImages as $index => $image) {
                $imagePath = $image->store('facilities', 'public');

                FacilityImage::create([
                    'facility_id' => $facility->id,
                    'image_path' => $imagePath,
                    'order' => $index + 1,
                ]);
            }
        }

        return redirect()->route('admin.facilities.index')
            ->with('success', 'Facility created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Facility $facility)
    {
        $facility->load('images');

        return Inertia::render('Admin/Facilities/Form', [
            'facility' => $facility,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Facility $facility)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|string|max:100',
            'is_active' => 'required|boolean',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
            'image_uids' => 'nullable|array',
            'image_uids.*' => 'string|exists:media_library,uid',
            'deleted_images' => 'nullable|array',
            'deleted_images.*' => 'integer|exists:facility_images,id',
        ]);

        // Update slug if name changed
        if ($validated['name'] !== $facility->name) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        // Remove images and deleted_images from validated data
        $fileImages = $validated['images'] ?? [];
        $deletedImages = $validated['deleted_images'] ?? [];
        unset($validated['images'], $validated['deleted_images']);

        $facility->update($validated);

        // Delete removed images (old file upload method)
        if (!empty($deletedImages)) {
            $imagesToDelete = FacilityImage::whereIn('id', $deletedImages)
                ->where('facility_id', $facility->id)
                ->get();

            foreach ($imagesToDelete as $image) {
                Storage::disk('public')->delete($image->image_path);
                $image->delete();
            }

            // Reorder remaining images
            $facility->images()->orderBy('order')->get()->each(function ($image, $index) {
                $image->update(['order' => $index + 1]);
            });
        }

        // Handle new file uploads (old method, fallback)
        if (!empty($fileImages)) {
            $currentMaxOrder = $facility->images()->max('order') ?? 0;

            foreach ($fileImages as $index => $image) {
                $imagePath = $image->store('facilities', 'public');

                FacilityImage::create([
                    'facility_id' => $facility->id,
                    'image_path' => $imagePath,
                    'order' => $currentMaxOrder + $index + 1,
                ]);
            }
        }

        return redirect()->route('admin.facilities.index')
            ->with('success', 'Facility updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Facility $facility)
    {
        // Delete all images
        foreach ($facility->images as $image) {
            Storage::disk('public')->delete($image->image_path);
            $image->delete();
        }

        $facility->delete();

        return redirect()->route('admin.facilities.index')
            ->with('success', 'Facility deleted successfully.');
    }

    /**
     * Update image order.
     */
    public function updateImageOrder(Request $request, Facility $facility)
    {
        $validated = $request->validate([
            'images' => 'required|array',
            'images.*.id' => 'required|integer|exists:facility_images,id',
            'images.*.order' => 'required|integer|min:1',
        ]);

        foreach ($validated['images'] as $imageData) {
            FacilityImage::where('id', $imageData['id'])
                ->where('facility_id', $facility->id)
                ->update(['order' => $imageData['order']]);
        }

        return response()->json(['message' => 'Image order updated successfully.']);
    }
}
