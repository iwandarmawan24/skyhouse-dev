import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, Link } from "@inertiajs/react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/Card";
import { Button } from "@/Components/ui/Button";
import { Label } from "@/Components/ui/Label";
import { MediaPicker } from "@/Components/MediaPicker";
import { Plus, X } from "lucide-react";

export default function Form({ card }) {
    const isEdit = !!card;

    const { data, setData, post, processing, errors } = useForm({
        title:       card?.title       || '',
        description: card?.description || '',
        order:       card?.order       ?? 0,
        is_active:   card?.is_active   ?? true,
        images:      card?.images      || [],
        _method:     isEdit ? 'PUT' : 'POST',
    });

    const [showMediaPicker, setShowMediaPicker] = useState(false);

    const handleMediaSelect = (media) => {
        const selected = Array.isArray(media) ? media : [media];
        setData('images', [...data.images, ...selected.map((m) => m.url)]);
        setShowMediaPicker(false);
    };

    const removeImage = (url) => {
        setData('images', data.images.filter((u) => u !== url));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEdit
            ? `/admin/homepage-experience/${card.uid}`
            : '/admin/homepage-experience';
        post(url);
    };

    return (
        <AdminLayout>
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/homepage-experience">
                        <Button variant="outline" size="sm">← Back</Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {isEdit ? 'Edit Experience Card' : 'Add Experience Card'}
                        </h1>
                        <p className="text-gray-600 mt-1">
                            {isEdit ? 'Update the card details.' : 'Create a new card for the Experience section.'}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Card Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5">

                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
                                <input
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                    placeholder="e.g. Thriving Business Hub"
                                    required
                                />
                                {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                    placeholder="Short description shown on the card..."
                                />
                                {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                            </div>

                            {/* Images */}
                            <div className="space-y-3">
                                <Label>Images (Slider)</Label>

                                {data.images.length > 0 && (
                                    <div className="grid grid-cols-3 gap-2">
                                        {data.images.map((url) => (
                                            <div key={url} className="relative group rounded-lg overflow-hidden aspect-video bg-gray-100">
                                                <img src={url} alt="" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(url)}
                                                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <button
                                    type="button"
                                    onClick={() => setShowMediaPicker(true)}
                                    className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-500 transition-colors group"
                                >
                                    <Plus className="h-6 w-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                    <p className="mt-1 text-sm text-gray-500 group-hover:text-blue-600">Add from Media Library</p>
                                </button>
                            </div>

                            {/* Order */}
                            <div className="space-y-2">
                                <Label htmlFor="order">Display Order</Label>
                                <input
                                    id="order"
                                    type="number"
                                    value={data.order}
                                    onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                    className="w-40 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                />
                                <p className="text-xs text-gray-500">Lower number = shown first.</p>
                            </div>

                            {/* Active */}
                            <div className="flex items-center gap-3">
                                <input
                                    id="is_active"
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600"
                                />
                                <Label htmlFor="is_active" className="cursor-pointer">Show on website</Label>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <Link href="/admin/homepage-experience">
                                    <Button type="button" variant="outline">Cancel</Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Card'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>

            <MediaPicker
                open={showMediaPicker}
                onClose={() => setShowMediaPicker(false)}
                onSelect={handleMediaSelect}
                multiple={true}
                accept="image"
                folder="experiences"
                recommendedSize="1200 × 800px"
            />
        </AdminLayout>
    );
}
