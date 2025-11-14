import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { useEffect, useState } from 'react';
import {
    Bold, Italic, List, ListOrdered, Heading2, Heading3,
    Link as LinkIcon, Image as ImageIcon, Youtube as YoutubeIcon,
    Undo, Redo, Underline as UnderlineIcon
} from 'lucide-react';
import { Button } from '@/Components/ui/Button';

export default function RichTextEditor({ value, onChange, placeholder = 'Start writing your article...' }) {
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [showImageInput, setShowImageInput] = useState(false);
    const [showVideoInput, setShowVideoInput] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [2, 3],
                },
            }),
            Underline,
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full h-auto my-4',
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 underline hover:text-blue-800',
                },
            }),
            Youtube.configure({
                HTMLAttributes: {
                    class: 'rounded-lg my-4',
                },
                width: 640,
                height: 360,
            }),
            Placeholder.configure({
                placeholder,
            }),
        ],
        content: value || '',
        editorProps: {
            attributes: {
                class: 'focus:outline-none min-h-[300px] p-4 text-gray-800',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || '');
        }
    }, [value, editor]);

    if (!editor) {
        return null;
    }

    const addLink = () => {
        if (linkUrl) {
            editor.chain().focus().setLink({ href: linkUrl }).run();
            setLinkUrl('');
            setShowLinkInput(false);
        }
    };

    const addImage = () => {
        if (imageUrl) {
            editor.chain().focus().setImage({ src: imageUrl }).run();
            setImageUrl('');
            setShowImageInput(false);
        }
    };

    const addVideo = () => {
        if (videoUrl) {
            editor.commands.setYoutubeVideo({ src: videoUrl });
            setVideoUrl('');
            setShowVideoInput(false);
        }
    };

    const MenuButton = ({ onClick, active, children, title }) => (
        <button
            type="button"
            onClick={onClick}
            className={`p-2 rounded hover:bg-gray-200 transition ${
                active ? 'bg-gray-300 text-blue-600' : 'text-gray-700'
            }`}
            title={title}
        >
            {children}
        </button>
    );

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
            {/* Custom Styles for Editor */}
            <style>{`
                .tiptap h2 {
                    font-size: 1.75rem;
                    font-weight: 700;
                    line-height: 2rem;
                    margin-top: 1.5rem;
                    margin-bottom: 1rem;
                    color: #1f2937;
                }
                .tiptap h3 {
                    font-size: 1.375rem;
                    font-weight: 700;
                    line-height: 1.75rem;
                    margin-top: 1.25rem;
                    margin-bottom: 0.75rem;
                    color: #374151;
                }
                .tiptap ul {
                    list-style-type: disc;
                    padding-left: 1.5rem;
                    margin-top: 1rem;
                    margin-bottom: 1rem;
                }
                .tiptap ol {
                    list-style-type: decimal;
                    padding-left: 1.5rem;
                    margin-top: 1rem;
                    margin-bottom: 1rem;
                }
                .tiptap li {
                    margin-top: 0.5rem;
                    margin-bottom: 0.5rem;
                    padding-left: 0.25rem;
                    line-height: 1.625;
                }
                .tiptap p {
                    margin-bottom: 1rem;
                    line-height: 1.75;
                }
                .tiptap strong {
                    font-weight: 700;
                    color: #111827;
                }
                .tiptap em {
                    font-style: italic;
                }
                .tiptap u {
                    text-decoration: underline;
                }
                .tiptap p.is-editor-empty:first-child::before {
                    color: #9ca3af;
                    content: attr(data-placeholder);
                    float: left;
                    height: 0;
                    pointer-events: none;
                }
            `}</style>

            {/* Toolbar */}
            <div className="border-b border-gray-300 bg-gray-50 p-2 flex flex-wrap gap-1">
                {/* Text Formatting */}
                <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        active={editor.isActive('bold')}
                        title="Bold (Ctrl+B)"
                    >
                        <Bold className="w-4 h-4" />
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        active={editor.isActive('italic')}
                        title="Italic (Ctrl+I)"
                    >
                        <Italic className="w-4 h-4" />
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        active={editor.isActive('underline')}
                        title="Underline (Ctrl+U)"
                    >
                        <UnderlineIcon className="w-4 h-4" />
                    </MenuButton>
                </div>

                {/* Headings */}
                <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        active={editor.isActive('heading', { level: 2 })}
                        title="Heading 2"
                    >
                        <Heading2 className="w-4 h-4" />
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        active={editor.isActive('heading', { level: 3 })}
                        title="Heading 3"
                    >
                        <Heading3 className="w-4 h-4" />
                    </MenuButton>
                </div>

                {/* Lists */}
                <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        active={editor.isActive('bulletList')}
                        title="Bullet List"
                    >
                        <List className="w-4 h-4" />
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        active={editor.isActive('orderedList')}
                        title="Numbered List"
                    >
                        <ListOrdered className="w-4 h-4" />
                    </MenuButton>
                </div>

                {/* Insert Elements */}
                <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
                    <MenuButton
                        onClick={() => setShowLinkInput(!showLinkInput)}
                        active={editor.isActive('link')}
                        title="Insert Link"
                    >
                        <LinkIcon className="w-4 h-4" />
                    </MenuButton>
                    <MenuButton
                        onClick={() => setShowImageInput(!showImageInput)}
                        title="Insert Image"
                    >
                        <ImageIcon className="w-4 h-4" />
                    </MenuButton>
                    <MenuButton
                        onClick={() => setShowVideoInput(!showVideoInput)}
                        title="Embed YouTube Video"
                    >
                        <YoutubeIcon className="w-4 h-4" />
                    </MenuButton>
                </div>

                {/* History */}
                <div className="flex gap-1">
                    <MenuButton
                        onClick={() => editor.chain().focus().undo().run()}
                        title="Undo (Ctrl+Z)"
                    >
                        <Undo className="w-4 h-4" />
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().redo().run()}
                        title="Redo (Ctrl+Y)"
                    >
                        <Redo className="w-4 h-4" />
                    </MenuButton>
                </div>
            </div>

            {/* Link Input */}
            {showLinkInput && (
                <div className="border-b border-gray-300 bg-blue-50 p-3 flex gap-2">
                    <input
                        type="url"
                        placeholder="Enter URL (e.g., https://example.com)"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addLink()}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <Button type="button" onClick={addLink} size="sm">
                        Add Link
                    </Button>
                    <Button type="button" onClick={() => setShowLinkInput(false)} variant="secondary" size="sm">
                        Cancel
                    </Button>
                </div>
            )}

            {/* Image Input */}
            {showImageInput && (
                <div className="border-b border-gray-300 bg-blue-50 p-3 flex gap-2">
                    <input
                        type="url"
                        placeholder="Enter image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addImage()}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <Button type="button" onClick={addImage} size="sm">
                        Add Image
                    </Button>
                    <Button type="button" onClick={() => setShowImageInput(false)} variant="secondary" size="sm">
                        Cancel
                    </Button>
                </div>
            )}

            {/* Video Input */}
            {showVideoInput && (
                <div className="border-b border-gray-300 bg-blue-50 p-3 flex gap-2">
                    <input
                        type="url"
                        placeholder="Enter YouTube URL"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addVideo()}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <Button type="button" onClick={addVideo} size="sm">
                        Embed Video
                    </Button>
                    <Button type="button" onClick={() => setShowVideoInput(false)} variant="secondary" size="sm">
                        Cancel
                    </Button>
                </div>
            )}

            {/* Editor Content */}
            <EditorContent editor={editor} />
        </div>
    );
}
