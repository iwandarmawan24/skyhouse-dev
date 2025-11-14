import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { ArrowLeft, Upload } from 'lucide-react';
import { Button } from '@/Components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/Card';
import { FormInput, FormSelect } from '@/Components/ui/FormField';
import { Label } from '@/Components/ui/Label';

export default function Form({ highlight, mediaList }) {
    const isEdit = highlight !== null;
    const { data, setData, post, processing, errors } = useForm({
        media_uid: highlight?.media_uid || (mediaList.length > 0 ? mediaList[0].uid : ''),
        title: highlight?.title || '',
        publish_date: highlight?.publish_date || '',
        image: null,
        article_url: highlight?.article_url || '',
        _method: isEdit ? 'PUT' : 'POST',
    });

    const [imagePreview, setImagePreview] = useState(
        highlight?.image
            ? highlight.image.startsWith('http')
                ? highlight.image
                : `/storage/${highlight.image}`
            : null
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
        const url = isEdit ? `/admin/media-highlights/${highlight.uid}` : '/admin/media-highlights';
        post(url);
    };

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                    <Link href="/admin/media-highlights" className="text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isEdit ? 'Edit Media Highlight' : 'Add New Media Highlight'}
                    </h1>
                </div>
                <p className="text-gray-600 ml-10">
                    {isEdit ? 'Update media highlight information' : 'Add external news article or media coverage'}
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                {/* Basic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Article Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormInput
                            label="Article Title"
                            name="title"
                            required
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            error={errors.title}
                            placeholder="Enter the article title"
                        />

                        <FormSelect
                            label="Media Outlet"
                            name="media_uid"
                            required
                            value={data.media_uid}
                            onChange={(e) => setData('media_uid', e.target.value)}
                            error={errors.media_uid}
                        >
                            {mediaList.length > 0 ? (
                                mediaList.map(media => (
                                    <option key={media.uid} value={media.uid}>{media.name}</option>
                                ))
                            ) : (
                                <option value="">No media outlets available</option>
                            )}
                        </FormSelect>

                        {mediaList.length === 0 && (
                            <p className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg p-3">
                                Please create a media outlet first before adding highlights.{' '}
                                <Link href="/admin/media/create" className="underline font-medium">
                                    Create Media Outlet
                                </Link>
                            </p>
                        )}

                        <div>
                            <Label required>Publish Date</Label>
                            <div className="mt-2">
                                <input
                                    type="date"
                                    value={data.publish_date}
                                    onChange={(e) => setData('publish_date', e.target.value)}
                                    className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                                    required
                                />
                            </div>
                            {errors.publish_date && (
                                <p className="text-sm text-red-600 mt-2">{errors.publish_date}</p>
                            )}
                        </div>

                        <FormInput
                            label="Article URL"
                            name="article_url"
                            type="url"
                            required
                            value={data.article_url}
                            onChange={(e) => setData('article_url', e.target.value)}
                            error={errors.article_url}
                            placeholder="https://example.com/article"
                            helperText="Full URL to the external article"
                        />
                    </CardContent>
                </Card>

                {/* Media */}
                <Card>
                    <CardHeader>
                        <CardTitle>Article Image</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <Label required>Image</Label>
                            <div className="mt-2">
                                {imagePreview && (
                                    <div className="mb-4">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="image"
                                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg cursor-pointer transition-colors font-medium text-sm"
                                >
                                    <Upload className="w-4 h-4" />
                                    {imagePreview ? 'Change Image' : 'Upload Image'}
                                </label>
                                {errors.image && (
                                    <p className="text-sm text-red-600 mt-2">{errors.image}</p>
                                )}
                                <p className="text-xs text-gray-500 mt-1">
                                    Article thumbnail or cover image (JPG, PNG, WebP, max 2MB)
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Submit Buttons */}
                <Card>
                    <CardContent className="flex items-center justify-end gap-4 pt-6">
                        <Link href="/admin/media-highlights">
                            <Button type="button" variant="secondary">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit" disabled={processing || mediaList.length === 0}>
                            {processing ? 'Saving...' : isEdit ? 'Update Highlight' : 'Create Highlight'}
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </AdminLayout>
    );
}
