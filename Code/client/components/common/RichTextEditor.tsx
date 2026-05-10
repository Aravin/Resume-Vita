"use client";

import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { FaBold, FaItalic, FaListOl, FaListUl, FaUnderline } from "react-icons/fa";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { normalizeRichTextContent, sanitizeRichTextHtml } from "@/utils/richText";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  error?: boolean;
  minHeightClassName?: string;
}

function ToolbarButton({
  active,
  disabled,
  label,
  onClick,
  children,
}: {
  active: boolean;
  disabled: boolean;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      type="button"
      variant={active ? "secondary" : "ghost"}
      size="icon-sm"
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className="text-foreground"
    >
      {children}
    </Button>
  );
}

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-border/70 bg-muted/30 p-2">
      <ToolbarButton
        label="Bold"
        active={editor.isActive("bold")}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <FaBold className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Italic"
        active={editor.isActive("italic")}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <FaItalic className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Underline"
        active={editor.isActive("underline")}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <FaUnderline className="w-4 h-4" />
      </ToolbarButton>
      <div className="mx-1 h-6 w-px bg-border/80" />
      <ToolbarButton
        label="Bullet List"
        active={editor.isActive("bulletList")}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <FaListUl className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Ordered List"
        active={editor.isActive("orderedList")}
        disabled={!editor.can().chain().focus().toggleOrderedList().run()}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <FaListOl className="w-4 h-4" />
      </ToolbarButton>
    </div>
  );
};

export default function RichTextEditor({
  content,
  onChange,
  error = false,
  minHeightClassName = "min-h-[10rem]",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        blockquote: false,
        code: false,
        codeBlock: false,
        horizontalRule: false,
      }),
      Underline,
    ],
    content: normalizeRichTextContent(content),
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm max-w-none px-4 py-3 text-foreground focus:outline-none dark:prose-invert",
          minHeightClassName,
          "[&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-2 [&_ul]:list-disc [&_ul]:pl-5"
        ),
      },
    },
    onUpdate: ({ editor }) => {
      onChange(sanitizeRichTextHtml(editor.getHTML()));
    },
  });

  useEffect(() => {
    const normalizedContent = normalizeRichTextContent(content);

    if (editor && normalizedContent !== editor.getHTML()) {
      editor.commands.setContent(normalizedContent, false);
    }
  }, [content, editor]);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border bg-background",
        error ? "border-destructive ring-3 ring-destructive/20" : "border-input"
      )}
    >
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
