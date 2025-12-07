import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { ChevronLeft, Upload, X, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Switch } from '@/Components/ui/switch';

export default function Form({ banner }) {
    const isEdit = banner !== null;
    const { data, setData, post, processing, errors } = useForm({
        title: banner?.title || '',
        description: banner?.description || '',
        image: null,
        button_text: banner?.button_text || '',
        button_link: banner?.button_link || '',
        is_active: banner?.is_active ?? true,
        _method: isEdit ? 'PUT' : 'POST',
    });

    const [imagePreview, setImagePreview] = useState(
        banner?.image ? (banner.image.startsWith('http') ? banner.image : `/storage/${banner.image}`) : null
    );
    const [showImageModal, setShowImageModal] = useState(false);
    const [imageScale, setImageScale] = useState(1);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData('image', null);
        setImagePreview(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEdit ? `/admin/hero-banners/${banner.uid}` : '/admin/hero-banners';
        post(url);
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Page Header */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/admin/hero-banners">
                            <ChevronLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {isEdit ? 'Edit Hero Banner' : 'Create Hero Banner'}
                        </h1>
                        <p className="text-muted-foreground">
                            {isEdit ? 'Update banner details' : 'Add a new banner to the homepage carousel'}
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Banner Details</CardTitle>
                            <CardDescription>
                                Fill in the information below to {isEdit ? 'update' : 'create'} a hero banner
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title">
                                    Title <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Enter banner title"
                                    className={errors.title ? 'border-destructive' : ''}
                                />
                                {errors.title && (
                                    <p className="text-sm text-destructive">{errors.title}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Enter banner description"
                                    rows={4}
                                    className={errors.description ? 'border-destructive' : ''}
                                />
                                {errors.description && (
                                    <p className="text-sm text-destructive">{errors.description}</p>
                                )}
                            </div>

                            {/* Image Upload */}
                            <div className="space-y-2">
                                <Label htmlFor="image">
                                    Banner Image {!isEdit && <span className="text-destructive">*</span>}
                                </Label>

                                {imagePreview ? (
                                    <div className="space-y-4">
                                        <div className="relative group rounded-lg overflow-hidden border">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-64 object-cover cursor-pointer transition-transform group-hover:scale-105"
                                                onClick={() => {
                                                    setShowImageModal(true);
                                                    setImageScale(1);
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                                                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute top-2 right-2"
                                                onClick={removeImage}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <input
                                            id="image"
                                            type="file"
                                            className="sr-only"
                                            accept="image/jpeg,image/png,image/jpg,image/webp"
                                            onChange={handleImageChange}
                                        />
                                        <Label
                                            htmlFor="image"
                                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors"
                                        >
                                            <Upload className="w-10 h-10 text-muted-foreground mb-4" />
                                            <span className="text-sm font-medium text-foreground mb-1">
                                                Click to upload
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                PNG, JPG, JPEG or WEBP (MAX. 2MB)
                                            </span>
                                        </Label>
                                    </div>
                                )}

                                {errors.image && (
                                    <p className="text-sm text-destructive">{errors.image}</p>
                                )}
                                {isEdit && !imagePreview && (
                                    <p className="text-sm text-muted-foreground">
                                        Leave empty to keep the current image
                                    </p>
                                )}
                            </div>

                            {/* Button Text & Link */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="button_text">Button Text</Label>
                                    <Input
                                        id="button_text"
                                        value={data.button_text}
                                        onChange={(e) => setData('button_text', e.target.value)}
                                        placeholder="e.g., Learn More"
                                        className={errors.button_text ? 'border-destructive' : ''}
                                    />
                                    {errors.button_text && (
                                        <p className="text-sm text-destructive">{errors.button_text}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="button_link">Button Link</Label>
                                    <Input
                                        id="button_link"
                                        value={data.button_link}
                                        onChange={(e) => setData('button_link', e.target.value)}
                                        placeholder="e.g., /products"
                                        className={errors.button_link ? 'border-destructive' : ''}
                                    />
                                    {errors.button_link && (
                                        <p className="text-sm text-destructive">{errors.button_link}</p>
                                    )}
                                </div>
                            </div>

                            {/* Status Toggle */}
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <Label htmlFor="is_active" className="text-base">Active Status</Label>
                                    <p className="text-sm text-muted-foreground">
                                        {data.is_active ? 'Banner is visible on the website' : 'Banner is hidden from the website'}
                                    </p>
                                </div>
                                <Switch
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(checked) => setData('is_active', checked)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Form Actions */}
                    <div className="flex items-center justify-end gap-4 mt-6">
                        <Button variant="outline" asChild>
                            <Link href="/admin/hero-banners">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : (isEdit ? 'Update Banner' : 'Create Banner')}
                        </Button>
                    </div>
                </form>
            </div>

            {/* Image Preview Modal */}
            {showImageModal && imagePreview && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={() => setShowImageModal(false)}
                >
                    <div className="relative max-w-7xl max-h-screen">
                        {/* Close Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowImageModal(false)}
                            className="absolute top-4 right-4 z-10 text-white hover:text-white hover:bg-white/20 rounded-full"
                        >
                            <X className="h-6 w-6" />
                        </Button>

                        {/* Zoom Controls */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-2 bg-black/50 rounded-full px-4 py-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setImageScale(Math.max(0.5, imageScale - 0.25));
                                }}
                                className="text-white hover:text-white hover:bg-white/20 h-8 w-8"
                            >
                                <ZoomOut className="h-4 w-4" />
                            </Button>
                            <span className="text-white font-medium min-w-[4rem] text-center text-sm">
                                {Math.round(imageScale * 100)}%
                            </span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setImageScale(Math.min(3, imageScale + 0.25));
                                }}
                                className="text-white hover:text-white hover:bg-white/20 h-8 w-8"
                            >
                                <ZoomIn className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setImageScale(1);
                                }}
                                className="text-white hover:text-white hover:bg-white/20 h-8 px-3 text-sm"
                            >
                                Reset
                            </Button>
                        </div>

                        {/* Image */}
                        <div className="overflow-auto max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{
                                    transform: `scale(${imageScale})`,
                                    transition: 'transform 0.2s ease-in-out',
                                }}
                                className="max-w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
