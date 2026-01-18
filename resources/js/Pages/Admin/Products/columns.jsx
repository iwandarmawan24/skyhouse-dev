import { Link } from "@inertiajs/react";
import { useState } from "react";
import {
    ArrowUpDown,
    Eye,
    Pencil,
    Trash2,
    Image as ImageIcon,
    Bed,
    Bath,
    Maximize,
    Home,
    MapPin,
    Tag,
    X
} from "lucide-react";
import { Button } from "@/Components/ui/Button";
import { Badge } from "@/Components/ui/Badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/Components/ui/Dialog";

export const createColumns = (setShowDeleteConfirm, setViewProduct) => [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Product
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const product = row.original;
            // Use featured image from Media Library
            const imageSrc = product.featured_image?.thumbnail_url || product.featured_image?.url || null;

            return (
                <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 h-16 w-24">
                        {imageSrc ? (
                            <img
                                src={imageSrc}
                                alt={product.name}
                                className="h-16 w-24 object-cover rounded-lg"
                            />
                        ) : (
                            <div className="h-16 w-24 bg-muted rounded-lg flex items-center justify-center">
                                <ImageIcon className="w-8 h-8 text-muted-foreground" />
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="font-medium">{product.name}</div>
                        {product.short_description && (
                            <div className="text-sm text-muted-foreground line-clamp-1 mb-1">
                                {product.short_description}
                            </div>
                        )}
                        <div className="text-sm text-muted-foreground">
                            {product.bedrooms && product.bathrooms && (
                                <span>
                                    {product.bedrooms} BR • {product.bathrooms} BA
                                </span>
                            )}
                            {product.land_size && (
                                <span className="ml-2">• {product.land_size} m²</span>
                            )}
                        </div>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
            const type = row.getValue("type");
            const variants = {
                house: "default",
                apartment: "secondary",
                land: "outline",
            };
            return (
                <Badge variant={variants[type] || "secondary"}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </Badge>
            );
        },
    },
    {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => {
            const product = row.original;
            return (
                <div>
                    <div className="font-medium">{product.location}</div>
                    <div className="text-sm text-muted-foreground">{product.city}</div>
                </div>
            );
        },
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const price = row.getValue("price");
            const formatted = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
            }).format(price);
            return <div className="font-semibold">{formatted}</div>;
        },
    },
    {
        accessorKey: "is_active",
        header: "Status",
        cell: ({ row }) => {
            const product = row.original;
            const isSold = product.is_sold;
            const isActive = product.is_active;
            const isFeatured = product.is_featured;

            const statusVariant = isSold
                ? "destructive"
                : isActive
                ? "success"
                : "secondary";

            return (
                <div className="flex flex-col gap-1">
                    <Badge variant={statusVariant}>
                        {isSold ? "Sold" : isActive ? "Active" : "Inactive"}
                    </Badge>
                    {isFeatured && (
                        <Badge variant="default" className="w-fit">
                            Featured
                        </Badge>
                    )}
                </div>
            );
        },
    },
    {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => {
            const product = row.original;

            return (
                <div className="flex items-center justify-end gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setViewProduct(product)}
                    >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View details</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        asChild
                    >
                        <Link href={`/admin/products/${product.uid}/edit`}>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => setShowDeleteConfirm(product.uid)}
                    >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                    </Button>
                </div>
            );
        },
    },
];

// View Product Detail Dialog Component
export function ViewProductDialog({ product, open, onOpenChange }) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [showLightbox, setShowLightbox] = useState(false);

    if (!product) return null;

    const formatPrice = (price) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
    };

    // Combine featured image and gallery images
    const allImages = [];
    if (product.featured_image) {
        allImages.push(product.featured_image);
    }
    if (product.gallery_images && product.gallery_images.length > 0) {
        allImages.push(...product.gallery_images);
    }

    const mainImage = allImages[selectedImageIndex];
    const mainImageSrc = mainImage?.url || null;

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader className="pb-4 border-b">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <DialogTitle className="text-2xl">{product.name}</DialogTitle>
                                <DialogDescription className="flex items-center gap-2 mt-2">
                                    <MapPin className="w-4 h-4" />
                                    {product.location}, {product.city}
                                </DialogDescription>
                            </div>
                            <div className="flex gap-2">
                                <Badge
                                    variant={
                                        product.is_sold
                                            ? "destructive"
                                            : product.is_active
                                            ? "success"
                                            : "secondary"
                                    }
                                    className="h-fit"
                                >
                                    {product.is_sold ? "Sold" : product.is_active ? "Active" : "Inactive"}
                                </Badge>
                                {product.is_featured && (
                                    <Badge variant="default" className="h-fit">
                                        Featured
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="space-y-6 pt-4">
                        {/* Price Section */}
                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                <Tag className="w-4 h-4" />
                                Price
                            </div>
                            <div className="text-3xl font-bold text-primary">
                                {formatPrice(product.price)}
                            </div>
                        </div>

                        {/* Main Image with Gallery Thumbnails */}
                        {allImages.length > 0 && (
                            <div className="space-y-3">
                                <div
                                    className="aspect-video w-full overflow-hidden rounded-xl border-2 border-border cursor-pointer group relative"
                                    onClick={() => setShowLightbox(true)}
                                >
                                    {mainImageSrc ? (
                                        <>
                                            <img
                                                src={mainImageSrc}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-3">
                                                    <Eye className="w-6 h-6" />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="w-full h-full bg-muted flex items-center justify-center">
                                            <ImageIcon className="w-16 h-16 text-muted-foreground" />
                                        </div>
                                    )}
                                </div>

                                {/* Thumbnail Gallery */}
                                {allImages.length > 1 && (
                                    <div className="flex gap-2 overflow-x-auto pb-2">
                                        {allImages.map((image, index) => {
                                            const thumbSrc = image?.thumbnail_url || image?.url;
                                            return (
                                                <button
                                                    key={image.uid || index}
                                                    onClick={() => setSelectedImageIndex(index)}
                                                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                                        selectedImageIndex === index
                                                            ? "border-primary ring-2 ring-primary/20"
                                                            : "border-border hover:border-primary/50"
                                                    }`}
                                                >
                                                    <img
                                                        src={thumbSrc}
                                                        alt={`${product.name} ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Specifications Cards */}
                        {(product.bedrooms || product.bathrooms || product.land_size || product.building_size) && (
                            <div>
                                <h4 className="font-semibold text-lg mb-3">Specifications</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {product.bedrooms && (
                                        <div className="bg-muted/50 rounded-lg p-4 border border-border">
                                            <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                                <Bed className="w-4 h-4" />
                                                <span className="text-sm">Bedrooms</span>
                                            </div>
                                            <div className="text-2xl font-bold">{product.bedrooms}</div>
                                        </div>
                                    )}
                                    {product.bathrooms && (
                                        <div className="bg-muted/50 rounded-lg p-4 border border-border">
                                            <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                                <Bath className="w-4 h-4" />
                                                <span className="text-sm">Bathrooms</span>
                                            </div>
                                            <div className="text-2xl font-bold">{product.bathrooms}</div>
                                        </div>
                                    )}
                                    {product.land_size && (
                                        <div className="bg-muted/50 rounded-lg p-4 border border-border">
                                            <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                                <Maximize className="w-4 h-4" />
                                                <span className="text-sm">Land Area</span>
                                            </div>
                                            <div className="text-2xl font-bold">{product.land_size}<span className="text-sm ml-1">m²</span></div>
                                        </div>
                                    )}
                                    {product.building_size && (
                                        <div className="bg-muted/50 rounded-lg p-4 border border-border">
                                            <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                                <Home className="w-4 h-4" />
                                                <span className="text-sm">Building</span>
                                            </div>
                                            <div className="text-2xl font-bold">{product.building_size}<span className="text-sm ml-1">m²</span></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Property Details */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-muted/30 rounded-lg p-4 border border-border">
                                <div className="text-sm text-muted-foreground mb-1">Property Type</div>
                                <div className="font-semibold capitalize flex items-center gap-2">
                                    <Home className="w-4 h-4" />
                                    {product.type}
                                </div>
                            </div>
                            <div className="bg-muted/30 rounded-lg p-4 border border-border">
                                <div className="text-sm text-muted-foreground mb-1">Location</div>
                                <div className="font-semibold flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    {product.city}
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        {product.description && (
                            <div>
                                <h4 className="font-semibold text-lg mb-3">Description</h4>
                                <div
                                    className="prose prose-sm max-w-none text-muted-foreground bg-muted/20 rounded-lg p-4 border border-border"
                                    dangerouslySetInnerHTML={{ __html: product.description }}
                                />
                            </div>
                        )}

                        {/* Address */}
                        {product.address && (
                            <div>
                                <h4 className="font-semibold text-lg mb-3">Full Address</h4>
                                <div className="bg-muted/20 rounded-lg p-4 border border-border flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-muted-foreground">{product.address}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Image Lightbox */}
            {showLightbox && mainImageSrc && (
                <div
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                    onClick={() => setShowLightbox(false)}
                >
                    <button
                        onClick={() => setShowLightbox(false)}
                        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
                    >
                        <X className="w-8 h-8" />
                    </button>
                    <div className="max-w-7xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={mainImageSrc}
                            alt={product.name}
                            className="max-w-full max-h-[90vh] object-contain"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
