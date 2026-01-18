import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, HelpCircle } from "lucide-react";
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

export default function Index({ faqs }) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedFaq, setSelectedFaq] = useState(null);

    const handleDelete = (faq) => {
        setSelectedFaq(faq);
        setShowDeleteDialog(true);
    };

    const confirmDelete = () => {
        if (selectedFaq) {
            router.delete(`/admin/faqs/${selectedFaq.uid}`, {
                onSuccess: () => {
                    setShowDeleteDialog(false);
                    setSelectedFaq(null);
                },
            });
        }
    };

    const handleMoveUp = (faq, index) => {
        if (index === 0) return;

        const prevFaq = faqs[index - 1];
        router.post(
            "/admin/faqs/update-order",
            {
                updates: [
                    { uid: faq.uid, order: prevFaq.order },
                    { uid: prevFaq.uid, order: faq.order },
                ],
            },
            {
                preserveScroll: true,
            }
        );
    };

    const handleMoveDown = (faq, index) => {
        if (index === faqs.length - 1) return;

        const nextFaq = faqs[index + 1];
        router.post(
            "/admin/faqs/update-order",
            {
                updates: [
                    { uid: faq.uid, order: nextFaq.order },
                    { uid: nextFaq.uid, order: faq.order },
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
                            FAQs
                        </h1>
                        <p className="text-muted-foreground">
                            Manage frequently asked questions displayed on the contact page
                        </p>
                    </div>
                    <Link href="/admin/faqs/create">
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add FAQ
                        </Button>
                    </Link>
                </div>

                {/* FAQs List */}
                <Card>
                    <CardHeader>
                        <CardTitle>All FAQs ({faqs.length})</CardTitle>
                        <CardDescription>
                            Manage the order and content of FAQs
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {faqs.length > 0 ? (
                            <div className="space-y-2">
                                {faqs.map((faq, index) => (
                                    <div
                                        key={faq.uid}
                                        className="flex items-start gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                    >
                                        {/* Order Controls */}
                                        <div className="flex flex-col gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => handleMoveUp(faq, index)}
                                                disabled={index === 0}
                                            >
                                                <ArrowUp className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => handleMoveDown(faq, index)}
                                                disabled={index === faqs.length - 1}
                                            >
                                                <ArrowDown className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        {/* Icon */}
                                        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                            <HelpCircle className="h-5 w-5 text-primary" />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4 mb-2">
                                                <h3 className="font-semibold text-base">
                                                    {faq.question}
                                                </h3>
                                                <Badge
                                                    variant={faq.is_active ? "success" : "secondary"}
                                                >
                                                    {faq.is_active ? "Active" : "Inactive"}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {faq.answer}
                                            </p>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-1">
                                            <Link href={`/admin/faqs/${faq.uid}/edit`}>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-destructive hover:text-destructive"
                                                onClick={() => handleDelete(faq)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No FAQs yet</h3>
                                <p className="text-muted-foreground mb-4">
                                    Get started by creating your first FAQ
                                </p>
                                <Link href="/admin/faqs/create">
                                    <Button>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add FAQ
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
                        <AlertDialogTitle>Delete FAQ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this FAQ? This action cannot be undone.
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
