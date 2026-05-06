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
        $contacts = $this->filteredQuery($request)->get();
        $filename = 'contacts-' . now()->format('Y-m-d') . '.csv';

        return response()->streamDownload(function () use ($contacts) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['Name', 'Email', 'Phone', 'Residence', 'Subject', 'Project', 'Message', 'Status', 'Date']);

            foreach ($contacts as $contact) {
                fputcsv($handle, $this->contactRow($contact));
            }

            fclose($handle);
        }, $filename, ['Content-Type' => 'text/csv']);
    }

    /**
     * Export contacts as Excel (.xls), respecting active filters.
     */
    public function exportExcel(Request $request)
    {
        $contacts  = $this->filteredQuery($request)->get();
        $filename  = 'contacts-' . now()->format('Y-m-d') . '.xls';
        $headers   = ['Name', 'Email', 'Phone', 'Residence', 'Subject', 'Project', 'Message', 'Status', 'Date'];

        $html  = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">';
        $html .= '<head><meta charset="UTF-8"></head><body><table border="1">';
        $html .= '<tr>' . implode('', array_map(fn($h) => "<th><b>{$h}</b></th>", $headers)) . '</tr>';

        foreach ($contacts as $contact) {
            $cells = array_map(
                fn($val) => '<td>' . htmlspecialchars((string) ($val ?? '')) . '</td>',
                $this->contactRow($contact)
            );
            $html .= '<tr>' . implode('', $cells) . '</tr>';
        }

        $html .= '</table></body></html>';

        return response($html, 200, [
            'Content-Type'        => 'application/vnd.ms-excel',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ]);
    }

    private function filteredQuery(Request $request)
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

        return $query;
    }

    private function contactRow(ContactSubmission $contact): array
    {
        $subjectMap = [
            'inquiry'  => 'General Inquiry',
            'purchase' => 'Purchase Information',
            'visit'    => 'Schedule Visit',
            'other'    => 'Other',
        ];

        return [
            $contact->full_name,
            $contact->email,
            $contact->phone,
            $contact->residence,
            $subjectMap[$contact->subject] ?? $contact->subject,
            $contact->project === 'kinary' ? 'Kinary House' : ($contact->project ?? ''),
            $contact->message,
            $contact->status,
            $contact->created_at->format('Y-m-d H:i'),
        ];
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
