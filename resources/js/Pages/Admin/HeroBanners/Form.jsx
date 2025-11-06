import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Form({ banner }) {
    const isEdit = banner !== null;
    const { data, setData, post, processing, errors } = useForm({
        title: banner?.title || '',
        description: banner?.description || '',
        image: null,
        button_text: banner?.button_text || '',
        button_link: banner?.button_link || '',
        order: banner?.order || 0,
        is_active: banner?.is_active ?? true,
        _method: isEdit ? 'PUT' : 'POST',
    });

    const [imagePreview, setImagePreview] = useState(
        banner?.image ? (banner.image.startsWith('http') ? banner.image : `/storage/${banner.image}`) : null
    );

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEdit ? `/admin/hero-banners/${banner.uid}` : '/admin/hero-banners';
        post(url);
    };

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                    <Link
                        href="/admin/hero-banners"
                        className="text-gray-600 hover:text-gray-900"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isEdit ? 'Edit Hero Banner' : 'Create New Hero Banner'}
                    </h1>
                </div>
                <p className="text-gray-600 ml-10">
                    {isEdit ? 'Update the hero banner details below' : 'Fill in the form to add a new hero banner'}
                </p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className={`w-full px-4 py-2 rounded-lg border ${
                                errors.title ? 'border-red-500' : 'border-gray-300'
                            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            placeholder="Enter banner title"
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={4}
                            className={`w-full px-4 py-2 rounded-lg border ${
                                errors.description ? 'border-red-500' : 'border-gray-300'
                            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            placeholder="Enter banner description"
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                        )}
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                            Banner Image {!isEdit && <span className="text-red-500">*</span>}
                        </label>
                        <div className="space-y-4">
                            {imagePreview && (
                                <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <div className="flex items-center justify-center w-full">
                                <label
                                    htmlFor="image"
                                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg
                                            className="w-8 h-8 mb-4 text-gray-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                            />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500">PNG, JPG, JPEG or WEBP (MAX. 2MB)</p>
                                    </div>
                                    <input
                                        id="image"
                                        type="file"
                                        className="hidden"
                                        accept="image/jpeg,image/png,image/jpg,image/webp"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>
                        </div>
                        {errors.image && (
                            <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                        )}
                        {isEdit && (
                            <p className="mt-1 text-sm text-gray-500">
                                Leave empty to keep the current image
                            </p>
                        )}
                    </div>

                    {/* Button Text & Link */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="button_text" className="block text-sm font-medium text-gray-700 mb-2">
                                Button Text
                            </label>
                            <input
                                id="button_text"
                                type="text"
                                value={data.button_text}
                                onChange={(e) => setData('button_text', e.target.value)}
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    errors.button_text ? 'border-red-500' : 'border-gray-300'
                                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                placeholder="e.g., Learn More"
                            />
                            {errors.button_text && (
                                <p className="mt-1 text-sm text-red-600">{errors.button_text}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="button_link" className="block text-sm font-medium text-gray-700 mb-2">
                                Button Link
                            </label>
                            <input
                                id="button_link"
                                type="text"
                                value={data.button_link}
                                onChange={(e) => setData('button_link', e.target.value)}
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    errors.button_link ? 'border-red-500' : 'border-gray-300'
                                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                placeholder="e.g., /products"
                            />
                            {errors.button_link && (
                                <p className="mt-1 text-sm text-red-600">{errors.button_link}</p>
                            )}
                        </div>
                    </div>

                    {/* Order & Status */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-2">
                                Display Order <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="order"
                                type="number"
                                min="0"
                                value={data.order}
                                onChange={(e) => setData('order', parseInt(e.target.value))}
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    errors.order ? 'border-red-500' : 'border-gray-300'
                                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            />
                            {errors.order && (
                                <p className="mt-1 text-sm text-red-600">{errors.order}</p>
                            )}
                            <p className="mt-1 text-sm text-gray-500">
                                Lower numbers appear first
                            </p>
                        </div>

                        <div>
                            <label htmlFor="is_active" className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <div className="flex items-center h-10">
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
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex items-center justify-end gap-4 pt-6 border-t">
                        <Link
                            href="/admin/hero-banners"
                            className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Saving...' : (isEdit ? 'Update Banner' : 'Create Banner')}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
