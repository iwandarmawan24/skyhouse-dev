import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/Components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/Card';
import { Badge } from '@/Components/ui/Badge';
import { Input } from '@/Components/ui/Input';
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
import { Plus, Search, Building, Image as ImageIcon, Filter, X, LayoutGrid, Table as TableIcon } from 'lucide-react';

export default function Index({ facilities, filters }) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
    const [localFilters, setLocalFilters] = useState({
        statuses: filters?.statuses ? filters.statuses.split(',').filter(Boolean) : [],
        search: filters?.search || '',
    });

    const handleDelete = (uid) => {
        router.delete(`/admin/facilities/${uid}`, {
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

        router.get('/admin/facilities', filterParams, {
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
        router.get('/admin/facilities', {}, {
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
                        <h1 className="text-3xl font-bold tracking-tight">Facilities</h1>
                        <p className="text-muted-foreground mt-1">
                            Manage property facilities and amenities
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/facilities/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Facility
                        </Link>
                    </Button>
                </div>

                {/* Filters Card */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Filters</CardTitle>
                            {/* View Toggle */}
                            <div className="flex items-center gap-2">
                                <Button
                                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setViewMode('grid')}
                                    className="gap-2"
                                >
                                    <LayoutGrid className="h-4 w-4" />
                                    Grid
                                </Button>
                                <Button
                                    variant={viewMode === 'table' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setViewMode('table')}
                                    className="gap-2"
                                >
                                    <TableIcon className="h-4 w-4" />
                                    Table
                                </Button>
                            </div>
                        </div>
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
                                            placeholder="Search by name..."
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
                                            checked={localFilters.statuses.includes('active')}
                                            onCheckedChange={() => toggleFilter('statuses', 'active')}
                                        >
                                            Active
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

                {/* Facilities View */}
                <Card>
                    <CardContent className="pt-6">
                        {facilities.data && facilities.data.length > 0 ? (
                            viewMode === 'table' ? (
                                <DataTable
                                    columns={columns}
                                    data={facilities.data || []}
                                />
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {facilities.data.map((facility) => {
                                        const firstImage = facility.media_images && facility.media_images.length > 0
                                            ? facility.media_images[0]
                                            : null;
                                        const imageSrc = firstImage?.url || null;

                                        return (
                                            <Card
                                                key={facility.uid}
                                                className="overflow-hidden hover:shadow-md transition"
                                            >
                                                {/* Image Gallery Preview */}
                                                <div className="relative h-48 bg-gray-100">
                                                    {imageSrc ? (
                                                        <img
                                                            src={imageSrc}
                                                            alt={facility.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <ImageIcon className="w-12 h-12 text-gray-400" />
                                                        </div>
                                                    )}
                                                    {facility.media_images && facility.media_images.length > 1 && (
                                                        <Badge className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white">
                                                            +{facility.media_images.length - 1} more
                                                        </Badge>
                                                    )}
                                                    {!facility.is_active && (
                                                        <Badge variant="secondary" className="absolute top-2 left-2">
                                                            Inactive
                                                        </Badge>
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <CardContent className="p-4">
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                        {facility.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                                                        {facility.description}
                                                    </p>

                                                    {/* Actions */}
                                                    <div className="flex items-center justify-between pt-4 border-t">
                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                variant="link"
                                                                size="sm"
                                                                className="h-auto p-0"
                                                                asChild
                                                            >
                                                                <Link href={`/admin/facilities/${facility.uid}/edit`}>
                                                                    Edit
                                                                </Link>
                                                            </Button>
                                                            <Button
                                                                variant="link"
                                                                size="sm"
                                                                className="h-auto p-0 text-red-600 hover:text-red-900"
                                                                onClick={() => setShowDeleteConfirm(facility.uid)}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </div>
                                                        <Badge variant={facility.is_active ? "success" : "secondary"}>
                                                            {facility.is_active ? 'Active' : 'Inactive'}
                                                        </Badge>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                </div>
                            )
                        ) : (
                            <div className="text-center py-12">
                                <Building className="mx-auto h-12 w-12 text-muted-foreground" />
                                <h3 className="mt-2 text-sm font-medium">No facilities</h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Get started by creating a new facility.
                                </p>
                                <div className="mt-6">
                                    <Button asChild>
                                        <Link href="/admin/facilities/create">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Facility
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {facilities.data && facilities.data.length > 0 && (
                    <LaravelPagination data={facilities} />
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <Dialog open={!!showDeleteConfirm} onOpenChange={() => setShowDeleteConfirm(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Facility</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this facility? This action cannot be undone and will also delete all associated images.
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
