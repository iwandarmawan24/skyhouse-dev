import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/Components/ui/Card";
import { Button } from "@/Components/ui/Button";
import { Label } from "@/Components/ui/Label";

export default function Index({ mainCard }) {
    const { flash } = usePage().props;

    const { data, setData, put, processing } = useForm({
        main_description: mainCard?.main_description || '',
    });

    const handleMainCardSubmit = (e) => {
        e.preventDefault();
        put('/admin/homepage-experience/main-card');
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Homepage — Experience</h1>
                    <p className="text-gray-600 mt-1">Manage the Experience section shown on the homepage.</p>
                </div>

                {flash?.success && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
                        {flash.success}
                    </div>
                )}

                {/* Main Experience Card settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Main Card Text</CardTitle>
                        <CardDescription>
                            The centre card — "Experience Sky House Alam Sutera+" — description text.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleMainCardSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="main_description">Description</Label>
                                <textarea
                                    id="main_description"
                                    rows={3}
                                    value={data.main_description}
                                    onChange={(e) => setData('main_description', e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                    placeholder="Description shown under the Experience heading..."
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing} size="sm">
                                    {processing ? 'Saving...' : 'Save'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
