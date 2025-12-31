import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Button } from '@/Components/ui/Button';
import { Card } from '@/Components/ui/Card';
import { Badge } from '@/Components/ui/Badge';
import { Input } from '@/Components/ui/Input';
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
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [localFilters, setLocalFilters] = useState({
        status: filters.status || '',
        subject: filters.subject || '',
        project: filters.project || '',
        search: filters.search || '',
    });

    const handleDelete = (id) => {
        router.delete(`/admin/contacts/${id}`, {
            onSuccess: () => setShowDeleteConfirm(null),
        });
    };

    // Debounced search - only trigger after 500ms of no typing
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get('/admin/contacts', localFilters, {
                preserveState: true,
                preserveScroll: true,
                only: ['contacts'],
            });
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [localFilters.search]);

    // Immediate filter for status changes
    const handleFilterChange = (key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);
        router.get('/admin/contacts', newFilters, {
            preserveState: true,
            preserveScroll: true,
            only: ['contacts'],
        });
    };

    const clearFilters = () => {
        setLocalFilters({ status: '', subject: '', project: '', search: '' });
        router.get('/admin/contacts', {}, {
            preserveState: true,
            preserveScroll: true,
            only: ['contacts'],
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

            {/* Filters */}
            <Card className="p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {/* Search */}
                    <div className="relative md:col-span-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                            type="text"
                            placeholder="Search by name, email, or phone..."
                            value={localFilters.search}
                            onChange={(e) => setLocalFilters({ ...localFilters, search: e.target.value })}
                            className="pl-9"
                        />
                    </div>

                    {/* Status Filter */}
                    <div>
                        <select
                            value={localFilters.status}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                            className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">All Status</option>
                            <option value="new">New</option>
                            <option value="in_progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                        </select>
                    </div>

                    {/* Subject Filter */}
                    <div>
                        <select
                            value={localFilters.subject}
                            onChange={(e) => handleFilterChange('subject', e.target.value)}
                            className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">All Subjects</option>
                            <option value="inquiry">General Inquiry</option>
                            <option value="purchase">Purchase Information</option>
                            <option value="visit">Schedule Visit</option>
                            <option value="other">Other</option>
                        </select>
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
                                    <TableHead>Subject & Project</TableHead>
                                    <TableHead>Residence</TableHead>
                                    <TableHead>Message</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {contacts.data.map((contact) => (
                                    <TableRow
                                        key={contact.id}
                                        className={contact.status === 'new' ? 'bg-blue-50/50' : ''}
                                    >
                                        <TableCell>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 flex items-center">
                                                    {contact.full_name}
                                                    {contact.status === 'new' && (
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
                                            <div className="text-sm text-gray-900 font-medium">
                                                {contact.subject === 'inquiry' && 'General Inquiry'}
                                                {contact.subject === 'purchase' && 'Purchase Info'}
                                                {contact.subject === 'visit' && 'Schedule Visit'}
                                                {contact.subject === 'other' && 'Other'}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {contact.project === 'kinary' ? 'Kinary House' : 'Other Projects'}
                                            </div>
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{contact.residence}</div>
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
                                            <Badge variant={
                                                contact.status === 'new' ? 'default' :
                                                contact.status === 'in_progress' ? 'secondary' :
                                                'success'
                                            }>
                                                {contact.status === 'new' && 'New'}
                                                {contact.status === 'in_progress' && 'In Progress'}
                                                {contact.status === 'resolved' && 'Resolved'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link href={`/admin/contacts/${contact.id}`}>
                                                        <Eye className="h-4 w-4 mr-1" />
                                                        View
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setShowDeleteConfirm(contact.id)}
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
