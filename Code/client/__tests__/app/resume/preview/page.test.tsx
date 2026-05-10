import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import Page from "@/app/resume/preview/page";
import { useSafeUser } from "../../../../hooks/useSafeUser";
import useFetch from "../../../../hooks/useFetch";
import { useDownloadPDF } from "../../../../hooks/useDownloadPDF";

jest.mock("axios");

jest.mock("../../../../hooks/useSafeUser", () => ({
  useSafeUser: jest.fn(),
}));

jest.mock("../../../../hooks/useFetch", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../../../hooks/useDownloadPDF", () => ({
  useDownloadPDF: jest.fn(),
}));

jest.mock("../../../../components/Breadcrumbs", () => ({
  Breadcrumbs: ({ currentPage }: { currentPage: string }) => <div data-testid="breadcrumbs">{currentPage}</div>,
}));

jest.mock("../../../../components/preview/DefaultTemplate", () => ({
  __esModule: true,
  default: ({ color }: { color: string }) => <div data-testid="default-template">Default:{color}</div>,
}));

jest.mock("../../../../components/preview/ModernTemplate", () => ({
  __esModule: true,
  default: ({ color }: { color: string }) => <div data-testid="modern-template">Modern:{color}</div>,
}));

describe("resume preview page", () => {
  const mockGenerateAndDownloadPDF = jest.fn();
  const mockDownloadExistingPDF = jest.fn();
  const mockResumeResponse = {
    user: "user-123",
    resume: {
      personal: {
        firstName: "Aravind",
        lastName: "Appadurai",
        summary: "<p>Senior engineer</p>",
      },
      employments: [{ title: "Lead Engineer" }],
    },
    color: "black",
    template: "default",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useSafeUser as jest.Mock).mockReturnValue({
      user: { sub: "auth0|user-123" },
      error: null,
      isLoading: false,
    });
    (useFetch as jest.Mock).mockReturnValue({
      data: mockResumeResponse,
      fetching: false,
      fetchError: null,
    });
    (useDownloadPDF as jest.Mock).mockReturnValue({
      downloadExistingPDF: mockDownloadExistingPDF,
      generateAndDownloadPDF: mockGenerateAndDownloadPDF,
      isSignedUrlLoading: false,
    });
    (axios.post as jest.Mock).mockResolvedValue({ data: {} });
  });

  it("renders the saved preview configuration and default template", async () => {
    render(<Page />);

    expect(await screen.findByTestId("breadcrumbs")).toHaveTextContent("Resume Preview");
    expect(screen.getByText("Preview Theme")).toBeInTheDocument();
    expect(screen.getByTestId("default-template")).toHaveTextContent("Default:black");
    expect(screen.getByText(/default template with the black accent/i)).toBeInTheDocument();
  });

  it("persists template and color changes without altering the resume payload", async () => {
    render(<Page />);

    await screen.findByTestId("default-template");

    fireEvent.click(screen.getByRole("button", { name: /modern/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/resume"),
        expect.objectContaining({
          user: "user-123",
          resume: mockResumeResponse.resume,
          color: "black",
          template: "modern",
        })
      );
    });

    fireEvent.click(screen.getByRole("button", { name: /select blue color/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/resume"),
        expect.objectContaining({
          user: "user-123",
          resume: mockResumeResponse.resume,
          color: "blue",
          template: "modern",
        })
      );
    });
  });

  it("falls back to the existing PDF only when generation fails on the backend", async () => {
    mockGenerateAndDownloadPDF.mockRejectedValueOnce(new Error("PDF generation failed - backend error"));

    render(<Page />);

    fireEvent.click(await screen.findByRole("button", { name: /download pdf/i }));

    await waitFor(() => {
      expect(mockDownloadExistingPDF).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: "user-123",
          fileName: "ResumeVita.pdf",
        })
      );
    });
  });

  it("does not fall back to an older PDF while a new one is still processing", async () => {
    mockGenerateAndDownloadPDF.mockRejectedValueOnce(new Error("Generated PDF is still processing"));

    render(<Page />);

    fireEvent.click(await screen.findByRole("button", { name: /download pdf/i }));

    await waitFor(() => {
      expect(mockGenerateAndDownloadPDF).toHaveBeenCalled();
    });

    expect(mockDownloadExistingPDF).not.toHaveBeenCalled();
  });
});