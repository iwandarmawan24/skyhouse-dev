<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = ContactSubmission::latest();

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter by subject
        if ($request->filled('subject')) {
            $query->where('subject', $request->subject);
        }

        // Filter by project
        if ($request->filled('project')) {
            $query->where('project', $request->project);
        }

        // Search by name, email, or phone
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('full_name', 'ilike', "%{$search}%")
                    ->orWhere('email', 'ilike', "%{$search}%")
                    ->orWhere('phone', 'ilike', "%{$search}%");
            });
        }

        $contacts = $query->paginate(15)->withQueryString();

        return Inertia::render('Admin/Contacts/Index', [
            'contacts' => $contacts,
            'filters' => $request->only(['status', 'subject', 'project', 'search']),
        ]);
    }

    /**
     * Export contacts as CSV, respecting active filters.
     */
    public function export(Request $request): StreamedResponse
    {
        $query = ContactSubmission::latest();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('subject')) {
            $query->where('subject', $request->subject);
        }
        if ($request->filled('project')) {
            $query->where('project', $request->project);
        }
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('full_name', 'ilike', "%{$search}%")
                    ->orWhere('email', 'ilike', "%{$search}%")
                    ->orWhere('phone', 'ilike', "%{$search}%");
            });
        }

        $contacts = $query->get();
        $filename = 'contacts-' . now()->format('Y-m-d') . '.csv';

        return response()->streamDownload(function () use ($contacts) {
            $handle = fopen('php://output', 'w');

            fputcsv($handle, ['Name', 'Email', 'Phone', 'Residence', 'Subject', 'Project', 'Message', 'Status', 'Date']);

            $subjectMap = [
                'inquiry'  => 'General Inquiry',
                'purchase' => 'Purchase Information',
                'visit'    => 'Schedule Visit',
                'other'    => 'Other',
            ];

            foreach ($contacts as $contact) {
                fputcsv($handle, [
                    $contact->full_name,
                    $contact->email,
                    $contact->phone,
                    $contact->residence,
                    $subjectMap[$contact->subject] ?? $contact->subject,
                    $contact->project === 'kinary' ? 'Kinary House' : ($contact->project ?? ''),
                    $contact->message,
                    $contact->status,
                    $contact->created_at->format('Y-m-d H:i'),
                ]);
            }

            fclose($handle);
        }, $filename, [
            'Content-Type' => 'text/csv',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(ContactSubmission $contact)
    {
        // Mark as in_progress when viewing if still new
        if ($contact->status === 'new') {
            $contact->update(['status' => 'in_progress']);
        }

        return Inertia::render('Admin/Contacts/Show', [
            'contact' => $contact,
        ]);
    }

    /**
     * Mark contact as read/unread.
     */
    public function markAsRead(Request $request, ContactSubmission $contact)
    {
        $validated = $request->validate([
            'status' => 'required|in:new,in_progress,resolved',
        ]);

        $contact->update($validated);

        return back()->with('success', 'Contact status updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ContactSubmission $contact)
    {
        $contact->delete();

        return redirect()->route('admin.contacts.index')
            ->with('success', 'Contact deleted successfully.');
    }
}
