import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { ArrowLeft, Upload } from 'lucide-react';
import { Button } from '@/Components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/Components/ui/Card';
import { FormInput, FormSelect, FormTextarea } from '@/Components/ui/FormField';
import { Label } from '@/Components/ui/Label';

export default function Form({ article, categories }) {
    const isEdit = article !== null;
    const { data, setData, post, processing, errors } = useForm({
        title: article?.title || '',
        category_id: article?.article_category_id || (categories.length > 0 ? categories[0].id : ''),
        excerpt: article?.excerpt || '',
        content: article?.content || '',
        featured_image: null,
        meta_description: article?.meta_description || '',
        is_published: article?.is_published ?? false,
        _method: isEdit ? 'PUT' : 'POST',
    });

    const [imagePreview, setImagePreview] = useState(
        article?.featured_image
            ? article.featured_image.startsWith('http')
                ? article.featured_image
                : `/storage/${article.featured_image}`
            : null
    );

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('featured_image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEdit ? `/admin/articles/${article.id}` : '/admin/articles';
        post(url);
    };

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                    <Link href="/admin/articles" className="text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isEdit ? 'Edit Article' : 'Create New Article'}
                    </h1>
                </div>
                <p className="text-gray-600 ml-10">
                    {isEdit ? 'Update the article details below' : 'Fill in the form to create a new article'}
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormInput
                            label="Title"
                            name="title"
                            required
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            error={errors.title}
                            placeholder="Enter article title"
                        />

                        <FormSelect
                            label="Category"
                            name="category_id"
                            required
                            value={data.category_id}
                            onChange={(e) => setData('category_id', e.target.value)}
                            error={errors.category_id}
                        >
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </FormSelect>

                        <FormTextarea
                            label="Excerpt"
                            name="excerpt"
                            value={data.excerpt}
                            onChange={(e) => setData('excerpt', e.target.value)}
                            error={errors.excerpt}
                            rows={3}
                            placeholder="Short description of the article"
                        />
                    </CardContent>
                </Card>

                {/* Content */}
                <Card>
                    <CardHeader>
                        <CardTitle>Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FormTextarea
                            label="Article Content"
                            name="content"
                            required
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            error={errors.content}
                            rows={15}
                            className="font-mono text-sm"
                            placeholder="Write your article content here... You can use HTML tags for formatting."
                        />
                        <p className="mt-2 text-sm text-gray-500">
                            💡 Tip: You can use basic HTML tags like &lt;p&gt;, &lt;h2&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;, etc.
                        </p>
                    </CardContent>
                </Card>

                {/* Featured Image */}
                <Card>
                    <CardHeader>
                        <CardTitle>Featured Image</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {imagePreview && (
                            <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100">
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                        <div className="flex items-center justify-center w-full">
                            <label
                                htmlFor="featured_image"
                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-8 h-8 mb-4 text-gray-500" />
                                    <p className="mb-2 text-sm text-gray-500">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500">PNG, JPG, JPEG or WEBP (MAX. 2MB)</p>
                                </div>
                                <input
                                    id="featured_image"
                                    type="file"
                                    className="hidden"
                                    accept="image/jpeg,image/png,image/jpg,image/webp"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                        {errors.featured_image && (
                            <p className="text-sm text-red-600">{errors.featured_image}</p>
                        )}
                        {isEdit && (
                            <p className="text-sm text-gray-500">Leave empty to keep the current image</p>
                        )}
                    </CardContent>
                </Card>

                {/* SEO */}
                <Card>
                    <CardHeader>
                        <CardTitle>SEO Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FormTextarea
                            label="Meta Description"
                            name="meta_description"
                            value={data.meta_description}
                            onChange={(e) => setData('meta_description', e.target.value)}
                            rows={3}
                            maxLength={160}
                            placeholder="Brief description for search engines (max 160 characters)"
                        />
                        <p className="text-sm text-gray-500 -mt-4">
                            {data.meta_description.length}/160 characters
                        </p>
                    </CardContent>
                </Card>

                {/* Publish Status */}
                <Card>
                    <CardHeader>
                        <CardTitle>Publish Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.is_published}
                                    onChange={(e) => setData('is_published', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-700">
                                    {data.is_published ? 'Published' : 'Draft'}
                                </span>
                            </label>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                            {data.is_published
                                ? 'This article will be visible to the public'
                                : 'This article will be saved as a draft'}
                        </p>
                    </CardContent>
                </Card>

                {/* Submit Buttons */}
                <Card>
                    <CardContent className="flex items-center justify-end gap-4 pt-6">
                        <Link href="/admin/articles">
                            <Button type="button" variant="secondary">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : isEdit ? 'Update Article' : 'Create Article'}
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </AdminLayout>
    );
}
