import AdminLayout from '@/Layouts/AdminLayout';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { MediaPicker } from '@/Components/MediaPicker';
import { Button } from '@/Components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/Card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/Components/ui/Dialog';
import { Image as ImageIcon, Plus, X, Eye, EyeOff } from 'lucide-react';

export default function Index({ galleries }) {
    const { flash } = usePage().props;
    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

    const handleAddImage = (position) => {
        setSelectedPosition(position);
        setShowMediaPicker(true);
    };

    const handleMediaSelect = (selectedMedia) => {
        if (selectedMedia && selectedPosition) {
            router.post('/admin/instagram-gallery/update-position', {
                position: selectedPosition,
                image_uid: selectedMedia.uid,
                is_active: true,
            }, {
                preserveScroll: true,
                preserveState: false,
                onSuccess: () => {
                    setShowMediaPicker(false);
                    setSelectedPosition(null);
                },
            });
        }
    };

    const handleDelete = (position) => {
        router.delete('/admin/instagram-gallery/delete-position', {
            data: { position },
            preserveScroll: true,
            preserveState: false,
            onSuccess: () => setShowDeleteConfirm(null),
        });
    };

    const handleToggleActive = (position) => {
        router.post('/admin/instagram-gallery/toggle-active', {
            position,
        }, {
            preserveScroll: true,
            preserveState: false,
        });
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Instagram Gallery</h1>
                        <p className="text-muted-foreground mt-1">
                            Manage your Instagram showcase images (6 images grid)
                        </p>
                    </div>
                </div>

                {/* Info Card */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                            <div className="flex items-start gap-3">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-blue-900">
                                        Instagram Gallery Grid
                                    </p>
                                    <p className="text-sm text-blue-700 mt-1">
                                        Click on any grid slot to add or change an image. Maximum 6 images in fixed positions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Grid Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Gallery Grid (6 Images)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                            {[1, 2, 3, 4, 5, 6].map((position) => {
                                const gallery = galleries[position];

                                return (
                                    <div
                                        key={position}
                                        className="relative group aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors overflow-hidden"
                                    >
                                        {gallery ? (
                                            <>
                                                {/* Image */}
                                                <img
                                                    src={gallery.media_image?.url}
                                                    alt={`Position ${position}`}
                                                    className="w-full h-full object-cover"
                                                />

                                                {/* Overlay with actions */}
                                                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-60 transition-all flex items-center justify-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleToggleActive(position)}
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-white hover:bg-gray-100 text-gray-700 rounded-lg"
                                                        title={gallery.is_active ? 'Deactivate' : 'Activate'}
                                                    >
                                                        {gallery.is_active ? (
                                                            <Eye className="w-4 h-4" />
                                                        ) : (
                                                            <EyeOff className="w-4 h-4" />
                                                        )}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleAddImage(position)}
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                                                    >
                                                        Change
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowDeleteConfirm(position)}
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                {/* Status indicator */}
                                                <div className="absolute top-2 right-2">
                                                    <span className={`text-xs px-2 py-1 rounded ${
                                                        gallery.is_active
                                                            ? 'bg-green-500 text-white'
                                                            : 'bg-gray-500 text-white'
                                                    }`}>
                                                        {gallery.is_active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>

                                                {/* Position number */}
                                                <div className="absolute bottom-2 left-2">
                                                    <span className="text-xs px-2 py-1 rounded bg-black bg-opacity-50 text-white">
                                                        Position {position}
                                                    </span>
                                                </div>
                                            </>
                                        ) : (
                                            /* Empty slot */
                                            <button
                                                type="button"
                                                onClick={() => handleAddImage(position)}
                                                className="w-full h-full flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                                            >
                                                <Plus className="w-8 h-8 text-gray-400" />
                                                <span className="text-sm text-gray-500">
                                                    Position {position}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    Click to add
                                                </span>
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* MediaPicker Modal */}
            <MediaPicker
                open={showMediaPicker}
                onClose={() => {
                    setShowMediaPicker(false);
                    setSelectedPosition(null);
                }}
                onSelect={handleMediaSelect}
                multiple={false}
                accept="image"
                folder="instagram-gallery"
            />

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={!!showDeleteConfirm}
                onOpenChange={() => setShowDeleteConfirm(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Remove Image</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to remove this image from position {showDeleteConfirm}?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowDeleteConfirm(null)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => handleDelete(showDeleteConfirm)}
                        >
                            Remove
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
