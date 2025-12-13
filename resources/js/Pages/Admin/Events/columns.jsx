import { Link } from "@inertiajs/react";
import {
    ArrowUpDown,
    Pencil,
    Trash2,
    Image as ImageIcon,
    Calendar,
    Clock,
    MapPin,
} from "lucide-react";
import { Button } from "@/Components/ui/Button";
import { Badge } from "@/Components/ui/Badge";

export const createColumns = (setShowDeleteConfirm) => [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Event
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const event = row.original;
            // Use image from Media Library
            const imageSrc = event.image_url || null;

            return (
                <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 h-16 w-24">
                        {imageSrc ? (
                            <img
                                src={imageSrc}
                                alt={event.title}
                                className="h-16 w-24 object-cover rounded-lg"
                            />
                        ) : (
                            <div className="h-16 w-24 bg-muted rounded-lg flex items-center justify-center">
                                <ImageIcon className="w-8 h-8 text-muted-foreground" />
                            </div>
                        )}
                    </div>
                    <div className="max-w-md">
                        <div className="font-medium line-clamp-1">{event.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-2">
                            {event.description}
                        </div>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "event_date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date & Time
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const event = row.original;
            return (
                <div>
                    <div className="flex items-center gap-2 font-medium">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {event.event_date_formatted}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Clock className="w-3 h-3" />
                        {event.event_time}
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => {
            const event = row.original;
            return (
                <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{event.location}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "is_active",
        header: "Status",
        cell: ({ row }) => {
            const event = row.original;
            const isActive = event.is_active;
            const isPast = event.is_past;

            // Determine status badge
            let statusVariant = "secondary";
            let statusText = "Inactive";

            if (isActive) {
                if (isPast) {
                    statusVariant = "outline";
                    statusText = "Past";
                } else {
                    statusVariant = "success";
                    statusText = "Upcoming";
                }
            }

            return (
                <Badge variant={statusVariant}>
                    {statusText}
                </Badge>
            );
        },
    },
    {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => {
            const event = row.original;

            return (
                <div className="flex items-center justify-end gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        asChild
                    >
                        <Link href={`/admin/events/${event.uid}/edit`}>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => setShowDeleteConfirm(event.uid)}
                    >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                    </Button>
                </div>
            );
        },
    },
];
