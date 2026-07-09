<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TrackerEvent;
use App\Models\TrackerSession;
use App\Services\VisitorSessionResolver;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TrackerController extends Controller
{
    public function track(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'event_type'   => 'required|string|max:60',
            'event_target' => 'nullable|string|max:60',
            'target_id'    => 'nullable|string|max:100',
            'target_label' => 'nullable|string|max:200',
            'page_url'     => 'nullable|string|max:1000',
            'referrer'     => 'nullable|string|max:1000',
            'properties'   => 'nullable|array',
        ]);

        $session = $this->resolveSession($request, $validated);

        TrackerEvent::create([
            'session_id'   => $session->id,
            'event_type'   => $validated['event_type'],
            'event_target' => $validated['event_target'] ?? null,
            'target_id'    => $validated['target_id'] ?? null,
            'target_label' => $validated['target_label'] ?? null,
            'page_url'     => $validated['page_url'] ?? null,
            'referrer'     => $validated['referrer'] ?? null,
            'properties'   => $validated['properties'] ?? null,
            'created_at'   => now(),
        ]);

        // Slide cookie 30 minutes on every hit
        return response()
            ->json(['ok' => true])
            ->cookie('tracker_sid', $session->id, 30, '/', null, false, true);
    }

    private function resolveSession(Request $request, array $validated): TrackerSession
    {
        return VisitorSessionResolver::resolve(
            $request,
            $validated['page_url'] ?? null,
            $validated['referrer'] ?? null,
            $validated['properties'] ?? [],
        );
    }
}
