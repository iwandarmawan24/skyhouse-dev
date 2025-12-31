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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/Table';
import { Plus, Image as ImageIcon, Search, Filter, X, Pencil, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

export default function Index({ galleries, filters }) {
    const { flash } = usePage().props;
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [localFilters, setLocalFilters] = useState({
        status: filters?.status || '',
        search: filters?.search || '',
    });

    const handleDelete = (uid) => {
        router.delete(`/admin/galleries/${uid}`, {
            onSuccess: () => setShowDeleteConfirm(null),
        });
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);

        router.get('/admin/galleries', newFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setLocalFilters({ status: '', search: '' });
        router.get('/admin/galleries', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleMoveUp = (gallery, index) => {
        if (index === 0) return;

        const prevGallery = galleries[index - 1];
        router.post(
            '/admin/galleries/update-order',
            {
                updates: [
                    { uid: gallery.uid, order: prevGallery.order },
                    { uid: prevGallery.uid, order: gallery.order },
                ],
            },
            {
                preserveScroll: true,
            }
        );
    };

    const handleMoveDown = (gallery, index) => {
        if (index === galleries.length - 1) return;

        const nextGallery = galleries[index + 1];
        router.post(
            '/admin/galleries/update-order',
            {
                updates: [
                    { uid: gallery.uid, order: nextGallery.order },
                    { uid: nextGallery.uid, order: gallery.order },
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
                        <h1 className="text-3xl font-bold tracking-tight">Gallery</h1>
                        <p className="text-muted-foreground mt-1">
                            Manage gallery images for your website
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button asChild>
                            <Link href="/admin/galleries/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Image
                            </Link>
                        </Button>
                    </div>
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
                                            placeholder="Search by title..."
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
                                            {localFilters.status && (
                                                <Badge variant="secondary" className="ml-1 rounded-full px-1.5 py-0">
                                                    1
                                                </Badge>
                                            )}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48">
                                        <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuCheckboxItem
                                            checked={localFilters.status === 'active'}
                                            onCheckedChange={(checked) =>
                                                handleFilterChange('status', checked ? 'active' : '')
                                            }
                                        >
                                            Active
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem
                                            checked={localFilters.status === 'inactive'}
                                            onCheckedChange={(checked) =>
                                                handleFilterChange('status', checked ? 'inactive' : '')
                                            }
                                        >
                                            Inactive
                                        </DropdownMenuCheckboxItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            {/* Active Filters */}
                            {(localFilters.status || localFilters.search) && (
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-sm text-muted-foreground">Active filters:</span>

                                    {/* Status badge */}
                                    {localFilters.status && (
                                        <Badge variant="secondary" className="gap-1">
                                            Status: {localFilters.status.charAt(0).toUpperCase() + localFilters.status.slice(1)}
                                            <button
                                                onClick={() => handleFilterChange('status', '')}
                                                className="ml-1 hover:text-destructive"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    )}

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

                {/* Gallery Table */}
                <Card>
                    <CardContent className="pt-6">
                        {galleries && galleries.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-16">Order</TableHead>
                                        <TableHead>Image</TableHead>
                                        <TableHead className="w-24">Status</TableHead>
                                        <TableHead className="w-32 text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {galleries.map((gallery, index) => (
                                        <TableRow key={gallery.uid}>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7"
                                                        onClick={() => handleMoveUp(gallery, index)}
                                                        disabled={index === 0}
                                                    >
                                                        <ArrowUp className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7"
                                                        onClick={() => handleMoveDown(gallery, index)}
                                                        disabled={index === galleries.length - 1}
                                                    >
                                                        <ArrowDown className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-shrink-0 h-16 w-24">
                                                        {gallery.image_url ? (
                                                            <img
                                                                src={gallery.image_url}
                                                                alt={gallery.title}
                                                                className="h-16 w-24 object-cover rounded-lg"
                                                            />
                                                        ) : (
                                                            <div className="h-16 w-24 bg-muted rounded-lg flex items-center justify-center">
                                                                <ImageIcon className="w-8 h-8 text-muted-foreground" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="max-w-md">
                                                        <div className="font-medium line-clamp-1">{gallery.title}</div>
                                                        {gallery.description && (
                                                            <div className="text-sm text-muted-foreground line-clamp-2">
                                                                {gallery.description}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={gallery.is_active ? "success" : "secondary"}>
                                                    {gallery.is_active ? "Active" : "Inactive"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        asChild
                                                    >
                                                        <Link href={`/admin/galleries/${gallery.uid}/edit`}>
                                                            <Pencil className="h-4 w-4" />
                                                            <span className="sr-only">Edit</span>
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                        onClick={() => setShowDeleteConfirm(gallery.uid)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">Delete</span>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="text-center py-12">
                                <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                                <h3 className="mt-2 text-sm font-medium">No gallery images</h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Get started by adding a new gallery image.
                                </p>
                                <div className="mt-6">
                                    <Button asChild>
                                        <Link href="/admin/galleries/create">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Image
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={!!showDeleteConfirm}
                onOpenChange={() => setShowDeleteConfirm(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Gallery Image</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this gallery image? This action
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
