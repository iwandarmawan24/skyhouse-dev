import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/Button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/Card";
import { Input } from "@/Components/ui/Input";
import { Label } from "@/Components/ui/Label";
import { Textarea } from "@/Components/ui/Textarea";

export default function Edit({ info }) {
    const { data, setData, post, processing, errors } = useForm({
        heading_line_1: info?.heading_line_1 ?? info?.default_heading_line_1 ?? "",
        heading_line_2: info?.heading_line_2 ?? info?.default_heading_line_2 ?? "",
        description: info?.description ?? info?.default_description ?? "",
        _method: "PUT",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/about/company-intro");
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Company Intro
                    </h1>
                    <p className="text-muted-foreground">
                        The opening block on the About page with headings and
                        the Risland Holdings description
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Content</CardTitle>
                            <CardDescription>
                                Headings and the body paragraph shown beside the
                                Risland logo
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="heading_line_1">
                                        Heading Line 1
                                    </Label>
                                    <Input
                                        id="heading_line_1"
                                        value={data.heading_line_1}
                                        onChange={(e) =>
                                            setData(
                                                "heading_line_1",
                                                e.target.value
                                            )
                                        }
                                        placeholder={
                                            info?.default_heading_line_1 ||
                                            "About"
                                        }
                                        className={
                                            errors.heading_line_1
                                                ? "border-destructive"
                                                : ""
                                        }
                                    />
                                    {errors.heading_line_1 && (
                                        <p className="text-sm text-destructive">
                                            {errors.heading_line_1}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="heading_line_2">
                                        Heading Line 2 (italic)
                                    </Label>
                                    <Input
                                        id="heading_line_2"
                                        value={data.heading_line_2}
                                        onChange={(e) =>
                                            setData(
                                                "heading_line_2",
                                                e.target.value
                                            )
                                        }
                                        placeholder={
                                            info?.default_heading_line_2 ||
                                            "Company"
                                        }
                                        className={
                                            errors.heading_line_2
                                                ? "border-destructive"
                                                : ""
                                        }
                                    />
                                    {errors.heading_line_2 && (
                                        <p className="text-sm text-destructive">
                                            {errors.heading_line_2}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    rows={8}
                                    placeholder={info?.default_description || ""}
                                    className={
                                        errors.description
                                            ? "border-destructive"
                                            : ""
                                    }
                                />
                                {errors.description && (
                                    <p className="text-sm text-destructive">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            {info?.updated_at && (
                                <div className="bg-muted/50 rounded-lg p-4">
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Last Updated:</strong>{" "}
                                        {info.updated_at}
                                    </p>
                                </div>
                            )}

                            <div className="flex justify-end gap-2">
                                <Button type="submit" disabled={processing}>
                                    {processing ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </AdminLayout>
    );
}
