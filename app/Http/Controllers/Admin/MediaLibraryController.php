<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MediaLibrary;
use App\Services\MediaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class MediaLibraryController extends Controller
{
    protected MediaService $mediaService;

    public function __construct(MediaService $mediaService)
    {
        $this->mediaService = $mediaService;
    }

    /**
     * Display media library
     */
    public function index(Request $request)
    {
        $query = MediaLibrary::with(['uploader', 'variants'])
            ->latest();

        // Filter by file type
        if ($request->filled('type')) {
            $query->where('file_type', $request->type);
        }

        // Filter by folder
        if ($request->filled('folder')) {
            $query->where('folder', $request->folder);
        }

        // Search
        if ($request->filled('search')) {
            $query->search($request->search);
        }

        // Filter by date
        if ($request->filled('month')) {
            $query->whereYear('created_at', substr($request->month, 0, 4))
                  ->whereMonth('created_at', substr($request->month, 5, 2));
        }

        $media = $query->paginate(24)->withQueryString();

        // Get folders for filter
        $folders = MediaLibrary::select('folder')
            ->distinct()
            ->whereNotNull('folder')
            ->orderBy('folder')
            ->pluck('folder');

        // Get statistics
        $stats = [
            'total' => MediaLibrary::count(),
            'images' => MediaLibrary::images()->count(),
            'videos' => MediaLibrary::videos()->count(),
            'documents' => MediaLibrary::documents()->count(),
            'total_size' => MediaLibrary::sum('file_size'),
        ];

        return Inertia::render('Admin/MediaLibrary/Index', [
            'media' => $media,
            'folders' => $folders,
            'stats' => $stats,
            'filters' => $request->only(['type', 'folder', 'search', 'month']),
        ]);
    }

    /**
     * Upload media files
     */
    public function upload(Request $request)
    {
        $request->validate([
            'files' => 'required|array',
            'files.*' => 'required|file|max:10240', // 10MB max
            'folder' => 'nullable|string|max:255',
            'alt_text' => 'nullable|string|max:255',
            'caption' => 'nullable|string',
        ]);

        $options = [
            'folder' => $request->folder,
            'alt_text' => $request->alt_text,
            'caption' => $request->caption,
        ];

        $uploadedMedia = $this->mediaService->uploadMultiple($request->file('files'), $options);

        return response()->json([
            'success' => true,
            'message' => count($uploadedMedia) . ' file(s) uploaded successfully',
            'media' => $uploadedMedia,
        ]);
    }

    /**
     * Get single media details
     */
    public function show(MediaLibrary $media)
    {
        $media->load(['uploader', 'variants', 'usage']);

        return response()->json([
            'success' => true,
            'media' => $media,
        ]);
    }

    /**
     * Update media metadata
     */
    public function update(Request $request, MediaLibrary $media)
    {
        $validated = $request->validate([
            'alt_text' => 'nullable|string|max:255',
            'caption' => 'nullable|string',
            'description' => 'nullable|string',
            'folder' => 'nullable|string|max:255',
            'tags' => 'nullable|array',
        ]);

        $updatedMedia = $this->mediaService->updateMetadata($media, $validated);

        return response()->json([
            'success' => true,
            'message' => 'Media updated successfully',
            'media' => $updatedMedia,
        ]);
    }

    /**
     * Replace media file
     */
    public function replace(Request $request, MediaLibrary $media)
    {
        $request->validate([
            'file' => 'required|file|max:10240',
        ]);

        $updatedMedia = $this->mediaService->replace($media, $request->file('file'));

        return response()->json([
            'success' => true,
            'message' => 'Media replaced successfully',
            'media' => $updatedMedia,
        ]);
    }

    /**
     * Delete media
     */
    public function destroy(Request $request, MediaLibrary $media)
    {
        $force = $request->boolean('force', false);

        Log::info('Media deletion requested', [
            'media_uid' => $media->uid,
            'filename' => $media->filename,
            'force' => $force,
            'user_id' => auth()->id(),
        ]);

        try {
            $this->mediaService->delete($media, $force);

            Log::info('Media deleted successfully', [
                'media_uid' => $media->uid,
                'filename' => $media->filename,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Media deleted successfully',
            ]);
        } catch (\Exception $e) {
            Log::error('Media deletion failed', [
                'media_uid' => $media->uid,
                'filename' => $media->filename,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request)
    {
        $request->validate([
            'media_uids' => 'required|array',
            'media_uids.*' => 'required|exists:media_library,uid',
            'force' => 'boolean',
        ]);

        $force = $request->boolean('force', false);
        $deleted = 0;
        $errors = [];

        foreach ($request->media_uids as $uid) {
            try {
                $media = MediaLibrary::find($uid);
                if ($media) {
                    $this->mediaService->delete($media, $force);
                    $deleted++;
                }
            } catch (\Exception $e) {
                $errors[] = [
                    'uid' => $uid,
                    'error' => $e->getMessage(),
                ];
            }
        }

        return response()->json([
            'success' => true,
            'message' => "{$deleted} media file(s) deleted successfully",
            'deleted' => $deleted,
            'errors' => $errors,
        ]);
    }

    /**
     * Get media picker data (for modal)
     */
    public function picker(Request $request)
    {
        $query = MediaLibrary::with(['variants'])
            ->latest();

        // Filter by file type
        if ($request->filled('type')) {
            if ($request->type === 'image') {
                $query->images();
            } elseif ($request->type === 'video') {
                $query->videos();
            } elseif ($request->type === 'document') {
                $query->documents();
            }
        }

        // Search
        if ($request->filled('search')) {
            $query->search($request->search);
        }

        // Folder filter
        if ($request->filled('folder')) {
            $query->where('folder', $request->folder);
        }

        $media = $query->paginate(20);

        return response()->json([
            'success' => true,
            'media' => $media,
        ]);
    }
}
