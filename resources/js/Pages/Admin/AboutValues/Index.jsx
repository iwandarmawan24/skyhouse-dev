import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import {
    Plus,
    Image as ImageIcon,
    Pencil,
    Trash2,
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

export default function Index({ values }) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

    const handleDelete = (uid) => {
        router.delete(`/admin/about/values/${uid}`, {
            onSuccess: () => setShowDeleteConfirm(null),
        });
    };

    const swap = (current, other) => {
        router.post(
            "/admin/about/values/update-order",
            {
                updates: [
                    { uid: current.uid, order: other.order },
                    { uid: other.uid, order: current.order },
                ],
            },
            { preserveScroll: true }
        );
    };

    const handleMoveUp = (value, index) => {
        if (index === 0) return;
        swap(value, values[index - 1]);
    };

    const handleMoveDown = (value, index) => {
        if (index === values.length - 1) return;
        swap(value, values[index + 1]);
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Core Values
                        </h1>
                        <p className="text-muted-foreground">
                            Values shown under "Our Core Values" on the About
                            page
                        </p>
                    </div>
                    <Link href="/admin/about/values/create">
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Value
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardContent className="p-6">
                        {values.length > 0 ? (
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[50px]">
                                                Order
                                            </TableHead>
                                            <TableHead className="w-[80px]">
                                                Icon
                                            </TableHead>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {values.map((value, index) => (
                                            <TableRow key={value.uid}>
                                                <TableCell>
                                                    <div className="flex flex-col gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-6 w-6"
                                                            onClick={() =>
                                                                handleMoveUp(
                                                                    value,
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
                                                                    value,
                                                                    index
                                                                )
                                                            }
                                                            disabled={
                                                                index ===
                                                                values.length -
                                                                    1
                                                            }
                                                        >
                                                            <ArrowDown className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {value.icon_url ? (
                                                        <img
                                                            src={value.icon_url}
                                                            alt={value.title}
                                                            className="w-10 h-10 object-contain rounded"
                                                        />
                                                    ) : value.icon_emoji ? (
                                                        <span className="text-3xl leading-none">
                                                            {value.icon_emoji}
                                                        </span>
                                                    ) : (
                                                        <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                                                            <ImageIcon className="h-4 w-4 text-muted-foreground" />
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <div className="font-medium">
                                                            {value.title}
                                                        </div>
                                                        {value.description && (
                                                            <div className="text-sm text-muted-foreground line-clamp-1">
                                                                {
                                                                    value.description
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            value.is_active
                                                                ? "success"
                                                                : "secondary"
                                                        }
                                                    >
                                                        {value.is_active
                                                            ? "Active"
                                                            : "Inactive"}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                            asChild
                                                        >
                                                            <Link
                                                                href={`/admin/about/values/${value.uid}/edit`}
                                                            >
                                                                <Pencil className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                            onClick={() =>
                                                                setShowDeleteConfirm(
                                                                    value.uid
                                                                )
                                                            }
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold">
                                    No core values yet
                                </h3>
                                <p className="text-sm text-muted-foreground mb-6">
                                    Add the principles that guide your company.
                                </p>
                                <Link href="/admin/about/values/create">
                                    <Button>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Value
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <Dialog
                open={!!showDeleteConfirm}
                onOpenChange={() => setShowDeleteConfirm(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Core Value</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this value? This
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
        </AdminLayout>
    );
}
