import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm, router } from "@inertiajs/react";
import { useState } from "react";
import {
    X,
    ZoomIn,
    ZoomOut,
    Image as ImageIcon,
    Plus,
    Pencil,
    Trash2,
} from "lucide-react";
import { Button } from "@/Components/ui/Button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/Card";
import { Input } from "@/Components/ui/Input";
import { Label } from "@/Components/ui/Label";
import { Textarea } from "@/Components/ui/Textarea";
import { MediaPicker } from "@/Components/MediaPicker";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/Table";
import { Badge } from "@/Components/ui/Badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/Components/ui/Dialog";

export default function Edit({ constructionProgress, items = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        title: constructionProgress?.title || "Construction Progress",
        description: constructionProgress?.description || "",
        image_uid: constructionProgress?.image_uid || null,
        _method: "PUT",
    });

    // MediaPicker state
    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(
        constructionProgress?.progress_image || null
    );

    // Image preview and modal state
    const [imagePreview, setImagePreview] = useState(
        constructionProgress?.image_url || null
    );
    const [showImageModal, setShowImageModal] = useState(false);
    const [imageScale, setImageScale] = useState(1);

    // Delete confirmation state
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/construction-progress");
    };

    const handleRemoveImage = () => {
        setData("image_uid", null);
        setImagePreview(null);
        setSelectedMedia(null);
    };

    const handleMediaSelect = (media) => {
        setSelectedMedia(media);
        setData("image_uid", media.uid);
        setImagePreview(media.url);
        setShowMediaPicker(false);
    };

    const handleDeleteItem = (uid) => {
        router.delete(`/admin/construction-progress-items/${uid}`, {
            onSuccess: () => setShowDeleteConfirm(null),
        });
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Page Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Construction Progress
                    </h1>
                    <p className="text-muted-foreground">
                        Configure the construction progress section on the
                        homepage
                    </p>
                </div>

                {/* Form Card */}
                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Progress Details</CardTitle>
                            <CardDescription>
                                Update the construction progress information and
                                image
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title">
                                    Title{" "}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    placeholder="Construction Progress"
                                    required
                                    className={
                                        errors.title
                                            ? "border-destructive"
                                            : ""
                                    }
                                />
                                {errors.title && (
                                    <p className="text-sm text-destructive">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    placeholder="Enter a description for the construction progress section"
                                    rows={4}
                                    className={
                                        errors.description
                                            ? "border-destructive"
                                            : ""
                                    }
                                />
                                {errors.description && (
                                    <p className="text-sm text-destructive">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            {/* Image */}
                            <div className="space-y-2">
                                <Label>
                                    Image{" "}
                                    <span className="text-destructive">*</span>
                                </Label>

                                {imagePreview ? (
                                    <div className="relative border rounded-lg p-4 space-y-4">
                                        <div className="relative">
                                            <img
                                                src={imagePreview}
                                                alt="Construction progress preview"
                                                className="w-full h-64 object-cover rounded-lg cursor-pointer"
                                                onClick={() =>
                                                    setShowImageModal(true)
                                                }
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute top-2 right-2"
                                                onClick={handleRemoveImage}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        {selectedMedia && (
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm text-muted-foreground">
                                                    {selectedMedia.filename}
                                                </p>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        setShowMediaPicker(true)
                                                    }
                                                >
                                                    Change Image
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <ImageIcon className="h-12 w-12 text-muted-foreground" />
                                            <p className="text-sm text-muted-foreground">
                                                No image selected
                                            </p>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() =>
                                                    setShowMediaPicker(true)
                                                }
                                            >
                                                Choose from Media Library
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {errors.image_uid && (
                                    <p className="text-sm text-destructive">
                                        {errors.image_uid}
                                    </p>
                                )}
                                <p className="text-sm text-muted-foreground">
                                    Recommended size: 1200x800px or larger.
                                </p>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end gap-2">
                                <Button type="submit" disabled={processing}>
                                    {processing ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>

                {/* Progress Items List */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Progress Items</CardTitle>
                                <CardDescription>
                                    List of construction progress by month and
                                    year, ordered by date
                                </CardDescription>
                            </div>
                            <Link href="/admin/construction-progress-items/create">
                                <Button>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Progress
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {items.length > 0 ? (
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[120px]">
                                                Image
                                            </TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {items.map((item) => (
                                            <TableRow key={item.uid}>
                                                <TableCell>
                                                    {item.image_url ? (
                                                        <img
                                                            src={item.image_url}
                                                            alt={
                                                                item.progress_month
                                                            }
                                                            className="w-20 h-14 object-cover rounded"
                                                        />
                                                    ) : (
                                                        <div className="w-20 h-14 bg-muted rounded flex items-center justify-center">
                                                            <ImageIcon className="h-4 w-4 text-muted-foreground" />
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <span className="font-semibold text-base">
                                                        {item.progress_month}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            item.is_active
                                                                ? "success"
                                                                : "secondary"
                                                        }
                                                    >
                                                        {item.is_active
                                                            ? "Active"
                                                            : "Inactive"}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                            asChild
                                                        >
                                                            <Link
                                                                href={`/admin/construction-progress-items/${item.uid}/edit`}
                                                            >
                                                                <Pencil className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                            onClick={() =>
                                                                setShowDeleteConfirm(
                                                                    item.uid
                                                                )
                                                            }
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold">
                                    No progress items yet
                                </h3>
                                <p className="text-sm text-muted-foreground mb-6">
                                    Add construction progress photos organized
                                    by month and year.
                                </p>
                                <Link href="/admin/construction-progress-items/create">
                                    <Button>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Progress
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Media Picker Modal */}
            <MediaPicker
                open={showMediaPicker}
                onClose={() => setShowMediaPicker(false)}
                onSelect={handleMediaSelect}
                accept="image"
                folder="construction-progress"
            />

            {/* Image Preview Modal */}
            {showImageModal && (
                <div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowImageModal(false)}
                >
                    <div className="relative max-w-7xl max-h-[90vh]">
                        <div className="absolute top-4 right-4 flex gap-2 z-10">
                            <Button
                                variant="secondary"
                                size="icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setImageScale((prev) =>
                                        Math.max(0.5, prev - 0.25)
                                    );
                                }}
                            >
                                <ZoomOut className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="secondary"
                                size="icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setImageScale((prev) =>
                                        Math.min(3, prev + 0.25)
                                    );
                                }}
                            >
                                <ZoomIn className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => {
                                    setShowImageModal(false);
                                    setImageScale(1);
                                }}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <img
                            src={imagePreview}
                            alt="Construction progress - full size"
                            className="max-h-[90vh] rounded-lg"
                            style={{
                                transform: `scale(${imageScale})`,
                                transition: "transform 0.2s",
                            }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={!!showDeleteConfirm}
                onOpenChange={() => setShowDeleteConfirm(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Progress Item</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this progress item?
                            This action cannot be undone.
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
                            onClick={() => handleDeleteItem(showDeleteConfirm)}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
