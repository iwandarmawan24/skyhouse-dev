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

export default function Edit({ mission }) {
    const { data, setData, post, processing, errors } = useForm({
        title: mission?.title ?? mission?.default_title ?? "",
        statement: mission?.statement ?? mission?.default_statement ?? "",
        _method: "PUT",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/about/mission");
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Mission Statement
                    </h1>
                    <p className="text-muted-foreground">
                        Shown under the Core Values on the About page
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Mission</CardTitle>
                            <CardDescription>
                                Heading and the mission statement
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
                                    placeholder={mission?.default_title || "Our Mission"}
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
                                <Label htmlFor="statement">Statement</Label>
                                <Textarea
                                    id="statement"
                                    value={data.statement}
                                    onChange={(e) =>
                                        setData("statement", e.target.value)
                                    }
                                    rows={6}
                                    placeholder={
                                        mission?.default_statement || ""
                                    }
                                    className={
                                        errors.statement
                                            ? "border-destructive"
                                            : ""
                                    }
                                />
                                {errors.statement && (
                                    <p className="text-sm text-destructive">
                                        {errors.statement}
                                    </p>
                                )}
                            </div>

                            {mission?.updated_at && (
                                <div className="bg-muted/50 rounded-lg p-4">
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Last Updated:</strong>{" "}
                                        {mission.updated_at}
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
