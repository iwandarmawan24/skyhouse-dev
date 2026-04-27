import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";
import { ChevronLeft } from "lucide-react";
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
import { Switch } from "@/Components/ui/switch";

export default function Form({ achievement }) {
    const isEdit = achievement !== null;

    const { data, setData, post, processing, errors } = useForm({
        number: achievement?.number || "",
        label: achievement?.label || "",
        is_active: achievement?.is_active ?? true,
        _method: isEdit ? "PUT" : "POST",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEdit
            ? `/admin/about/achievements/${achievement.uid}`
            : "/admin/about/achievements";
        post(url);
    };

    return (
        <AdminLayout>
            <div className="max-w-3xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/admin/about/achievements">
                            <ChevronLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {isEdit ? "Edit Achievement" : "Create Achievement"}
                        </h1>
                        <p className="text-muted-foreground">
                            {isEdit
                                ? "Update this achievement stat"
                                : "Add a new stat to the About page"}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Achievement Details</CardTitle>
                            <CardDescription>
                                Display the headline figure and a short label
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="number">
                                    Number{" "}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="number"
                                    value={data.number}
                                    onChange={(e) =>
                                        setData("number", e.target.value)
                                    }
                                    placeholder="e.g., 50+, 5,000+, 99%"
                                    className={
                                        errors.number
                                            ? "border-destructive"
                                            : ""
                                    }
                                />
                                <p className="text-xs text-muted-foreground">
                                    Free text. Use suffixes like "+", "%", or
                                    "K" as needed.
                                </p>
                                {errors.number && (
                                    <p className="text-sm text-destructive">
                                        {errors.number}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="label">
                                    Label{" "}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="label"
                                    value={data.label}
                                    onChange={(e) =>
                                        setData("label", e.target.value)
                                    }
                                    placeholder="e.g., Projects Completed"
                                    className={
                                        errors.label
                                            ? "border-destructive"
                                            : ""
                                    }
                                />
                                {errors.label && (
                                    <p className="text-sm text-destructive">
                                        {errors.label}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <Label
                                        htmlFor="is_active"
                                        className="text-base"
                                    >
                                        Active Status
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        {data.is_active
                                            ? "Achievement is visible on the website"
                                            : "Achievement is hidden from the website"}
                                    </p>
                                </div>
                                <Switch
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(checked) =>
                                        setData("is_active", checked)
                                    }
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex items-center justify-end gap-4 mt-6">
                        <Button variant="outline" asChild>
                            <Link href="/admin/about/achievements">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing
                                ? "Saving..."
                                : isEdit
                                ? "Update Achievement"
                                : "Create Achievement"}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
