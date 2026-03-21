import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm, router } from "@inertiajs/react";
import { useState } from "react";
import { ChevronLeft, X, ZoomIn, ZoomOut, Upload } from "lucide-react";
import { Button } from "@/Components/ui/Button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/Card";
import { Label } from "@/Components/ui/Label";
import { Switch } from "@/Components/ui/switch";
import { MediaPicker } from "@/Components/MediaPicker";

export default function ItemForm({ item }) {
    const isEdit = item !== null;
    const { data, setData, post, processing, errors } = useForm({
        progress_date: item?.progress_date
            ? item.progress_date.substring(0, 7)
            : "",
        image_uid: item?.image_uid || null,
        is_active: item?.is_active ?? true,
        _method: isEdit ? "PUT" : "POST",
    });

    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(
        item?.item_image || null
    );
    const [imagePreview, setImagePreview] = useState(
        item?.image_url || null
    );
    const [showImageModal, setShowImageModal] = useState(false);
    const [imageScale, setImageScale] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEdit
            ? `/admin/construction-progress-items/${item.uid}`
            : "/admin/construction-progress-items";

        router.post(url, {
            ...data,
            progress_date: data.progress_date
                ? `${data.progress_date}-01`
                : "",
        });
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/admin/construction-progress">
                            <ChevronLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {isEdit
                                ? "Edit Progress Item"
                                : "Add Progress Item"}
                        </h1>
                        <p className="text-muted-foreground">
                            {isEdit
                                ? "Update construction progress item"
                                : "Add a new construction progress entry by month"}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Progress Details</CardTitle>
                            <CardDescription>
                                Select the month/year and upload an image for
                                this progress entry
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Month/Year */}
                            <div className="space-y-2">
                                <Label htmlFor="progress_date">
                                    Month & Year{" "}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <input
                                    type="month"
                                    id="progress_date"
                                    value={data.progress_date}
                                    onChange={(e) =>
                                        setData("progress_date", e.target.value)
                                    }
                                    required
                                    className={`flex h-10 w-full max-w-xs rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                                        errors.progress_date
                                            ? "border-destructive"
                                            : ""
                                    }`}
                                />
                                {errors.progress_date && (
                                    <p className="text-sm text-destructive">
                                        {errors.progress_date}
                                    </p>
                                )}
                                <p className="text-sm text-muted-foreground">
                                    This will be used as the title for this
                                    progress entry (e.g., "March 2026")
                                </p>
                            </div>

                            {/* Image */}
                            <div className="space-y-2">
                                <Label>
                                    Image{" "}
                                    <span className="text-destructive">*</span>
                                </Label>

                                {selectedMedia || imagePreview ? (
                                    <div className="space-y-4">
                                        <div className="relative group rounded-lg overflow-hidden border">
                                            <img
                                                src={
                                                    selectedMedia?.url ||
                                                    selectedMedia?.thumbnail_url ||
                                                    imagePreview
                                                }
                                                alt="Preview"
                                                className="w-full h-48 object-cover cursor-pointer transition-transform group-hover:scale-105"
                                                onClick={() => {
                                                    setShowImageModal(true);
                                                    setImageScale(1);
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                                                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute top-2 right-2"
                                                onClick={() => {
                                                    setSelectedMedia(null);
                                                    setImagePreview(null);
                                                    setData("image_uid", null);
                                                }}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        {selectedMedia && (
                                            <p className="text-sm text-muted-foreground">
                                                Selected:{" "}
                                                {selectedMedia.filename}
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() =>
                                            setShowMediaPicker(true)
                                        }
                                        className="w-full h-48 border-2 border-dashed hover:border-primary transition-colors"
                                    >
                                        <div className="flex flex-col items-center justify-center">
                                            <Upload className="w-10 h-10 text-muted-foreground mb-4" />
                                            <span className="text-sm font-medium text-foreground mb-1">
                                                Select from Media Library
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                Construction progress photo
                                            </span>
                                        </div>
                                    </Button>
                                )}

                                {errors.image_uid && (
                                    <p className="text-sm text-destructive">
                                        {errors.image_uid}
                                    </p>
                                )}
                            </div>

                            {/* Status */}
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <Label
                                        htmlFor="is_active"
                                        className="text-base"
                                    >
                                        Active Status
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        {data.is_active
                                            ? "Progress item is visible on the website"
                                            : "Progress item is hidden from the website"}
                                    </p>
                                </div>
                                <Switch
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(checked) =>
                                        setData("is_active", checked)
                                    }
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex items-center justify-end gap-4 mt-6">
                        <Button variant="outline" asChild>
                            <Link href="/admin/construction-progress">
                                Cancel
                            </Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing
                                ? "Saving..."
                                : isEdit
                                ? "Update Progress"
                                : "Create Progress"}
                        </Button>
                    </div>
                </form>
            </div>

            <MediaPicker
                open={showMediaPicker}
                onClose={() => setShowMediaPicker(false)}
                onSelect={(media) => {
                    setSelectedMedia(media);
                    setData("image_uid", media.uid);
                    setImagePreview(null);
                    setShowMediaPicker(false);
                }}
                accept="image"
                folder="construction-progress"
            />

            {showImageModal && (selectedMedia || imagePreview) && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={() => setShowImageModal(false)}
                >
                    <div className="relative max-w-7xl max-h-screen">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowImageModal(false)}
                            className="absolute top-4 right-4 z-10 text-white hover:text-white hover:bg-white/20 rounded-full"
                        >
                            <X className="h-6 w-6" />
                        </Button>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-2 bg-black/50 rounded-full px-4 py-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setImageScale((s) =>
                                        Math.max(0.5, s - 0.25)
                                    );
                                }}
                                className="text-white hover:text-white hover:bg-white/20 h-8 w-8"
                            >
                                <ZoomOut className="h-4 w-4" />
                            </Button>
                            <span className="text-white font-medium min-w-[4rem] text-center text-sm">
                                {Math.round(imageScale * 100)}%
                            </span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setImageScale((s) =>
                                        Math.min(3, s + 0.25)
                                    );
                                }}
                                className="text-white hover:text-white hover:bg-white/20 h-8 w-8"
                            >
                                <ZoomIn className="h-4 w-4" />
                            </Button>
                        </div>
                        <div
                            className="overflow-auto max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedMedia?.url || imagePreview}
                                alt="Preview"
                                style={{
                                    transform: `scale(${imageScale})`,
                                    transition: "transform 0.2s ease-in-out",
                                }}
                                className="max-w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
