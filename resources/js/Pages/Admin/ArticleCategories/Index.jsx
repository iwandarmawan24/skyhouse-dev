import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Search, FolderOpen } from 'lucide-react';
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

export default function Index({ categories, filters }) {
    const { flash } = usePage().props;
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [search, setSearch] = useState(filters.search || '');

    const handleDelete = (uid) => {
        router.delete(`/admin/article-categories/${uid}`, {
            onSuccess: () => setShowDeleteConfirm(null),
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/article-categories', { search }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearSearch = () => {
        setSearch('');
        router.get('/admin/article-categories', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Article Categories</h1>
                    <p className="text-gray-600 mt-1">Manage article categories</p>
                </div>
                <Link href="/admin/article-categories/create">
                    <Button>
                        <Plus className="w-5 h-5 mr-2" />
                        Add Category
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
                            placeholder="Search categories..."
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

            {/* Categories Table */}
            <Card>
                {categories.data.length > 0 ? (
                    <>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Category Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Articles</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.data.map((category) => (
                                    <TableRow key={category.uid}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-semibold shrink-0">
                                                    {category.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <span className="font-medium text-gray-900">{category.name}</span>
                                                    <p className="text-xs text-gray-500">/{category.slug}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-gray-600">
                                            {category.description ? (
                                                <span className="line-clamp-2">{category.description}</span>
                                            ) : (
                                                <span className="text-gray-400 italic">No description</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">
                                                {category.articles_count} {category.articles_count === 1 ? 'article' : 'articles'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={category.is_active ? 'success' : 'destructive'}>
                                                {category.is_active ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/article-categories/${category.uid}/edit`}>
                                                    <Button variant="ghost" size="sm">
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setShowDeleteConfirm(category.uid)}
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
                        <Pagination data={categories} />
                    </>
                ) : (
                    <div className="text-center py-12">
                        <FolderOpen className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No categories found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {search ? 'Try adjusting your search' : 'Get started by creating a new category.'}
                        </p>
                        {!search && (
                            <div className="mt-6">
                                <Link href="/admin/article-categories/create">
                                    <Button>
                                        <Plus className="w-5 h-5 mr-2" />
                                        Add Category
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
                        <DialogTitle>Delete Category</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this category? This action cannot be undone. Articles in this category will not be deleted.
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
