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
import { Plus, Image as ImageIcon, Search, Filter, X, Pencil, Trash2, ArrowUp, ArrowDown, Eye } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Index({ sliders, filters }) {
    const { flash } = usePage().props;
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [localFilters, setLocalFilters] = useState({
        status: filters?.status || '',
        search: filters?.search || '',
    });

    const handleDelete = (uid) => {
        router.delete(`/admin/facility-sliders/${uid}`, {
            onSuccess: () => setShowDeleteConfirm(null),
        });
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);

        router.get('/admin/facility-sliders', newFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setLocalFilters({ status: '', search: '' });
        router.get('/admin/facility-sliders', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleMoveUp = (slider, index) => {
        if (index === 0) return;

        const prevSlider = sliders[index - 1];
        router.post(
            '/admin/facility-sliders/update-order',
            {
                updates: [
                    { uid: slider.uid, order: prevSlider.order },
                    { uid: prevSlider.uid, order: slider.order },
                ],
            },
            {
                preserveScroll: true,
            }
        );
    };

    const handleMoveDown = (slider, index) => {
        if (index === sliders.length - 1) return;

        const nextSlider = sliders[index + 1];
        router.post(
            '/admin/facility-sliders/update-order',
            {
                updates: [
                    { uid: slider.uid, order: nextSlider.order },
                    { uid: nextSlider.uid, order: slider.order },
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
                        <h1 className="text-3xl font-bold tracking-tight">Facility Sliders</h1>
                        <p className="text-muted-foreground mt-1">
                            Manage sliders for facility sub menu
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" onClick={() => setShowPreview(true)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview Slider
                        </Button>
                        <Button asChild>
                            <Link href="/admin/facility-sliders/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Slider
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

                {/* Sliders Table */}
                <Card>
                    <CardContent className="pt-6">
                        {sliders && sliders.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-16">Order</TableHead>
                                        <TableHead>Slider</TableHead>
                                        <TableHead className="w-24">Status</TableHead>
                                        <TableHead className="w-32 text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sliders.map((slider, index) => (
                                        <TableRow key={slider.uid}>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7"
                                                        onClick={() => handleMoveUp(slider, index)}
                                                        disabled={index === 0}
                                                    >
                                                        <ArrowUp className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7"
                                                        onClick={() => handleMoveDown(slider, index)}
                                                        disabled={index === sliders.length - 1}
                                                    >
                                                        <ArrowDown className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-shrink-0 h-16 w-24">
                                                        {slider.image_url ? (
                                                            <img
                                                                src={slider.image_url}
                                                                alt={slider.title}
                                                                className="h-16 w-24 object-cover rounded-lg"
                                                            />
                                                        ) : (
                                                            <div className="h-16 w-24 bg-muted rounded-lg flex items-center justify-center">
                                                                <ImageIcon className="w-8 h-8 text-muted-foreground" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="max-w-md">
                                                        <div className="font-medium line-clamp-1">{slider.title}</div>
                                                        {slider.description && (
                                                            <div className="text-sm text-muted-foreground line-clamp-2">
                                                                {slider.description}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={slider.is_active ? "success" : "secondary"}>
                                                    {slider.is_active ? "Active" : "Inactive"}
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
                                                        <Link href={`/admin/facility-sliders/${slider.uid}/edit`}>
                                                            <Pencil className="h-4 w-4" />
                                                            <span className="sr-only">Edit</span>
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                        onClick={() => setShowDeleteConfirm(slider.uid)}
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
                                <h3 className="mt-2 text-sm font-medium">No sliders</h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Get started by creating a new slider.
                                </p>
                                <div className="mt-6">
                                    <Button asChild>
                                        <Link href="/admin/facility-sliders/create">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Slider
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
                        <DialogTitle>Delete Slider</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this slider? This action
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

            {/* Preview Dialog */}
            <Dialog open={showPreview} onOpenChange={setShowPreview}>
                <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
                    <DialogHeader>
                        <DialogTitle>Slider Preview</DialogTitle>
                        <DialogDescription>
                            Preview bagaimana slider akan ditampilkan di website. Hanya slider yang aktif yang akan tampil.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        {sliders && sliders.filter(s => s.is_active).length > 0 ? (
                            <div className="space-y-4">
                                {/* Swiper carousel preview */}
                                <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                                    <Swiper
                                        modules={[Navigation, Pagination, Autoplay]}
                                        spaceBetween={0}
                                        slidesPerView={1}
                                        navigation
                                        pagination={{ clickable: true }}
                                        autoplay={{
                                            delay: 3000,
                                            disableOnInteraction: false,
                                        }}
                                        loop={true}
                                        className="facility-slider-preview"
                                    >
                                        {sliders
                                            .filter(slider => slider.is_active)
                                            .map((slider) => (
                                                <SwiperSlide key={slider.uid}>
                                                    <div className="bg-white overflow-hidden">
                                                        <div className="flex flex-col md:flex-row">
                                                            {/* Image */}
                                                            <div className="md:w-1/2">
                                                                {slider.image_url ? (
                                                                    <img
                                                                        src={slider.image_url}
                                                                        alt={slider.title}
                                                                        className="w-full h-64 md:h-96 object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="w-full h-64 md:h-96 bg-gray-200 flex items-center justify-center">
                                                                        <ImageIcon className="w-16 h-16 text-gray-400" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {/* Content */}
                                                            <div className="md:w-1/2 p-8 flex flex-col justify-center">
                                                                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                                                    {slider.title}
                                                                </h3>
                                                                {slider.description && (
                                                                    <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                                                                        {slider.description}
                                                                    </p>
                                                                )}
                                                                <Badge variant="success" className="w-fit">
                                                                    Active
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                    </Swiper>
                                </div>
                                <div className="text-sm text-gray-500 text-center">
                                    Menampilkan {sliders.filter(s => s.is_active).length} slider aktif
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-gray-50 rounded-lg">
                                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No Active Sliders</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Tidak ada slider aktif untuk ditampilkan. Buat slider baru atau aktifkan slider yang ada.
                                </p>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setShowPreview(false)}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
