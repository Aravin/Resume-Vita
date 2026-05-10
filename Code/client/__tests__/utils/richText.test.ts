import { getPlainTextFromRichText, hasRichTextMarkup } from "@/utils/richText";

describe("richText utilities", () => {
  it("detects markup without regex backtracking", () => {
    expect(hasRichTextMarkup("<p>Hello</p>")).toBe(true);
    expect(hasRichTextMarkup("plain text only")).toBe(false);
    expect(hasRichTextMarkup("2 < 3 and 4 > 1")).toBe(false);
    expect(hasRichTextMarkup("unfinished <tag")).toBe(false);
  });

  it("extracts readable plain text from sanitized html", () => {
    expect(
      getPlainTextFromRichText(
        "<p>Hello&nbsp;<strong>world</strong></p><ul><li>One</li><li>Two &amp; three</li></ul><p>Line<br />break</p>"
      )
    ).toBe("Hello world\nOne\nTwo & three\nLine\nbreak");
  });

  it("normalizes repeated whitespace and blank lines", () => {
    expect(getPlainTextFromRichText("<p>  Hello   world  </p><p></p><p> Next line </p>")).toBe(
      "Hello world\n\nNext line"
    );
  });
});