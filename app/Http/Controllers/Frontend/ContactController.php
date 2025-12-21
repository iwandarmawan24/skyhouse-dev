<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Mail\ContactFormSubmitted;
use App\Models\ContactSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
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
        return Inertia::render('Contact', [
            'recaptchaSiteKey' => config('services.recaptcha.site_key'),
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
            'project' => 'required|string|max:255',
            'message' => 'required|string|max:2000',
            'recaptchaToken' => 'required|string',
        ]);

        // Verify reCAPTCHA v2
        $recaptchaSecret = config('services.recaptcha.secret_key');
        $recaptchaResponse = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
            'secret' => $recaptchaSecret,
            'response' => $validated['recaptchaToken'],
            'remoteip' => $request->ip(),
        ]);

        $recaptchaResult = $recaptchaResponse->json();

        // Check if reCAPTCHA v2 verification failed
        if (!$recaptchaResult['success']) {
            return back()->withErrors([
                'recaptcha' => 'Please complete the reCAPTCHA challenge.',
            ])->withInput();
        }

        // Create the contact submission
        $submission = ContactSubmission::create([
            'full_name' => $validated['fullName'],
            'residence' => $validated['residence'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'subject' => $validated['subject'],
            'project' => $validated['project'],
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

        return redirect()->route('contact')->with('success', 'Thank you for contacting us! We will get back to you soon.');
    }
}
