import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/Components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/Card';
import { FormInput, FormTextarea, FormSelect } from '@/Components/ui/FormField';

export default function Form({ category }) {
    const isEdit = category !== null;
    const { data, setData, post, processing, errors } = useForm({
        name: category?.name || '',
        description: category?.description || '',
        is_active: category?.is_active ?? true,
        _method: isEdit ? 'PUT' : 'POST',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEdit ? `/admin/article-categories/${category.uid}` : '/admin/article-categories';
        post(url);
    };

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                    <Link href="/admin/article-categories" className="text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isEdit ? 'Edit Category' : 'Create New Category'}
                    </h1>
                </div>
                <p className="text-gray-600 ml-10">
                    {isEdit ? 'Update category information' : 'Add a new article category'}
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                {/* Basic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Category Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormInput
                            label="Category Name"
                            name="name"
                            required
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            error={errors.name}
                            placeholder="e.g., Technology, Business, Lifestyle"
                        />

                        <FormTextarea
                            label="Description"
                            name="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            error={errors.description}
                            placeholder="Brief description of this category (optional)"
                            rows={4}
                        />

                        <FormSelect
                            label="Status"
                            name="is_active"
                            required
                            value={data.is_active ? '1' : '0'}
                            onChange={(e) => setData('is_active', e.target.value === '1')}
                            error={errors.is_active}
                        >
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </FormSelect>
                    </CardContent>
                </Card>

                {/* Submit Buttons */}
                <Card>
                    <CardContent className="flex items-center justify-end gap-4 pt-6">
                        <Link href="/admin/article-categories">
                            <Button type="button" variant="secondary">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : isEdit ? 'Update Category' : 'Create Category'}
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </AdminLayout>
    );
}
