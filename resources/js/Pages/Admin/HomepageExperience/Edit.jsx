import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/Components/ui/Card";
import { Label } from "@/Components/ui/Label";
import { Button } from "@/Components/ui/Button";

export default function Edit({ experience, defaults }) {
    const { flash } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        main_description:               experience?.main_description               || defaults.main_description,
        card_daily_title:               experience?.card_daily_title               || defaults.card_daily_title,
        card_daily_description:         experience?.card_daily_description         || defaults.card_daily_description,
        card_entertainment_title:       experience?.card_entertainment_title       || defaults.card_entertainment_title,
        card_entertainment_description: experience?.card_entertainment_description || defaults.card_entertainment_description,
        card_university_title:          experience?.card_university_title          || defaults.card_university_title,
        card_university_description:    experience?.card_university_description    || defaults.card_university_description,
        card_business_title:            experience?.card_business_title            || defaults.card_business_title,
        card_business_description:      experience?.card_business_description      || defaults.card_business_description,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put("/admin/homepage-experience");
    };

    const Field = ({ label, field, multiline = false, placeholder }) => (
        <div className="space-y-2">
            <Label htmlFor={field}>{label}</Label>
            {multiline ? (
                <textarea
                    id={field}
                    rows={3}
                    value={data[field]}
                    onChange={(e) => setData(field, e.target.value)}
                    placeholder={placeholder || defaults[field]}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
            ) : (
                <input
                    id={field}
                    type="text"
                    value={data[field]}
                    onChange={(e) => setData(field, e.target.value)}
                    placeholder={placeholder || defaults[field]}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
            )}
            {errors[field] && <p className="text-sm text-red-600">{errors[field]}</p>}
        </div>
    );

    return (
        <AdminLayout>
            <div className="max-w-3xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Homepage — Experience</h1>
                    <p className="text-muted-foreground mt-1">Edit the text content of the Experience section on the homepage.</p>
                </div>

                {flash?.success && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
                        {flash.success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Main card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Main Card</CardTitle>
                            <CardDescription>The centre card that describes the overall Experience section.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Field label="Description" field="main_description" multiline />
                        </CardContent>
                    </Card>

                    {/* Daily Freshness */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Card 1 — Daily Freshness</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Field label="Title" field="card_daily_title" />
                            <Field label="Description" field="card_daily_description" multiline />
                        </CardContent>
                    </Card>

                    {/* Entertainment */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Card 2 — Entertainment</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Field label="Title" field="card_entertainment_title" />
                            <Field label="Description" field="card_entertainment_description" multiline />
                        </CardContent>
                    </Card>

                    {/* University */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Card 3 — Universities</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Field label="Title" field="card_university_title" />
                            <Field label="Description" field="card_university_description" multiline />
                        </CardContent>
                    </Card>

                    {/* Business Hub */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Card 4 — Business Hub</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Field label="Title" field="card_business_title" />
                            <Field label="Description" field="card_business_description" multiline />
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing}>
                            {processing ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
