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
        // Check if slug column exists
        $hasSlugColumn = \Schema::hasColumn('events', 'slug');

        $events = Event::with('mediaImage')
            ->where('is_active', true)
            ->orderBy('event_date', 'desc')
            ->get()
            ->map(function ($event) use ($hasSlugColumn) {
                return [
                    'uid' => $event->uid,
                    'slug' => $hasSlugColumn ? $event->slug : $event->uid,
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
        // Check if slug column exists
        $hasSlugColumn = \Schema::hasColumn('events', 'slug');

        // Query by slug if column exists, otherwise by uid
        $query = Event::with('mediaImage')->where('is_active', true);

        if ($hasSlugColumn) {
            $query->where('slug', $slug);
        } else {
            $query->where('uid', $slug);
        }

        $event = $query->firstOrFail();

        return Inertia::render('EventDetail', [
            'event' => [
                'uid' => $event->uid,
                'slug' => $hasSlugColumn ? $event->slug : $event->uid,
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
                // SEO fields (check if columns exist)
                'meta_title' => $hasSlugColumn && isset($event->meta_title) ? $event->meta_title : null,
                'meta_description' => $hasSlugColumn && isset($event->meta_description) ? $event->meta_description : null,
                'meta_keywords' => $hasSlugColumn && isset($event->meta_keywords) ? $event->meta_keywords : null,
                'focus_keyword' => $hasSlugColumn && isset($event->focus_keyword) ? $event->focus_keyword : null,
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
