import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, FileText, Clock } from 'lucide-react';
import {
    Button,
    Card,
    Badge,
    Alert,
    Pagination,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from '@/Components/ui';

export default function Index({ policies }) {
    const { flash } = usePage().props;
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

    const handleDelete = (uid) => {
        router.delete(`/admin/policies/${uid}`, {
            onSuccess: () => setShowDeleteConfirm(null),
        });
    };

    const getTypeLabel = (type) => {
        const labels = {
            privacy: 'Privacy Policy',
            terms: 'Terms of Service',
            refund: 'Refund Policy',
            shipping: 'Shipping Policy',
            other: 'Other',
        };
        return labels[type] || type;
    };

    const getTypeVariant = (type) => {
        const variants = {
            privacy: 'default',
            terms: 'purple',
            refund: 'success',
            shipping: 'warning',
            other: 'secondary',
        };
        return variants[type] || 'secondary';
    };

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Policies</h1>
                    <p className="text-gray-600 mt-1">Manage legal policies and terms</p>
                </div>
                <Link href="/admin/policies/create">
                    <Button>
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Policy
                    </Button>
                </Link>
            </div>

            {/* Success Message */}
            {flash.success && (
                <Alert variant="success" className="mb-6">
                    {flash.success}
                </Alert>
            )}

            {/* Policies List */}
            <Card>
                {policies.data.length > 0 ? (
                    <>
                        <div className="divide-y divide-gray-200">
                            {policies.data.map((policy) => (
                            <div key={policy.uid} className="p-6 hover:bg-gray-50 transition">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900">{policy.title}</h3>
                                            <Badge variant={getTypeVariant(policy.type)}>
                                                {getTypeLabel(policy.type)}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                            {policy.content.substring(0, 200)}...
                                        </p>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Clock className="w-4 h-4" />
                                            Last updated: {new Date(policy.updated_at).toLocaleDateString('id-ID')}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                        <Link href={`/admin/policies/${policy.uid}/edit`}>
                                            <Button variant="ghost" size="sm">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setShowDeleteConfirm(policy.uid)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <Pagination data={policies} />
                    </>
                ) : (
                    <div className="text-center py-12">
                        <FileText className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No policies</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new policy.</p>
                        <div className="mt-6">
                            <Link href="/admin/policies/create">
                                <Button>
                                    <Plus className="w-5 h-5 mr-2" />
                                    Add New Policy
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </Card>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!showDeleteConfirm} onOpenChange={() => setShowDeleteConfirm(null)}>
                <DialogContent onClose={() => setShowDeleteConfirm(null)}>
                    <DialogHeader>
                        <DialogTitle>Delete Policy</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this policy? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="secondary" onClick={() => setShowDeleteConfirm(null)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={() => handleDelete(showDeleteConfirm)}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
