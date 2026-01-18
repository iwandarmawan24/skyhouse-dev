import AdminLayout from "@/Layouts/AdminLayout";
import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { X, FileText, Download } from "lucide-react";
import { Button } from "@/Components/ui/Button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/Card";
import { MediaPicker } from "@/Components/MediaPicker";

export default function Edit({ brochure }) {
    const { data, setData, post, processing, errors } = useForm({
        file_uid: brochure?.file_uid || null,
        _method: "PUT",
    });

    // MediaPicker state
    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [selectedFile, setSelectedFile] = useState(brochure?.file || null);

    // File preview
    const [filePreview, setFilePreview] = useState(brochure?.file_url || null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/brochures");
    };

    const handleRemoveFile = () => {
        setData("file_uid", null);
        setFilePreview(null);
        setSelectedFile(null);
    };

    const handleMediaSelect = (media) => {
        setSelectedFile(media);
        setData("file_uid", media.uid);
        setFilePreview(media.url);
        setShowMediaPicker(false);
    };

    const isPDF = selectedFile?.mime_type === 'application/pdf' || selectedFile?.filename?.endsWith('.pdf');

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Page Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Brochure Settings
                    </h1>
                    <p className="text-muted-foreground">
                        Manage the product brochure file (PDF or Image)
                    </p>
                </div>

                {/* Form Card */}
                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Brochure File</CardTitle>
                            <CardDescription>
                                Upload a PDF or image file for the product brochure
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* File Upload */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    File{" "}
                                    <span className="text-destructive">*</span>
                                </label>

                                {filePreview ? (
                                    <div className="relative border rounded-lg p-4 space-y-4">
                                        <div className="relative">
                                            {isPDF ? (
                                                <div className="flex items-center gap-4 p-6 bg-muted rounded-lg">
                                                    <div className="flex-shrink-0 w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center">
                                                        <FileText className="w-8 h-8 text-red-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-medium text-lg">PDF Document</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {selectedFile?.filename || 'brochure.pdf'}
                                                        </p>
                                                        {selectedFile?.size && (
                                                            <p className="text-xs text-muted-foreground mt-1">
                                                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                                            </p>
                                                        )}
                                                    </div>
                                                    <a
                                                        href={filePreview}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex-shrink-0"
                                                    >
                                                        <Button type="button" variant="outline" size="sm">
                                                            <Download className="h-4 w-4 mr-2" />
                                                            Download
                                                        </Button>
                                                    </a>
                                                </div>
                                            ) : (
                                                <img
                                                    src={filePreview}
                                                    alt="Brochure preview"
                                                    className="w-full h-64 object-cover rounded-lg"
                                                />
                                            )}
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute top-2 right-2"
                                                onClick={handleRemoveFile}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        {selectedFile && (
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm text-muted-foreground">
                                                    {selectedFile.filename}
                                                </p>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setShowMediaPicker(true)}
                                                >
                                                    Change File
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <FileText className="h-12 w-12 text-muted-foreground" />
                                            <p className="text-sm text-muted-foreground">
                                                No file selected
                                            </p>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setShowMediaPicker(true)}
                                            >
                                                Choose from Media Library
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {errors.file_uid && (
                                    <p className="text-sm text-destructive">
                                        {errors.file_uid}
                                    </p>
                                )}
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">
                                        Select a PDF or image file from the Media Library (folder: <strong>brochures</strong>).
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Accepted formats: PDF, JPG, PNG. Upload files to the "brochures" folder in Media Library if not available.
                                    </p>
                                </div>
                            </div>

                            {/* Last Updated Info */}
                            {brochure?.updated_at && (
                                <div className="bg-muted/50 rounded-lg p-4">
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Last Updated:</strong> {brochure.updated_at}
                                    </p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="flex justify-end gap-2">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                >
                                    {processing ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>

            {/* Media Picker Modal */}
            <MediaPicker
                open={showMediaPicker}
                onClose={() => setShowMediaPicker(false)}
                onSelect={handleMediaSelect}
                accept="all"
                folder="brochures"
            />
        </AdminLayout>
    );
}
