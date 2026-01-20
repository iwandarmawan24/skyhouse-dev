<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Mail\ContactFormSubmitted;
use App\Models\ContactSubmission;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    /**
     * Display the contact page
     */
    public function index(): Response
    {
        // Get all active products for room type selection
        $products = Product::where('is_active', true)
            ->orderBy('name')
            ->get()
            ->map(function ($product) {
                return [
                    'uid' => $product->uid,
                    'name' => $product->name,
                    'slug' => $product->slug,
                ];
            });

        return Inertia::render('Contact', [
            'formLoadTime' => now()->timestamp,
            'products' => $products,
        ]);
    }

    /**
     * Store a contact form submission
     */
    public function store(Request $request)
    {
        // Validate the form data
        $validated = $request->validate([
            'fullName' => 'required|string|max:255',
            'residence' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'subject' => 'required|string|max:255',
            'room_type' => 'required|string|max:255',
            'message' => 'required|string|max:2000',
            'honeypot' => 'nullable|string|max:0', // Honeypot field should be empty
            'formLoadTime' => 'required|integer',
        ]);

        // 1. HONEYPOT VALIDATION - Bot trap
        if (!empty($validated['honeypot'])) {
            // Silently reject - bot filled the hidden field
            return redirect()->route('contact')->with('success', 'Thank you for contacting us! We will get back to you soon.');
        }

        // 2. TIME-BASED VALIDATION - Prevent instant submissions
        $timeSpent = now()->timestamp - $validated['formLoadTime'];
        if ($timeSpent < 3) {
            // Too fast - likely a bot
            return back()->withErrors([
                'general' => 'Please take your time to fill out the form.',
            ])->withInput();
        }

        // 3. RATE LIMITING - Prevent spam from same IP
        $ip = $request->ip();
        $rateLimitKey = 'contact_form_' . $ip;
        $submissionCount = Cache::get($rateLimitKey, 0);

        // Check if exceeded rate limit (3 submissions per hour)
        if ($submissionCount >= 3) {
            return back()->withErrors([
                'general' => 'Too many submissions. Please try again later.',
            ])->withInput();
        }

        // 4. DUPLICATE DETECTION - Prevent same content spam
        $contentHash = md5(
            $validated['email'] .
            $validated['phone'] .
            $validated['message']
        );
        $duplicateKey = 'contact_duplicate_' . $contentHash;

        if (Cache::has($duplicateKey)) {
            return back()->withErrors([
                'general' => 'This message has already been submitted. Please wait before submitting again.',
            ])->withInput();
        }

        // Create the contact submission
        $submission = ContactSubmission::create([
            'full_name' => $validated['fullName'],
            'residence' => $validated['residence'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'subject' => $validated['subject'],
            'project' => $validated['room_type'], // Store room_type as project
            'message' => $validated['message'],
            'status' => 'new',
        ]);

        // Send email notification
        try {
            $recipientEmail = config('mail.contact.recipient', 'info@skyhousealamsutera.com');
            Mail::to($recipientEmail)->send(new ContactFormSubmitted($submission));
        } catch (\Exception $e) {
            // Log error but don't fail the request
            \Log::error('Failed to send contact form email: ' . $e->getMessage());
        }

        // Update rate limiting counter (expires in 1 hour)
        Cache::put($rateLimitKey, $submissionCount + 1, now()->addHour());

        // Store duplicate hash (expires in 1 hour)
        Cache::put($duplicateKey, true, now()->addHour());

        return redirect()->route('contact')->with('success', 'Thank you for contacting us! We will get back to you soon.');
    }
}
