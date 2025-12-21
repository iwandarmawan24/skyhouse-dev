<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    /**
     * Display the events listing page
     */
    public function index(): Response
    {
        $events = Event::with('mediaImage')
            ->where('is_active', true)
            ->orderBy('event_date', 'desc')
            ->get()
            ->map(function ($event) {
                return [
                    'uid' => $event->uid,
                    'slug' => $event->slug,
                    'title' => $event->title,
                    'description' => $event->description,
                    'description_excerpt' => $this->getPlainTextExcerpt($event->description, 120),
                    'image' => $event->image,
                    'image_url' => $event->image_url,
                    'event_date' => $event->event_date,
                    'event_date_formatted' => $event->event_date_formatted,
                    'event_time' => $event->event_time,
                    'location' => $event->location,
                    'is_past' => $event->is_past,
                    'registration_link' => $event->registration_link,
                ];
            });

        return Inertia::render('Event', [
            'events' => $events,
        ]);
    }

    /**
     * Display a specific event detail page
     */
    public function show(string $slug): Response
    {
        $event = Event::with('mediaImage')
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return Inertia::render('EventDetail', [
            'event' => [
                'uid' => $event->uid,
                'slug' => $event->slug,
                'title' => $event->title,
                'description' => $event->description,
                'image' => $event->image,
                'image_url' => $event->image_url,
                'event_date' => $event->event_date,
                'event_date_formatted' => $event->event_date_formatted,
                'event_time' => $event->event_time,
                'location' => $event->location,
                'is_past' => $event->is_past,
                'max_participants' => $event->max_participants,
                'current_participants' => $event->current_participants,
                'registration_link' => $event->registration_link,
                // SEO fields
                'meta_title' => $event->meta_title,
                'meta_description' => $event->meta_description,
                'meta_keywords' => $event->meta_keywords,
                'focus_keyword' => $event->focus_keyword,
            ],
        ]);
    }

    /**
     * Extract plain text excerpt from HTML content
     */
    private function getPlainTextExcerpt(string $html, int $length = 120): string
    {
        $text = strip_tags($html);
        $text = preg_replace('/\s+/', ' ', $text);
        $text = trim($text);

        if (strlen($text) > $length) {
            $text = substr($text, 0, $length);
            $lastSpace = strrpos($text, ' ');
            if ($lastSpace !== false) {
                $text = substr($text, 0, $lastSpace);
            }
            $text .= '...';
        }

        return $text;
    }
}
