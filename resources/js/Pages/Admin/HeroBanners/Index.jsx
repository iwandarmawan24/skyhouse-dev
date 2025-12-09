import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import {
    Plus,
    Image as ImageIcon,
    Pencil,
    Trash2,
    GripVertical,
    ArrowUp,
    ArrowDown,
} from "lucide-react";
import { Button } from "@/Components/ui/Button";
import { Card, CardContent } from "@/Components/ui/Card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/Components/ui/Dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/Table";
import { Badge } from "@/Components/ui/Badge";

export default function Index({ banners }) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageScale, setImageScale] = useState(1);

    const handleDelete = (uid) => {
        router.delete(`/admin/hero-banners/${uid}`, {
            onSuccess: () => setShowDeleteConfirm(null),
        });
    };

    const handleImageClick = (imageUrl, title) => {
        setSelectedImage({ url: imageUrl, title });
        setShowImageModal(true);
        setImageScale(1);
    };

    const handleMoveUp = (banner, index) => {
        if (index === 0) return;

        const prevBanner = banners[index - 1];
        router.post(
            "/admin/hero-banners/update-order",
            {
                updates: [
                    { uid: banner.uid, order: prevBanner.order },
                    { uid: prevBanner.uid, order: banner.order },
                ],
            },
            {
                preserveScroll: true,
            }
        );
    };

    const handleMoveDown = (banner, index) => {
        if (index === banners.length - 1) return;

        const nextBanner = banners[index + 1];
        router.post(
            "/admin/hero-banners/update-order",
            {
                updates: [
                    { uid: banner.uid, order: nextBanner.order },
                    { uid: nextBanner.uid, order: banner.order },
                ],
            },
            {
                preserveScroll: true,
            }
        );
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Hero Banners
                        </h1>
                        <p className="text-muted-foreground">
                            Manage homepage carousel banners
                        </p>
                    </div>
                    <Link href="/admin/hero-banners/create">
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Add New Banner
                        </Button>
                    </Link>
                </div>

                {/* Data Table */}
                <Card>
                    <CardContent className="p-6">
                        {banners.length > 0 ? (
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[50px]">
                                                Order
                                            </TableHead>
                                            <TableHead className="w-[120px]">
                                                Image
                                            </TableHead>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Button</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {banners.map((banner, index) => {
                                            let imageUrl;
                                            if (banner.image) {
                                                imageUrl =
                                                    banner.image.startsWith(
                                                        "http"
                                                    )
                                                        ? banner.image
                                                        : `/storage/${banner.image}`;
                                            } else {
                                                imageUrl = banner.image_url;
                                            }

                                            return (
                                                <TableRow key={banner.uid}>
                                                    {/* Order Controls */}
                                                    <TableCell>
                                                        <div className="flex flex-col gap-1">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-6 w-6"
                                                                onClick={() =>
                                                                    handleMoveUp(
                                                                        banner,
                                                                        index
                                                                    )
                                                                }
                                                                disabled={
                                                                    index === 0
                                                                }
                                                            >
                                                                <ArrowUp className="h-3 w-3" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-6 w-6"
                                                                onClick={() =>
                                                                    handleMoveDown(
                                                                        banner,
                                                                        index
                                                                    )
                                                                }
                                                                disabled={
                                                                    index ===
                                                                    banners.length -
                                                                        1
                                                                }
                                                            >
                                                                <ArrowDown className="h-3 w-3" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>

                                                    {/* Image */}
                                                    <TableCell>
                                                        <div
                                                            className="relative cursor-pointer group w-24 h-16"
                                                            onClick={() =>
                                                                handleImageClick(
                                                                    imageUrl,
                                                                    banner.title
                                                                )
                                                            }
                                                        >
                                                            <img
                                                                src={imageUrl}
                                                                alt={
                                                                    banner.title
                                                                }
                                                                className="w-full h-full object-cover rounded-lg"
                                                            />
                                                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity flex items-center justify-center rounded-lg">
                                                                <svg
                                                                    className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                                                                    />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </TableCell>

                                                    {/* Title */}
                                                    <TableCell>
                                                        <div>
                                                            <div className="font-medium">
                                                                {banner.title}
                                                            </div>
                                                            {banner.description && (
                                                                <div className="text-sm text-muted-foreground line-clamp-1">
                                                                    {
                                                                        banner.description
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    </TableCell>

                                                    {/* Button */}
                                                    <TableCell>
                                                        {banner.button_text ? (
                                                            <div>
                                                                <div className="font-medium">
                                                                    {
                                                                        banner.button_text
                                                                    }
                                                                </div>
                                                                <div className="text-xs text-muted-foreground">
                                                                    {
                                                                        banner.button_link
                                                                    }
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <span className="text-muted-foreground">
                                                                -
                                                            </span>
                                                        )}
                                                    </TableCell>

                                                    {/* Status */}
                                                    <TableCell>
                                                        <Badge
                                                            variant={
                                                                banner.is_active
                                                                    ? "success"
                                                                    : "secondary"
                                                            }
                                                        >
                                                            {banner.is_active
                                                                ? "Active"
                                                                : "Inactive"}
                                                        </Badge>
                                                    </TableCell>

                                                    {/* Actions */}
                                                    <TableCell>
                                                        <div className="flex items-center justify-end gap-1">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8"
                                                                asChild
                                                            >
                                                                <Link
                                                                    href={`/admin/hero-banners/${banner.uid}/edit`}
                                                                >
                                                                    <Pencil className="h-4 w-4" />
                                                                    <span className="sr-only">
                                                                        Edit
                                                                    </span>
                                                                </Link>
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                                onClick={() =>
                                                                    setShowDeleteConfirm(
                                                                        banner.uid
                                                                    )
                                                                }
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                                <span className="sr-only">
                                                                    Delete
                                                                </span>
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold">
                                    No banners
                                </h3>
                                <p className="text-sm text-muted-foreground mb-6">
                                    Get started by creating a new hero banner.
                                </p>
                                <Link href="/admin/hero-banners/create">
                                    <Button>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add New Banner
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={!!showDeleteConfirm}
                onOpenChange={() => setShowDeleteConfirm(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Banner</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this banner? This
                            action cannot be undone.
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
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Image Preview Modal */}
            {showImageModal && selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                    onClick={() => setShowImageModal(false)}
                >
                    <div className="relative max-w-7xl max-h-screen">
                        {/* Close Button */}
                        <button
                            onClick={() => setShowImageModal(false)}
                            className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-2"
                        >
                            <svg
                                className="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        {/* Zoom Controls */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-2 bg-black bg-opacity-50 rounded-full px-4 py-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setImageScale(
                                        Math.max(0.5, imageScale - 0.25)
                                    );
                                }}
                                className="text-white hover:text-gray-300 transition-colors p-2"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
                                    />
                                </svg>
                            </button>
                            <span className="text-white font-medium min-w-[4rem] text-center">
                                {Math.round(imageScale * 100)}%
                            </span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setImageScale(
                                        Math.min(3, imageScale + 0.25)
                                    );
                                }}
                                className="text-white hover:text-gray-300 transition-colors p-2"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                                    />
                                </svg>
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setImageScale(1);
                                }}
                                className="text-white hover:text-gray-300 transition-colors px-3 py-1 text-sm"
                            >
                                Reset
                            </button>
                        </div>

                        {/* Image */}
                        <div
                            className="overflow-auto max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage.url}
                                alt={selectedImage.title}
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
