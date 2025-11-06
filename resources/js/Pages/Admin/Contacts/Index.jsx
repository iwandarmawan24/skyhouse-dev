import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/Components/ui/Button';
import { Card } from '@/Components/ui/Card';
import { Alert } from '@/Components/ui/Alert';
import { Badge } from '@/Components/ui/Badge';
import { Input } from '@/Components/ui/Input';
import { Select } from '@/Components/ui/Select';
import { Pagination } from '@/Components/ui/Pagination';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/Table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/Components/ui/Dialog';
import { Search, Mail, Eye, Trash2 } from 'lucide-react';

export default function Index({ contacts, filters }) {
    const { flash } = usePage().props;
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [localFilters, setLocalFilters] = useState({
        status: filters.status || '',
        search: filters.search || '',
    });

    const handleDelete = (uid) => {
        router.delete(`/admin/contacts/${uid}`, {
            onSuccess: () => setShowDeleteConfirm(null),
        });
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);
        router.get('/admin/contacts', newFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setLocalFilters({ status: '', search: '' });
        router.get('/admin/contacts', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Contact Leads</h1>
                <p className="text-gray-600 mt-1">Manage customer inquiries and contact requests</p>
            </div>

            {/* Success Message */}
            {flash.success && (
                <Alert variant="success" className="mb-6">
                    {flash.success}
                </Alert>
            )}

            {/* Filters */}
            <Card className="p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                            type="text"
                            placeholder="Search by name, email, or phone..."
                            value={localFilters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            className="pl-9"
                        />
                    </div>

                    {/* Status Filter */}
                    <div>
                        <Select
                            value={localFilters.status}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                        >
                            <option value="">All Status</option>
                            <option value="unread">Unread</option>
                            <option value="read">Read</option>
                        </Select>
                    </div>

                    {/* Clear Filters */}
                    <div>
                        <Button
                            onClick={clearFilters}
                            variant="secondary"
                            className="w-full"
                        >
                            Clear Filters
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Contacts List */}
            <Card className="overflow-hidden">
                {contacts.data.length > 0 ? (
                    <>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Contact Info</TableHead>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Message</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {contacts.data.map((contact) => (
                                    <TableRow
                                        key={contact.uid}
                                        className={!contact.is_read ? 'bg-blue-50/50' : ''}
                                    >
                                        <TableCell>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 flex items-center">
                                                    {contact.name}
                                                    {!contact.is_read && (
                                                        <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full"></span>
                                                    )}
                                                </div>
                                                <div className="text-sm text-gray-500">{contact.email}</div>
                                                {contact.phone && (
                                                    <div className="text-sm text-gray-500">{contact.phone}</div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap">
                                            {contact.product ? (
                                                <div className="text-sm text-gray-900">{contact.product.name}</div>
                                            ) : (
                                                <span className="text-sm text-gray-400">General Inquiry</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm text-gray-900 line-clamp-2 max-w-md">
                                                {contact.message}
                                            </div>
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{formatDate(contact.created_at)}</div>
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap">
                                            <Badge variant={contact.is_read ? 'secondary' : 'default'}>
                                                {contact.is_read ? 'Read' : 'Unread'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link href={`/admin/contacts/${contact.uid}`}>
                                                        <Eye className="h-4 w-4 mr-1" />
                                                        View
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setShowDeleteConfirm(contact.uid)}
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <Trash2 className="h-4 w-4 mr-1" />
                                                    Delete
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        <Pagination data={contacts} />
                    </>
                ) : (
                    <div className="text-center py-12">
                        <Mail className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No contact leads</h3>
                        <p className="mt-1 text-sm text-gray-500">Contact requests will appear here</p>
                    </div>
                )}
            </Card>

            {/* Delete Confirmation Modal */}
            <Dialog open={!!showDeleteConfirm} onOpenChange={() => setShowDeleteConfirm(null)}>
                <DialogContent onClose={() => setShowDeleteConfirm(null)}>
                    <DialogHeader>
                        <DialogTitle>Delete Contact</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this contact? This action cannot be undone.
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
