import { useRef, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { MediaPicker } from "./MediaPicker";
import ImageResize from "quill-resize-module";

// Register ImageResize module
Quill.register("modules/resize", ImageResize);

export default function RichTextEditor({
    value,
    onChange,
    placeholder = "Start writing...",
    className = "",
    error,
}) {
    const editorRef = useRef(null);
    const quillRef = useRef(null);
    const [showMediaPicker, setShowMediaPicker] = useState(false);

    // Handle media selection from MediaPicker
    const handleMediaSelect = (selectedMedia) => {
        if (selectedMedia && quillRef.current) {
            const range = quillRef.current.getSelection(true);

            // Insert image at current cursor position
            quillRef.current.insertEmbed(
                range.index,
                "image",
                selectedMedia.url
            );

            // Move cursor after the image
            quillRef.current.setSelection(range.index + 1);
        }
        setShowMediaPicker(false);
    };

    useEffect(() => {
        if (!editorRef.current || quillRef.current) return;

        // Image handler for uploading images
        const imageHandler = function () {
            // Open MediaPicker dialog
            setShowMediaPicker(true);
        };

        // Initialize Quill with ImageResize module
        const quill = new Quill(editorRef.current, {
            theme: "snow",
            placeholder: placeholder,
            modules: {
                toolbar: {
                    container: [
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        ["bold", "italic", "underline", "strike"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        [{ indent: "-1" }, { indent: "+1" }],
                        [{ align: [] }],
                        ["link", "image", "video"],
                        [{ color: [] }, { background: [] }],
                        ["blockquote", "code-block"],
                        ["clean"],
                    ],
                    handlers: {
                        image: imageHandler,
                    },
                },
                resize: {
                    locale: {},
                },
                clipboard: {
                    matchVisual: false,
                },
            },
        });

        quillRef.current = quill;

        // Set initial value
        if (value) {
            quill.root.innerHTML = value;
        }

        // Listen for text changes
        quill.on("text-change", () => {
            const html = quill.root.innerHTML;
            if (onChange) {
                onChange(html);
            }
        });

        // Cleanup
        return () => {
            quillRef.current = null;
        };
    }, []);

    // Update content when value changes externally
    useEffect(() => {
        if (quillRef.current && value !== quillRef.current.root.innerHTML) {
            const selection = quillRef.current.getSelection();
            quillRef.current.root.innerHTML = value || "";
            if (selection) {
                quillRef.current.setSelection(selection);
            }
        }
    }, [value]);

    return (
        <div className={className}>
            <div
                ref={editorRef}
                className={error ? "border-red-500 rounded-lg" : ""}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

            {/* MediaPicker Dialog */}
            <MediaPicker
                open={showMediaPicker}
                onClose={() => setShowMediaPicker(false)}
                onSelect={handleMediaSelect}
                multiple={false}
                accept="image"
                folder="articles"
            />

            <style>{`
                .quill {
                    background: white;
                }
                .ql-container {
                    min-height: 300px;
                    font-size: 16px;
                    font-family: inherit;
                }
                .ql-editor {
                    min-height: 300px;
                }
                .ql-editor.ql-blank::before {
                    color: #9ca3af;
                    font-style: normal;
                }
                .ql-toolbar {
                    background: #f9fafb;
                    border-top-left-radius: 0.5rem;
                    border-top-right-radius: 0.5rem;
                }
                .ql-container {
                    border-bottom-left-radius: 0.5rem;
                    border-bottom-right-radius: 0.5rem;
                }
                .ql-editor img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                }
                .ql-editor h1 {
                    font-size: 2rem;
                    font-weight: 700;
                    margin: 1.5rem 0 1rem;
                }
                .ql-editor h2 {
                    font-size: 1.75rem;
                    font-weight: 700;
                    margin: 1.25rem 0 0.75rem;
                }
                .ql-editor h3 {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin: 1rem 0 0.5rem;
                }
                .ql-editor h4 {
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin: 1rem 0 0.5rem;
                }
                .ql-editor p {
                    margin-bottom: 1rem;
                    line-height: 1.75;
                }
                .ql-editor ul,
                .ql-editor ol {
                    margin-bottom: 1rem;
                }
                .ql-editor li {
                    line-height: 1.75;
                }
                .ql-editor blockquote {
                    border-left: 4px solid #e5e7eb;
                    padding-left: 1rem;
                    margin: 1rem 0;
                    color: #6b7280;
                }
                .ql-editor pre.ql-syntax {
                    background: #1f2937;
                    color: #f9fafb;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    overflow-x: auto;
                    margin: 1rem 0;
                }
                .ql-snow .ql-picker.ql-header {
                    width: 100px;
                }
            `}</style>
        </div>
    );
}
