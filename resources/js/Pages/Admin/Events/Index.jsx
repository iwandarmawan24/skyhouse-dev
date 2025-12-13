import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/Components/ui/Button';
import { Input } from '@/Components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/Card';
import { Badge } from '@/Components/ui/Badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/Components/ui/Dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { DataTable } from '@/Components/DataTable';
import { createColumns } from './columns';
import LaravelPagination from '@/Components/LaravelPagination';
import { Plus, Calendar, Search, Filter, X } from 'lucide-react';

export default function Index({ events, filters }) {
    const { flash } = usePage().props;
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [localFilters, setLocalFilters] = useState({
        statuses: filters?.statuses ? filters.statuses.split(',').filter(Boolean) : [],
        search: filters?.search || '',
    });

    const handleDelete = (uid) => {
        router.delete(`/admin/events/${uid}`, {
            onSuccess: () => setShowDeleteConfirm(null),
        });
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);

        // Convert arrays to comma-separated strings for URL
        const filterParams = {
            search: newFilters.search,
            statuses: newFilters.statuses.join(','),
        };

        router.get('/admin/events', filterParams, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const toggleFilter = (key, value) => {
        const currentValues = localFilters[key];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];

        handleFilterChange(key, newValues);
    };

    const removeFilter = (key, value) => {
        const newValues = localFilters[key].filter(v => v !== value);
        handleFilterChange(key, newValues);
    };

    const clearFilters = () => {
        setLocalFilters({ statuses: [], search: '' });
        router.get('/admin/events', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const columns = createColumns(setShowDeleteConfirm);

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Events</h1>
                        <p className="text-muted-foreground mt-1">
                            Manage property events and open houses
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/events/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Event
                        </Link>
                    </Button>
                </div>

                {/* Filters Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filters</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Search and Filter Buttons */}
                            <div className="flex flex-col md:flex-row gap-3">
                                {/* Search */}
                                <div className="flex-1">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            type="text"
                                            placeholder="Search by title or location..."
                                            value={localFilters.search}
                                            onChange={(e) => handleFilterChange('search', e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                {/* Status Filter Dropdown */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="gap-2">
                                            <Filter className="h-4 w-4" />
                                            Status
                                            {localFilters.statuses.length > 0 && (
                                                <Badge variant="secondary" className="ml-1 rounded-full px-1.5 py-0">
                                                    {localFilters.statuses.length}
                                                </Badge>
                                            )}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48">
                                        <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuCheckboxItem
                                            checked={localFilters.statuses.includes('upcoming')}
                                            onCheckedChange={() => toggleFilter('statuses', 'upcoming')}
                                        >
                                            Upcoming
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem
                                            checked={localFilters.statuses.includes('past')}
                                            onCheckedChange={() => toggleFilter('statuses', 'past')}
                                        >
                                            Past
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem
                                            checked={localFilters.statuses.includes('inactive')}
                                            onCheckedChange={() => toggleFilter('statuses', 'inactive')}
                                        >
                                            Inactive
                                        </DropdownMenuCheckboxItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            {/* Active Filters */}
                            {(localFilters.statuses.length > 0 || localFilters.search) && (
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-sm text-muted-foreground">Active filters:</span>

                                    {/* Status badges */}
                                    {localFilters.statuses.map((status) => (
                                        <Badge key={status} variant="secondary" className="gap-1">
                                            Status: {status.charAt(0).toUpperCase() + status.slice(1)}
                                            <button
                                                onClick={() => removeFilter('statuses', status)}
                                                className="ml-1 hover:text-destructive"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}

                                    {/* Clear all button */}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={clearFilters}
                                        className="h-6 px-2 text-xs"
                                    >
                                        Clear all
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Events DataTable */}
                <Card>
                    <CardContent className="pt-6">
                        {events.data && events.data.length > 0 ? (
                            <DataTable
                                columns={columns}
                                data={events.data || []}
                            />
                        ) : (
                            <div className="text-center py-12">
                                <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                                <h3 className="mt-2 text-sm font-medium">No events</h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Get started by creating a new event.
                                </p>
                                <div className="mt-6">
                                    <Button asChild>
                                        <Link href="/admin/events/create">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Event
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {events.data && events.data.length > 0 && (
                    <LaravelPagination data={events} />
                )}
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={!!showDeleteConfirm}
                onOpenChange={() => setShowDeleteConfirm(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Event</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this event? This action
                            cannot be undone.
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
