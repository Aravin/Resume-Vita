import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import ResumeForm from "@/components/resume/Form";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSafeUser } from "../../../hooks/useSafeUser";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { sanitizeResumeRichTextFields } from "@/utils/richText";

jest.mock("axios");
jest.mock("react-hook-form", () => ({
  Controller: jest.fn(),
  useForm: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("../../../hooks/useSafeUser", () => ({
  useSafeUser: jest.fn(),
}));
jest.mock("../../../hooks/useLocalStorage", () => ({
  useLocalStorage: jest.fn(),
}));
jest.mock("../../../components/Loader", () => ({
  __esModule: true,
  default: () => <div>Loading resume form...</div>,
}));
jest.mock("../../../components/ScrollToTop", () => ({
  __esModule: true,
  default: () => <div data-testid="scroll-to-top" />,
}));
jest.mock("../../../components/common/RichTextEditor", () => ({
  __esModule: true,
  default: ({ content, onChange, error }: any) => (
    <div>
      <div data-testid="rich-text-editor" data-error={String(Boolean(error))}>
        {content}
      </div>
      <button type="button" onClick={() => onChange("<p>Updated rich text</p>")}>
        update-rich-text
      </button>
    </div>
  ),
}));
jest.mock("../../../components/common/DraggableFormItem", () => ({
  __esModule: true,
  default: ({ children, index, onDelete, onMove, onDragStop }: any) => (
    <div data-testid={`draggable-${index}`}>
      <button type="button" onClick={() => onDelete(index)}>
        delete-{index}
      </button>
      <button type="button" onClick={() => onMove(index, "bottom")}>
        move-bottom-{index}
      </button>
      <button type="button" onClick={() => onDragStop(index, index + 1)}>
        reorder-{index}
      </button>
      {children}
    </div>
  ),
}));

function childComponent(label: string) {
  return {
    __esModule: true,
    default: ({ index }: { index: number }) => <div>{`${label} ${index}`}</div>,
  };
}

jest.mock("../../../components/resume/EducationForm", () => childComponent("Education item"));
jest.mock("../../../components/resume/EmploymentForm", () => childComponent("Employment item"));
jest.mock("../../../components/resume/InternshipForm", () => childComponent("Internship item"));
jest.mock("../../../components/resume/SkillForm", () => childComponent("Skill item"));
jest.mock("../../../components/resume/LanguageForm", () => childComponent("Language item"));
jest.mock("../../../components/resume/LinkForm", () => childComponent("Link item"));
jest.mock("../../../components/resume/CourseForm", () => childComponent("Course item"));
jest.mock("../../../components/resume/ReferenceForm", () => childComponent("Reference item"));

describe("ResumeForm", () => {
  const skillsSuggestion =
    "Add more diverse skills including both technical skills and soft skills (aim for at least 7 key skills)";
  const leadershipSuggestion =
    "Consider adding more leadership keywords such as: coordinated, supervised, directed";
  const positiveFormatSuggestion = "Your resume format is well-structured!";
  const mockPush = jest.fn();
  const mockRegister = jest.fn((name: string) => ({
    name,
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ref: jest.fn(),
  }));
  const mockSetValue = jest.fn();
  const mockReset = jest.fn();
  const mockSetLocalResume = jest.fn();
  const mockUnsubscribe = jest.fn();
  const mockGetValues = jest.fn();
  let currentValues: any;
  let watchCallback:
    | ((value: any, info: { name?: string; type?: string }) => void)
    | undefined;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => undefined);
    watchCallback = undefined;
    currentValues = {
      personal: {
        firstName: "Aravind",
        lastName: "Appadurai",
        email: "aravin@example.com",
        phone: "1234567890",
        summary: "A".repeat(60),
      },
      educations: [
        { institution: "School 1", subject: "B.Tech" },
        { institution: "School 2", subject: "MBA" },
      ],
      internships: [],
      employments: [
        { title: "Engineer", company: "Acme", isCurrent: true },
        { title: "Lead", company: "Beta", isCurrent: true },
      ],
      skills: [{ name: "Node.js", level: "4" }],
      languages: [{ name: "English", level: "5" }],
      links: [],
      courses: [],
      references: [],
    };

    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSafeUser as jest.Mock).mockReturnValue({
      user: { sub: "auth0|user-123" },
      error: null,
      isLoading: false,
    });
    (useLocalStorage as jest.Mock).mockReturnValue([{}, mockSetLocalResume]);
    (Controller as jest.Mock).mockImplementation(({ name, render }: any) =>
      render({
        field: {
          name,
          value: name
            .split(".")
            .reduce((acc: any, key: string) => (acc == null ? acc : acc[key]), currentValues),
          onChange: jest.fn(),
          onBlur: jest.fn(),
          ref: jest.fn(),
        },
      })
    );
    mockGetValues.mockImplementation(() => currentValues);
    (useForm as jest.Mock).mockReturnValue({
      register: mockRegister,
      control: {},
      handleSubmit: (onValid: (data: any) => unknown) => async (event?: Event) => {
        event?.preventDefault?.();
        return onValid(currentValues);
      },
      watch: (callback?: (value: any, info: { name?: string; type?: string }) => void) => {
        if (typeof callback === "function") {
          watchCallback = callback;
          return { unsubscribe: mockUnsubscribe };
        }

        return currentValues;
      },
      setValue: mockSetValue,
      setFocus: jest.fn(),
      formState: { errors: {}, isSubmitting: false },
      getValues: mockGetValues,
      reset: mockReset,
    });
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({}),
    }) as jest.Mock;
    (axios.post as jest.Mock).mockResolvedValue({});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  const getSectionCard = (title: string) => screen.getByText(title).closest('[data-slot="card"]') as HTMLElement;

  it("renders a loader while the auth state is loading", () => {
    (useSafeUser as jest.Mock).mockReturnValue({
      user: null,
      error: null,
      isLoading: true,
    });

    render(<ResumeForm />);

    expect(screen.getByText("Loading resume form...")).toBeInTheDocument();
  });

  it("hydrates the form from the fetched resume when one exists", async () => {
    const fetchedResume = {
      ...currentValues,
      personal: {
        ...currentValues.personal,
        firstName: "Fetched",
      },
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({ resume: fetchedResume }),
    }) as jest.Mock;

    render(<ResumeForm />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/resume/user-123"));
      expect(mockReset).toHaveBeenCalledWith(fetchedResume);
    });
  });

  it("renders ATS guidance when the fetched resume includes atsScore", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        resume: currentValues,
        atsScore: {
          overall: 68,
          details: {
            keywords: 55,
            format: 72,
            content: 64,
          },
          improvements: {
            keywords: [
              "Add more role-specific keywords to your summary.",
              skillsSuggestion,
              leadershipSuggestion,
            ],
            format: [positiveFormatSuggestion, "Complete all core sections for stronger ATS parsing."],
            content: ["Quantify outcomes in your employment bullet points."],
          },
        },
      }),
    }) as jest.Mock;

    render(<ResumeForm />);

    expect(await screen.findByTestId("ats-guidance-panel")).toBeInTheDocument();
    expect(screen.getByText("Overall ATS Score: 68%")).toBeInTheDocument();
    expect(screen.getAllByText("Keywords Match").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Format & Structure").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Content Quality").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/ATS field guide/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText("Add more role-specific keywords to your summary.").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Quantify outcomes in your employment bullet points.").length).toBeGreaterThan(0);
    expect(screen.getAllByTestId("inline-ats-guide")[0]).toHaveClass("border-amber-500/25");
    expect(within(getSectionCard("Skills")).getByText(skillsSuggestion)).toBeInTheDocument();
    expect(within(getSectionCard("Skills")).queryByText(leadershipSuggestion)).not.toBeInTheDocument();
    expect(within(getSectionCard("Education*")).queryByText(skillsSuggestion)).not.toBeInTheDocument();
    expect(within(getSectionCard("Internships")).queryByText(skillsSuggestion)).not.toBeInTheDocument();
    expect(within(getSectionCard("Certifications / Courses")).queryByText(skillsSuggestion)).not.toBeInTheDocument();
    expect(screen.queryByText(positiveFormatSuggestion)).not.toBeInTheDocument();
  });

  it("collapses and expands the ATS Improvement Guide", async () => {
    const user = userEvent.setup();

    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        resume: currentValues,
        atsScore: {
          overall: 68,
          details: {
            keywords: 55,
            format: 72,
            content: 64,
          },
          improvements: {
            keywords: ["Add more role-specific keywords to your summary."],
            format: ["Complete all core sections for stronger ATS parsing."],
            content: ["Quantify outcomes in your employment bullet points."],
          },
        },
      }),
    }) as jest.Mock;

    render(<ResumeForm />);

    expect(await screen.findByTestId("ats-guidance-panel")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Hide overview" })).toHaveAttribute("aria-expanded", "true");

    await user.click(screen.getByRole("button", { name: "Hide overview" }));

    expect(screen.getByRole("button", { name: "Show overview" })).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Content Quality")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Show overview" }));

    expect(screen.getByRole("button", { name: "Hide overview" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByText("Content Quality").length).toBeGreaterThan(0);
  });

  it("renders the rich text summary editor through Controller", () => {
    render(<ResumeForm />);

    expect(screen.getByTestId("rich-text-editor")).toBeInTheDocument();
    expect(Controller).toHaveBeenCalledWith(
      expect.objectContaining({ name: "personal.summary" }),
      undefined
    );
  });

  it("adds a new skill item through the section handler", async () => {
    const user = userEvent.setup();
    render(<ResumeForm />);

    await user.click(screen.getByRole("button", { name: "Add More Skill" }));

    expect(mockSetValue).toHaveBeenCalledWith("skills", [
      ...currentValues.skills,
      { name: "", level: 0 },
    ]);
  });

  it("deletes and reorders education items through draggable controls", async () => {
    const user = userEvent.setup();
    render(<ResumeForm />);

    const educationItem = screen.getByText("Education item 0").parentElement;

    expect(educationItem).not.toBeNull();

    await user.click(within(educationItem as HTMLElement).getByRole("button", { name: "delete-0" }));
    await user.click(within(educationItem as HTMLElement).getByRole("button", { name: "move-bottom-0" }));
    await user.click(within(educationItem as HTMLElement).getByRole("button", { name: "reorder-0" }));

    expect(mockSetValue).toHaveBeenCalledWith("educations", [currentValues.educations[1]]);
    expect(mockSetValue).toHaveBeenCalledWith("educations", [
      currentValues.educations[1],
      currentValues.educations[0],
    ]);
    expect(mockSetValue).toHaveBeenCalledWith("educations", [
      currentValues.educations[1],
      currentValues.educations[0],
    ]);
  });

  it("keeps only one employment marked as current when the watcher fires", () => {
    render(<ResumeForm />);

    expect(watchCallback).toBeDefined();

    watchCallback?.(
      {
        employments: [
          { isCurrent: true },
          { isCurrent: true },
        ],
      },
      { name: "employments.1.isCurrent", type: "change" }
    );

    expect(mockSetValue).toHaveBeenCalledWith("employments.0.isCurrent", false);
  });

  it("submits successfully, persists locally, and navigates to preview", async () => {
    render(<ResumeForm />);

    fireEvent.click(screen.getByRole("button", { name: "Save and Preview" }));

    await waitFor(() => {
      const sanitizedResume = sanitizeResumeRichTextFields(currentValues);

      expect(mockSetLocalResume).toHaveBeenCalledWith({
        user: "user-123",
        resume: sanitizedResume,
      });
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/resume"),
        {
          user: "user-123",
          resume: sanitizedResume,
        }
      );
      expect(mockPush).toHaveBeenCalledWith("/resume/preview");
    });
  });

  it("focuses server-reported field when save fails with validation errors", async () => {
    // create a real input in the DOM so the component's DOM-focus behavior can target it
    const startInput = document.createElement('input');
    startInput.setAttribute('name', 'educations.0.startDate');
    document.body.appendChild(startInput);

    // update the useForm mock to submit normally
    (useForm as jest.Mock).mockReturnValueOnce({
      register: mockRegister,
      control: {},
      handleSubmit: (onValid: (data: any) => unknown) => async (event?: Event) => {
        event?.preventDefault?.();
        return onValid(currentValues);
      },
      watch: (callback?: (value: any, info: { name?: string; type?: string }) => void) => {
        if (typeof callback === "function") {
          watchCallback = callback;
          return { unsubscribe: mockUnsubscribe };
        }

        return currentValues;
      },
      setValue: mockSetValue,
      setFocus: jest.fn(),
      formState: { errors: {}, isSubmitting: false },
      getValues: mockGetValues,
      reset: mockReset,
    });

    (axios.post as jest.Mock).mockRejectedValueOnce({ response: { data: { errors: [{ path: 'educations.0' }] } } });

    render(<ResumeForm />);

    fireEvent.click(screen.getByRole("button", { name: "Save and Preview" }));

    await waitFor(() => {
      expect(mockSetLocalResume).toHaveBeenCalled();
      expect(document.activeElement).toBe(startInput);
    });

    // cleanup DOM
    startInput.remove();
  });

  it("shows a submit error when saving fails", async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error("save failed"));

    render(<ResumeForm />);

    fireEvent.click(screen.getByRole("button", { name: "Save and Preview" }));

    expect(
      await screen.findByText("We couldn’t save the resume right now. Please retry in a moment.")
    ).toBeInTheDocument();
  });
});