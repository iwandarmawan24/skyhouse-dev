import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Image as ImageIcon } from 'lucide-react';
import {
    Button,
    Card,
    Alert,
    Badge,
    Pagination,
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from '@/Components/ui';

export default function Index({ banners }) {
    const { flash } = usePage().props;
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

    const handleDelete = (id) => {
        router.delete(`/admin/hero-banners/${id}`, {
            onSuccess: () => setShowDeleteConfirm(null),
        });
    };

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Hero Banners</h1>
                    <p className="text-gray-600 mt-1">Manage homepage carousel banners</p>
                </div>
                <Link href="/admin/hero-banners/create">
                    <Button>
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Banner
                    </Button>
                </Link>
            </div>

            {/* Success Message */}
            {flash.success && (
                <Alert variant="success" className="mb-6">
                    {flash.success}
                </Alert>
            )}

            {/* Banners List */}
            <Card>
                {banners.data.length > 0 ? (
                    <>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Button</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {banners.data.map((banner) => (
                                    <TableRow key={banner.id}>
                                        <TableCell className="font-medium text-gray-900">
                                            {banner.order}
                                        </TableCell>
                                        <TableCell>
                                            <img
                                                src={banner.image.startsWith('http') ? banner.image : `/storage/${banner.image}`}
                                                alt={banner.title}
                                                className="h-16 w-24 object-cover rounded-lg"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium text-gray-900">
                                                {banner.title}
                                            </div>
                                            {banner.description && (
                                                <div className="text-sm text-gray-500 line-clamp-1">
                                                    {banner.description}
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {banner.button_text ? (
                                                <div>
                                                    <div className="text-gray-900">{banner.button_text}</div>
                                                    <div className="text-xs text-gray-500">{banner.button_link}</div>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">-</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={banner.is_active ? 'success' : 'secondary'}>
                                                {banner.is_active ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/hero-banners/${banner.id}/edit`}>
                                                    <Button variant="ghost" size="sm">
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setShowDeleteConfirm(banner.id)}
                                                    className="text-red-600 hover:text-red-900 hover:bg-red-50"
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        <Pagination data={banners} />
                    </>
                ) : (
                    <div className="text-center py-12">
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No banners</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new hero banner.</p>
                        <div className="mt-6">
                            <Link href="/admin/hero-banners/create">
                                <Button>
                                    <Plus className="w-5 h-5 mr-2" />
                                    Add New Banner
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
                        <DialogTitle>Delete Banner</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this banner? This action cannot be undone.
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
