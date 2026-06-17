import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, Link } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/Card";
import { Button } from "@/Components/ui/Button";
import { Label } from "@/Components/ui/Label";

export default function Form({ card }) {
    const isEdit = !!card;

    const { data, setData, post, put, processing, errors } = useForm({
        title:       card?.title       || '',
        description: card?.description || '',
        order:       card?.order       ?? 0,
        is_active:   card?.is_active   ?? true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(`/admin/homepage-experience/${card.uid}`);
        } else {
            post('/admin/homepage-experience');
        }
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

                            {/* Active toggle */}
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
        </AdminLayout>
    );
}
