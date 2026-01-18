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
import { Textarea } from "@/Components/ui/Textarea";

export default function Form({ faq }) {
    const isEdit = faq !== null;

    const { data, setData, post, processing, errors } = useForm({
        question: faq?.question || "",
        answer: faq?.answer || "",
        is_active: faq?.is_active ?? true,
        _method: isEdit ? "PUT" : "POST",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEdit ? `/admin/faqs/${faq.uid}` : "/admin/faqs";
        post(url);
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Page Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/faqs"
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
                            {isEdit ? "Edit FAQ" : "Create New FAQ"}
                        </h1>
                        <p className="text-muted-foreground">
                            {isEdit
                                ? "Update the FAQ details below"
                                : "Fill in the form to add a new FAQ"}
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>FAQ Details</CardTitle>
                            <CardDescription>
                                Enter the question and answer for the FAQ
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Question */}
                            <div className="space-y-2">
                                <Label htmlFor="question">
                                    Question <span className="text-destructive">*</span>
                                </Label>
                                <Textarea
                                    id="question"
                                    value={data.question}
                                    onChange={(e) =>
                                        setData("question", e.target.value)
                                    }
                                    placeholder="What is your question?"
                                    rows={2}
                                    className={errors.question ? "border-destructive" : ""}
                                />
                                {errors.question && (
                                    <p className="text-sm text-destructive">
                                        {errors.question}
                                    </p>
                                )}
                                <p className="text-sm text-muted-foreground">
                                    Keep it clear and concise (max 500 characters)
                                </p>
                            </div>

                            {/* Answer */}
                            <div className="space-y-2">
                                <Label htmlFor="answer">
                                    Answer <span className="text-destructive">*</span>
                                </Label>
                                <Textarea
                                    id="answer"
                                    value={data.answer}
                                    onChange={(e) =>
                                        setData("answer", e.target.value)
                                    }
                                    placeholder="Provide a detailed answer..."
                                    rows={6}
                                    className={errors.answer ? "border-destructive" : ""}
                                />
                                {errors.answer && (
                                    <p className="text-sm text-destructive">
                                        {errors.answer}
                                    </p>
                                )}
                                <p className="text-sm text-muted-foreground">
                                    Provide a comprehensive answer to help users
                                </p>
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
                                    Active (visible on contact page)
                                </Label>
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex justify-end gap-4 pt-4">
                                <Link href="/admin/faqs">
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing
                                        ? "Saving..."
                                        : isEdit
                                        ? "Update FAQ"
                                        : "Create FAQ"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </AdminLayout>
    );
}
