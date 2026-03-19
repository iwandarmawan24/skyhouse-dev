import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";
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
import { Input } from "@/Components/ui/Input";
import { Label } from "@/Components/ui/Label";
import { Textarea } from "@/Components/ui/Textarea";
import { Switch } from "@/Components/ui/switch";
import { MediaPicker } from "@/Components/MediaPicker";

export default function Form({ milestone }) {
    const isEdit = milestone !== null;
    const { data, setData, post, processing, errors } = useForm({
        year: milestone?.year || "",
        title: milestone?.title || "",
        description: milestone?.description || "",
        image_uid: milestone?.image_uid || null,
        is_active: milestone?.is_active ?? true,
        _method: isEdit ? "PUT" : "POST",
    });

    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(
        milestone?.milestone_image || null
    );
    const [imagePreview, setImagePreview] = useState(
        milestone?.image_url || null
    );
    const [showImageModal, setShowImageModal] = useState(false);
    const [imageScale, setImageScale] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEdit
            ? `/admin/milestones/${milestone.uid}`
            : "/admin/milestones";
        post(url);
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/admin/milestones">
                            <ChevronLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {isEdit ? "Edit Milestone" : "Create Milestone"}
                        </h1>
                        <p className="text-muted-foreground">
                            {isEdit
                                ? "Update milestone details"
                                : "Add a new milestone to the history timeline"}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Milestone Details</CardTitle>
                            <CardDescription>
                                Fill in the information below to{" "}
                                {isEdit ? "update" : "create"} a milestone
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Year & Title */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="year">
                                        Year{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </Label>
                                    <Input
                                        id="year"
                                        value={data.year}
                                        onChange={(e) =>
                                            setData("year", e.target.value)
                                        }
                                        placeholder="e.g., 2024"
                                        className={
                                            errors.year
                                                ? "border-destructive"
                                                : ""
                                        }
                                    />
                                    {errors.year && (
                                        <p className="text-sm text-destructive">
                                            {errors.year}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2 md:col-span-3">
                                    <Label htmlFor="title">
                                        Title{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                        placeholder="e.g., Foundation"
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
                                    placeholder="Describe this milestone..."
                                    rows={3}
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
                                <Label>Image</Label>

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
                                                Selected: {selectedMedia.filename}
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
                                                Optional milestone image
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
                                            ? "Milestone is visible on the website"
                                            : "Milestone is hidden from the website"}
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
                            <Link href="/admin/milestones">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing
                                ? "Saving..."
                                : isEdit
                                ? "Update Milestone"
                                : "Create Milestone"}
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
                folder="milestones"
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
