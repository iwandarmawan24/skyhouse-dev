import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { MediaPicker } from '@/Components/MediaPicker';
import { Button } from '@/Components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/Card';
import { FormInput } from '@/Components/ui/FormField';
import { ArrowLeft, User } from 'lucide-react';

export default function Form({ topSales, availablePositions }) {
    const isEdit = topSales !== null;
    const { data, setData, post, processing, errors } = useForm({
        name: topSales?.name || '',
        job_title: topSales?.job_title || '',
        position: topSales?.position || (availablePositions?.length > 0 ? availablePositions[availablePositions.length - 1] : 1),
        image_uid: topSales?.image_uid || null,
        is_active: topSales?.is_active ?? true,
        _method: isEdit ? 'PUT' : 'POST',
    });

    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [imagePreview, setImagePreview] = useState(
        topSales?.image_url || null
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
        const url = isEdit ? `/admin/top-sales/${topSales.uid}` : '/admin/top-sales';
        post(url);
    };

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                    <Link href="/admin/top-sales" className="text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isEdit ? 'Edit Top Sales' : 'Add New Top Sales'}
                    </h1>
                </div>
                <p className="text-gray-600 ml-10">
                    {isEdit ? 'Update the sales person details below' : 'Fill in the form to add a new sales person'}
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Sales Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Sales Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Name */}
                        <FormInput
                            label="Name"
                            name="name"
                            required
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            error={errors.name}
                            placeholder="Enter sales person name"
                        />

                        {/* Job Title */}
                        <FormInput
                            label="Job Title"
                            name="job_title"
                            value={data.job_title}
                            onChange={(e) => setData('job_title', e.target.value)}
                            error={errors.job_title}
                            placeholder="Enter job title (e.g., Sales Executive)"
                            maxLength={32}
                        />

                        {/* Position */}
                        <div>
                            <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                                Position <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="position"
                                name="position"
                                value={data.position}
                                onChange={(e) => setData('position', parseInt(e.target.value))}
                                className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                {availablePositions?.map((pos) => (
                                    <option key={pos} value={pos}>
                                        Position #{pos}
                                    </option>
                                ))}
                            </select>
                            {errors.position && (
                                <p className="mt-1 text-sm text-red-600">{errors.position}</p>
                            )}
                            <p className="mt-1 text-sm text-gray-500">
                                If you select a position that's already taken, existing entries will shift down automatically.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Profile Image */}
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Image <span className="text-red-500">*</span></CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div>
                            {imagePreview && (
                                <div className="mb-4 relative group flex justify-center">
                                    <img
                                        src={imagePreview}
                                        alt="Profile"
                                        className="w-32 h-32 object-cover rounded-full"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
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

                            {!imagePreview && (
                                <div className="mb-4 flex justify-center">
                                    <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                                        <User className="w-16 h-16 text-gray-400" />
                                    </div>
                                </div>
                            )}

                            {/* Media Library Button */}
                            <button
                                type="button"
                                onClick={() => setShowMediaPicker(true)}
                                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm w-full"
                            >
                                <User className="w-4 h-4" />
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
                        <Link href="/admin/top-sales">
                            <Button type="button" variant="secondary">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : isEdit ? 'Update' : 'Add Sales'}
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
                folder="top-sales"
            />
        </AdminLayout>
    );
}
