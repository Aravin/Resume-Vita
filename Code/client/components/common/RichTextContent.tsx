import { sanitizeRichTextHtml } from "@/utils/richText";

export default function RichTextContent({
  content,
  className = "",
}: {
  content: string;
  className?: string;
}) {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizeRichTextHtml(content) }}
    />
  );
}