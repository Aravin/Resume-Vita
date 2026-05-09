import { render, screen } from "@testing-library/react";
import Page, { metadata } from "@/app/resume/create/page";

jest.mock("../../../../components/Breadcrumbs", () => ({
  Breadcrumbs: ({ currentPage }: { currentPage: string }) => (
    <div data-testid="breadcrumbs">{currentPage}</div>
  ),
}));

jest.mock("../../../../components/resume/Form", () => ({
  __esModule: true,
  default: () => <div data-testid="resume-form">Resume form</div>,
}));

describe("resume create page", () => {
  it("exports the correct metadata title", () => {
    expect(metadata.title).toBe("Create Resume");
  });

  it("renders the page shell, breadcrumbs, and form entrypoint", () => {
    render(<Page />);

    expect(screen.getByTestId("breadcrumbs")).toHaveTextContent("Create/Edit Resume");
    expect(
      screen.getByRole("heading", { name: "Create Resume" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Fill in the sections below, reorder items where needed, then save to open the preview."
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId("resume-form")).toBeInTheDocument();
  });
});