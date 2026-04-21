<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AboutValueResource;
use App\Models\AboutValue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutValueController extends Controller
{
    public function index()
    {
        $values = AboutValue::with('iconImage')->ordered()->get();

        return Inertia::render('Admin/AboutValues/Index', [
            'values' => AboutValueResource::collection($values)->resolve(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/AboutValues/Form', [
            'value' => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $this->validatePayload($request);

        AboutValue::create($validated);

        return redirect()->route('admin.about.values.index')
            ->with('success', 'Core value created successfully.');
    }

    public function edit(AboutValue $value)
    {
        $value->load('iconImage');

        return Inertia::render('Admin/AboutValues/Form', [
            'value' => (new AboutValueResource($value))->resolve(),
        ]);
    }

    public function update(Request $request, AboutValue $value)
    {
        $validated = $this->validatePayload($request);

        $value->update($validated);

        return redirect()->route('admin.about.values.index')
            ->with('success', 'Core value updated successfully.');
    }

    public function destroy(AboutValue $value)
    {
        $value->delete();

        return redirect()->route('admin.about.values.index')
            ->with('success', 'Core value deleted successfully.');
    }

    public function updateOrder(Request $request)
    {
        $validated = $request->validate([
            'updates' => 'required|array',
            'updates.*.uid' => 'required|string|exists:about_values,uid',
            'updates.*.order' => 'required|integer',
        ]);

        foreach ($validated['updates'] as $update) {
            AboutValue::where('uid', $update['uid'])->update(['order' => $update['order']]);
        }

        return redirect()->route('admin.about.values.index')
            ->with('success', 'Order updated successfully.');
    }

    private function validatePayload(Request $request): array
    {
        return $request->validate([
            'icon_emoji' => 'nullable|string|max:16',
            'icon_uid' => 'nullable|exists:media_library,uid',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:2000',
            'is_active' => 'required|boolean',
        ]);
    }
}
