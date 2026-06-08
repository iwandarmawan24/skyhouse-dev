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

export default function Edit({ banner }) {
    const { data, setData, post, processing, errors } = useForm({
        image_uid: banner?.image_uid || null,
        url: banner?.url || banner?.default_url || "",
        is_active: banner?.is_active ?? true,
        _method: "PUT",
    });

    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [selectedImage, setSelectedImage] = useState(banner?.image || null);
    const [imagePreview, setImagePreview] = useState(
        banner?.image_url || banner?.default_image || null
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/virtual-tour-banner");
    };

    const handleRemoveImage = () => {
        setData("image_uid", null);
        setImagePreview(banner?.default_image || null);
        setSelectedImage(null);
    };

    const handleMediaSelect = (media) => {
        setSelectedImage(media);
        setData("image_uid", media.uid);
        setImagePreview(media.url);
        setShowMediaPicker(false);
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Virtual Tour Banner
                    </h1>
                    <p className="text-muted-foreground">
                        Manage the 360° virtual tour banner shown on the homepage
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Banner Settings</CardTitle>
                            <CardDescription>
                                Upload a banner image and set the link URL
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
                                                alt="Virtual tour banner preview"
                                                className="w-full h-auto rounded-lg"
                                            />
                                            {data.image_uid && (
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
                                                {selectedImage?.filename || "Using default image"}
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

                                {errors.image_uid && (
                                    <p className="text-sm text-destructive">
                                        {errors.image_uid}
                                    </p>
                                )}
                                <p className="text-sm text-muted-foreground">
                                    Leave empty to use the default banner image.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    Link URL
                                </label>
                                <input
                                    type="url"
                                    value={data.url}
                                    onChange={(e) => setData("url", e.target.value)}
                                    placeholder={banner?.default_url || "https://..."}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {errors.url && (
                                    <p className="text-sm text-destructive">
                                        {errors.url}
                                    </p>
                                )}
                                <p className="text-sm text-muted-foreground">
                                    Opens in a new tab when the banner is clicked.
                                </p>
                            </div>

                            <div className="flex items-center">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) => setData("is_active", e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                    <span className="ms-3 text-sm font-medium text-gray-700">
                                        Active (show on homepage)
                                    </span>
                                </label>
                            </div>

                            {banner?.updated_at && (
                                <div className="bg-muted/50 rounded-lg p-4">
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Last Updated:</strong> {banner.updated_at}
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
                folder="virtual-tour"
                recommendedSize="1920 × 1080px"
            />
        </AdminLayout>
    );
}
