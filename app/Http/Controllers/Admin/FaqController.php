<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\FaqResource;
use App\Models\Faq;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaqController extends Controller
{
    /**
     * Display a listing of FAQs.
     */
    public function index()
    {
        $faqs = Faq::ordered()->get();

        return Inertia::render('Admin/Faqs/Index', [
            'faqs' => FaqResource::collection($faqs)->resolve(),
        ]);
    }

    /**
     * Show the form for creating a new FAQ.
     */
    public function create()
    {
        return Inertia::render('Admin/Faqs/Form', [
            'faq' => null,
        ]);
    }

    /**
     * Store a newly created FAQ in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'question' => 'required|string|max:500',
            'answer' => 'required|string',
            'is_active' => 'required|boolean',
        ]);

        Faq::create($validated);

        return redirect()->route('admin.faqs.index')
            ->with('success', 'FAQ created successfully.');
    }

    /**
     * Show the form for editing the specified FAQ.
     */
    public function edit(Faq $faq)
    {
        return Inertia::render('Admin/Faqs/Form', [
            'faq' => new FaqResource($faq),
        ]);
    }

    /**
     * Update the specified FAQ in storage.
     */
    public function update(Request $request, Faq $faq)
    {
        $validated = $request->validate([
            'question' => 'required|string|max:500',
            'answer' => 'required|string',
            'is_active' => 'required|boolean',
        ]);

        $faq->update($validated);

        return redirect()->route('admin.faqs.index')
            ->with('success', 'FAQ updated successfully.');
    }

    /**
     * Remove the specified FAQ from storage.
     */
    public function destroy(Faq $faq)
    {
        $faq->delete();

        return redirect()->route('admin.faqs.index')
            ->with('success', 'FAQ deleted successfully.');
    }

    /**
     * Update the order of FAQs.
     */
    public function updateOrder(Request $request)
    {
        $validated = $request->validate([
            'updates' => 'required|array',
            'updates.*.uid' => 'required|string|exists:faqs,uid',
            'updates.*.order' => 'required|integer',
        ]);

        foreach ($validated['updates'] as $update) {
            Faq::where('uid', $update['uid'])
                ->update(['order' => $update['order']]);
        }

        return back()->with('success', 'FAQ order updated successfully.');
    }
}
