import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/Components/ui/Button';
import { Card, CardContent, CardFooter } from '@/Components/ui/Card';
import { FormInput, FormSelect, FormTextarea } from '@/Components/ui/FormField';

export default function Form({ policy }) {
    const isEdit = policy !== null;
    const { data, setData, post, processing, errors } = useForm({
        type: policy?.type || 'privacy',
        title: policy?.title || '',
        content: policy?.content || '',
        _method: isEdit ? 'PUT' : 'POST',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEdit ? `/admin/policies/${policy.uid}` : '/admin/policies';
        post(url);
    };

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                    <Link href="/admin/policies" className="text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isEdit ? 'Edit Policy' : 'Create New Policy'}
                    </h1>
                </div>
                <p className="text-gray-600 ml-10">
                    {isEdit ? 'Update the policy details below' : 'Fill in the form to add a new policy'}
                </p>
            </div>

            {/* Form */}
            <Card>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6 pt-6">
                        <FormSelect
                            label="Policy Type"
                            name="type"
                            required
                            value={data.type}
                            onChange={(e) => setData('type', e.target.value)}
                            error={errors.type}
                        >
                            <option value="privacy">Privacy Policy</option>
                            <option value="terms">Terms of Service</option>
                            <option value="refund">Refund Policy</option>
                            <option value="shipping">Shipping Policy</option>
                            <option value="other">Other</option>
                        </FormSelect>

                        <FormInput
                            label="Policy Title"
                            name="title"
                            required
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            error={errors.title}
                            placeholder="Enter policy title"
                        />

                        <FormTextarea
                            label="Policy Content"
                            name="content"
                            required
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            error={errors.content}
                            rows={20}
                            className="font-mono text-sm"
                            placeholder="Enter policy content..."
                        />
                        <p className="text-sm text-gray-500 -mt-4">
                            Write your policy content. You can use line breaks and paragraphs.
                        </p>
                    </CardContent>

                    <CardFooter className="flex items-center justify-end gap-4 border-t">
                        <Link href="/admin/policies">
                            <Button type="button" variant="secondary">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : isEdit ? 'Update Policy' : 'Create Policy'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </AdminLayout>
    );
}
