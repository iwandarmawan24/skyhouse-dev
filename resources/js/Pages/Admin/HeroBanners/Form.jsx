import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { ChevronLeft, Upload, X, ZoomIn, ZoomOut, Monitor, Smartphone } from "lucide-react";
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
import { Switch } from "@/Components/ui/switch";
import { MediaPicker } from "@/Components/MediaPicker";

export default function Form({ banner }) {
    const isEdit = banner !== null;
    const { data, setData, post, processing, errors } = useForm({
        image: null,
        image_uid: banner?.image_uid || null,
        mobile_image: null,
        mobile_image_uid: banner?.mobile_image_uid || null,
        banner_link: banner?.banner_link || "",
        is_active: banner?.is_active ?? true,
        _method: isEdit ? "PUT" : "POST",
    });

    // Desktop MediaPicker state
    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(
        banner?.banner_image || null
    );

    // Mobile MediaPicker state
    const [showMobileMediaPicker, setShowMobileMediaPicker] = useState(false);
    const [selectedMobileMedia, setSelectedMobileMedia] = useState(
        banner?.mobile_banner_image || null
    );

    // Desktop image preview
    const [imagePreview, setImagePreview] = useState(() => {
        if (banner?.image) {
            return banner.image.startsWith("http")
                ? banner.image
                : `/storage/${banner.image}`;
        }
        return banner?.image_url || null;
    });

    // Mobile image preview
    const [mobileImagePreview, setMobileImagePreview] = useState(() => {
        if (banner?.mobile_image) {
            return banner.mobile_image.startsWith("http")
                ? banner.mobile_image
                : `/storage/${banner.mobile_image}`;
        }
        return banner?.mobile_image_url || null;
    });

    const [showImageModal, setShowImageModal] = useState(false);
    const [imageScale, setImageScale] = useState(1);
    const [modalImageSrc, setModalImageSrc] = useState(null);

    const openImageModal = (src) => {
        setModalImageSrc(src);
        setImageScale(1);
        setShowImageModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEdit
            ? `/admin/hero-banners/${banner.uid}`
            : "/admin/hero-banners";
        post(url);
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Page Header */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/admin/hero-banners">
                            <ChevronLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {isEdit ? "Edit Hero Banner" : "Create Hero Banner"}
                        </h1>
                        <p className="text-muted-foreground">
                            {isEdit
                                ? "Update banner details"
                                : "Add a new banner to the homepage carousel"}
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Banner Details</CardTitle>
                            <CardDescription>
                                Fill in the information below to{" "}
                                {isEdit ? "update" : "create"} a hero banner
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Desktop Image Upload */}
                            <div className="space-y-2">
                                <Label htmlFor="image">
                                    <div className="flex items-center gap-2">
                                        <Monitor className="h-4 w-4" />
                                        Desktop Banner Image{" "}
                                        {!isEdit && (
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        )}
                                    </div>
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                    Recommended: 1920x1080px or wider (16:9 landscape)
                                </p>

                                {selectedMedia || imagePreview ? (
                                    <div className="space-y-4">
                                        <div className="relative group rounded-lg overflow-hidden border">
                                            <img
                                                src={
                                                    selectedMedia?.url ||
                                                    selectedMedia?.thumbnail_url ||
                                                    imagePreview
                                                }
                                                alt="Desktop Preview"
                                                className="w-full h-64 object-cover cursor-pointer transition-transform group-hover:scale-105"
                                                onClick={() =>
                                                    openImageModal(
                                                        selectedMedia?.url || imagePreview
                                                    )
                                                }
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
                                                    setData("image", null);
                                                }}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        {selectedMedia && (
                                            <p className="text-sm text-muted-foreground">
                                                Selected from Media Library:{" "}
                                                {selectedMedia.filename}
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                                setShowMediaPicker(true)
                                            }
                                            className="w-full h-64 border-2 border-dashed hover:border-primary transition-colors"
                                        >
                                            <div className="flex flex-col items-center justify-center">
                                                <Upload className="w-10 h-10 text-muted-foreground mb-4" />
                                                <span className="text-sm font-medium text-foreground mb-1">
                                                    Select from Media Library
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    Or upload a new image
                                                </span>
                                            </div>
                                        </Button>
                                    </div>
                                )}

                                {errors.image && (
                                    <p className="text-sm text-destructive">
                                        {errors.image}
                                    </p>
                                )}
                                {errors.image_uid && (
                                    <p className="text-sm text-destructive">
                                        {errors.image_uid}
                                    </p>
                                )}
                                {isEdit && !selectedMedia && !imagePreview && (
                                    <p className="text-sm text-muted-foreground">
                                        Leave empty to keep the current image
                                    </p>
                                )}
                            </div>

                            {/* Mobile Image Upload */}
                            <div className="space-y-2">
                                <Label htmlFor="mobile_image">
                                    <div className="flex items-center gap-2">
                                        <Smartphone className="h-4 w-4" />
                                        Mobile Banner Image
                                        <span className="text-xs font-normal text-muted-foreground">
                                            (optional)
                                        </span>
                                    </div>
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                    Recommended: 1080x1920px (9:16 portrait). Falls back to desktop image if not set.
                                </p>

                                {selectedMobileMedia || mobileImagePreview ? (
                                    <div className="space-y-4">
                                        <div className="relative group rounded-lg overflow-hidden border max-w-xs">
                                            <img
                                                src={
                                                    selectedMobileMedia?.url ||
                                                    selectedMobileMedia?.thumbnail_url ||
                                                    mobileImagePreview
                                                }
                                                alt="Mobile Preview"
                                                className="w-full h-80 object-cover cursor-pointer transition-transform group-hover:scale-105"
                                                onClick={() =>
                                                    openImageModal(
                                                        selectedMobileMedia?.url || mobileImagePreview
                                                    )
                                                }
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
                                                    setSelectedMobileMedia(null);
                                                    setMobileImagePreview(null);
                                                    setData("mobile_image_uid", null);
                                                    setData("mobile_image", null);
                                                }}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        {selectedMobileMedia && (
                                            <p className="text-sm text-muted-foreground">
                                                Selected from Media Library:{" "}
                                                {selectedMobileMedia.filename}
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                                setShowMobileMediaPicker(true)
                                            }
                                            className="max-w-xs h-48 border-2 border-dashed hover:border-primary transition-colors"
                                        >
                                            <div className="flex flex-col items-center justify-center">
                                                <Smartphone className="w-8 h-8 text-muted-foreground mb-3" />
                                                <span className="text-sm font-medium text-foreground mb-1">
                                                    Select Mobile Image
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    From Media Library
                                                </span>
                                            </div>
                                        </Button>
                                    </div>
                                )}

                                {errors.mobile_image && (
                                    <p className="text-sm text-destructive">
                                        {errors.mobile_image}
                                    </p>
                                )}
                                {errors.mobile_image_uid && (
                                    <p className="text-sm text-destructive">
                                        {errors.mobile_image_uid}
                                    </p>
                                )}
                            </div>

                            {/* Banner Link */}
                            <div className="space-y-2">
                                <Label htmlFor="banner_link">
                                    Banner Link
                                </Label>
                                <Input
                                    id="banner_link"
                                    value={data.banner_link}
                                    onChange={(e) =>
                                        setData(
                                            "banner_link",
                                            e.target.value
                                        )
                                    }
                                    placeholder="e.g., /products"
                                    className={
                                        errors.banner_link
                                            ? "border-destructive"
                                            : ""
                                    }
                                />
                                {errors.banner_link && (
                                    <p className="text-sm text-destructive">
                                        {errors.banner_link}
                                    </p>
                                )}
                            </div>

                            {/* Status Toggle */}
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
                                            ? "Banner is visible on the website"
                                            : "Banner is hidden from the website"}
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

                    {/* Form Actions */}
                    <div className="flex items-center justify-end gap-4 mt-6">
                        <Button variant="outline" asChild>
                            <Link href="/admin/hero-banners">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing
                                ? "Saving..."
                                : isEdit
                                ? "Update Banner"
                                : "Create Banner"}
                        </Button>
                    </div>
                </form>
            </div>

            {/* Image Preview Modal */}
            {showImageModal && modalImageSrc && (
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
                                    setImageScale(
                                        Math.max(0.5, imageScale - 0.25)
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
                                    setImageScale(
                                        Math.min(3, imageScale + 0.25)
                                    );
                                }}
                                className="text-white hover:text-white hover:bg-white/20 h-8 w-8"
                            >
                                <ZoomIn className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setImageScale(1);
                                }}
                                className="text-white hover:text-white hover:bg-white/20 h-8 px-3 text-sm"
                            >
                                Reset
                            </Button>
                        </div>

                        <div
                            className="overflow-auto max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={modalImageSrc}
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

            {/* Desktop MediaPicker Modal */}
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
                folder="hero-banners"
                recommendedSize="1920 × 1080px"
            />

            {/* Mobile MediaPicker Modal */}
            <MediaPicker
                open={showMobileMediaPicker}
                onClose={() => setShowMobileMediaPicker(false)}
                onSelect={(media) => {
                    setSelectedMobileMedia(media);
                    setData("mobile_image_uid", media.uid);
                    setMobileImagePreview(null);
                    setShowMobileMediaPicker(false);
                }}
                accept="image"
                folder="hero-banners"
                recommendedSize="768 × 1024px"
            />
        </AdminLayout>
    );
}
