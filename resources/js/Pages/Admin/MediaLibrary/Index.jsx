import AdminLayout from '@/Layouts/AdminLayout';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/Components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/Card';
import { Input } from '@/Components/ui/Input';
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
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import {
    Upload,
    Search,
    Filter,
    Trash2,
    FolderOpen,
    Image as ImageIcon,
    Video,
    FileText,
    File,
    Download,
    Edit,
    X,
    Check,
    HardDrive,
} from 'lucide-react';
import LaravelPagination from '@/Components/LaravelPagination';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { toast } from 'sonner';

export default function Index({ media, folders, stats, filters }) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [showUploadDialog, setShowUploadDialog] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [editingMedia, setEditingMedia] = useState(null);

    const [localFilters, setLocalFilters] = useState({
        type: filters?.type || '',
        folder: filters?.folder || '',
        search: filters?.search || '',
    });

    // Handle filter changes
    const handleFilterChange = (key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);

        router.get('/admin/media-library', newFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setLocalFilters({ type: '', folder: '', search: '' });
        router.get('/admin/media-library', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    // Handle file upload
    const handleUpload = async (files) => {
        if (!files || files.length === 0) return;

        setUploading(true);
        const formData = new FormData();

        Array.from(files).forEach(file => {
            formData.append('files[]', file);
        });

        try {
            const response = await axios.post('/admin/media-library/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                toast.success(response.data.message);
                setShowUploadDialog(false);
                router.reload();
            }
        } catch (error) {
            toast.error('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    // Handle delete
    const handleDelete = async (uid) => {
        try {
            const response = await axios.delete(`/admin/media-library/${uid}`);
            if (response.data.success) {
                toast.success(response.data.message);
                setShowDeleteConfirm(null);
                router.reload();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Delete failed');
        }
    };

    // Handle bulk delete
    const handleBulkDelete = async () => {
        if (selectedMedia.length === 0) return;

        try {
            const response = await axios.post('/admin/media-library/bulk-delete', {
                media_uids: selectedMedia,
            });

            if (response.data.success) {
                toast.success(response.data.message);
                setSelectedMedia([]);
                router.reload();
            }
        } catch (error) {
            toast.error('Bulk delete failed');
        }
    };

    // Toggle media selection
    const toggleMediaSelection = (uid) => {
        setSelectedMedia(prev =>
            prev.includes(uid)
                ? prev.filter(id => id !== uid)
                : [...prev, uid]
        );
    };

    // Get file icon
    const getFileIcon = (type) => {
        const icons = {
            image: ImageIcon,
            video: Video,
            document: FileText,
            default: File,
        };
        const Icon = icons[type] || icons.default;
        return Icon;
    };

    // Format file size
    const formatFileSize = (bytes) => {
        const units = ['B', 'KB', 'MB', 'GB'];
        let size = bytes;
        let unitIndex = 0;

        while (size > 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }

        return `${size.toFixed(2)} ${units[unitIndex]}`;
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
                        <p className="text-muted-foreground mt-1">
                            Manage and organize your media files
                        </p>
                    </div>
                    <Button onClick={() => setShowUploadDialog(true)}>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Files
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Files
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Images
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.images}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Videos
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.videos}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Documents
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.documents}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                                <HardDrive className="mr-1 h-4 w-4" />
                                Storage Used
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatFileSize(stats.total_size)}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filters</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex flex-col md:flex-row gap-3">
                                {/* Search */}
                                <div className="flex-1">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            type="text"
                                            placeholder="Search media..."
                                            value={localFilters.search}
                                            onChange={(e) => handleFilterChange('search', e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                {/* Type Filter */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="gap-2">
                                            <Filter className="h-4 w-4" />
                                            Type
                                            {localFilters.type && (
                                                <Badge variant="secondary" className="ml-1 rounded-full px-1.5 py-0">
                                                    1
                                                </Badge>
                                            )}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48">
                                        <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuCheckboxItem
                                            checked={localFilters.type === 'image'}
                                            onCheckedChange={() => handleFilterChange('type', localFilters.type === 'image' ? '' : 'image')}
                                        >
                                            Images
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem
                                            checked={localFilters.type === 'video'}
                                            onCheckedChange={() => handleFilterChange('type', localFilters.type === 'video' ? '' : 'video')}
                                        >
                                            Videos
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem
                                            checked={localFilters.type === 'document'}
                                            onCheckedChange={() => handleFilterChange('type', localFilters.type === 'document' ? '' : 'document')}
                                        >
                                            Documents
                                        </DropdownMenuCheckboxItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                {/* Folder Filter */}
                                {folders.length > 0 && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="gap-2">
                                                <FolderOpen className="h-4 w-4" />
                                                Folder
                                                {localFilters.folder && (
                                                    <Badge variant="secondary" className="ml-1 rounded-full px-1.5 py-0">
                                                        1
                                                    </Badge>
                                                )}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48">
                                            <DropdownMenuLabel>Filter by Folder</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            {folders.map((folder) => (
                                                <DropdownMenuCheckboxItem
                                                    key={folder}
                                                    checked={localFilters.folder === folder}
                                                    onCheckedChange={() => handleFilterChange('folder', localFilters.folder === folder ? '' : folder)}
                                                >
                                                    {folder}
                                                </DropdownMenuCheckboxItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </div>

                            {/* Active Filters */}
                            {(localFilters.type || localFilters.folder || localFilters.search) && (
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-sm text-muted-foreground">Active filters:</span>
                                    {localFilters.type && (
                                        <Badge variant="secondary" className="gap-1">
                                            Type: {localFilters.type}
                                            <button
                                                onClick={() => handleFilterChange('type', '')}
                                                className="ml-1 hover:text-destructive"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    )}
                                    {localFilters.folder && (
                                        <Badge variant="secondary" className="gap-1">
                                            Folder: {localFilters.folder}
                                            <button
                                                onClick={() => handleFilterChange('folder', '')}
                                                className="ml-1 hover:text-destructive"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    )}
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

                {/* Bulk Actions */}
                {selectedMedia.length > 0 && (
                    <Card className="bg-primary/5 border-primary">
                        <CardContent className="py-3 flex items-center justify-between">
                            <span className="text-sm font-medium">
                                {selectedMedia.length} item(s) selected
                            </span>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedMedia([])}
                                >
                                    Clear Selection
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={handleBulkDelete}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Selected
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Media Grid */}
                <Card>
                    <CardContent className="pt-6">
                        {media.data && media.data.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {media.data.map((item) => {
                                    const Icon = getFileIcon(item.file_type);
                                    const isSelected = selectedMedia.includes(item.uid);

                                    return (
                                        <div
                                            key={item.uid}
                                            className={cn(
                                                "relative aspect-square rounded-lg border-2 overflow-hidden cursor-pointer transition-all hover:shadow-md group",
                                                isSelected
                                                    ? "border-primary ring-2 ring-primary ring-offset-2"
                                                    : "border-border hover:border-primary/50"
                                            )}
                                            onClick={() => toggleMediaSelection(item.uid)}
                                        >
                                            {/* Media Preview */}
                                            {item.file_type === 'image' ? (
                                                <img
                                                    src={item.thumbnail_url}
                                                    alt={item.alt_text || item.filename}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-muted">
                                                    <Icon className="h-12 w-12 text-muted-foreground" />
                                                </div>
                                            )}

                                            {/* Selection Checkbox */}
                                            <div className="absolute top-2 left-2">
                                                <div
                                                    className={cn(
                                                        "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                                                        isSelected
                                                            ? "bg-primary border-primary"
                                                            : "bg-white border-gray-300 group-hover:border-primary"
                                                    )}
                                                >
                                                    {isSelected && <Check className="h-3 w-3 text-white" />}
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                                <Button
                                                    variant="secondary"
                                                    size="icon"
                                                    className="h-6 w-6"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        window.open(item.url, '_blank');
                                                    }}
                                                >
                                                    <Download className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    className="h-6 w-6"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setShowDeleteConfirm(item.uid);
                                                    }}
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>

                                            {/* Info Overlay */}
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                                                <p className="text-white text-xs truncate">{item.filename}</p>
                                                <p className="text-white/70 text-xs">{item.file_size_human}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                                <p className="text-lg font-medium">No media found</p>
                                <p className="text-sm text-muted-foreground mb-4">
                                    {localFilters.search || localFilters.type || localFilters.folder
                                        ? 'Try adjusting your filters'
                                        : 'Upload files to get started'}
                                </p>
                                {!localFilters.search && !localFilters.type && !localFilters.folder && (
                                    <Button onClick={() => setShowUploadDialog(true)}>
                                        <Upload className="mr-2 h-4 w-4" />
                                        Upload Files
                                    </Button>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {media.data && media.data.length > 0 && (
                    <LaravelPagination data={media} />
                )}
            </div>

            {/* Upload Dialog */}
            <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Upload Files</DialogTitle>
                        <DialogDescription>
                            Select files to upload to your media library
                        </DialogDescription>
                    </DialogHeader>
                    <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                        <input
                            type="file"
                            id="file-upload"
                            multiple
                            onChange={(e) => handleUpload(e.target.files)}
                            className="hidden"
                            disabled={uploading}
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                            <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <p className="text-lg font-medium mb-2">
                                {uploading ? 'Uploading...' : 'Click to upload'}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Maximum file size: 10MB
                            </p>
                        </label>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <Dialog open={!!showDeleteConfirm} onOpenChange={() => setShowDeleteConfirm(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Media</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this media file? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDeleteConfirm(null)}>
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
