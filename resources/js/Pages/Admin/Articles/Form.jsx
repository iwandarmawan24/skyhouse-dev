import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import {
    ArrowLeft,
    Calendar,
    AlertCircle,
    Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/Components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/Card";
import { FormInput, FormSelect, FormTextarea } from "@/Components/ui/FormField";
import { Label } from "@/Components/ui/Label";
import { Alert } from "@/Components/ui/Alert";
import RichTextEditor from "@/Components/RichTextEditor";
import SeoAnalyzer from "@/Components/SeoAnalyzer";
import { MediaPicker } from "@/Components/MediaPicker";

export default function Form({ article, categories, users }) {
    const isEdit = article !== null;

    // Helper function to format datetime for datetime-local input
    // Backend sends datetime in Asia/Jakarta timezone (e.g., "2025-12-29 20:10:00")
    // We need to format it for datetime-local input (e.g., "2025-12-29T20:10")
    const formatDateTimeForInput = (datetime) => {
        if (!datetime) return "";
        // Backend sends format: "2025-12-29 20:10:00"
        // datetime-local needs: "2025-12-29T20:10"
        // Simply replace space with T and remove seconds
        return datetime.substring(0, 16).replace(' ', 'T');
    };

    const { data, setData, post, processing, errors } = useForm({
        title: article?.title || "",
        subtitle: article?.subtitle || "",
        article_category_uid:
            article?.article_category_uid ||
            (categories.length > 0 ? categories[0].uid : ""),
        slug: article?.slug || "",
        excerpt: article?.excerpt || "",
        content: article?.content || "",
        featured_image: null,
        featured_image_uid: article?.featured_image_uid || null,
        video_url: article?.video_url || "",
        tags: article?.tags || "",
        author_uid: article?.author_uid || "",
        editor_uid: article?.editor_uid || "",
        meta_title: article?.meta_title || "",
        meta_description: article?.meta_description || "",
        meta_keywords: article?.meta_keywords || "",
        focus_keywords: article?.focus_keywords || "",
        status: article?.status || "draft",
        scheduled_at: formatDateTimeForInput(article?.scheduled_at),
        ignore_schedule_warning: false,
        _method: isEdit ? "PUT" : "POST",
    });

    const [imagePreview, setImagePreview] = useState(
        article?.featured_image_url || null
    );
    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

    // Auto-generate slug from title
    useEffect(() => {
        if (!isEdit && data.title && !isSlugManuallyEdited) {
            const slug = data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "");
            setData("slug", slug);
        }
    }, [data.title, isSlugManuallyEdited]);

    // Character counters
    const titleLength = data.title.length;
    const metaDescLength = data.meta_description.length;

    const handleMediaSelect = (selectedMedia) => {
        if (selectedMedia) {
            // Set the image URL for preview
            setImagePreview(selectedMedia.url);

            // Store the media UID to send to backend
            setData("featured_image_uid", selectedMedia.uid);
        }
        setShowMediaPicker(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // If there's a schedule warning error, set flag to ignore it on next submit
        if (errors.scheduled_at && errors.scheduled_at.includes('in the past')) {
            setData('ignore_schedule_warning', true);
        }

        const url = isEdit
            ? `/admin/articles/${article.uid}`
            : "/admin/articles";
        post(url);
    };

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                    <Link
                        href="/admin/articles"
                        className="text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isEdit ? "Edit Article" : "Create New Article"}
                    </h1>
                </div>
                <p className="text-gray-600 ml-10">
                    {isEdit
                        ? "Update article information"
                        : "Create a new article with SEO optimization"}
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content - Left & Center Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Article Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Title with character counter */}
                                <div>
                                    <FormInput
                                        label="Article Title"
                                        name="title"
                                        required
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                        error={errors.title}
                                        placeholder="Enter article title"
                                    />
                                    <div className="flex items-center justify-between mt-1 text-xs">
                                        <span
                                            className={
                                                titleLength >= 55 &&
                                                titleLength <= 60
                                                    ? "text-green-600"
                                                    : "text-gray-500"
                                            }
                                        >
                                            {titleLength} characters
                                        </span>
                                        <span className="text-gray-500">
                                            Recommended: 55-60 characters
                                        </span>
                                    </div>
                                </div>

                                <FormInput
                                    label="Subtitle"
                                    name="subtitle"
                                    value={data.subtitle}
                                    onChange={(e) =>
                                        setData("subtitle", e.target.value)
                                    }
                                    error={errors.subtitle}
                                    placeholder="Enter subtitle (optional)"
                                />

                                <FormSelect
                                    label="Category"
                                    name="article_category_uid"
                                    required
                                    value={data.article_category_uid}
                                    onChange={(e) =>
                                        setData(
                                            "article_category_uid",
                                            e.target.value
                                        )
                                    }
                                    error={errors.article_category_uid}
                                >
                                    {categories.map((cat) => (
                                        <option key={cat.uid} value={cat.uid}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </FormSelect>

                                <FormTextarea
                                    label="Excerpt"
                                    name="excerpt"
                                    value={data.excerpt}
                                    onChange={(e) =>
                                        setData("excerpt", e.target.value)
                                    }
                                    error={errors.excerpt}
                                    placeholder="Brief summary of the article"
                                    rows={3}
                                />
                            </CardContent>
                        </Card>

                        {/* Content Editor */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Article Content</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="mt-2">
                                    <RichTextEditor
                                        value={data.content}
                                        onChange={(content) =>
                                            setData("content", content)
                                        }
                                        placeholder="Start writing your article..."
                                        error={errors.content}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Media */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Medias</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Featured Image */}
                                <div>
                                    <Label>Featured Image</Label>
                                    <div className="mt-2">
                                        {imagePreview && (
                                            <div className="mb-4 relative group">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="w-full h-[200px] object-contain rounded-lg"
                                                />
                                                <div className="absolute inset-0 group-hover:bg-opacity-40 transition-all rounded-lg flex items-center justify-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setImagePreview(null);
                                                            setData("featured_image_uid", null);
                                                        }}
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Media Library Button */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowMediaPicker(true)
                                            }
                                            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm w-full"
                                        >
                                            <ImageIcon className="w-4 h-4" />
                                            Select from Media Library
                                        </button>

                                        {errors.featured_image && (
                                            <p className="text-sm text-red-600 mt-2">
                                                {errors.featured_image}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Video URL */}
                                <FormInput
                                    label="Video URL"
                                    name="video_url"
                                    type="url"
                                    value={data.video_url}
                                    onChange={(e) =>
                                        setData("video_url", e.target.value)
                                    }
                                    error={errors.video_url}
                                    placeholder="https://youtube.com/watch?v=..."
                                    helperText="YouTube or video URL"
                                />
                            </CardContent>
                        </Card>

                        {/* Tags & Authors */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Additional Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <FormInput
                                    label="Tags"
                                    name="tags"
                                    value={data.tags}
                                    onChange={(e) =>
                                        setData("tags", e.target.value)
                                    }
                                    error={errors.tags}
                                    placeholder="tag1, tag2, tag3"
                                    helperText="Separate tags with commas"
                                />

                                <FormSelect
                                    label="Author"
                                    name="author_uid"
                                    value={data.author_uid}
                                    onChange={(e) =>
                                        setData("author_uid", e.target.value)
                                    }
                                    error={errors.author_uid}
                                >
                                    <option value="">
                                        Select Author (Optional)
                                    </option>
                                    {users.map((user) => (
                                        <option key={user.uid} value={user.uid}>
                                            {user.full_name}
                                        </option>
                                    ))}
                                </FormSelect>

                                <FormSelect
                                    label="Editor"
                                    name="editor_uid"
                                    value={data.editor_uid}
                                    onChange={(e) =>
                                        setData("editor_uid", e.target.value)
                                    }
                                    error={errors.editor_uid}
                                >
                                    <option value="">
                                        Select Editor (Optional)
                                    </option>
                                    {users.map((user) => (
                                        <option key={user.uid} value={user.uid}>
                                            {user.full_name}
                                        </option>
                                    ))}
                                </FormSelect>
                            </CardContent>
                        </Card>

                        {/* SEO Configuration */}
                        <Card>
                            <CardHeader>
                                <CardTitle>SEO Configuration</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <FormInput
                                        label="URL Slug"
                                        name="slug"
                                        value={data.slug}
                                        onChange={(e) => {
                                            setData("slug", e.target.value);
                                            setIsSlugManuallyEdited(true);
                                        }}
                                        error={errors.slug}
                                        placeholder="article-url-slug"
                                        helperText="Auto-generated from title, but you can customize it"
                                    />
                                    {isSlugManuallyEdited && !isEdit && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsSlugManuallyEdited(false);
                                                const slug = data.title
                                                    .toLowerCase()
                                                    .replace(/[^a-z0-9]+/g, "-")
                                                    .replace(/^-|-$/g, "");
                                                setData("slug", slug);
                                            }}
                                            className="mt-2 text-sm text-blue-600 hover:text-blue-700 underline"
                                        >
                                            Reset to auto-generated slug
                                        </button>
                                    )}
                                </div>

                                <FormInput
                                    label="SEO Meta Title"
                                    name="meta_title"
                                    value={data.meta_title}
                                    onChange={(e) =>
                                        setData("meta_title", e.target.value)
                                    }
                                    error={errors.meta_title}
                                    placeholder="Custom title for search engines"
                                />

                                <div>
                                    <FormTextarea
                                        label="SEO Meta Description"
                                        name="meta_description"
                                        value={data.meta_description}
                                        onChange={(e) =>
                                            setData(
                                                "meta_description",
                                                e.target.value
                                            )
                                        }
                                        error={errors.meta_description}
                                        placeholder="Description for search engines"
                                        rows={3}
                                    />
                                    <div className="flex items-center justify-between mt-1 text-xs">
                                        <span
                                            className={
                                                metaDescLength >= 110 &&
                                                metaDescLength <= 155
                                                    ? "text-green-600"
                                                    : "text-gray-500"
                                            }
                                        >
                                            {metaDescLength} characters
                                        </span>
                                        <span className="text-gray-500">
                                            Recommended: 110-155 characters
                                        </span>
                                    </div>
                                </div>

                                <FormInput
                                    label="SEO Meta Keywords"
                                    name="meta_keywords"
                                    value={data.meta_keywords}
                                    onChange={(e) =>
                                        setData("meta_keywords", e.target.value)
                                    }
                                    error={errors.meta_keywords}
                                    placeholder="keyword1, keyword2, keyword3"
                                />

                                <FormInput
                                    label="Focus Keyword"
                                    name="focus_keywords"
                                    value={data.focus_keywords}
                                    onChange={(e) =>
                                        setData(
                                            "focus_keywords",
                                            e.target.value
                                        )
                                    }
                                    error={errors.focus_keywords}
                                    placeholder="Main keyword for SEO analysis"
                                    helperText="Primary keyword you want to rank for"
                                />
                            </CardContent>
                        </Card>

                        {/* Publishing Options */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Publishing Options</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <FormSelect
                                    label="Status"
                                    name="status"
                                    required
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    error={errors.status}
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">
                                        Publish Now
                                    </option>
                                    <option value="scheduled">Schedule</option>
                                </FormSelect>

                                {data.status === "scheduled" && (
                                    <div>
                                        <Label required>
                                            Scheduled Date & Time
                                        </Label>
                                        <div className="mt-2">
                                            <input
                                                type="datetime-local"
                                                value={data.scheduled_at}
                                                onChange={(e) =>
                                                    setData(
                                                        "scheduled_at",
                                                        e.target.value
                                                    )
                                                }
                                                className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                                            />
                                        </div>
                                        {errors.scheduled_at && (
                                            <p className="text-sm text-red-600 mt-2">
                                                {errors.scheduled_at}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {data.status === "published" && (
                                    <Alert
                                        variant="default"
                                        className="bg-green-50 border-green-200"
                                    >
                                        <AlertCircle className="h-4 w-4 text-green-600" />
                                        <p className="text-sm text-green-800">
                                            This article will be published
                                            immediately upon saving.
                                        </p>
                                    </Alert>
                                )}
                            </CardContent>
                        </Card>

                        {/* Submit Buttons */}
                        <Card>
                            <CardContent className="flex items-center justify-end gap-4 pt-6">
                                <Link href="/admin/articles">
                                    <Button type="button" variant="secondary">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing
                                        ? "Saving..."
                                        : isEdit
                                        ? "Update Article"
                                        : "Create Article"}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* SEO Analyzer Sidebar - Right Column */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6">
                            <SeoAnalyzer
                                title={data.title}
                                subtitle={data.subtitle}
                                slug={data.slug}
                                content={data.content}
                                metaTitle={data.meta_title}
                                metaDescription={data.meta_description}
                                metaKeywords={data.meta_keywords}
                                focusKeyword={data.focus_keywords}
                                tags={data.tags}
                            />
                        </div>
                    </div>
                </div>
            </form>

            {/* MediaPicker Dialog */}
            <MediaPicker
                open={showMediaPicker}
                onClose={() => setShowMediaPicker(false)}
                onSelect={handleMediaSelect}
                multiple={false}
                accept="image"
                folder="articles"
            />
        </AdminLayout>
    );
}
