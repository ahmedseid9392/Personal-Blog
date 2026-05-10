"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function RichTextEditor({ content, onChange }) {

  const editor = useEditor({
    extensions: [StarterKit],
    content,
    immediatelyRender: false, // ✅ FIX HERE

    editorProps: {
      attributes: {
        class:
          "min-h-[250px] border rounded-xl px-4 py-3 outline-none",
      },
    },

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null; // ✅ important

  return <EditorContent editor={editor} />;
}