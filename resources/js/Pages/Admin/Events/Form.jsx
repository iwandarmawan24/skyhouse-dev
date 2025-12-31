import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { MediaPicker } from '@/Components/MediaPicker';
import { Button } from '@/Components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/Card';
import { FormInput, FormTextarea } from '@/Components/ui/FormField';
import { Label } from '@/Components/ui/Label';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';
import RichTextEditor from '@/Components/RichTextEditor';

export default function Form({ event }) {
    const isEdit = event !== null;
    const { data, setData, post, processing, errors } = useForm({
        title: event?.title || '',
        description: event?.description || '',
        event_date: event?.event_date_only || '',
        event_time: event?.event_time || '',
        location: event?.location || '',
        image: null,
        image_uid: event?.image_uid || null,
        registration_link: event?.registration_link || '',
        is_active: event?.is_active ?? true,
        // SEO fields
        slug: event?.slug || '',
        meta_title: event?.meta_title || '',
        meta_description: event?.meta_description || '',
        meta_keywords: event?.meta_keywords || '',
        focus_keyword: event?.focus_keyword || '',
        _method: isEdit ? 'PUT' : 'POST',
    });

    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [imagePreview, setImagePreview] = useState(
        event?.image ? (event.image.startsWith('http') ? event.image : `/storage/${event.image}`) : null
    );
    const [manualSlugEdit, setManualSlugEdit] = useState(false);

    // Auto-generate slug from title
    useEffect(() => {
        if (data.title && !manualSlugEdit) {
            const slug = data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');
            setData('slug', slug);
        }
    }, [data.title]);

    // Character counter
    const metaDescLength = data.meta_description.length;

    const handleMediaSelect = (selectedMedia) => {
        if (selectedMedia) {
            setImagePreview(selectedMedia.url);
            setData('image_uid', selectedMedia.uid);
        }
        setShowMediaPicker(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEdit ? `/admin/events/${event.uid}` : '/admin/events';
        post(url);
    };

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                    <Link href="/admin/events" className="text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isEdit ? 'Edit Event' : 'Create New Event'}
                    </h1>
                </div>
                <p className="text-gray-600 ml-10">
                    {isEdit ? 'Update the event details below' : 'Fill in the form to add a new event'}
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Event Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Event Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Title */}
                        <FormInput
                            label="Event Title"
                            name="title"
                            required
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            error={errors.title}
                            placeholder="Enter event title"
                        />

                        {/* Description */}
                        <div>
                            <Label required>Description</Label>
                            <div className="mt-2">
                                <RichTextEditor
                                    value={data.description}
                                    onChange={(html) => setData('description', html)}
                                    placeholder="Describe the event and its features"
                                    error={errors.description}
                                />
                            </div>
                        </div>

                        {/* Date & Time */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInput
                                label="Event Date"
                                name="event_date"
                                type="date"
                                required
                                value={data.event_date}
                                onChange={(e) => setData('event_date', e.target.value)}
                                error={errors.event_date}
                            />

                            <FormInput
                                label="Event Time"
                                name="event_time"
                                type="time"
                                required
                                value={data.event_time}
                                onChange={(e) => setData('event_time', e.target.value)}
                                error={errors.event_time}
                            />
                        </div>

                        {/* Location */}
                        <FormInput
                            label="Location"
                            name="location"
                            required
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            error={errors.location}
                            placeholder="Enter event location"
                        />

                        {/* Registration Link */}
                        <FormInput
                            label="Registration Link"
                            name="registration_link"
                            type="url"
                            value={data.registration_link}
                            onChange={(e) => setData('registration_link', e.target.value)}
                            error={errors.registration_link}
                            placeholder="https://..."
                            helperText="Optional: Add a link for event registration"
                        />
                    </CardContent>
                </Card>

                {/* Event Image */}
                <Card>
                    <CardHeader>
                        <CardTitle>Event Image {!isEdit && <span className="text-red-500">*</span>}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div>
                            {imagePreview && (
                                <div className="mb-4 relative group">
                                    <img
                                        src={imagePreview}
                                        alt="Event"
                                        className="w-full h-[200px] object-contain rounded-lg"
                                    />
                                    <div className="absolute inset-0 group-hover:bg-opacity-40 transition-all rounded-lg flex items-center justify-center">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImagePreview(null);
                                                setData('image_uid', null);
                                                setData('image', null);
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

                            {errors.image && <p className="text-sm text-red-600 mt-2">{errors.image}</p>}
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

                {/* SEO Configuration */}
                <Card>
                    <CardHeader>
                        <CardTitle>SEO Configuration</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* URL Slug */}
                        <FormInput
                            label="URL Slug"
                            name="slug"
                            value={data.slug}
                            onChange={(e) => {
                                setData('slug', e.target.value);
                                setManualSlugEdit(true);
                            }}
                            error={errors.slug}
                            placeholder="event-title-slug"
                            helperText="Auto-generated from title, but you can customize it"
                        />

                        {/* SEO Meta Title */}
                        <FormInput
                            label="SEO Meta Title"
                            name="meta_title"
                            value={data.meta_title}
                            onChange={(e) => setData('meta_title', e.target.value)}
                            error={errors.meta_title}
                            placeholder="Custom title for search engines"
                            helperText="The title that appears in search engine results"
                        />

                        {/* SEO Meta Description */}
                        <div>
                            <FormTextarea
                                label="SEO Meta Description"
                                name="meta_description"
                                value={data.meta_description}
                                onChange={(e) => setData('meta_description', e.target.value)}
                                error={errors.meta_description}
                                placeholder="Description for search engines"
                                rows={3}
                            />
                            <div className="flex items-center justify-between mt-1 text-xs">
                                <span className={metaDescLength >= 110 && metaDescLength <= 155 ? 'text-green-600' : 'text-gray-500'}>
                                    {metaDescLength} characters
                                </span>
                                <span className="text-gray-500">
                                    Recommended: 110-155 characters
                                </span>
                            </div>
                        </div>

                        {/* SEO Meta Keywords */}
                        <FormInput
                            label="SEO Meta Keywords"
                            name="meta_keywords"
                            value={data.meta_keywords}
                            onChange={(e) => setData('meta_keywords', e.target.value)}
                            error={errors.meta_keywords}
                            placeholder="keyword1, keyword2, keyword3"
                            helperText="Separate keywords with commas"
                        />

                        {/* Focus Keyword */}
                        <FormInput
                            label="Focus Keyword"
                            name="focus_keyword"
                            value={data.focus_keyword}
                            onChange={(e) => setData('focus_keyword', e.target.value)}
                            error={errors.focus_keyword}
                            placeholder="Main keyword for SEO"
                            helperText="Primary keyword you want to rank for"
                        />
                    </CardContent>
                </Card>

                {/* Submit Buttons */}
                <Card>
                    <CardContent className="flex items-center justify-end gap-4 pt-6">
                        <Link href="/admin/events">
                            <Button type="button" variant="secondary">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : isEdit ? 'Update Event' : 'Create Event'}
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
                folder="events"
            />
        </AdminLayout>
    );
}
