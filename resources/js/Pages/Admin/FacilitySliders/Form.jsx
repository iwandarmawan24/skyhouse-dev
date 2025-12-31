import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { MediaPicker } from '@/Components/MediaPicker';
import { Button } from '@/Components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/Card';
import { FormInput, FormTextarea } from '@/Components/ui/FormField';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';

export default function Form({ slider }) {
    const isEdit = slider !== null;
    const { data, setData, post, processing, errors } = useForm({
        image_uid: slider?.image_uid || null,
        title: slider?.title || '',
        description: slider?.description || '',
        order: slider?.order || 0,
        is_active: slider?.is_active ?? true,
        _method: isEdit ? 'PUT' : 'POST',
    });

    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [imagePreview, setImagePreview] = useState(
        slider?.image_url || null
    );

    const handleMediaSelect = (selectedMedia) => {
        if (selectedMedia) {
            setImagePreview(selectedMedia.url);
            setData('image_uid', selectedMedia.uid);
        }
        setShowMediaPicker(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEdit ? `/admin/facility-sliders/${slider.uid}` : '/admin/facility-sliders';
        post(url);
    };

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                    <Link href="/admin/facility-sliders" className="text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isEdit ? 'Edit Slider' : 'Create New Slider'}
                    </h1>
                </div>
                <p className="text-gray-600 ml-10">
                    {isEdit ? 'Update the slider details below' : 'Fill in the form to add a new slider'}
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Slider Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Slider Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Title */}
                        <FormInput
                            label="Title"
                            name="title"
                            required
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            error={errors.title}
                            placeholder="Enter slider title"
                        />

                        {/* Description */}
                        <FormTextarea
                            label="Description"
                            name="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            error={errors.description}
                            placeholder="Enter slider description (optional)"
                            rows={4}
                        />

                        {/* Order Info */}
                        {isEdit && (
                            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                                <div className="flex items-start gap-3">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-blue-900">
                                            Urutan Slider: {data.order + 1}
                                        </p>
                                        <p className="text-sm text-blue-700 mt-1">
                                            Gunakan tombol Up/Down di halaman list untuk mengubah urutan slider
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {!isEdit && (
                            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                                <p className="text-sm text-green-700">
                                    Slider baru akan ditambahkan di urutan terakhir secara otomatis
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Slider Image */}
                <Card>
                    <CardHeader>
                        <CardTitle>Slider Image {!isEdit && <span className="text-red-500">*</span>}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div>
                            {imagePreview && (
                                <div className="mb-4 relative group">
                                    <img
                                        src={imagePreview}
                                        alt="Slider"
                                        className="w-full h-[200px] object-contain rounded-lg"
                                    />
                                    <div className="absolute inset-0 group-hover:bg-opacity-40 transition-all rounded-lg flex items-center justify-center">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImagePreview(null);
                                                setData('image_uid', null);
                                            }}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Media Library Button */}
                            <button
                                type="button"
                                onClick={() => setShowMediaPicker(true)}
                                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm w-full"
                            >
                                <ImageIcon className="w-4 h-4" />
                                Select from Media Library
                            </button>

                            {errors.image_uid && <p className="text-sm text-red-600 mt-2">{errors.image_uid}</p>}
                        </div>
                    </CardContent>
                </Card>

                {/* Status */}
                <Card>
                    <CardHeader>
                        <CardTitle>Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    id="is_active"
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-700">
                                    {data.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </label>
                        </div>
                    </CardContent>
                </Card>

                {/* Submit Buttons */}
                <Card>
                    <CardContent className="flex items-center justify-end gap-4 pt-6">
                        <Link href="/admin/facility-sliders">
                            <Button type="button" variant="secondary">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : isEdit ? 'Update Slider' : 'Create Slider'}
                        </Button>
                    </CardContent>
                </Card>
            </form>

            {/* MediaPicker Modal */}
            <MediaPicker
                open={showMediaPicker}
                onClose={() => setShowMediaPicker(false)}
                onSelect={handleMediaSelect}
                multiple={false}
                accept="image"
                folder="facilities"
            />
        </AdminLayout>
    );
}
