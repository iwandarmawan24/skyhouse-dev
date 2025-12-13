import { useRef, useEffect, useState } from "react";
import "quill/dist/quill.snow.css";
import { MediaPicker } from "./MediaPicker";

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
    const [isLoading, setIsLoading] = useState(true);

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

        let isMounted = true;

        const initQuill = async () => {
            try {
                // Dynamically import Quill and resize module
                const QuillModule = await import("quill");
                const Quill = QuillModule.default;

                const { default: ImageResize } = await import("quill-resize-image");

                if (!isMounted) return;

                // Register the resize module
                Quill.register("modules/resize", ImageResize);

                // Image handler for uploading images
                const imageHandler = function () {
                    setShowMediaPicker(true);
                };

                // Configure modules
                const modules = {
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
                        showSize: false, // Hide percentage/size display
                        locale: {},
                    },
                    clipboard: {
                        matchVisual: false,
                    },
                };

                // Initialize Quill instance
                const quill = new Quill(editorRef.current, {
                    theme: "snow",
                    placeholder: placeholder,
                    modules: modules,
                });

                if (!isMounted) return;

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

                // Mark as loaded
                setIsLoading(false);
            } catch (error) {
                console.error("Error initializing Quill:", error);
                setIsLoading(false);
            }
        };

        initQuill();

        // Cleanup
        return () => {
            isMounted = false;
            if (quillRef.current) {
                quillRef.current.off("text-change");
                quillRef.current = null;
            }
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
            {isLoading && (
                <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded-lg border border-gray-300">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                        <p className="text-sm text-gray-600">Loading editor...</p>
                    </div>
                </div>
            )}
            <div
                ref={editorRef}
                className={error ? "border-red-500 rounded-lg" : ""}
                style={{ display: isLoading ? 'none' : 'block' }}
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
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .ql-editor img:hover {
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                }
                /* Image resize handles */
                .ql-editor img.resize-active {
                    outline: 2px solid #3b82f6;
                    outline-offset: 2px;
                }
                .image-resizer {
                    position: absolute;
                    box-sizing: border-box;
                    border: 1px solid #3b82f6;
                }
                .image-resizer .handle {
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    background-color: #3b82f6;
                    border: 2px solid white;
                    border-radius: 50%;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
                }
                .image-resizer .handle.ne {
                    top: -6px;
                    right: -6px;
                    cursor: nesw-resize;
                }
                .image-resizer .handle.nw {
                    top: -6px;
                    left: -6px;
                    cursor: nwse-resize;
                }
                .image-resizer .handle.se {
                    bottom: -6px;
                    right: -6px;
                    cursor: nwse-resize;
                }
                .image-resizer .handle.sw {
                    bottom: -6px;
                    left: -6px;
                    cursor: nesw-resize;
                }
                /* Hide percentage/size display */
                .image-resizer-size-display,
                .image-size-display {
                    display: none !important;
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
