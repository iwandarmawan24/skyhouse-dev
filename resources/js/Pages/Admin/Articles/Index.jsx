import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/Components/ui/Button';
import { Input } from '@/Components/ui/Input';
import { Badge } from '@/Components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/Card';
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
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { DataTable } from '@/Components/DataTable';
import LaravelPagination from '@/Components/LaravelPagination';
import { createColumns } from './columns';
import { Plus, Search, Filter, X } from 'lucide-react';

export default function Index({ articles, categories, filters }) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [localFilters, setLocalFilters] = useState({
        categories: filters?.categories ? filters.categories.split(',').filter(Boolean) : [],
        statuses: filters?.statuses ? filters.statuses.split(',').filter(Boolean) : [],
        search: filters?.search || '',
    });

    const handleDelete = (uid) => {
        router.delete(`/admin/articles/${uid}`, {
            onSuccess: () => setShowDeleteConfirm(null),
        });
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);

        // Convert arrays to comma-separated strings for URL
        const filterParams = {
            search: newFilters.search,
            categories: newFilters.categories.join(','),
            statuses: newFilters.statuses.join(','),
        };

        router.get('/admin/articles', filterParams, {
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
        setLocalFilters({
            categories: [],
            statuses: [],
            search: '',
        });
        router.get('/admin/articles', {}, {
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
                        <h1 className="text-3xl font-bold tracking-tight">Articles</h1>
                        <p className="text-muted-foreground mt-1">
                            Manage blog articles and content
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/articles/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Article
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
                                            placeholder="Search by title or excerpt..."
                                            value={localFilters.search}
                                            onChange={(e) =>
                                                handleFilterChange("search", e.target.value)
                                            }
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                {/* Category Filter Dropdown */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="gap-2">
                                            <Filter className="h-4 w-4" />
                                            Category
                                            {localFilters.categories.length > 0 && (
                                                <Badge variant="secondary" className="ml-1 rounded-full px-1.5 py-0">
                                                    {localFilters.categories.length}
                                                </Badge>
                                            )}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48">
                                        <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {categories.map((category) => (
                                            <DropdownMenuCheckboxItem
                                                key={category.uid}
                                                checked={localFilters.categories.includes(category.uid)}
                                                onCheckedChange={() => toggleFilter('categories', category.uid)}
                                            >
                                                {category.name}
                                            </DropdownMenuCheckboxItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>

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
                                            checked={localFilters.statuses.includes('published')}
                                            onCheckedChange={() => toggleFilter('statuses', 'published')}
                                        >
                                            Published
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem
                                            checked={localFilters.statuses.includes('draft')}
                                            onCheckedChange={() => toggleFilter('statuses', 'draft')}
                                        >
                                            Draft
                                        </DropdownMenuCheckboxItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            {/* Active Filters */}
                            {(localFilters.categories.length > 0 || localFilters.statuses.length > 0 || localFilters.search) && (
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-sm text-muted-foreground">Active filters:</span>

                                    {/* Category badges */}
                                    {localFilters.categories.map((categoryUid) => {
                                        const category = categories.find(c => c.uid === categoryUid);
                                        return category ? (
                                            <Badge key={categoryUid} variant="secondary" className="gap-1">
                                                Category: {category.name}
                                                <button
                                                    onClick={() => removeFilter('categories', categoryUid)}
                                                    className="ml-1 hover:text-destructive"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ) : null;
                                    })}

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

                {/* Articles DataTable */}
                <Card>
                    <CardContent className="pt-6">
                        <DataTable columns={columns} data={articles.data || []} />
                    </CardContent>
                </Card>

                {/* Pagination */}
                {articles.data && articles.data.length > 0 && (
                    <LaravelPagination data={articles} />
                )}
            </div>

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
