import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { MediaPicker } from '@/Components/MediaPicker';
import { Plus, X } from 'lucide-react';

export default function Form({ facility }) {
    const isEdit = facility !== null;

    const { data, setData, post, processing, errors} = useForm({
        name: facility?.name || '',
        description: facility?.description || '',
        icon: facility?.icon || '',
        is_active: facility?.is_active ?? true,
        images: [],
        image_uids: facility?.image_uids || [],
        deleted_images: [],
        _method: isEdit ? 'PUT' : 'POST',
    });

    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [mediaPreviews, setMediaPreviews] = useState(facility?.media_images || []);

    const removeMediaImage = (uid) => {
        const filtered = mediaPreviews.filter((img) => img.uid !== uid);
        setMediaPreviews(filtered);
        setData('image_uids', filtered.map(img => img.uid));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEdit ? `/admin/facilities/${facility.uid}` : '/admin/facilities';
        post(url);
    };

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                    <Link href="/admin/facilities" className="text-gray-600 hover:text-gray-900">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isEdit ? 'Edit Facility' : 'Create New Facility'}
                    </h1>
                </div>
                <p className="text-gray-600 ml-10">
                    {isEdit ? 'Update the facility details below' : 'Fill in the form to add a new facility'}
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Facility Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    errors.name ? 'border-red-500' : 'border-gray-300'
                                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                placeholder="e.g., Swimming Pool, Gym, Garden"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={5}
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    errors.description ? 'border-red-500' : 'border-gray-300'
                                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                placeholder="Describe the facility and its features"
                            />
                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                        </div>

                        <div>
                            <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-2">
                                Icon (Optional)
                            </label>
                            <input
                                id="icon"
                                type="text"
                                value={data.icon}
                                onChange={(e) => setData('icon', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., pool, gym, garden"
                            />
                            <p className="mt-1 text-sm text-gray-500">
                                Icon identifier for frontend display
                            </p>
                        </div>
                    </div>
                </div>

                {/* Image Gallery */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Image Gallery</h2>

                    {/* Media Library Images */}
                    {mediaPreviews.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-700 mb-3">Gallery Images</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {mediaPreviews.map((media) => (
                                    <div key={media.uid} className="relative group">
                                        <img
                                            src={media.url}
                                            alt={media.title}
                                            className="w-full h-32 object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeMediaImage(media.uid)}
                                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Add Images Button */}
                    <button
                        type="button"
                        onClick={() => setShowMediaPicker(true)}
                        className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-500 transition-colors group"
                    >
                        <Plus className="h-8 w-8 text-gray-400 group-hover:text-blue-500 transition-colors" />
                        <p className="mt-2 text-sm text-gray-600 group-hover:text-blue-600">Add Images from Media Library</p>
                    </button>

                    {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images}</p>}
                    {errors.image_uids && <p className="mt-1 text-sm text-red-600">{errors.image_uids}</p>}
                </div>

                {/* Status */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Status</h2>
                    <div className="flex items-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                            <span className="ms-3 text-sm font-medium text-gray-700">
                                {data.is_active ? 'Active' : 'Inactive'}
                            </span>
                        </label>
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-end gap-4">
                        <Link
                            href="/admin/facilities"
                            className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Saving...' : isEdit ? 'Update Facility' : 'Create Facility'}
                        </button>
                    </div>
                </div>
            </form>

            {/* MediaPicker Modal */}
            <MediaPicker
                open={showMediaPicker}
                onClose={() => setShowMediaPicker(false)}
                onSelect={(media) => {
                    const mediaArray = Array.isArray(media) ? media : [media];
                    const newGallery = [...mediaPreviews, ...mediaArray];
                    setMediaPreviews(newGallery);
                    setData('image_uids', newGallery.map(img => img.uid));
                    setShowMediaPicker(false);
                }}
                multiple={true}
                accept="image"
                folder="facilities"
            />
        </AdminLayout>
    );
}
