import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { ChevronLeft, X, Upload, Smile } from "lucide-react";
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
import { Switch } from "@/Components/ui/switch";
import { MediaPicker } from "@/Components/MediaPicker";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/Components/ui/tabs";

const EMOJI_SUGGESTIONS = [
    "🎯", "🤝", "💡", "🌱", "🏆", "⭐", "🚀", "🏗️",
    "🏡", "🏠", "🏢", "🏙️", "🌇", "🌆", "🌳", "🌿",
    "🔑", "🛠️", "📐", "📏", "🧱", "🔨", "⚒️", "🪜",
    "💼", "📊", "📈", "💰", "💎", "🎨", "✨", "🌟",
    "❤️", "💙", "💚", "💜", "🧡", "🤍", "🔥", "☀️",
    "🌏", "🌎", "🌍", "🗺️", "📍", "🧭", "🔍", "📣",
];

export default function Form({ value }) {
    const isEdit = value !== null;

    const { data, setData, post, processing, errors } = useForm({
        icon_emoji: value?.icon_emoji || "",
        icon_uid: value?.icon_uid || null,
        title: value?.title || "",
        description: value?.description || "",
        is_active: value?.is_active ?? true,
        _method: isEdit ? "PUT" : "POST",
    });

    const initialTab = value?.icon_uid ? "media" : "emoji";
    const [iconTab, setIconTab] = useState(initialTab);
    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(
        value?.icon_image || (value?.icon_url ? { url: value.icon_url } : null)
    );

    const handleTabChange = (tab) => {
        setIconTab(tab);
        if (tab === "emoji") {
            setData("icon_uid", null);
            setSelectedMedia(null);
        } else {
            setData("icon_emoji", "");
        }
    };

    const handleSelectEmoji = (emoji) => {
        setData("icon_emoji", emoji);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEdit
            ? `/admin/about/values/${value.uid}`
            : "/admin/about/values";
        post(url);
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/admin/about/values">
                            <ChevronLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {isEdit ? "Edit Core Value" : "Create Core Value"}
                        </h1>
                        <p className="text-muted-foreground">
                            {isEdit
                                ? "Update this core value"
                                : "Add a new core value to the About page"}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Value Details</CardTitle>
                            <CardDescription>
                                Choose an emoji or upload an image, then fill in
                                the content
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label>Icon</Label>
                                <Tabs
                                    value={iconTab}
                                    onValueChange={handleTabChange}
                                    className="w-full"
                                >
                                    <TabsList className="grid w-full grid-cols-2 max-w-md">
                                        <TabsTrigger value="emoji">
                                            <Smile className="h-4 w-4 mr-2" />
                                            Emoji
                                        </TabsTrigger>
                                        <TabsTrigger value="media">
                                            <Upload className="h-4 w-4 mr-2" />
                                            Image
                                        </TabsTrigger>
                                    </TabsList>

                                    <TabsContent
                                        value="emoji"
                                        className="space-y-4 pt-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-lg border-2 flex items-center justify-center bg-muted/40">
                                                {data.icon_emoji ? (
                                                    <span className="text-4xl leading-none">
                                                        {data.icon_emoji}
                                                    </span>
                                                ) : (
                                                    <Smile className="h-6 w-6 text-muted-foreground" />
                                                )}
                                            </div>
                                            <Input
                                                value={data.icon_emoji}
                                                onChange={(e) =>
                                                    setData(
                                                        "icon_emoji",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Paste or type an emoji"
                                                className="max-w-xs"
                                                maxLength={8}
                                            />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-2">
                                                Or pick a suggestion
                                            </p>
                                            <div className="grid grid-cols-8 sm:grid-cols-12 gap-1 p-3 border rounded-lg bg-muted/20">
                                                {EMOJI_SUGGESTIONS.map(
                                                    (emoji) => (
                                                        <button
                                                            type="button"
                                                            key={emoji}
                                                            onClick={() =>
                                                                handleSelectEmoji(
                                                                    emoji
                                                                )
                                                            }
                                                            className={`text-2xl p-2 rounded hover:bg-accent transition ${
                                                                data.icon_emoji ===
                                                                emoji
                                                                    ? "bg-accent ring-2 ring-primary"
                                                                    : ""
                                                            }`}
                                                        >
                                                            {emoji}
                                                        </button>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        {errors.icon_emoji && (
                                            <p className="text-sm text-destructive">
                                                {errors.icon_emoji}
                                            </p>
                                        )}
                                    </TabsContent>

                                    <TabsContent
                                        value="media"
                                        className="space-y-4 pt-4"
                                    >
                                        {selectedMedia?.url ? (
                                            <div className="space-y-2">
                                                <div className="relative inline-block rounded-lg overflow-hidden border bg-muted/20 p-4">
                                                    <img
                                                        src={selectedMedia.url}
                                                        alt="Icon preview"
                                                        className="w-24 h-24 object-contain"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="icon"
                                                        className="absolute top-1 right-1 h-6 w-6"
                                                        onClick={() => {
                                                            setSelectedMedia(
                                                                null
                                                            );
                                                            setData(
                                                                "icon_uid",
                                                                null
                                                            );
                                                        }}
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                                <div>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            setShowMediaPicker(
                                                                true
                                                            )
                                                        }
                                                    >
                                                        Change Image
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() =>
                                                    setShowMediaPicker(true)
                                                }
                                                className="h-32 w-full max-w-xs border-2 border-dashed"
                                            >
                                                <div className="flex flex-col items-center gap-2">
                                                    <Upload className="h-6 w-6 text-muted-foreground" />
                                                    <span className="text-sm">
                                                        Select from Media Library
                                                    </span>
                                                </div>
                                            </Button>
                                        )}
                                        {errors.icon_uid && (
                                            <p className="text-sm text-destructive">
                                                {errors.icon_uid}
                                            </p>
                                        )}
                                    </TabsContent>
                                </Tabs>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="title">
                                    Title{" "}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    placeholder="e.g., Excellence"
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
                                <Label htmlFor="description">
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    rows={3}
                                    placeholder="Describe what this value means to your company..."
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
                                            ? "Value is visible on the website"
                                            : "Value is hidden from the website"}
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
                            <Link href="/admin/about/values">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing
                                ? "Saving..."
                                : isEdit
                                ? "Update Value"
                                : "Create Value"}
                        </Button>
                    </div>
                </form>
            </div>

            <MediaPicker
                open={showMediaPicker}
                onClose={() => setShowMediaPicker(false)}
                onSelect={(media) => {
                    setSelectedMedia(media);
                    setData("icon_uid", media.uid);
                    setShowMediaPicker(false);
                }}
                accept="image"
                folder="about-values"
                recommendedSize="400 × 400px"
            />
        </AdminLayout>
    );
}
