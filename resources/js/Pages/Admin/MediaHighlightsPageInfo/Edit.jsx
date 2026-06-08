import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { X, ImageIcon } from "lucide-react";
import { Button } from "@/Components/ui/Button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/Card";
import { MediaPicker } from "@/Components/MediaPicker";

export default function Edit({ info }) {
    const { data, setData, post, processing, errors } = useForm({
        banner_image_uid: info?.banner_image_uid || null,
        title: info?.title || info?.default_title || "",
        subtitle: info?.subtitle || info?.default_subtitle || "",
        _method: "PUT",
    });

    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [selectedImage, setSelectedImage] = useState(info?.banner_image || null);
    const [imagePreview, setImagePreview] = useState(
        info?.banner_image_url || info?.default_banner || null
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/media-highlights-page-info");
    };

    const handleRemoveImage = () => {
        setData("banner_image_uid", null);
        setImagePreview(info?.default_banner || null);
        setSelectedImage(null);
    };

    const handleMediaSelect = (media) => {
        setSelectedImage(media);
        setData("banner_image_uid", media.uid);
        setImagePreview(media.url);
        setShowMediaPicker(false);
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Media Highlights Page Information
                    </h1>
                    <p className="text-muted-foreground">
                        Manage the hero banner shown on the Media Highlights page
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Banner Settings</CardTitle>
                            <CardDescription>
                                Set the banner image, title, and subtitle
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    Banner Image
                                </label>

                                {imagePreview ? (
                                    <div className="relative border rounded-lg p-4 space-y-4">
                                        <div className="relative">
                                            <img
                                                src={imagePreview}
                                                alt="Banner preview"
                                                className="w-full h-64 object-cover rounded-lg"
                                            />
                                            {data.banner_image_uid && (
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    className="absolute top-2 right-2"
                                                    onClick={handleRemoveImage}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-muted-foreground">
                                                {selectedImage?.filename || "Using default banner"}
                                            </p>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setShowMediaPicker(true)}
                                            >
                                                Change Image
                                            </Button>
                                        </div>
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
                                                onClick={() => setShowMediaPicker(true)}
                                            >
                                                Choose from Media Library
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {errors.banner_image_uid && (
                                    <p className="text-sm text-destructive">
                                        {errors.banner_image_uid}
                                    </p>
                                )}
                                <p className="text-sm text-muted-foreground">
                                    Leave empty to use the default banner image.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData("title", e.target.value)}
                                    placeholder={info?.default_title || "Media Highlights"}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {errors.title && (
                                    <p className="text-sm text-destructive">{errors.title}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    Subtitle
                                </label>
                                <textarea
                                    value={data.subtitle}
                                    onChange={(e) => setData("subtitle", e.target.value)}
                                    rows={2}
                                    placeholder={info?.default_subtitle || ""}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {errors.subtitle && (
                                    <p className="text-sm text-destructive">{errors.subtitle}</p>
                                )}
                            </div>

                            {info?.updated_at && (
                                <div className="bg-muted/50 rounded-lg p-4">
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Last Updated:</strong> {info.updated_at}
                                    </p>
                                </div>
                            )}

                            <div className="flex justify-end gap-2">
                                <Button type="submit" disabled={processing}>
                                    {processing ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>

            <MediaPicker
                open={showMediaPicker}
                onClose={() => setShowMediaPicker(false)}
                onSelect={handleMediaSelect}
                accept="image"
                folder="media-highlights-page"
                recommendedSize="1920 × 600px"
            />
        </AdminLayout>
    );
}
