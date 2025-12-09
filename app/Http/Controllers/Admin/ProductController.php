<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Services\MediaService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    protected MediaService $mediaService;

    public function __construct(MediaService $mediaService)
    {
        $this->mediaService = $mediaService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Product::with('featuredImage')->latest();

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
            'featured_image_uid' => 'nullable|exists:media_library,uid',
            'gallery_uids' => 'nullable|array',
            'gallery_uids.*' => 'exists:media_library,uid',
        ]);

        // Generate slug
        $validated['slug'] = Str::slug($validated['name']);

        // Handle facilities JSON
        if (isset($validated['facilities'])) {
            $validated['facilities'] = json_encode($validated['facilities']);
        }

        $product = Product::create($validated);

        return redirect()->route('admin.products.index')
            ->with('success', 'Product created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $product->load('featuredImage');

        // Load gallery images
        $product->gallery_images = $product->gallery_images;

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
            'featured_image_uid' => 'nullable|exists:media_library,uid',
            'gallery_uids' => 'nullable|array',
            'gallery_uids.*' => 'exists:media_library,uid',
        ]);

        // Update slug if name changed
        if ($validated['name'] !== $product->name) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        // Handle facilities JSON
        if (isset($validated['facilities'])) {
            $validated['facilities'] = json_encode($validated['facilities']);
        }

        $product->update($validated);

        return redirect()->route('admin.products.index')
            ->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('admin.products.index')
            ->with('success', 'Product deleted successfully.');
    }
}
