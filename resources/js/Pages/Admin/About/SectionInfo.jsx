import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";
import { Button } from "@/Components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/Card";
import { Label } from "@/Components/ui/Label";
import { Textarea } from "@/Components/ui/Textarea";

export default function SectionInfo({ subtitles, defaults }) {
    const { flash } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        about_journey_subtitle:      subtitles?.about_journey_subtitle      ?? "",
        about_values_subtitle:       subtitles?.about_values_subtitle       ?? "",
        top_sales_subtitle:          subtitles?.top_sales_subtitle          ?? "",
        facilities_section_subtitle: subtitles?.facilities_section_subtitle ?? "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put("/admin/about/section-info");
    };

    const Field = ({ id, label, page, description }) => (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <Label htmlFor={id}>{label}</Label>
                <span className="text-xs text-muted-foreground">{page}</span>
            </div>
            {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
            )}
            <Textarea
                id={id}
                value={data[id]}
                onChange={(e) => setData(id, e.target.value)}
                rows={3}
                placeholder={defaults?.[id] || ""}
                className={errors[id] ? "border-destructive" : ""}
            />
            {errors[id] && (
                <p className="text-sm text-destructive">{errors[id]}</p>
            )}
        </div>
    );

    return (
        <AdminLayout>
            <div className="max-w-3xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Section Subtitles</h1>
                    <p className="text-muted-foreground">
                        Edit the subtitle text shown below each section heading across the site.
                    </p>
                </div>

                {flash?.success && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
                        {flash.success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* About Us page */}
                    <Card>
                        <CardHeader>
                            <CardTitle>About Us Page</CardTitle>
                            <CardDescription>
                                Subtitle text for sections on the About Us page.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Field
                                id="about_journey_subtitle"
                                label="Our Journey — Subtitle"
                                page="About Us"
                                description='Shown below the "Our Journey" heading above the milestones timeline.'
                            />
                            <Field
                                id="about_values_subtitle"
                                label="Our Core Values — Subtitle"
                                page="About Us"
                                description='Shown below the "Our Core Values" heading.'
                            />
                            <Field
                                id="top_sales_subtitle"
                                label="Top Sales of The Month — Subtitle"
                                page="About Us"
                                description='Shown below the "Top Sales of The Month" heading.'
                            />
                        </CardContent>
                    </Card>

                    {/* Facilities page */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Facilities Page</CardTitle>
                            <CardDescription>
                                Subtitle text for sections on the Facilities page.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Field
                                id="facilities_section_subtitle"
                                label="Explore Our Facilities — Subtitle"
                                page="Facilities"
                                description='Shown below the "Explore Our Facilities" heading.'
                            />
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
