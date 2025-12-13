import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { MediaPicker } from '@/Components/MediaPicker';
import { Button } from '@/Components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/Card';
import { FormInput, FormTextarea } from '@/Components/ui/FormField';
import { ArrowLeft, Image as ImageIcon, X } from 'lucide-react';

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
        _method: isEdit ? 'PUT' : 'POST',
    });

    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [imagePreview, setImagePreview] = useState(
        event?.image ? (event.image.startsWith('http') ? event.image : `/storage/${event.image}`) : null
    );

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
                        <FormTextarea
                            label="Description"
                            name="description"
                            required
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            error={errors.description}
                            placeholder="Describe the event and its features"
                            rows={6}
                        />

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
                        {imagePreview ? (
                            <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100">
                                <img
                                    src={imagePreview}
                                    alt="Event"
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setImagePreview(null);
                                        setData('image_uid', null);
                                        setData('image', null);
                                    }}
                                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setShowMediaPicker(true)}
                                className="border-2 border-dashed border-gray-300 rounded-lg p-8 w-full h-48 flex flex-col items-center justify-center hover:border-blue-500 transition-colors group"
                            >
                                <ImageIcon className="h-12 w-12 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                <p className="mt-2 text-sm text-gray-600 group-hover:text-blue-600">Select Image from Media Library</p>
                            </button>
                        )}
                        {errors.image && <p className="mt-2 text-sm text-red-600">{errors.image}</p>}
                        {errors.image_uid && <p className="mt-2 text-sm text-red-600">{errors.image_uid}</p>}
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
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-end gap-4">
                            <Button variant="outline" asChild>
                                <Link href="/admin/events">
                                    Cancel
                                </Link>
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                            >
                                {processing ? 'Saving...' : isEdit ? 'Update Event' : 'Create Event'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>

            {/* MediaPicker Modal */}
            <MediaPicker
                open={showMediaPicker}
                onClose={() => setShowMediaPicker(false)}
                onSelect={(media) => {
                    setImagePreview(media.url);
                    setData('image_uid', media.uid);
                    setShowMediaPicker(false);
                }}
                multiple={false}
                accept="image"
                folder="events"
            />
        </AdminLayout>
    );
}
