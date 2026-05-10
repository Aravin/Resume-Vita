import sanitizeHtml from "sanitize-html";

const BLOCK_LEVEL_TAGS = new Set(["p", "div", "h1", "h2", "h3", "h4", "h5", "h6", "li", "blockquote"]);
const HTML_ENTITY_MAP: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
};

function isWhitespaceCharacter(character: string) {
  return (
    character === " " ||
    character === "\n" ||
    character === "\r" ||
    character === "\t" ||
    character === "\f" ||
    character === "\v" ||
    character === "\u00A0"
  );
}

function extractTagName(tagContent: string) {
  const trimmedTagContent = tagContent.trim().replace(/^\//, "");
  const firstCharacter = trimmedTagContent[0];

  if (!firstCharacter || !((firstCharacter >= "a" && firstCharacter <= "z") || (firstCharacter >= "A" && firstCharacter <= "Z"))) {
    return "";
  }

  let index = 0;

  while (index < trimmedTagContent.length) {
    const character = trimmedTagContent[index];

    if (
      (character >= "a" && character <= "z") ||
      (character >= "A" && character <= "Z") ||
      (character >= "0" && character <= "9")
    ) {
      index += 1;
      continue;
    }

    break;
  }

  return trimmedTagContent.slice(0, index).toLowerCase();
}

function decodeHtmlEntity(value: string, startIndex: number) {
  for (const [entity, replacement] of Object.entries(HTML_ENTITY_MAP)) {
    if (value.startsWith(entity, startIndex)) {
      return {
        replacement,
        nextIndex: startIndex + entity.length,
      };
    }
  }

  return null;
}

function collapseInlineWhitespace(value: string) {
  let result = "";
  let pendingWhitespace = false;

  for (const character of value) {
    if (character === "\r") {
      continue;
    }

    if (isWhitespaceCharacter(character)) {
      pendingWhitespace = result.length > 0;
      continue;
    }

    if (pendingWhitespace) {
      result += " ";
      pendingWhitespace = false;
    }

    result += character;
  }

  return result;
}

function normalizePlainText(value: string) {
  const normalizedValue = value.replaceAll("\r", "");
  const lines = normalizedValue.split("\n");
  const normalizedLines: string[] = [];
  let previousLineWasBlank = true;

  for (const line of lines) {
    const collapsedLine = collapseInlineWhitespace(line);

    if (!collapsedLine) {
      if (!previousLineWasBlank && normalizedLines.length > 0) {
        normalizedLines.push("");
      }
      previousLineWasBlank = true;
      continue;
    }

    normalizedLines.push(collapsedLine);
    previousLineWasBlank = false;
  }

  return normalizedLines.join("\n").trim();
}

function extractPlainTextFromSanitizedHtml(value: string) {
  let result = "";
  let index = 0;

  while (index < value.length) {
    const character = value[index];

    if (character === "<") {
      const closingIndex = value.indexOf(">", index + 1);

      if (closingIndex === -1) {
        result += "<";
        index += 1;
        continue;
      }

      const tagContent = value.slice(index + 1, closingIndex);
      const tagName = extractTagName(tagContent);
      const isClosingTag = tagContent.trim().startsWith("/");

      if (tagName === "br") {
        result += "\n";
      } else if (!isClosingTag && BLOCK_LEVEL_TAGS.has(tagName)) {
        result += "\n";
      }

      index = closingIndex + 1;
      continue;
    }

    if (character === "&") {
      const decodedEntity = decodeHtmlEntity(value, index);

      if (decodedEntity) {
        result += decodedEntity.replacement;
        index = decodedEntity.nextIndex;
        continue;
      }
    }

    result += character;
    index += 1;
  }

  return normalizePlainText(result);
}

export function hasRichTextMarkup(value: string | null | undefined) {
  const source = value ?? "";
  let index = source.indexOf("<");

  while (index !== -1) {
    const closingIndex = source.indexOf(">", index + 1);

    if (closingIndex === -1) {
      return false;
    }

    if (extractTagName(source.slice(index + 1, closingIndex))) {
      return true;
    }

    index = source.indexOf("<", index + 1);
  }

  return false;
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
  return extractPlainTextFromSanitizedHtml(sanitizeRichTextHtml(value));
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