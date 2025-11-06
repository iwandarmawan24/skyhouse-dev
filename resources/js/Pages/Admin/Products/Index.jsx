import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Alert } from '@/Components/ui/alert';
import { Badge } from '@/Components/ui/badge';
import { Pagination } from '@/Components/ui/pagination';
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from '@/Components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import { Plus, Search, Package, Home, Image } from 'lucide-react';

export default function Index({ products, filters }) {
    const { flash } = usePage().props;
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [localFilters, setLocalFilters] = useState({
        type: filters.type || '',
        status: filters.status || '',
        featured: filters.featured || '',
        search: filters.search || '',
    });

    const handleDelete = (id) => {
        router.delete(`/admin/products/${id}`, {
            onSuccess: () => setShowDeleteConfirm(null),
        });
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);
        router.get('/admin/products', newFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setLocalFilters({ type: '', status: '', featured: '', search: '' });
        router.get('/admin/products', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const getTypeVariant = (type) => {
        const variants = {
            house: 'default',
            apartment: 'secondary',
            land: 'success',
        };
        return variants[type] || 'secondary';
    };

    const getStatusVariant = (isSold, isActive) => {
        if (isSold) return 'destructive';
        if (isActive) return 'success';
        return 'secondary';
    };

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                    <p className="text-gray-600 mt-1">Manage property listings</p>
                </div>
                <Button asChild>
                    <Link href="/admin/products/create">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Product
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
            <Card className="p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {/* Search */}
                    <div className="md:col-span-2 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            type="text"
                            placeholder="Search by name, location, or city..."
                            value={localFilters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    {/* Type Filter */}
                    <div>
                        <select
                            value={localFilters.type}
                            onChange={(e) => handleFilterChange('type', e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">All Types</option>
                            <option value="house">House</option>
                            <option value="apartment">Apartment</option>
                            <option value="land">Land</option>
                        </select>
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
                            <option value="sold">Sold</option>
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
            </Card>

            {/* Products List */}
            <Card className="overflow-hidden">
                {products.data.length > 0 ? (
                    <>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {products.data.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-16 w-24">
                                                        {product.images.length > 0 ? (
                                                            <img
                                                                src={
                                                                    product.images[0].image_path.startsWith('http')
                                                                        ? product.images[0].image_path
                                                                        : `/storage/${product.images[0].image_path}`
                                                                }
                                                                alt={product.name}
                                                                className="h-16 w-24 object-cover rounded-lg"
                                                            />
                                                        ) : (
                                                            <div className="h-16 w-24 bg-gray-200 rounded-lg flex items-center justify-center">
                                                                <Image className="w-8 h-8 text-gray-400" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {product.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {product.bedrooms && product.bathrooms && (
                                                                <span>{product.bedrooms} BR • {product.bathrooms} BA</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={getTypeVariant(product.type)}>
                                                    {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm text-gray-900">{product.location}</div>
                                                <div className="text-sm text-gray-500">{product.city}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm font-semibold text-gray-900">
                                                    {formatPrice(product.price)}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col gap-1">
                                                    <Badge variant={getStatusVariant(product.is_sold, product.is_active)}>
                                                        {product.is_sold ? 'Sold' : product.is_active ? 'Active' : 'Inactive'}
                                                    </Badge>
                                                    {product.is_featured && (
                                                        <Badge variant="warning">
                                                            Featured
                                                        </Badge>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="sm" asChild>
                                                        <Link href={`/admin/products/${product.id}/edit`}>
                                                            Edit
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => setShowDeleteConfirm(product.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        <Pagination data={products} />
                    </>
                ) : (
                    <div className="text-center py-12">
                        <Package className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new product.</p>
                        <div className="mt-6">
                            <Button asChild>
                                <Link href="/admin/products/create">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add New Product
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}
            </Card>

            {/* Delete Confirmation Modal */}
            <Dialog open={!!showDeleteConfirm} onOpenChange={() => setShowDeleteConfirm(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Product</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this product? This action cannot be undone and will also delete all associated images.
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
