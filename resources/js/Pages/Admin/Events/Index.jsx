import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/Components/ui/Button';
import { Input } from '@/Components/ui/Input';
import { Alert } from '@/Components/ui/Alert';
import { Badge } from '@/Components/ui/Badge';
import { Pagination } from '@/Components/ui/Pagination';
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from '@/Components/ui/Table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/Components/ui/Dialog';
import { Plus, Calendar, Search } from 'lucide-react';

export default function Index({ events, filters }) {
    const { flash } = usePage().props;
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [localFilters, setLocalFilters] = useState({
        status: filters.status || '',
        search: filters.search || '',
    });

    const handleDelete = (uid) => {
        router.delete(`/admin/events/${uid}`, {
            onSuccess: () => setShowDeleteConfirm(null),
        });
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);
        router.get('/admin/events', newFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setLocalFilters({ status: '', search: '' });
        router.get('/admin/events', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const formatDateTime = (date) => {
        return new Date(date).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const isUpcoming = (date) => {
        return new Date(date) > new Date();
    };

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Events</h1>
                    <p className="text-gray-600 mt-1">Manage property events and open houses</p>
                </div>
                <Link href="/admin/events/create">
                    <Button>
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Event
                    </Button>
                </Link>
            </div>

            {/* Success Message */}
            {flash.success && (
                <div className="mb-6">
                    <Alert variant="success">{flash.success}</Alert>
                </div>
            )}

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search by title or location..."
                            value={localFilters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    {/* Status Filter */}
                    <div>
                        <select
                            value={localFilters.status}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">All Events</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="past">Past</option>
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
            </div>

            {/* Events List */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {events.data.length > 0 ? (
                    <>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Event</TableHead>
                                    <TableHead>Date & Time</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {events.data.map((event) => (
                                    <TableRow key={event.uid}>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-16 w-24">
                                                    <img
                                                        src={
                                                            event.image.startsWith('http')
                                                                ? event.image
                                                                : `/storage/${event.image}`
                                                        }
                                                        alt={event.title}
                                                        className="h-16 w-24 object-cover rounded-lg"
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {event.title}
                                                    </div>
                                                    {event.description && (
                                                        <div className="text-sm text-gray-500 line-clamp-1">
                                                            {event.description.substring(0, 50)}...
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm text-gray-900">
                                                {formatDateTime(event.event_date)}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm text-gray-900">{event.location}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1">
                                                <Badge
                                                    variant={isUpcoming(event.event_date) ? 'success' : 'secondary'}
                                                >
                                                    {isUpcoming(event.event_date) ? 'Upcoming' : 'Past'}
                                                </Badge>
                                                {event.is_active && (
                                                    <Badge variant="default">Active</Badge>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/events/${event.uid}/edit`}>
                                                    <Button variant="ghost" size="sm">
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setShowDeleteConfirm(event.uid)}
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
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
                        <Pagination data={events} />
                    </>
                ) : (
                    <div className="text-center py-12">
                        <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No events</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new event.</p>
                        <div className="mt-6">
                            <Link href="/admin/events/create">
                                <Button>
                                    <Plus className="w-5 h-5 mr-2" />
                                    Add New Event
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <Dialog open={!!showDeleteConfirm} onOpenChange={() => setShowDeleteConfirm(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Event</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this event? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="secondary"
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
