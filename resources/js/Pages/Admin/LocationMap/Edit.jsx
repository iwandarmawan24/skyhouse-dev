import AdminLayout from "@/Layouts/AdminLayout";
import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { X, ZoomIn, ZoomOut, Image as ImageIcon } from "lucide-react";
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
import { MediaPicker } from "@/Components/MediaPicker";

export default function Edit({ locationMap }) {
    const { data, setData, post, processing, errors } = useForm({
        title: locationMap?.title || "Strategic Location in CBD of Alam Sutera",
        image_uid: locationMap?.image_uid || null,
        google_maps_link: locationMap?.google_maps_link || "",
        _method: "PUT",
    });

    // MediaPicker state
    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(
        locationMap?.map_image || null
    );

    // Image preview and modal state
    const [imagePreview, setImagePreview] = useState(
        locationMap?.image_url || null
    );
    const [showImageModal, setShowImageModal] = useState(false);
    const [imageScale, setImageScale] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/location-map");
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

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Page Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Location Map Settings
                    </h1>
                    <p className="text-muted-foreground">
                        Configure the strategic location map display on the homepage
                    </p>
                </div>

                {/* Form Card */}
                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Map Details</CardTitle>
                            <CardDescription>
                                Update the location map information and image
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
                                    placeholder="Strategic Location in CBD of Alam Sutera"
                                    required
                                    className={
                                        errors.title ? "border-destructive" : ""
                                    }
                                />
                                {errors.title && (
                                    <p className="text-sm text-destructive">
                                        {errors.title}
                                    </p>
                                )}
                                <p className="text-sm text-muted-foreground">
                                    You can use HTML tags like &lt;span class="font-bodoni italic"&gt; for styling
                                </p>
                            </div>

                            {/* Image */}
                            <div className="space-y-2">
                                <Label>
                                    Map Image{" "}
                                    <span className="text-destructive">*</span>
                                </Label>

                                {imagePreview ? (
                                    <div className="relative border rounded-lg p-4 space-y-4">
                                        <div className="relative">
                                            <img
                                                src={imagePreview}
                                                alt="Map preview"
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
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">
                                        Select an image from the Media Library (folder: <strong>location-maps</strong>).
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Recommended size: 1200x800px or larger. Upload images to the "location-maps" folder in Media Library if not available.
                                    </p>
                                </div>
                            </div>

                            {/* Google Maps Link */}
                            <div className="space-y-2">
                                <Label htmlFor="google_maps_link">
                                    Google Maps Link
                                </Label>
                                <Input
                                    id="google_maps_link"
                                    type="url"
                                    value={data.google_maps_link}
                                    onChange={(e) =>
                                        setData("google_maps_link", e.target.value)
                                    }
                                    placeholder="https://maps.app.goo.gl/..."
                                    className={
                                        errors.google_maps_link
                                            ? "border-destructive"
                                            : ""
                                    }
                                />
                                {errors.google_maps_link && (
                                    <p className="text-sm text-destructive">
                                        {errors.google_maps_link}
                                    </p>
                                )}
                                <p className="text-sm text-muted-foreground">
                                    The URL that will open when users click "See Google Map"
                                </p>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end gap-2">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                >
                                    {processing ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>

            {/* Media Picker Modal */}
            <MediaPicker
                open={showMediaPicker}
                onClose={() => setShowMediaPicker(false)}
                onSelect={handleMediaSelect}
                accept="image"
                folder="location-maps"
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
                            alt="Map preview - full size"
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
        </AdminLayout>
    );
}
