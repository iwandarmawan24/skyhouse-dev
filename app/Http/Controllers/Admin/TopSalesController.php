<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TopSales;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TopSalesController extends Controller
{
    /**
     * Display a listing of top sales.
     */
    public function index(Request $request): Response
    {
        $query = TopSales::with('mediaImage')->ordered();

        // Filter by status
        if ($request->filled('status')) {
            if ($request->status === 'active') {
                $query->where('is_active', true);
            } elseif ($request->status === 'inactive') {
                $query->where('is_active', false);
            }
        }

        // Search by name
        if ($request->filled('search')) {
            $query->where('name', 'ilike', "%{$request->search}%");
        }

        $topSales = $query->get();

        return Inertia::render('Admin/TopSales/Index', [
            'topSales' => $topSales,
            'filters' => $request->only(['status', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new top sales.
     */
    public function create(): Response
    {
        $availablePositions = TopSales::getAvailablePositions();

        return Inertia::render('Admin/TopSales/Form', [
            'topSales' => null,
            'availablePositions' => $availablePositions,
        ]);
    }

    /**
     * Store a newly created top sales.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'job_title' => 'nullable|string|max:32',
            'position' => 'required|integer|min:1',
            'image_uid' => 'required|string|exists:media_library,uid',
            'is_active' => 'required|boolean',
        ]);

        // Shift positions if the selected position is already taken
        $existingAtPosition = TopSales::where('position', $validated['position'])->first();
        if ($existingAtPosition) {
            TopSales::shiftPositionsDown($validated['position']);
        }

        TopSales::create($validated);

        return redirect()->route('admin.top-sales.index')
            ->with('success', 'Top sales created successfully.');
    }

    /**
     * Show the form for editing the specified top sales.
     */
    public function edit(TopSales $topSales): Response
    {
        $availablePositions = TopSales::getAvailablePositions($topSales->uid);

        return Inertia::render('Admin/TopSales/Form', [
            'topSales' => $topSales,
            'availablePositions' => $availablePositions,
        ]);
    }

    /**
     * Update the specified top sales.
     */
    public function update(Request $request, TopSales $topSales)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'job_title' => 'nullable|string|max:32',
            'position' => 'required|integer|min:1',
            'image_uid' => 'required|string|exists:media_library,uid',
            'is_active' => 'required|boolean',
        ]);

        $oldPosition = $topSales->position;
        $newPosition = $validated['position'];

        // Handle position change
        if ($oldPosition !== $newPosition) {
            // Check if new position is already taken by someone else
            $existingAtPosition = TopSales::where('position', $newPosition)
                ->where('uid', '!=', $topSales->uid)
                ->first();

            if ($existingAtPosition) {
                // Shift positions down from new position, excluding current item
                TopSales::shiftPositionsDown($newPosition, $topSales->uid);
            }
        }

        $topSales->update($validated);

        // Reorder positions to remove gaps
        $this->reorderPositions();

        return redirect()->route('admin.top-sales.index')
            ->with('success', 'Top sales updated successfully.');
    }

    /**
     * Remove the specified top sales.
     */
    public function destroy(TopSales $topSales)
    {
        $topSales->delete();

        // Reorder positions to remove gaps
        $this->reorderPositions();

        return redirect()->route('admin.top-sales.index')
            ->with('success', 'Top sales deleted successfully.');
    }

    /**
     * Update positions (move up/down)
     */
    public function updateOrder(Request $request)
    {
        $validated = $request->validate([
            'updates' => 'required|array',
            'updates.*.uid' => 'required|string|exists:top_sales,uid',
            'updates.*.position' => 'required|integer|min:1',
        ]);

        foreach ($validated['updates'] as $update) {
            TopSales::where('uid', $update['uid'])->update(['position' => $update['position']]);
        }

        return back()->with('success', 'Order updated successfully.');
    }

    /**
     * Reorder positions to remove gaps
     */
    private function reorderPositions(): void
    {
        $items = TopSales::orderBy('position', 'asc')->get();
        $position = 1;

        foreach ($items as $item) {
            if ($item->position !== $position) {
                $item->position = $position;
                $item->save();
            }
            $position++;
        }
    }
}
