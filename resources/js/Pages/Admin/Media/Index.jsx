import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Search, Newspaper } from 'lucide-react';
import {
    Button,
    Card,
    Alert,
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
    DialogFooter,
    Badge,
    Input
} from '@/Components/ui';

export default function Index({ media, filters }) {
    const { flash } = usePage().props;
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [search, setSearch] = useState(filters.search || '');

    const handleDelete = (uid) => {
        router.delete(`/admin/media/${uid}`, {
            onSuccess: () => setShowDeleteConfirm(null),
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/media', { search }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearSearch = () => {
        setSearch('');
        router.get('/admin/media', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Media Outlets</h1>
                    <p className="text-gray-600 mt-1">Manage media outlets and news sources</p>
                </div>
                <Link href="/admin/media/create">
                    <Button>
                        <Plus className="w-5 h-5 mr-2" />
                        Add Media
                    </Button>
                </Link>
            </div>

            {/* Success/Error Message */}
            {flash.success && (
                <Alert variant="success" className="mb-6">
                    {flash.success}
                </Alert>
            )}
            {flash.error && (
                <Alert variant="destructive" className="mb-6">
                    {flash.error}
                </Alert>
            )}

            {/* Search */}
            <Card className="mb-6 p-4">
                <form onSubmit={handleSearch} className="flex gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        <Input
                            type="text"
                            placeholder="Search media outlets..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Button type="submit">Search</Button>
                    {search && (
                        <Button type="button" variant="secondary" onClick={clearSearch}>
                            Clear
                        </Button>
                    )}
                </form>
            </Card>

            {/* Media Table */}
            <Card>
                {media.data.length > 0 ? (
                    <>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Media Outlet</TableHead>
                                    <TableHead>Highlights</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {media.data.map((medium) => (
                                    <TableRow key={medium.uid}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                {medium.logo ? (
                                                    <img
                                                        src={medium.logo.startsWith('http') ? medium.logo : `/storage/${medium.logo}`}
                                                        alt={medium.name}
                                                        className="h-10 w-10 rounded object-contain bg-gray-50 border border-gray-200"
                                                    />
                                                ) : (
                                                    <div className="h-10 w-10 rounded bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-semibold shrink-0">
                                                        {medium.name.charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                                <span className="font-medium text-gray-900">{medium.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">
                                                {medium.highlights_count} {medium.highlights_count === 1 ? 'highlight' : 'highlights'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={medium.is_active ? 'success' : 'destructive'}>
                                                {medium.is_active ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/media/${medium.uid}/edit`}>
                                                    <Button variant="ghost" size="sm">
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setShowDeleteConfirm(medium.uid)}
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
                        <Pagination data={media} />
                    </>
                ) : (
                    <div className="text-center py-12">
                        <Newspaper className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No media outlets found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {search ? 'Try adjusting your search' : 'Get started by adding a media outlet.'}
                        </p>
                        {!search && (
                            <div className="mt-6">
                                <Link href="/admin/media/create">
                                    <Button>
                                        <Plus className="w-5 h-5 mr-2" />
                                        Add Media
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </Card>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!showDeleteConfirm} onOpenChange={() => setShowDeleteConfirm(null)}>
                <DialogContent onClose={() => setShowDeleteConfirm(null)}>
                    <DialogHeader>
                        <DialogTitle>Delete Media Outlet</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this media outlet? This action cannot be undone. Highlights from this media will not be deleted.
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
