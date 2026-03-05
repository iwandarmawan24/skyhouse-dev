import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";
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
import RichTextEditor from "@/Components/RichTextEditor";

export default function Form({ career }) {
    const isEdit = career !== null;

    const { data, setData, post, processing, errors } = useForm({
        title: career?.title || "",
        position: career?.position || "",
        body: career?.body || "",
        is_active: career?.is_active ?? true,
        _method: isEdit ? "PUT" : "POST",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEdit ? `/admin/careers/${career.uid}` : "/admin/careers";
        post(url);
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Page Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/careers"
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {isEdit ? "Edit Career" : "Create New Career"}
                        </h1>
                        <p className="text-muted-foreground">
                            {isEdit
                                ? "Update the career listing details below"
                                : "Fill in the form to add a new career listing"}
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Career Details</CardTitle>
                            <CardDescription>
                                Enter the details for the career listing
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title">
                                    Title <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    placeholder="e.g. Senior Software Engineer"
                                    className={errors.title ? "border-destructive" : ""}
                                />
                                {errors.title && (
                                    <p className="text-sm text-destructive">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            {/* Position */}
                            <div className="space-y-2">
                                <Label htmlFor="position">
                                    Position <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="position"
                                    value={data.position}
                                    onChange={(e) =>
                                        setData("position", e.target.value)
                                    }
                                    placeholder="e.g. Full-time, Jakarta"
                                    className={errors.position ? "border-destructive" : ""}
                                />
                                {errors.position && (
                                    <p className="text-sm text-destructive">
                                        {errors.position}
                                    </p>
                                )}
                            </div>

                            {/* Body */}
                            <div className="space-y-2">
                                <Label htmlFor="body">
                                    Body <span className="text-destructive">*</span>
                                </Label>
                                <RichTextEditor
                                    value={data.body}
                                    onChange={(value) => setData("body", value)}
                                />
                                {errors.body && (
                                    <p className="text-sm text-destructive">
                                        {errors.body}
                                    </p>
                                )}
                            </div>

                            {/* Active Status */}
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={data.is_active}
                                    onChange={(e) =>
                                        setData("is_active", e.target.checked)
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <Label htmlFor="is_active" className="cursor-pointer">
                                    Active (visible on careers page)
                                </Label>
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex justify-end gap-4 pt-4">
                                <Link href="/admin/careers">
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing
                                        ? "Saving..."
                                        : isEdit
                                        ? "Update Career"
                                        : "Create Career"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </AdminLayout>
    );
}
