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

export default function Index({ milestones }) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

    const handleDelete = (uid) => {
        router.delete(`/admin/milestones/${uid}`, {
            onSuccess: () => setShowDeleteConfirm(null),
        });
    };

    const handleMoveUp = (milestone, index) => {
        if (index === 0) return;
        const prevMilestone = milestones[index - 1];
        router.post(
            "/admin/milestones/update-order",
            {
                updates: [
                    { uid: milestone.uid, order: prevMilestone.order },
                    { uid: prevMilestone.uid, order: milestone.order },
                ],
            },
            { preserveScroll: true }
        );
    };

    const handleMoveDown = (milestone, index) => {
        if (index === milestones.length - 1) return;
        const nextMilestone = milestones[index + 1];
        router.post(
            "/admin/milestones/update-order",
            {
                updates: [
                    { uid: milestone.uid, order: nextMilestone.order },
                    { uid: nextMilestone.uid, order: milestone.order },
                ],
            },
            { preserveScroll: true }
        );
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Milestones
                        </h1>
                        <p className="text-muted-foreground">
                            Manage history timeline on the About page
                        </p>
                    </div>
                    <Link href="/admin/milestones/create">
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Milestone
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardContent className="p-6">
                        {milestones.length > 0 ? (
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[50px]">
                                                Order
                                            </TableHead>
                                            <TableHead className="w-[100px]">
                                                Image
                                            </TableHead>
                                            <TableHead className="w-[80px]">
                                                Year
                                            </TableHead>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {milestones.map(
                                            (milestone, index) => (
                                                <TableRow key={milestone.uid}>
                                                    <TableCell>
                                                        <div className="flex flex-col gap-1">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-6 w-6"
                                                                onClick={() =>
                                                                    handleMoveUp(
                                                                        milestone,
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
                                                                        milestone,
                                                                        index
                                                                    )
                                                                }
                                                                disabled={
                                                                    index ===
                                                                    milestones.length -
                                                                        1
                                                                }
                                                            >
                                                                <ArrowDown className="h-3 w-3" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        {milestone.image_url ? (
                                                            <img
                                                                src={
                                                                    milestone.image_url
                                                                }
                                                                alt={
                                                                    milestone.title
                                                                }
                                                                className="w-16 h-12 object-cover rounded"
                                                            />
                                                        ) : (
                                                            <div className="w-16 h-12 bg-muted rounded flex items-center justify-center">
                                                                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                                                            </div>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className="font-bold text-lg">
                                                            {milestone.year}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div>
                                                            <div className="font-medium">
                                                                {
                                                                    milestone.title
                                                                }
                                                            </div>
                                                            {milestone.description && (
                                                                <div className="text-sm text-muted-foreground line-clamp-1">
                                                                    {
                                                                        milestone.description
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={
                                                                milestone.is_active
                                                                    ? "success"
                                                                    : "secondary"
                                                            }
                                                        >
                                                            {milestone.is_active
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
                                                                    href={`/admin/milestones/${milestone.uid}/edit`}
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
                                                                        milestone.uid
                                                                    )
                                                                }
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold">
                                    No milestones
                                </h3>
                                <p className="text-sm text-muted-foreground mb-6">
                                    Get started by adding a milestone to the
                                    timeline.
                                </p>
                                <Link href="/admin/milestones/create">
                                    <Button>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Milestone
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
                        <DialogTitle>Delete Milestone</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this milestone? This
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
