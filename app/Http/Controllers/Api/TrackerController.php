<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TrackerEvent;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TrackerController extends Controller
{
    public function track(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'event_type' => 'required|string|max:50',
            'page_url'   => 'nullable|string|max:1000',
            'referrer'   => 'nullable|string|max:1000',
            'meta'       => 'nullable|array',
        ]);

        TrackerEvent::create([
            ...$validated,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json(['ok' => true]);
    }
}
