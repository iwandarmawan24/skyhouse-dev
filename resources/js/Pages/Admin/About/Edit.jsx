import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit({ about }) {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        title: about?.title || '',
        content: about?.content || '',
        mission: about?.mission || '',
        vision: about?.vision || '',
        team_description: about?.team_description || '',
        image: null,
        _method: 'PUT',
    });

    const [imagePreview, setImagePreview] = useState(
        about?.image ? (about.image.startsWith('http') ? about.image : `/storage/${about.image}`) : null
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
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Featured Image</h2>
                    <div className="space-y-4">
                        {imagePreview && (
                            <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100">
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
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
                        {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                        {about?.image && (
                            <p className="text-sm text-gray-500">Leave empty to keep the current image</p>
                        )}
                    </div>
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
        </AdminLayout>
    );
}
