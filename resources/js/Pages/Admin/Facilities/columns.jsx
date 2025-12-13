import { Link } from "@inertiajs/react";
import {
    ArrowUpDown,
    Pencil,
    Trash2,
    Image as ImageIcon,
    Images,
} from "lucide-react";
import { Button } from "@/Components/ui/Button";
import { Badge } from "@/Components/ui/Badge";

export const createColumns = (setShowDeleteConfirm) => [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Facility
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const facility = row.original;
            // Use first image from media_images array
            const firstImage = facility.media_images && facility.media_images.length > 0
                ? facility.media_images[0]
                : null;
            const imageSrc = firstImage?.url || null;

            return (
                <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 h-16 w-24 relative">
                        {imageSrc ? (
                            <>
                                <img
                                    src={imageSrc}
                                    alt={facility.name}
                                    className="h-16 w-24 object-cover rounded-lg"
                                />
                                {facility.media_images.length > 1 && (
                                    <div className="absolute bottom-1 right-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-1">
                                        <Images className="w-3 h-3" />
                                        {facility.media_images.length}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="h-16 w-24 bg-muted rounded-lg flex items-center justify-center">
                                <ImageIcon className="w-8 h-8 text-muted-foreground" />
                            </div>
                        )}
                    </div>
                    <div className="max-w-md">
                        <div className="font-medium">{facility.name}</div>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
            const facility = row.original;
            return (
                <div className="max-w-md">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {facility.description}
                    </p>
                </div>
            );
        },
    },
    {
        accessorKey: "images_count",
        header: "Images",
        cell: ({ row }) => {
            const facility = row.original;
            const count = facility.media_images ? facility.media_images.length : 0;
            return (
                <Badge variant="outline" className="gap-1">
                    <Images className="w-3 h-3" />
                    {count} {count === 1 ? 'image' : 'images'}
                </Badge>
            );
        },
    },
    {
        accessorKey: "is_active",
        header: "Status",
        cell: ({ row }) => {
            const facility = row.original;
            const isActive = facility.is_active;

            return (
                <Badge variant={isActive ? "success" : "secondary"}>
                    {isActive ? "Active" : "Inactive"}
                </Badge>
            );
        },
    },
    {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => {
            const facility = row.original;

            return (
                <div className="flex items-center justify-end gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        asChild
                    >
                        <Link href={`/admin/facilities/${facility.uid}/edit`}>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => setShowDeleteConfirm(facility.uid)}
                    >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                    </Button>
                </div>
            );
        },
    },
];
