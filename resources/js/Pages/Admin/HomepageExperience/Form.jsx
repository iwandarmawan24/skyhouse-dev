import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, Link, router } from "@inertiajs/react";
import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/Card";
import { Button } from "@/Components/ui/Button";
import { Label } from "@/Components/ui/Label";
import { X, Plus } from "lucide-react";

export default function Form({ card }) {
    const isEdit = !!card;

    const { data, setData, errors } = useForm({
        title:       card?.title       || '',
        description: card?.description || '',
        order:       card?.order       ?? 0,
        is_active:   card?.is_active   ?? true,
    });

    const [existingImages, setExistingImages] = useState(card?.images || []);
    const [removedImages,  setRemovedImages]  = useState([]);
    const [newFiles,       setNewFiles]       = useState([]);
    const [newPreviews,    setNewPreviews]    = useState([]);
    const [processing,     setProcessing]     = useState(false);

    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;
        setNewFiles((prev) => [...prev, ...files]);
        setNewPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
        e.target.value = '';
    };

    const removeExisting = (path) => {
        setExistingImages((prev) => prev.filter((p) => p !== path));
        if (path.startsWith('/storage/')) {
            setRemovedImages((prev) => [...prev, path]);
        }
    };

    const removeNew = (index) => {
        URL.revokeObjectURL(newPreviews[index]);
        setNewPreviews((prev) => prev.filter((_, i) => i !== index));
        setNewFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);

        const formData = new FormData();
        formData.append('_method', isEdit ? 'PUT' : 'POST');
        formData.append('title',       data.title);
        formData.append('description', data.description);
        formData.append('order',       data.order);
        formData.append('is_active',   data.is_active ? '1' : '0');

        existingImages.forEach((path) => formData.append('existing_images[]', path));
        removedImages.forEach((path)  => formData.append('removed_images[]',  path));
        newFiles.forEach((file)       => formData.append('new_images[]',       file));

        const url = isEdit
            ? `/admin/homepage-experience/${card.uid}`
            : '/admin/homepage-experience';

        router.post(url, formData, {
            forceFormData: true,
            onFinish: () => setProcessing(false),
        });
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
                                <div className="flex items-center justify-between">
                                    <Label>Images</Label>
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        <Plus size={16} />
                                        Add Images
                                    </button>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </div>

                                {existingImages.length === 0 && newPreviews.length === 0 ? (
                                    <div
                                        className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <Plus size={20} className="mx-auto text-gray-400 mb-1" />
                                        <p className="text-sm text-gray-500">Click to add images</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-3 gap-2">
                                        {existingImages.map((path) => (
                                            <div key={path} className="relative group rounded-lg overflow-hidden aspect-video bg-gray-100">
                                                <img src={path} alt="" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeExisting(path)}
                                                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}
                                        {newPreviews.map((src, i) => (
                                            <div key={i} className="relative group rounded-lg overflow-hidden aspect-video bg-gray-100 ring-2 ring-blue-400">
                                                <img src={src} alt="" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeNew(i)}
                                                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
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
