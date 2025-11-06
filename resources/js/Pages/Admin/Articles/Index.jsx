import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/Components/ui/Button';
import { Input } from '@/Components/ui/Input';
import { Select } from '@/Components/ui/Select';
import { Alert } from '@/Components/ui/Alert';
import { Badge } from '@/Components/ui/Badge';
import { Card } from '@/Components/ui/Card';
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
import { Plus, Search, FileText, Edit2, Trash2 } from 'lucide-react';

export default function Index({ articles, categories, filters }) {
    const { flash } = usePage().props;
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [localFilters, setLocalFilters] = useState({
        category: filters.category || '',
        status: filters.status || '',
        search: filters.search || '',
    });

    const handleDelete = (uid) => {
        router.delete(`/admin/articles/${uid}`, {
            onSuccess: () => setShowDeleteConfirm(null),
        });
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);
        router.get('/admin/articles', newFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setLocalFilters({ category: '', status: '', search: '' });
        router.get('/admin/articles', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Articles</h1>
                    <p className="text-gray-600 mt-1">Manage blog articles and content</p>
                </div>
                <Button asChild>
                    <Link href="/admin/articles/create">
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Article
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="md:col-span-2 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            type="text"
                            placeholder="Search by title or excerpt..."
                            value={localFilters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            className="pl-9"
                        />
                    </div>

                    {/* Category Filter */}
                    <div>
                        <Select
                            value={localFilters.category}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                        >
                            <option value="">All Categories</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </Select>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <Select
                            value={localFilters.status}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                        >
                            <option value="">All Status</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                        </Select>
                    </div>
                </div>
                <div className="mt-4">
                    <Button variant="secondary" size="sm" onClick={clearFilters}>
                        Clear Filters
                    </Button>
                </div>
            </Card>

            {/* Articles List */}
            <Card className="overflow-hidden">
                {articles.data.length > 0 ? (
                    <>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Article</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Author</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {articles.data.map((article) => (
                                    <TableRow key={article.uid}>
                                        <TableCell>
                                            <div className="flex items-center">
                                                {article.featured_image && (
                                                    <div className="flex-shrink-0 h-16 w-24 mr-4">
                                                        <img
                                                            src={
                                                                article.featured_image.startsWith('http')
                                                                    ? article.featured_image
                                                                    : `/storage/${article.featured_image}`
                                                            }
                                                            alt={article.title}
                                                            className="h-16 w-24 object-cover rounded-lg"
                                                        />
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {article.title}
                                                    </div>
                                                    {article.excerpt && (
                                                        <div className="text-sm text-gray-500 line-clamp-1">
                                                            {article.excerpt}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="default">
                                                {article.category.name}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm text-gray-900">{article.author.name}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm text-gray-900">
                                                {article.published_at ? formatDate(article.published_at) : '-'}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={article.is_published ? 'success' : 'secondary'}>
                                                {article.is_published ? 'Published' : 'Draft'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="sm" asChild>
                                                    <Link href={`/admin/articles/${article.uid}/edit`}>
                                                        <Edit2 className="w-4 h-4 mr-1" />
                                                        Edit
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setShowDeleteConfirm(article.uid)}
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <Trash2 className="w-4 h-4 mr-1" />
                                                    Delete
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        <Pagination data={articles} />
                    </>
                ) : (
                    <div className="text-center py-12">
                        <FileText className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No articles</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new article.</p>
                        <div className="mt-6">
                            <Button asChild>
                                <Link href="/admin/articles/create">
                                    <Plus className="w-5 h-5 mr-2" />
                                    Add New Article
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}
            </Card>

            {/* Delete Confirmation Modal */}
            <Dialog open={!!showDeleteConfirm} onOpenChange={(open) => !open && setShowDeleteConfirm(null)}>
                <DialogContent onClose={() => setShowDeleteConfirm(null)}>
                    <DialogHeader>
                        <DialogTitle>Delete Article</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this article? This action cannot be undone.
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
