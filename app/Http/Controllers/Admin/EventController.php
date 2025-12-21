<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Event::with('mediaImage')->latest('event_date');

        // Filter by statuses (can be multiple, comma-separated)
        if ($request->filled('statuses')) {
            $statuses = explode(',', $request->statuses);
            $statuses = array_filter($statuses); // Remove empty values

            if (!empty($statuses)) {
                $query->where(function ($q) use ($statuses) {
                    foreach ($statuses as $status) {
                        if ($status === 'upcoming') {
                            $q->orWhere(function ($sq) {
                                $sq->where('is_active', true)
                                   ->where('event_date', '>=', now());
                            });
                        } elseif ($status === 'past') {
                            $q->orWhere('event_date', '<', now());
                        } elseif ($status === 'inactive') {
                            $q->orWhere('is_active', false);
                        }
                    }
                });
            }
        }

        // Search by title or location
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'ilike', "%{$search}%")
                    ->orWhere('location', 'ilike', "%{$search}%");
            });
        }

        $events = $query->paginate(10)->withQueryString();

        return Inertia::render('Admin/Events/Index', [
            'events' => $events,
            'filters' => $request->only(['statuses', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Events/Form', [
            'event' => null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'event_date' => 'required|date',
            'event_time' => 'required',
            'location' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'image_uid' => 'nullable|string|exists:media_library,uid',
            'registration_link' => 'nullable|url|max:255',
            'is_active' => 'required|boolean',
            // SEO fields
            'slug' => 'nullable|string|max:255|unique:events,slug',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:255',
            'focus_keyword' => 'nullable|string|max:255',
        ]);

        // Require either image_uid (from media library) or image upload
        if (!$request->filled('image_uid') && !$request->hasFile('image')) {
            return back()->withErrors(['image' => 'Please select an image.']);
        }

        // Generate slug if not provided
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        // Combine event_date and event_time
        $validated['event_date'] = $validated['event_date'] . ' ' . $validated['event_time'];
        unset($validated['event_time']);

        // Handle image upload (fallback for old file upload method)
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('events', 'public');
            $validated['image'] = $imagePath;
            $validated['image_uid'] = null;
        }

        Event::create($validated);

        return redirect()->route('admin.events.index')
            ->with('success', 'Event created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        // Load media image relationship
        $event->load('mediaImage');

        // Split event_date into date and time for form
        $event->event_time = $event->event_date->format('H:i');
        $event->event_date_only = $event->event_date->format('Y-m-d');

        return Inertia::render('Admin/Events/Form', [
            'event' => $event,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'event_date' => 'required|date',
            'event_time' => 'required',
            'location' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'image_uid' => 'nullable|string|exists:media_library,uid',
            'registration_link' => 'nullable|url|max:255',
            'is_active' => 'required|boolean',
            // SEO fields
            'slug' => 'nullable|string|max:255|unique:events,slug,' . $event->uid . ',uid',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:255',
            'focus_keyword' => 'nullable|string|max:255',
        ]);

        // Update slug if not provided or if title changed and no custom slug
        if (empty($validated['slug']) || ($validated['title'] !== $event->title && $validated['slug'] === $event->slug)) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        // Combine event_date and event_time
        $validated['event_date'] = $validated['event_date'] . ' ' . $validated['event_time'];
        unset($validated['event_time']);

        // Handle image from media library or file upload
        if ($request->filled('image_uid')) {
            // Using media library
            $validated['image'] = null; // Clear old file path
        } elseif ($request->hasFile('image')) {
            // Handle file upload (fallback for old method)
            // Delete old image file
            if ($event->image && !$event->image_uid) {
                Storage::disk('public')->delete($event->image);
            }

            $imagePath = $request->file('image')->store('events', 'public');
            $validated['image'] = $imagePath;
            $validated['image_uid'] = null;
        }

        $event->update($validated);

        return redirect()->route('admin.events.index')
            ->with('success', 'Event updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        // Delete image
        if ($event->image) {
            Storage::disk('public')->delete($event->image);
        }

        $event->delete();

        return redirect()->route('admin.events.index')
            ->with('success', 'Event deleted successfully.');
    }
}
