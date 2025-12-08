<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Product::with('images')->latest();

        // Filter by multiple types
        if ($request->filled('types')) {
            $types = is_array($request->types)
                ? $request->types
                : array_filter(explode(',', $request->types));

            if (!empty($types)) {
                $query->whereIn('type', $types);
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
                        if ($status === 'active') {
                            $q->orWhere(function ($subQ) {
                                $subQ->where('is_active', true)
                                     ->where('is_sold', false);
                            });
                        } elseif ($status === 'sold') {
                            $q->orWhere('is_sold', true);
                        } elseif ($status === 'inactive') {
                            $q->orWhere(function ($subQ) {
                                $subQ->where('is_active', false)
                                     ->where('is_sold', false);
                            });
                        }
                    }
                });
            }
        }

        // Filter by price range
        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // Filter by multiple cities
        if ($request->filled('cities')) {
            $cities = is_array($request->cities)
                ? $request->cities
                : array_filter(explode(',', $request->cities));

            if (!empty($cities)) {
                $query->whereIn('city', $cities);
            }
        }

        // Filter by multiple provinces
        if ($request->filled('provinces')) {
            $provinces = is_array($request->provinces)
                ? $request->provinces
                : array_filter(explode(',', $request->provinces));

            if (!empty($provinces)) {
                $query->whereIn('province', $provinces);
            }
        }

        // Filter by featured
        if ($request->filled('featured')) {
            $query->where('is_featured', $request->boolean('featured'));
        }

        // Search by name or location
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'ilike', "%{$search}%")
                    ->orWhere('location', 'ilike', "%{$search}%")
                    ->orWhere('city', 'ilike', "%{$search}%");
            });
        }

        // Server-side pagination (10 items per page)
        $products = $query->paginate(10)->withQueryString();

        // Get unique cities and provinces for filter dropdowns
        $cities = Product::select('city')->distinct()->orderBy('city')->pluck('city');
        $provinces = Product::select('province')->distinct()->orderBy('province')->pluck('province');

        // Get price range
        $priceRange = [
            'min' => Product::min('price') ?? 0,
            'max' => Product::max('price') ?? 100000000000,
        ];

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'filters' => $request->only(['types', 'statuses', 'featured', 'search', 'min_price', 'max_price', 'cities', 'provinces']),
            'filterOptions' => [
                'cities' => $cities,
                'provinces' => $provinces,
                'priceRange' => $priceRange,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Products/Form', [
            'product' => null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:house,apartment,land',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'land_area' => 'nullable|numeric|min:0',
            'building_area' => 'nullable|numeric|min:0',
            'bedrooms' => 'nullable|integer|min:0',
            'bathrooms' => 'nullable|integer|min:0',
            'floors' => 'nullable|integer|min:0',
            'garage' => 'nullable|integer|min:0',
            'location' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'province' => 'required|string|max:255',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'facilities' => 'nullable|array',
            'video_url' => 'nullable|url|max:255',
            'video_360_url' => 'nullable|url|max:255',
            'is_featured' => 'required|boolean',
            'is_active' => 'required|boolean',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        // Generate slug
        $validated['slug'] = Str::slug($validated['name']);

        // Handle facilities JSON
        if (isset($validated['facilities'])) {
            $validated['facilities'] = json_encode($validated['facilities']);
        }

        $product = Product::create($validated);

        // Handle image uploads
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
                $imagePath = $image->store('products', 'public');

                ProductImage::create([
                    'product_uid' => $product->uid,
                    'image_path' => $imagePath,
                    'order' => $index + 1,
                    'is_primary' => $index === 0, // First image is primary
                ]);
            }
        }

        return redirect()->route('admin.products.index')
            ->with('success', 'Product created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $product->load('images');

        return Inertia::render('Admin/Products/Form', [
            'product' => $product,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:house,apartment,land',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'land_area' => 'nullable|numeric|min:0',
            'building_area' => 'nullable|numeric|min:0',
            'bedrooms' => 'nullable|integer|min:0',
            'bathrooms' => 'nullable|integer|min:0',
            'floors' => 'nullable|integer|min:0',
            'garage' => 'nullable|integer|min:0',
            'location' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'province' => 'required|string|max:255',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'facilities' => 'nullable|array',
            'video_url' => 'nullable|url|max:255',
            'video_360_url' => 'nullable|url|max:255',
            'is_featured' => 'required|boolean',
            'is_sold' => 'required|boolean',
            'is_active' => 'required|boolean',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
            'deleted_images' => 'nullable|array',
            'deleted_images.*' => 'string|exists:product_images,uid',
        ]);

        // Update slug if name changed
        if ($validated['name'] !== $product->name) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        // Handle facilities JSON
        if (isset($validated['facilities'])) {
            $validated['facilities'] = json_encode($validated['facilities']);
        }

        // Remove images and deleted_images from validated data
        $imageData = $validated['images'] ?? [];
        $deletedImages = $validated['deleted_images'] ?? [];
        unset($validated['images'], $validated['deleted_images']);

        $product->update($validated);

        // Delete removed images
        if (!empty($deletedImages)) {
            $imagesToDelete = ProductImage::whereIn('uid', $deletedImages)
                ->where('product_uid', $product->uid)
                ->get();

            foreach ($imagesToDelete as $image) {
                Storage::disk('public')->delete($image->image_path);
                $image->delete();
            }

            // Refresh the relationship after deletion
            $product->load('images');

            // Reorder remaining images
            $product->images()->orderBy('order')->get()->each(function ($image, $index) {
                $image->update(['order' => $index + 1]);
            });

            // If no images remain, we need to handle this
            if ($product->images()->count() === 0) {
                // No primary image exists anymore
                $product->update(['is_primary' => null]);
            } else {
                // Ensure at least one image is primary
                $hasPrimary = $product->images()->where('is_primary', true)->exists();
                if (!$hasPrimary) {
                    $product->images()->orderBy('order')->first()->update(['is_primary' => true]);
                }
            }
        }

        // Handle new image uploads
        if ($request->hasFile('images')) {
            // Refresh to get the latest count after deletions
            $product->refresh();
            $currentMaxOrder = $product->images()->max('order') ?? 0;
            $currentImageCount = $product->images()->count();

            foreach ($request->file('images') as $index => $image) {
                $imagePath = $image->store('products', 'public');

                ProductImage::create([
                    'product_uid' => $product->uid,
                    'image_path' => $imagePath,
                    'order' => $currentMaxOrder + $index + 1,
                    'is_primary' => $currentImageCount === 0 && $index === 0,
                ]);
            }
        }

        return redirect()->route('admin.products.index')
            ->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        // Delete all images
        foreach ($product->images as $image) {
            Storage::disk('public')->delete($image->image_path);
            $image->delete();
        }

        $product->delete();

        return redirect()->route('admin.products.index')
            ->with('success', 'Product deleted successfully.');
    }

    /**
     * Update image order.
     */
    public function updateImageOrder(Request $request, Product $product)
    {
        $validated = $request->validate([
            'images' => 'required|array',
            'images.*.uid' => 'required|string|exists:product_images,uid',
            'images.*.order' => 'required|integer|min:1',
        ]);

        foreach ($validated['images'] as $imageData) {
            ProductImage::where('uid', $imageData['uid'])
                ->where('product_uid', $product->uid)
                ->update(['order' => $imageData['order']]);
        }

        return response()->json(['message' => 'Image order updated successfully.']);
    }

    /**
     * Set primary image.
     */
    public function setPrimaryImage(Request $request, Product $product)
    {
        $validated = $request->validate([
            'image_uid' => 'required|string|exists:product_images,uid',
        ]);

        // Remove primary from all images
        $product->images()->update(['is_primary' => false]);

        // Set new primary
        ProductImage::where('uid', $validated['image_uid'])
            ->where('product_uid', $product->uid)
            ->update(['is_primary' => true]);

        return response()->json(['message' => 'Primary image updated successfully.']);
    }
}
