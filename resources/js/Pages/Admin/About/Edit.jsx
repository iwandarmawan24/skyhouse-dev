import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { MediaPicker } from '@/Components/MediaPicker';
import { X, Image as ImageIcon } from 'lucide-react';

export default function Edit({ about }) {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        title: about?.title || '',
        content: about?.content || '',
        mission: about?.mission || '',
        vision: about?.vision || '',
        team_description: about?.team_description || '',
        image_uid: about?.image_uid || null,
        _method: 'PUT',
    });

    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [imagePreview, setImagePreview] = useState(about?.featured_image || null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/about');
    };

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">About Us Page</h1>
                <p className="text-gray-600 mt-1">Manage your company's about us page content</p>
            </div>

            {/* Success Message */}
            {flash.success && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    {flash.success}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Page Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    errors.title ? 'border-red-500' : 'border-gray-300'
                                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                placeholder="About SkyHouse Property"
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                        </div>

                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                                Main Content <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="content"
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                rows={8}
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    errors.content ? 'border-red-500' : 'border-gray-300'
                                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                placeholder="Tell your company story..."
                            />
                            {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
                        </div>
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Mission & Vision</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="mission" className="block text-sm font-medium text-gray-700 mb-2">
                                Mission
                            </label>
                            <textarea
                                id="mission"
                                value={data.mission}
                                onChange={(e) => setData('mission', e.target.value)}
                                rows={5}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Our mission statement..."
                            />
                        </div>

                        <div>
                            <label htmlFor="vision" className="block text-sm font-medium text-gray-700 mb-2">
                                Vision
                            </label>
                            <textarea
                                id="vision"
                                value={data.vision}
                                onChange={(e) => setData('vision', e.target.value)}
                                rows={5}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Our vision statement..."
                            />
                        </div>
                    </div>
                </div>

                {/* Team Description */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Description</h2>
                    <div>
                        <textarea
                            id="team_description"
                            value={data.team_description}
                            onChange={(e) => setData('team_description', e.target.value)}
                            rows={5}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Describe your team..."
                        />
                    </div>
                </div>

                {/* Featured Image */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Featured Image</h2>
                        <span className="text-xs text-gray-500">Recommended: 1200 × 800px</span>
                    </div>
                    {imagePreview ? (
                        <div className="relative inline-block">
                            <img
                                src={imagePreview.url || imagePreview.thumbnail_url}
                                alt={imagePreview.alt_text || 'Featured Image'}
                                className="w-64 h-48 object-cover rounded-lg border-2 border-gray-300"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setImagePreview(null);
                                    setData('image_uid', null);
                                }}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setShowMediaPicker(true)}
                            className="border-2 border-dashed border-gray-300 rounded-lg p-8 w-64 h-48 flex flex-col items-center justify-center hover:border-blue-500 transition-colors group"
                        >
                            <ImageIcon className="h-12 w-12 text-gray-400 group-hover:text-blue-500 transition-colors" />
                            <p className="mt-2 text-sm text-gray-600 group-hover:text-blue-600">Select from Media Library</p>
                        </button>
                    )}
                    {errors.image_uid && <p className="mt-2 text-sm text-red-600">{errors.image_uid}</p>}
                </div>

                {/* Submit Button */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </form>

            <MediaPicker
                open={showMediaPicker}
                onClose={() => setShowMediaPicker(false)}
                onSelect={(media) => {
                    setImagePreview(media);
                    setData('image_uid', media.uid);
                    setShowMediaPicker(false);
                }}
                accept="image"
                folder="about"
                recommendedSize="1200 × 800px"
            />
        </AdminLayout>
    );
}
