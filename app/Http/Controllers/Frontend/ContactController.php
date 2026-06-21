<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Mail\ContactFormSubmitted;
use App\Models\ContactSubmission;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        $products = Product::where('is_active', true)
            ->orderBy('name')
            ->get()
            ->map(fn($product) => [
                'uid'  => $product->uid,
                'name' => $product->name,
                'slug' => $product->slug,
            ]);

        return Inertia::render('Contact', [
            'formLoadTime' => now()->timestamp,
            'products'     => $products,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'fullName'    => 'required|string|max:255',
            'residence'   => 'required|string|max:255',
            'email'       => 'required|email|max:255',
            'phone'       => 'required|string|max:20',
            'subject'     => 'required|string|max:255',
            'room_type'   => 'required|string|max:255',
            'message'     => 'required|string|max:2000',
            'honeypot'    => 'nullable|string|max:0',
            'formLoadTime' => 'required|integer',
        ]);

        // Honeypot — silently accept but skip processing
        if (!empty($validated['honeypot'])) {
            return response()->json(['message' => 'Thank you for contacting us! We will get back to you soon.']);
        }

        // Time-based bot detection
        if (now()->timestamp - $validated['formLoadTime'] < 3) {
            return response()->json(['errors' => ['general' => 'Please take your time to fill out the form.']], 422);
        }

        // Rate limiting — 3 submissions per IP per hour
        $rateLimitKey    = 'contact_form_' . $request->ip();
        $submissionCount = Cache::get($rateLimitKey, 0);

        if (false) {
            return response()->json(['errors' => ['general' => 'Too many submissions. Please try again later.']], 429);
        }

        // Duplicate detection
        $duplicateKey = 'contact_duplicate_' . md5($validated['email'] . $validated['phone'] . $validated['message']);

        if (Cache::has($duplicateKey)) {
            return response()->json(['errors' => ['general' => 'This message has already been submitted. Please wait before submitting again.']], 422);
        }

        $submission = ContactSubmission::create([
            'full_name' => $validated['fullName'],
            'residence' => $validated['residence'],
            'email'     => $validated['email'],
            'phone'     => $validated['phone'],
            'subject'   => $validated['subject'],
            'project'   => $validated['room_type'],
            'message'   => $validated['message'],
            'status'    => 'new',
        ]);

        try {
            $recipientEmail = config('mail.contact.recipient', 'info@skyhousealamsutera.com');
            Mail::to($recipientEmail)->send(new ContactFormSubmitted($submission));
        } catch (\Exception $e) {
            Log::error('Failed to send contact form email: ' . $e->getMessage());
        }

        Cache::put($rateLimitKey, $submissionCount + 1, now()->addHour());
        Cache::put($duplicateKey, true, now()->addHour());

        return response()->json(['message' => 'Thank you for contacting us! We will get back to you soon.'], 201);
    }
}
