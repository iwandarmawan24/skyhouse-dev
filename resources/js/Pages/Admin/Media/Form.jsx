import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { ArrowLeft, Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/Components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/Card';
import { FormInput, FormSelect } from '@/Components/ui/FormField';
import { Label } from '@/Components/ui/Label';
import { MediaPicker } from '@/Components/MediaPicker';

export default function Form({ media }) {
    const isEdit = media !== null;

    console.log('Media prop:', media);
    console.log('Media logo:', media?.logo);
    console.log('Media logo_uid:', media?.logo_uid);

    const { data, setData, post, processing, errors } = useForm({
        name: media?.name || '',
        logo: null,
        logo_uid: media?.logo_uid || null,
        is_active: media?.is_active ?? true,
        _method: isEdit ? 'PUT' : 'POST',
    });

    const [logoPreview, setLogoPreview] = useState(
        media?.logo
            ? media.logo.startsWith('http')
                ? media.logo
                : `/storage/${media.logo}`
            : null
    );
    const [showMediaPicker, setShowMediaPicker] = useState(false);

    console.log('Initial logoPreview:', logoPreview);

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('logo', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleMediaSelect = (selectedMedia) => {
        if (selectedMedia) {
            console.log('Selected media:', selectedMedia);
            console.log('Media URL:', selectedMedia.url);

            // Set the image URL for preview
            setLogoPreview(selectedMedia.url);

            // Store the media UID to send to backend
            setData('logo_uid', selectedMedia.uid);
            setData('logo', null); // Clear file upload
        }
        setShowMediaPicker(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEdit ? `/admin/media/${media.uid}` : '/admin/media';
        post(url);
    };

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                    <Link href="/admin/media" className="text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isEdit ? 'Edit Media Outlet' : 'Add New Media Outlet'}
                    </h1>
                </div>
                <p className="text-gray-600 ml-10">
                    {isEdit ? 'Update media outlet information' : 'Add a new media outlet'}
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                {/* Basic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Media Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormInput
                            label="Media Name"
                            name="name"
                            required
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            error={errors.name}
                            placeholder="e.g., The New York Times, CNN, BBC"
                        />

                        {/* Logo Upload */}
                        <div>
                            <Label required>Logo Image</Label>
                            <div className="mt-2">
                                {logoPreview && (
                                    <div className="mb-4 relative group flex items-center justify-center">
                                        <img
                                            src={logoPreview}
                                            alt="Logo Preview"
                                            className="h-24 w-auto object-contain border border-gray-200 rounded-lg bg-gray-50 p-2"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all rounded-lg flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setLogoPreview(null);
                                                    setData('logo', null);
                                                    setData('logo_uid', null);
                                                }}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-2">
                                    {/* Media Library Button */}
                                    <button
                                        type="button"
                                        onClick={() => setShowMediaPicker(true)}
                                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm"
                                    >
                                        <ImageIcon className="w-4 h-4" />
                                        Media Library
                                    </button>

                                    {/* Upload File Button */}
                                    <div>
                                        <input
                                            type="file"
                                            id="logo"
                                            accept="image/*"
                                            onChange={handleLogoChange}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="logo"
                                            className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg cursor-pointer transition-colors font-medium text-sm"
                                        >
                                            <Upload className="w-4 h-4" />
                                            Upload File
                                        </label>
                                    </div>
                                </div>

                                {errors.logo && (
                                    <p className="text-sm text-red-600 mt-2">{errors.logo}</p>
                                )}
                                <p className="text-xs text-gray-500 mt-1">
                                    Recommended: Square image (PNG, JPG, SVG), max 2MB
                                </p>
                            </div>
                        </div>

                        <FormSelect
                            label="Status"
                            name="is_active"
                            required
                            value={data.is_active ? '1' : '0'}
                            onChange={(e) => setData('is_active', e.target.value === '1')}
                            error={errors.is_active}
                        >
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </FormSelect>
                    </CardContent>
                </Card>

                {/* Submit Buttons */}
                <Card>
                    <CardContent className="flex items-center justify-end gap-4 pt-6">
                        <Link href="/admin/media">
                            <Button type="button" variant="secondary">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : isEdit ? 'Update Media' : 'Create Media'}
                        </Button>
                    </CardContent>
                </Card>
            </form>

            {/* Media Picker Dialog */}
            <MediaPicker
                open={showMediaPicker}
                onClose={() => setShowMediaPicker(false)}
                onSelect={handleMediaSelect}
                multiple={false}
                accept="image"
                folder="media-logos"
            />
        </AdminLayout>
    );
}
