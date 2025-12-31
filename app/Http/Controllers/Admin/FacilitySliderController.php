<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FacilitySlider;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FacilitySliderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = FacilitySlider::with('mediaImage')->ordered();

        // Filter by status
        if ($request->filled('status')) {
            if ($request->status === 'active') {
                $query->where('is_active', true);
            } elseif ($request->status === 'inactive') {
                $query->where('is_active', false);
            }
        }

        // Search by title
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('title', 'ilike', "%{$search}%");
        }

        $sliders = $query->get();

        return Inertia::render('Admin/FacilitySliders/Index', [
            'sliders' => $sliders,
            'filters' => $request->only(['status', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/FacilitySliders/Form', [
            'slider' => null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'image_uid' => 'required|string|exists:media_library,uid',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'required|boolean',
        ]);

        // Auto-set order to be the last
        $maxOrder = FacilitySlider::max('order') ?? -1;
        $validated['order'] = $maxOrder + 1;

        FacilitySlider::create($validated);

        return redirect()->route('admin.facility-sliders.index')
            ->with('success', 'Facility slider created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FacilitySlider $facilitySlider)
    {
        $facilitySlider->load('mediaImage');

        return Inertia::render('Admin/FacilitySliders/Form', [
            'slider' => $facilitySlider,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FacilitySlider $facilitySlider)
    {
        $validated = $request->validate([
            'image_uid' => 'required|string|exists:media_library,uid',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'required|boolean',
        ]);

        // Don't update order here, use updateOrder method instead
        $facilitySlider->update($validated);

        return redirect()->route('admin.facility-sliders.index')
            ->with('success', 'Facility slider updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FacilitySlider $facilitySlider)
    {
        $facilitySlider->delete();

        return redirect()->route('admin.facility-sliders.index')
            ->with('success', 'Facility slider deleted successfully.');
    }

    /**
     * Update slider order.
     */
    public function updateOrder(Request $request)
    {
        $validated = $request->validate([
            'updates' => 'required|array',
            'updates.*.uid' => 'required|string|exists:facility_sliders,uid',
            'updates.*.order' => 'required|integer',
        ]);

        foreach ($validated['updates'] as $update) {
            FacilitySlider::where('uid', $update['uid'])->update(['order' => $update['order']]);
        }

        return redirect()->route('admin.facility-sliders.index')
            ->with('success', 'Slider order updated successfully.');
    }
}
