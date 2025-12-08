import { Link } from "@inertiajs/react";
import { ArrowUpDown, Eye, Pencil, Trash2, Image as ImageIcon } from "lucide-react";
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
                    Article
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const article = row.original;
            const imageSrc = article.featured_image?.startsWith("http")
                ? article.featured_image
                : article.featured_image
                ? `/storage/${article.featured_image}`
                : null;

            return (
                <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 h-16 w-24">
                        {imageSrc ? (
                            <img
                                src={imageSrc}
                                alt={article.title}
                                className="h-16 w-24 object-cover rounded-lg"
                            />
                        ) : (
                            <div className="h-16 w-24 bg-muted rounded-lg flex items-center justify-center">
                                <ImageIcon className="w-8 h-8 text-muted-foreground" />
                            </div>
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="font-medium truncate">{article.title}</div>
                        {article.excerpt && (
                            <div className="text-sm text-muted-foreground line-clamp-1">
                                {article.excerpt}
                            </div>
                        )}
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => {
            const article = row.original;
            return (
                <Badge variant="default">
                    {article.category?.name || "Uncategorized"}
                </Badge>
            );
        },
    },
    {
        accessorKey: "author",
        header: "Author",
        cell: ({ row }) => {
            const article = row.original;
            return (
                <div className="text-sm">
                    {article.author?.full_name || article.user?.full_name || "-"}
                </div>
            );
        },
    },
    {
        accessorKey: "published_at",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const article = row.original;
            if (!article.published_at) return <span className="text-muted-foreground">-</span>;

            return (
                <div className="text-sm">
                    {new Date(article.published_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                </div>
            );
        },
    },
    {
        accessorKey: "is_published",
        header: "Status",
        cell: ({ row }) => {
            const article = row.original;
            return (
                <Badge variant={article.is_published ? "success" : "secondary"}>
                    {article.is_published ? "Published" : "Draft"}
                </Badge>
            );
        },
    },
    {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => {
            const article = row.original;

            return (
                <div className="flex items-center justify-end gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        asChild
                    >
                        <Link href={`/admin/articles/${article.uid}/edit`}>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => setShowDeleteConfirm(article.uid)}
                    >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                    </Button>
                </div>
            );
        },
    },
];
