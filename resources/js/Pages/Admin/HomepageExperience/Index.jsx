import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage, Link } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/Components/ui/Card";
import { Button } from "@/Components/ui/Button";
import { Label } from "@/Components/ui/Label";
import RichTextEditor from "@/Components/RichTextEditor";

export default function Index({ cards = [], mainCard }) {
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
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Homepage — Experience</h1>
                    <p className="text-gray-600 mt-1">Manage the Experience section shown on the homepage.</p>
                </div>

                {flash?.success && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
                        {flash.success}
                    </div>
                )}

                {/* Main card text */}
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
                                <RichTextEditor
                                    value={data.main_description}
                                    onChange={(content) => setData('main_description', content)}
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

                {/* Experience cards list */}
                <Card>
                    <CardHeader>
                        <CardTitle>Experience Cards</CardTitle>
                        <CardDescription>
                            Manage the images and descriptions shown on each experience card.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {cards.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center py-8">No cards yet.</p>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {cards.map((card) => (
                                    <div key={card.uid} className="flex items-center gap-4 py-4">
                                        {/* Image preview strip */}
                                        <div className="flex gap-1 shrink-0">
                                            {(card.images ?? []).slice(0, 3).map((src, i) => (
                                                <img
                                                    key={i}
                                                    src={src}
                                                    alt=""
                                                    className="w-12 h-12 rounded-md object-cover bg-gray-100"
                                                />
                                            ))}
                                            {(card.images ?? []).length === 0 && (
                                                <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                                                    No img
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-gray-900 truncate">{card.title}</p>
                                            <p className="text-xs text-gray-500 truncate">{card.description}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs text-gray-400">Order {card.order}</span>
                                                <span className={`text-xs px-1.5 py-0.5 rounded-full ${card.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                    {card.is_active ? 'Active' : 'Hidden'}
                                                </span>
                                                <span className="text-xs text-gray-400">{(card.images ?? []).length} image{(card.images ?? []).length !== 1 ? 's' : ''}</span>
                                            </div>
                                        </div>

                                        {/* Edit */}
                                        <Link href={`/admin/homepage-experience/${card.uid}/edit`}>
                                            <Button variant="outline" size="sm">Edit</Button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
