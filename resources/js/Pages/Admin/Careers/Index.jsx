import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, Briefcase } from "lucide-react";
import { Button } from "@/Components/ui/Button";
import { Badge } from "@/Components/ui/Badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/Card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/Components/ui/alert-dialog";

export default function Index({ careers }) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedCareer, setSelectedCareer] = useState(null);

    const handleDelete = (career) => {
        setSelectedCareer(career);
        setShowDeleteDialog(true);
    };

    const confirmDelete = () => {
        if (selectedCareer) {
            router.delete(`/admin/careers/${selectedCareer.uid}`, {
                onSuccess: () => {
                    setShowDeleteDialog(false);
                    setSelectedCareer(null);
                },
            });
        }
    };

    const handleMoveUp = (career, index) => {
        if (index === 0) return;

        const prevCareer = careers[index - 1];
        router.post(
            "/admin/careers/update-order",
            {
                updates: [
                    { uid: career.uid, order: prevCareer.order },
                    { uid: prevCareer.uid, order: career.order },
                ],
            },
            {
                preserveScroll: true,
            }
        );
    };

    const handleMoveDown = (career, index) => {
        if (index === careers.length - 1) return;

        const nextCareer = careers[index + 1];
        router.post(
            "/admin/careers/update-order",
            {
                updates: [
                    { uid: career.uid, order: nextCareer.order },
                    { uid: nextCareer.uid, order: career.order },
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
                            Careers
                        </h1>
                        <p className="text-muted-foreground">
                            Manage career/job listings displayed on the careers page
                        </p>
                    </div>
                    <Link href="/admin/careers/create">
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Career
                        </Button>
                    </Link>
                </div>

                {/* Careers List */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Careers ({careers.length})</CardTitle>
                        <CardDescription>
                            Manage the order and content of career listings
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {careers.length > 0 ? (
                            <div className="space-y-2">
                                {careers.map((career, index) => (
                                    <div
                                        key={career.uid}
                                        className="flex items-start gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                    >
                                        {/* Order Controls */}
                                        <div className="flex flex-col gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => handleMoveUp(career, index)}
                                                disabled={index === 0}
                                            >
                                                <ArrowUp className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => handleMoveDown(career, index)}
                                                disabled={index === careers.length - 1}
                                            >
                                                <ArrowDown className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        {/* Icon */}
                                        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                            <Briefcase className="h-5 w-5 text-primary" />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4 mb-1">
                                                <h3 className="font-semibold text-base">
                                                    {career.title}
                                                </h3>
                                                <Badge
                                                    variant={career.is_active ? "success" : "secondary"}
                                                >
                                                    {career.is_active ? "Active" : "Inactive"}
                                                </Badge>
                                            </div>
                                            <p className="text-sm font-medium text-muted-foreground mb-1">
                                                {career.position}
                                            </p>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-1">
                                            <Link href={`/admin/careers/${career.uid}/edit`}>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-destructive hover:text-destructive"
                                                onClick={() => handleDelete(career)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No careers yet</h3>
                                <p className="text-muted-foreground mb-4">
                                    Get started by creating your first career listing
                                </p>
                                <Link href="/admin/careers/create">
                                    <Button>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Career
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Career?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this career listing? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AdminLayout>
    );
}
