import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Search, Sparkles, ExternalLink } from 'lucide-react';
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
import { FormSelect } from '@/Components/ui/FormField';

export default function Index({ highlights, mediaList, filters }) {
    const { flash } = usePage().props;
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [search, setSearch] = useState(filters.search || '');
    const [mediaFilter, setMediaFilter] = useState(filters.media || '');

    const handleDelete = (uid) => {
        router.delete(`/admin/media-highlights/${uid}`, {
            onSuccess: () => setShowDeleteConfirm(null),
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/media-highlights', { search, media: mediaFilter }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setSearch('');
        setMediaFilter('');
        router.get('/admin/media-highlights', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Media Highlights</h1>
                    <p className="text-gray-600 mt-1">External news and articles from media outlets</p>
                </div>
                <Link href="/admin/media-highlights/create">
                    <Button>
                        <Plus className="w-5 h-5 mr-2" />
                        Add Highlight
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

            {/* Search & Filter */}
            <Card className="mb-6 p-4">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        <Input
                            type="text"
                            placeholder="Search highlights..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <div className="w-full sm:w-64">
                        <FormSelect
                            name="media"
                            value={mediaFilter}
                            onChange={(e) => setMediaFilter(e.target.value)}
                        >
                            <option value="">All Media</option>
                            {mediaList.map(media => (
                                <option key={media.uid} value={media.uid}>{media.name}</option>
                            ))}
                        </FormSelect>
                    </div>
                    <Button type="submit">Filter</Button>
                    {(search || mediaFilter) && (
                        <Button type="button" variant="secondary" onClick={clearFilters}>
                            Clear
                        </Button>
                    )}
                </form>
            </Card>

            {/* Highlights Table */}
            <Card>
                {highlights.data.length > 0 ? (
                    <>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Article</TableHead>
                                    <TableHead>Media</TableHead>
                                    <TableHead>Publish Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {highlights.data.map((highlight) => (
                                    <TableRow key={highlight.uid}>
                                        <TableCell>
                                            <div className="flex items-start gap-3">
                                                {highlight.image ? (
                                                    <img
                                                        src={highlight.image.startsWith('http') ? highlight.image : `/storage/${highlight.image}`}
                                                        alt={highlight.title}
                                                        className="h-16 w-24 rounded object-cover shrink-0 bg-gray-50"
                                                    />
                                                ) : (
                                                    <div className="h-16 w-24 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shrink-0">
                                                        <Sparkles className="w-8 h-8" />
                                                    </div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-medium text-gray-900 line-clamp-2">
                                                        {highlight.title}
                                                    </h3>
                                                    <a
                                                        href={highlight.article_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-1"
                                                    >
                                                        View Article
                                                        <ExternalLink className="w-3 h-3" />
                                                    </a>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                {highlight.media?.logo && (
                                                    <img
                                                        src={highlight.media.logo.startsWith('http') ? highlight.media.logo : `/storage/${highlight.media.logo}`}
                                                        alt={highlight.media.name}
                                                        className="h-6 w-6 rounded object-contain"
                                                    />
                                                )}
                                                <span className="text-sm text-gray-900">{highlight.media?.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-gray-600">
                                            {new Date(highlight.publish_date).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/media-highlights/${highlight.uid}/edit`}>
                                                    <Button variant="ghost" size="sm">
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setShowDeleteConfirm(highlight.uid)}
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
                        <Pagination data={highlights} />
                    </>
                ) : (
                    <div className="text-center py-12">
                        <Sparkles className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No highlights found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {search || mediaFilter ? 'Try adjusting your filters' : 'Get started by adding a media highlight.'}
                        </p>
                        {!search && !mediaFilter && (
                            <div className="mt-6">
                                <Link href="/admin/media-highlights/create">
                                    <Button>
                                        <Plus className="w-5 h-5 mr-2" />
                                        Add Highlight
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
                        <DialogTitle>Delete Media Highlight</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this highlight? This action cannot be undone.
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
