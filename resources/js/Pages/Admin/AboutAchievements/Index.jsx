import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import {
    Plus,
    Trophy,
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

export default function Index({ achievements }) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

    const handleDelete = (uid) => {
        router.delete(`/admin/about/achievements/${uid}`, {
            onSuccess: () => setShowDeleteConfirm(null),
        });
    };

    const swap = (current, other) => {
        router.post(
            "/admin/about/achievements/update-order",
            {
                updates: [
                    { uid: current.uid, order: other.order },
                    { uid: other.uid, order: current.order },
                ],
            },
            { preserveScroll: true }
        );
    };

    const handleMoveUp = (item, index) => {
        if (index === 0) return;
        swap(item, achievements[index - 1]);
    };

    const handleMoveDown = (item, index) => {
        if (index === achievements.length - 1) return;
        swap(item, achievements[index + 1]);
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Achievements
                        </h1>
                        <p className="text-muted-foreground">
                            Stats shown in the achievements section on the About
                            page
                        </p>
                    </div>
                    <Link href="/admin/about/achievements/create">
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Achievement
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardContent className="p-6">
                        {achievements.length > 0 ? (
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[50px]">
                                                Order
                                            </TableHead>
                                            <TableHead className="w-[160px]">
                                                Number
                                            </TableHead>
                                            <TableHead>Label</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {achievements.map((item, index) => (
                                            <TableRow key={item.uid}>
                                                <TableCell>
                                                    <div className="flex flex-col gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-6 w-6"
                                                            onClick={() =>
                                                                handleMoveUp(
                                                                    item,
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
                                                                    item,
                                                                    index
                                                                )
                                                            }
                                                            disabled={
                                                                index ===
                                                                achievements.length -
                                                                    1
                                                            }
                                                        >
                                                            <ArrowDown className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="text-2xl font-bold">
                                                        {item.number}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="font-medium">
                                                        {item.label}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            item.is_active
                                                                ? "success"
                                                                : "secondary"
                                                        }
                                                    >
                                                        {item.is_active
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
                                                                href={`/admin/about/achievements/${item.uid}/edit`}
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
                                                                    item.uid
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
                                <Trophy className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold">
                                    No achievements yet
                                </h3>
                                <p className="text-sm text-muted-foreground mb-6">
                                    Add stats to highlight on the About page.
                                </p>
                                <Link href="/admin/about/achievements/create">
                                    <Button>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Achievement
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
                        <DialogTitle>Delete Achievement</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this achievement?
                            This action cannot be undone.
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
