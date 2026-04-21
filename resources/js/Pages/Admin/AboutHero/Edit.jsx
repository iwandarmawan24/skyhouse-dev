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

export default function Edit({ hero }) {
    const { data, setData, post, processing, errors } = useForm({
        title: hero?.title ?? hero?.default_title ?? "",
        subtitle: hero?.subtitle ?? hero?.default_subtitle ?? "",
        description: hero?.description ?? hero?.default_description ?? "",
        _method: "PUT",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/about/hero");
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        About Hero Section
                    </h1>
                    <p className="text-muted-foreground">
                        The yellow "Building Dreams, Creating Communities" block
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Hero Content</CardTitle>
                            <CardDescription>
                                Title and two descriptive paragraphs
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    placeholder={hero?.default_title || ""}
                                    className={
                                        errors.title
                                            ? "border-destructive"
                                            : ""
                                    }
                                />
                                {errors.title && (
                                    <p className="text-sm text-destructive">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="subtitle">Subtitle</Label>
                                <Textarea
                                    id="subtitle"
                                    value={data.subtitle}
                                    onChange={(e) =>
                                        setData("subtitle", e.target.value)
                                    }
                                    rows={4}
                                    placeholder={hero?.default_subtitle || ""}
                                    className={
                                        errors.subtitle
                                            ? "border-destructive"
                                            : ""
                                    }
                                />
                                {errors.subtitle && (
                                    <p className="text-sm text-destructive">
                                        {errors.subtitle}
                                    </p>
                                )}
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
                                    rows={5}
                                    placeholder={
                                        hero?.default_description || ""
                                    }
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

                            {hero?.updated_at && (
                                <div className="bg-muted/50 rounded-lg p-4">
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Last Updated:</strong>{" "}
                                        {hero.updated_at}
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
