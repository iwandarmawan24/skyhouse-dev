<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    /**
     * Get dummy events data
     */
    private function getDummyEvents(): array
    {
        return [
            [
                'uid' => '1',
                'slug' => 'grand-launching-skyhouse-residence',
                'title' => 'Grand Launching Skyhouse Residence',
                'description' => 'Join us for the grand launching of our newest residential project featuring modern amenities and sustainable living spaces.',
                'image' => 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop',
                'image_url' => 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop',
                'event_date' => '2025-01-15',
                'event_date_formatted' => 'January 15, 2025',
                'event_time' => '10:00 AM',
                'location' => 'Skyhouse Alamsutera Sales Gallery',
                'is_past' => false,
                'max_participants' => 100,
                'current_participants' => 45,
                'registration_link' => '#',
            ],
            [
                'uid' => '2',
                'slug' => 'open-house-weekend',
                'title' => 'Open House Weekend',
                'description' => 'Explore our show units and get exclusive deals during our weekend open house event.',
                'image' => 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop',
                'image_url' => 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop',
                'event_date' => '2025-02-20',
                'event_date_formatted' => 'February 20, 2025',
                'event_time' => '09:00 AM - 05:00 PM',
                'location' => 'Skyhouse Alamsutera',
                'is_past' => false,
                'max_participants' => 200,
                'current_participants' => 87,
                'registration_link' => '#',
            ],
            [
                'uid' => '3',
                'slug' => 'property-investment-seminar',
                'title' => 'Property Investment Seminar',
                'description' => 'Learn about smart property investment strategies and market trends from industry experts.',
                'image' => 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=1200&h=800&fit=crop',
                'image_url' => 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=1200&h=800&fit=crop',
                'event_date' => '2024-11-10',
                'event_date_formatted' => 'November 10, 2024',
                'event_time' => '02:00 PM',
                'location' => 'Grand Ballroom, Hotel Santika',
                'is_past' => true,
                'max_participants' => 150,
                'current_participants' => 150,
                'registration_link' => null,
            ],
        ];
    }

    /**
     * Display the events listing page
     */
    public function index(): Response
    {
        return Inertia::render('Event', [
            'events' => $this->getDummyEvents(),
        ]);
    }

    /**
     * Display a specific event detail page
     */
    public function show(string $slug): Response
    {
        $events = $this->getDummyEvents();
        $event = collect($events)->firstWhere('slug', $slug);

        if (!$event) {
            abort(404);
        }

        return Inertia::render('EventDetail', [
            'event' => $event,
        ]);
    }
}
