<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\CareerResource;
use App\Models\Career;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CareerController extends Controller
{
    public function index()
    {
        $careers = Career::ordered()->get();

        return Inertia::render('Admin/Careers/Index', [
            'careers' => CareerResource::collection($careers)->resolve(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Careers/Form', [
            'career' => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'body' => 'required|string',
            'is_active' => 'required|boolean',
        ]);

        Career::create($validated);

        return redirect()->route('admin.careers.index')
            ->with('success', 'Career created successfully.');
    }

    public function edit(Career $career)
    {
        return Inertia::render('Admin/Careers/Form', [
            'career' => new CareerResource($career),
        ]);
    }

    public function update(Request $request, Career $career)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'body' => 'required|string',
            'is_active' => 'required|boolean',
        ]);

        $career->update($validated);

        return redirect()->route('admin.careers.index')
            ->with('success', 'Career updated successfully.');
    }

    public function destroy(Career $career)
    {
        $career->delete();

        return redirect()->route('admin.careers.index')
            ->with('success', 'Career deleted successfully.');
    }

    public function updateOrder(Request $request)
    {
        $validated = $request->validate([
            'updates' => 'required|array',
            'updates.*.uid' => 'required|string|exists:careers,uid',
            'updates.*.order' => 'required|integer',
        ]);

        foreach ($validated['updates'] as $update) {
            Career::where('uid', $update['uid'])
                ->update(['order' => $update['order']]);
        }

        return back()->with('success', 'Career order updated successfully.');
    }
}
