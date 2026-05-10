import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Page from "@/app/public/[id]/page";
import { useSignedUrl } from "../../../hooks/useSignedUrl";

jest.mock("../../../hooks/useSignedUrl", () => ({
  useSignedUrl: jest.fn(),
}));

describe("public resume page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders public resume actions when the signed PDF is available", async () => {
    (useSignedUrl as jest.Mock).mockReturnValue({
      getSignedUrl: jest.fn().mockResolvedValue("https://example.com/resume.pdf"),
    });

    render(<Page params={Promise.resolve({ id: "user-123" })} />);

    expect(await screen.findByText("PDF preview is unavailable in this browser")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /download/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /open/i })).toHaveAttribute(
      "href",
      "https://example.com/resume.pdf"
    );
  });

  it("shows the missing resume state when no PDF exists", async () => {
    (useSignedUrl as jest.Mock).mockReturnValue({
      getSignedUrl: jest.fn().mockRejectedValue(new Error("PDF not found")),
    });

    render(<Page params={Promise.resolve({ id: "missing-user" })} />);

    expect(await screen.findByText("Unable to load this resume")).toBeInTheDocument();
    expect(screen.getByText(/resume not found or no longer available/i)).toBeInTheDocument();
  });

  it("downloads the public PDF through a temporary link", async () => {
    const clickSpy = jest.fn();
    const appendSpy = jest.spyOn(document.body, "appendChild");
    const removeSpy = jest.spyOn(document.body, "removeChild");
    const originalCreateElement = document.createElement.bind(document);
    const createElementSpy = jest.spyOn(document, "createElement").mockImplementation(((tagName: string) => {
      const element = originalCreateElement(tagName) as HTMLAnchorElement;

      if (tagName === "a") {
        element.click = clickSpy;
      }

      return element;
    }) as typeof document.createElement);

    (useSignedUrl as jest.Mock).mockReturnValue({
      getSignedUrl: jest.fn().mockResolvedValue("https://example.com/resume.pdf"),
    });

    render(<Page params={Promise.resolve({ id: "user-123" })} />);

  fireEvent.click(await screen.findByRole("button", { name: /download/i }));

    await waitFor(() => {
      expect(clickSpy).toHaveBeenCalled();
      expect(appendSpy).toHaveBeenCalled();
      expect(removeSpy).toHaveBeenCalled();
    });

    createElementSpy.mockRestore();
    appendSpy.mockRestore();
    removeSpy.mockRestore();
  });
});