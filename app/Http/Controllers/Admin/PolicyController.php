<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Policy;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PolicyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $policies = Policy::orderBy('type')->paginate(15);

        return Inertia::render('Admin/Policies/Index', [
            'policies' => $policies,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Policies/Form', [
            'policy' => null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:privacy,terms,refund,shipping,other',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        // Generate slug
        $validated['slug'] = Str::slug($validated['title']);

        Policy::create($validated);

        return redirect()->route('admin.policies.index')
            ->with('success', 'Policy created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Policy $policy)
    {
        return Inertia::render('Admin/Policies/Form', [
            'policy' => $policy,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Policy $policy)
    {
        $validated = $request->validate([
            'type' => 'required|in:privacy,terms,refund,shipping,other',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        // Update slug if title changed
        if ($validated['title'] !== $policy->title) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $policy->update($validated);

        return redirect()->route('admin.policies.index')
            ->with('success', 'Policy updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Policy $policy)
    {
        $policy->delete();

        return redirect()->route('admin.policies.index')
            ->with('success', 'Policy deleted successfully.');
    }
}
