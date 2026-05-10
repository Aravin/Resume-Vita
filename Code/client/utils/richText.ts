import sanitizeHtml from "sanitize-html";

const BLOCK_TAGS = /<(p|div|h[1-6]|li|ul|ol|blockquote)[^>]*>/gi;
const TAGS = /<[^>]+>/g;
const HTML_ENTITY_MAP: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
};

export function hasRichTextMarkup(value: string | null | undefined) {
  return /<[^>]+>/.test(value ?? "");
}

export function normalizeRichTextContent(value: string | null | undefined) {
  const source = (value ?? "").trim();

  if (!source) {
    return "<p></p>";
  }

  if (hasRichTextMarkup(source)) {
    return source;
  }

  const paragraphs = source
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br />")}</p>`);

  return paragraphs.length > 0 ? paragraphs.join("") : "<p></p>";
}

export function sanitizeRichTextHtml(value: string | null | undefined) {
  const normalizedContent = normalizeRichTextContent(value);

  return sanitizeHtml(normalizedContent, {
    allowedTags: ["p", "br", "strong", "b", "em", "i", "u", "ul", "ol", "li"],
    allowedAttributes: {},
    allowedSchemes: [],
    disallowedTagsMode: "discard",
  });
}

export function getPlainTextFromRichText(value: string | null | undefined) {
  return sanitizeRichTextHtml(value)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(BLOCK_TAGS, "\n")
    .replace(TAGS, " ")
    .replace(/&(nbsp|amp|lt|gt|quot|#39);/g, (match) => HTML_ENTITY_MAP[match] ?? " ")
    .replace(/\s+\n/g, "\n")
    .replace(/\n\s+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

export function isRichTextEffectivelyEmpty(value: string | null | undefined) {
  return getPlainTextFromRichText(value).length === 0;
}

export function getRichTextCharacterCount(value: string | null | undefined) {
  return getPlainTextFromRichText(value).length;
}

export function sanitizeResumeRichTextFields<T extends Record<string, any>>(resume: T): T {
  return {
    ...resume,
    personal: resume.personal
      ? {
          ...resume.personal,
          summary: sanitizeRichTextHtml(resume.personal.summary),
        }
      : resume.personal,
    employments: Array.isArray(resume.employments)
      ? resume.employments.map((employment: Record<string, any>) => ({
          ...employment,
          summary: sanitizeRichTextHtml(employment.summary),
        }))
      : resume.employments,
    internships: Array.isArray(resume.internships)
      ? resume.internships.map((internship: Record<string, any>) => ({
          ...internship,
          summary: sanitizeRichTextHtml(internship.summary),
        }))
      : resume.internships,
  };
}