import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import axios from 'axios';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from '@/Components/ui/Dialog';
import { Button } from '@/Components/ui/Button';
import { Input } from '@/Components/ui/Input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Badge } from '@/Components/ui/Badge';
import {
    Image as ImageIcon,
    Upload,
    Search,
    Check,
    X,
    Loader2,
    FileText,
    Video,
    File
} from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * MediaPicker Component
 * WordPress-like media picker for selecting or uploading media files
 *
 * @param {boolean} open - Control dialog visibility
 * @param {function} onClose - Callback when dialog closes
 * @param {function} onSelect - Callback when media is selected (receives media object or array)
 * @param {boolean} multiple - Allow multiple selection
 * @param {string} accept - File type filter (image, video, document, or mime types)
 * @param {string} folder - Default folder for uploads
 */
export function MediaPicker({
    open,
    onClose,
    onSelect,
    multiple = false,
    accept = 'image',
    folder = null
}) {
    const [activeTab, setActiveTab] = useState('library');
    const [media, setMedia] = useState([]);
    const [selectedMedia, setSelectedMedia] = useState(multiple ? [] : null);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    // Load media from server
    const loadMedia = async (searchQuery = '', pageNum = 1) => {
        setLoading(true);
        try {
            const response = await axios.get('/admin/media-library/picker', {
                params: {
                    type: accept,
                    search: searchQuery,
                    folder,
                    page: pageNum,
                },
            });

            if (response.data.success) {
                if (pageNum === 1) {
                    setMedia(response.data.media.data);
                } else {
                    setMedia(prev => [...prev, ...response.data.media.data]);
                }
                setHasMore(response.data.media.current_page < response.data.media.last_page);
                setPage(pageNum);
            }
        } catch (error) {
            console.error('Failed to load media:', error);
        } finally {
            setLoading(false);
        }
    };

    // Load media on mount and search change
    useEffect(() => {
        if (open) {
            loadMedia(search, 1);
        }
    }, [open, search]);

    // Handle file upload
    const handleUpload = async (files) => {
        if (!files || files.length === 0) return;

        setUploading(true);
        const formData = new FormData();

        Array.from(files).forEach(file => {
            formData.append('files[]', file);
        });

        if (folder) {
            formData.append('folder', folder);
        }

        try {
            const response = await axios.post('/admin/media-library/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                // Reload media library
                await loadMedia(search, 1);

                // Switch to library tab
                setActiveTab('library');

                // If single selection, auto-select uploaded file
                if (!multiple && response.data.media.length === 1) {
                    setSelectedMedia(response.data.media[0]);
                }
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    // Handle media selection
    const toggleMediaSelection = (mediaItem) => {
        if (multiple) {
            setSelectedMedia(prev => {
                const isSelected = prev.some(m => m.uid === mediaItem.uid);
                if (isSelected) {
                    return prev.filter(m => m.uid !== mediaItem.uid);
                } else {
                    return [...prev, mediaItem];
                }
            });
        } else {
            setSelectedMedia(prev => prev?.uid === mediaItem.uid ? null : mediaItem);
        }
    };

    const isSelected = (mediaItem) => {
        if (multiple) {
            return selectedMedia.some(m => m.uid === mediaItem.uid);
        }
        return selectedMedia?.uid === mediaItem.uid;
    };

    // Handle insert/select
    const handleInsert = () => {
        onSelect(selectedMedia);
        onClose();
        // Reset selection
        setSelectedMedia(multiple ? [] : null);
    };

    // Get file icon based on type
    const getFileIcon = (type) => {
        switch (type) {
            case 'image':
                return ImageIcon;
            case 'video':
                return Video;
            case 'document':
                return FileText;
            default:
                return File;
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-5xl h-[80vh] flex flex-col p-0">
                <DialogHeader className="px-6 py-4 border-b">
                    <DialogTitle>Select Media</DialogTitle>
                </DialogHeader>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                    <TabsList className="px-6 border-b rounded-none bg-transparent">
                        <TabsTrigger value="library">Media Library</TabsTrigger>
                        <TabsTrigger value="upload">Upload Files</TabsTrigger>
                    </TabsList>

                    {/* Media Library Tab */}
                    <TabsContent value="library" className="flex-1 flex flex-col px-6 py-4 overflow-hidden">
                        {/* Search */}
                        <div className="mb-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search media..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Media Grid */}
                        <div className="flex-1 overflow-y-auto">
                            {loading && page === 1 ? (
                                <div className="flex items-center justify-center h-full">
                                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                </div>
                            ) : media.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                                    <p className="text-lg font-medium">No media found</p>
                                    <p className="text-sm text-muted-foreground">Upload files to get started</p>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-4 gap-4">
                                        {media.map((item) => {
                                            const Icon = getFileIcon(item.file_type);
                                            return (
                                                <div
                                                    key={item.uid}
                                                    onClick={() => toggleMediaSelection(item)}
                                                    className={cn(
                                                        "relative aspect-square rounded-lg border-2 overflow-hidden cursor-pointer transition-all hover:shadow-md",
                                                        isSelected(item)
                                                            ? "border-primary ring-2 ring-primary ring-offset-2"
                                                            : "border-border hover:border-primary/50"
                                                    )}
                                                >
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

                                                    {/* Selection indicator */}
                                                    {isSelected(item) && (
                                                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                                            <div className="bg-primary text-primary-foreground rounded-full p-2">
                                                                <Check className="h-6 w-6" />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* File info overlay */}
                                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                                                        <p className="text-white text-xs truncate">{item.filename}</p>
                                                        <p className="text-white/70 text-xs">{item.file_size_human}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Load More */}
                                    {hasMore && (
                                        <div className="mt-4 text-center">
                                            <Button
                                                variant="outline"
                                                onClick={() => loadMedia(search, page + 1)}
                                                disabled={loading}
                                            >
                                                {loading ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Loading...
                                                    </>
                                                ) : (
                                                    'Load More'
                                                )}
                                            </Button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </TabsContent>

                    {/* Upload Tab */}
                    <TabsContent value="upload" className="flex-1 px-6 py-4">
                        <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                            <input
                                type="file"
                                id="media-upload"
                                multiple
                                accept={accept === 'image' ? 'image/*' : accept === 'video' ? 'video/*' : '*'}
                                onChange={(e) => handleUpload(e.target.files)}
                                className="hidden"
                                disabled={uploading}
                            />
                            <label htmlFor="media-upload" className="cursor-pointer">
                                {uploading ? (
                                    <Loader2 className="h-16 w-16 mx-auto text-muted-foreground animate-spin mb-4" />
                                ) : (
                                    <Upload className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                                )}
                                <p className="text-lg font-medium mb-2">
                                    {uploading ? 'Uploading...' : 'Drop files to upload'}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    or click to select files
                                </p>
                                <p className="text-xs text-muted-foreground mt-4">
                                    Maximum file size: 10MB
                                </p>
                            </label>
                        </div>
                    </TabsContent>
                </Tabs>

                <DialogFooter className="px-6 py-4 border-t">
                    <div className="flex items-center justify-between w-full">
                        <div className="text-sm text-muted-foreground">
                            {multiple && selectedMedia.length > 0 && (
                                <span>{selectedMedia.length} item(s) selected</span>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleInsert}
                                disabled={multiple ? selectedMedia.length === 0 : !selectedMedia}
                            >
                                Insert Selected
                            </Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
