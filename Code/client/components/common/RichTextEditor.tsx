"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { FaBold, FaItalic, FaUnderline, FaListUl, FaListOl } from 'react-icons/fa';
import { useEffect } from 'react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  error?: boolean;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex gap-1 p-2 border-b border-base-300">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 hover:bg-base-200 rounded ${editor.isActive('bold') ? 'bg-base-300' : ''}`}
        aria-label="Bold"
        type="button"
      >
        <FaBold className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 hover:bg-base-200 rounded ${editor.isActive('italic') ? 'bg-base-300' : ''}`}
        aria-label="Italic"
        type="button"
      >
        <FaItalic className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={`p-2 hover:bg-base-200 rounded ${editor.isActive('underline') ? 'bg-base-300' : ''}`}
        aria-label="Underline"
        type="button"
      >
        <FaUnderline className="w-4 h-4" />
      </button>
      <div className="w-px bg-base-300 mx-1" />
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
        className={`p-2 hover:bg-base-200 rounded ${editor.isActive('bulletList') ? 'bg-base-300' : ''}`}
        aria-label="Bullet List"
        type="button"
      >
        <FaListUl className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        disabled={!editor.can().chain().focus().toggleOrderedList().run()}
        className={`p-2 hover:bg-base-200 rounded ${editor.isActive('orderedList') ? 'bg-base-300' : ''}`}
        aria-label="Ordered List"
        type="button"
      >
        <FaListOl className="w-4 h-4" />
      </button>
    </div>
  );
};

export default function RichTextEditor({ content, onChange, error }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
    ],
    content: content,
    editorProps: {
      attributes: {
        class: 'prose max-w-none min-h-[200px] p-4 focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Update editor content when prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className={`border rounded-lg overflow-hidden ${error ? 'border-error' : 'border-base-300'}`}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
