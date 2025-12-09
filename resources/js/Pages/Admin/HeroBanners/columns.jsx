import { Link } from "@inertiajs/react";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/Components/ui/Button";
import { Badge } from "@/Components/ui/Badge";
import { Checkbox } from "@/Components/ui/checkbox";

export const createColumns = (setShowDeleteConfirm, handleImageClick, selectedRows, toggleSelectRow) => [
    {
        id: "select",
        header: () => (
            <Checkbox
                checked={false}
                aria-label="Select all"
                className="pointer-events-none"
            />
        ),
        cell: ({ row }) => {
            const banner = row.original;
            return (
                <Checkbox
                    checked={selectedRows.includes(banner.uid)}
                    onCheckedChange={() => toggleSelectRow(banner.uid)}
                    aria-label="Select row"
                />
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            const banner = row.original;

            // Priority: use banner.image if exists, otherwise use banner.image_url
            let imageUrl;
            if (banner.image) {
                imageUrl = banner.image.startsWith('http')
                    ? banner.image
                    : `/storage/${banner.image}`;
            } else {
                imageUrl = banner.image_url;
            }

            return (
                <div
                    className="relative cursor-pointer group w-24 h-16"
                    onClick={() => handleImageClick(imageUrl, banner.title)}
                >
                    <img
                        src={imageUrl}
                        alt={banner.title}
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity flex items-center justify-center rounded-lg">
                        <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const banner = row.original;
            return (
                <div>
                    <div className="font-medium">{banner.title}</div>
                    {banner.description && (
                        <div className="text-sm text-muted-foreground line-clamp-1">
                            {banner.description}
                        </div>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "button_text",
        header: "Button",
        cell: ({ row }) => {
            const banner = row.original;
            if (!banner.button_text) {
                return <span className="text-muted-foreground">-</span>;
            }
            return (
                <div>
                    <div className="font-medium">{banner.button_text}</div>
                    <div className="text-xs text-muted-foreground">{banner.button_link}</div>
                </div>
            );
        },
    },
    {
        accessorKey: "is_active",
        header: "Status",
        cell: ({ row }) => {
            const isActive = row.getValue("is_active");
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
            const banner = row.original;

            return (
                <div className="flex items-center justify-end gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        asChild
                    >
                        <Link href={`/admin/hero-banners/${banner.uid}/edit`}>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => setShowDeleteConfirm(banner.uid)}
                    >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                    </Button>
                </div>
            );
        },
    },
];
