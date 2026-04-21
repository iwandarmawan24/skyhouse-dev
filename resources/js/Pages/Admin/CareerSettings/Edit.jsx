import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import { Mail } from "lucide-react";
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

export default function Edit({ settings }) {
    const { data, setData, post, processing, errors } = useForm({
        apply_email: settings?.apply_email || "",
        _method: "PUT",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/career-settings");
    };

    return (
        <AdminLayout>
            <div className="max-w-3xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Career Settings
                    </h1>
                    <p className="text-muted-foreground">
                        Configure the email address that receives job
                        applications
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Application Email</CardTitle>
                            <CardDescription>
                                Clicking "Apply" on a career detail page opens
                                the user's email client to this address
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="apply_email">
                                    Apply Email
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="apply_email"
                                        type="email"
                                        value={data.apply_email}
                                        onChange={(e) =>
                                            setData(
                                                "apply_email",
                                                e.target.value
                                            )
                                        }
                                        placeholder="hr@skyhousealamsutera.id"
                                        className={`pl-9 ${
                                            errors.apply_email
                                                ? "border-destructive"
                                                : ""
                                        }`}
                                    />
                                </div>
                                {errors.apply_email && (
                                    <p className="text-sm text-destructive">
                                        {errors.apply_email}
                                    </p>
                                )}
                                <p className="text-xs text-muted-foreground">
                                    Leave empty to hide the Apply button from
                                    career detail pages.
                                </p>
                            </div>

                            {settings?.updated_at && (
                                <div className="bg-muted/50 rounded-lg p-4">
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Last Updated:</strong>{" "}
                                        {settings.updated_at}
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
