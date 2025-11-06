import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    Button,
    Card,
    CardContent,
    Alert,
    Badge,
    Pagination,
    Input,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/Components/ui';
import { Plus, Search, Building, Image as ImageIcon } from 'lucide-react';

export default function Index({ facilities, filters }) {
    const { flash } = usePage().props;
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [localFilters, setLocalFilters] = useState({
        status: filters.status || '',
        search: filters.search || '',
    });

    const handleDelete = (id) => {
        router.delete(`/admin/facilities/${id}`, {
            onSuccess: () => setShowDeleteConfirm(null),
        });
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);
        router.get('/admin/facilities', newFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setLocalFilters({ status: '', search: '' });
        router.get('/admin/facilities', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Facilities</h1>
                    <p className="text-gray-600 mt-1">Manage property facilities and amenities</p>
                </div>
                <Button asChild>
                    <Link href="/admin/facilities/create">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Facility
                    </Link>
                </Button>
            </div>

            {/* Success Message */}
            {flash.success && (
                <Alert variant="success" className="mb-6">
                    {flash.success}
                </Alert>
            )}

            {/* Filters */}
            <Card className="mb-6">
                <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search by name..."
                                value={localFilters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                                className="pl-9"
                            />
                        </div>

                        {/* Status Filter */}
                        <div>
                            <select
                                value={localFilters.status}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        {/* Clear Filters */}
                        <div>
                            <Button
                                variant="outline"
                                onClick={clearFilters}
                                className="w-full"
                            >
                                Clear Filters
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Facilities Grid */}
            <Card>
                {facilities.data.length > 0 ? (
                    <>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {facilities.data.map((facility) => (
                                    <Card
                                        key={facility.id}
                                        className="overflow-hidden hover:shadow-md transition"
                                    >
                                        {/* Image Gallery Preview */}
                                        <div className="relative h-48 bg-gray-100">
                                            {facility.images.length > 0 ? (
                                                <img
                                                    src={
                                                        facility.images[0].image_path.startsWith('http')
                                                            ? facility.images[0].image_path
                                                            : `/storage/${facility.images[0].image_path}`
                                                    }
                                                    alt={facility.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <ImageIcon className="w-12 h-12 text-gray-400" />
                                                </div>
                                            )}
                                            {facility.images.length > 1 && (
                                                <Badge className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white">
                                                    +{facility.images.length - 1} more
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
                                                        <Link href={`/admin/facilities/${facility.id}/edit`}>
                                                            Edit
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="link"
                                                        size="sm"
                                                        className="h-auto p-0 text-red-600 hover:text-red-900"
                                                        onClick={() => setShowDeleteConfirm(facility.id)}
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
                                ))}
                            </div>
                        </CardContent>

                        {/* Pagination */}
                        <Pagination data={facilities} />
                    </>
                    ) : (
                        <CardContent className="text-center py-12">
                            <Building className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No facilities</h3>
                            <p className="mt-1 text-sm text-gray-500">Get started by creating a new facility.</p>
                            <div className="mt-6">
                                <Button asChild>
                                    <Link href="/admin/facilities/create">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add New Facility
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    )}
            </Card>

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
