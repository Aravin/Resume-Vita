import { render, screen } from "@testing-library/react";
import CourseForm from "@/components/resume/CourseForm";
import EducationForm from "@/components/resume/EducationForm";
import EmploymentForm from "@/components/resume/EmploymentForm";
import ExperienceFormFields from "@/components/resume/ExperienceFormFields";
import InternshipForm from "@/components/resume/InternshipForm";
import LanguageForm from "@/components/resume/LanguageForm";
import LinkForm from "@/components/resume/LinkForm";
import ProficiencyFormFields from "@/components/resume/ProficiencyFormFields";
import ReferenceForm from "@/components/resume/ReferenceForm";
import SkillForm from "@/components/resume/SkillForm";

describe("resume field components", () => {
  const mockRegister = jest.fn(() => ({}));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders education fields with fallback heading and correct register paths", () => {
    render(
      <EducationForm
        register={mockRegister}
        institution=""
        subject=""
        startDate="2024-01"
        endDate="2024-12"
        location="Chennai"
        score="8.5"
        index={1}
        errors={{ subject: true }}
      />
    );

    expect(screen.getByText("Education # 2")).toBeInTheDocument();
    expect(screen.getByText("School/University*")).toBeInTheDocument();
    expect(screen.getByText("Subject/Degree*")).toBeInTheDocument();
    expect(mockRegister).toHaveBeenCalledWith("educations.1.institution");
    expect(mockRegister).toHaveBeenCalledWith("educations.1.subject");
    expect(mockRegister).toHaveBeenCalledWith("educations.1.startDate");
    expect(mockRegister).toHaveBeenCalledWith("educations.1.endDate");
    expect(mockRegister).toHaveBeenCalledWith("educations.1.score", {});
    expect(mockRegister).toHaveBeenCalledWith("educations.1.location", {});
  });

  it("renders course fields with stable labels and register paths", () => {
    render(
      <CourseForm
        register={mockRegister}
        name="System Design"
        institution="Udemy"
        startDate="2024-01"
        endDate="2024-06"
        index={0}
        errors={{ name: true }}
      />
    );

    expect(screen.getByLabelText("Course Name")).toHaveValue("System Design");
    expect(screen.getByLabelText("Institution Name")).toHaveValue("Udemy");
    expect(mockRegister).toHaveBeenCalledWith("courses.0.name");
    expect(mockRegister).toHaveBeenCalledWith("courses.0.institution");
    expect(mockRegister).toHaveBeenCalledWith("courses.0.startDate");
    expect(mockRegister).toHaveBeenCalledWith("courses.0.endDate");
  });

  it("renders employment fields through the shared experience helper", () => {
    render(
      <EmploymentForm
        register={mockRegister}
        title="Lead Engineer"
        company="EPAM"
        startDate="2023-01"
        endDate="2024-01"
        location="Chennai"
        summary="Built systems"
        isCurrent={true}
        index={0}
        errors={{}}
      />
    );

    expect(screen.getByText("Lead Engineer at EPAM")).toBeInTheDocument();
    expect(screen.getByText("Is Present Company?")).toBeInTheDocument();
    expect(mockRegister).toHaveBeenCalledWith("employments.0.title");
    expect(mockRegister).toHaveBeenCalledWith("employments.0.company");
    expect(mockRegister).toHaveBeenCalledWith("employments.0.startDate");
    expect(mockRegister).toHaveBeenCalledWith("employments.0.endDate");
    expect(mockRegister).toHaveBeenCalledWith("employments.0.location", {});
    expect(mockRegister).toHaveBeenCalledWith("employments.0.isCurrent");
    expect(mockRegister).toHaveBeenCalledWith("employments.0.summary", {
      required: true,
      maxLength: 4000,
      minLength: 50,
    });
  });

  it("renders internship fields without the current-company checkbox", () => {
    render(
      <InternshipForm
        register={mockRegister}
        title="Trainee"
        company="Acme"
        startDate="2023-01"
        endDate="2023-06"
        location="Remote"
        summary="Learned quickly"
        isCurrent={false}
        index={2}
        errors={{}}
      />
    );

    expect(screen.getByText("Trainee at Acme")).toBeInTheDocument();
    expect(screen.queryByText("Is Present Company?")).not.toBeInTheDocument();
    expect(mockRegister).toHaveBeenCalledWith("internships.2.title");
    expect(mockRegister).toHaveBeenCalledWith("internships.2.company");
    expect(mockRegister).toHaveBeenCalledWith("internships.2.summary", {
      required: true,
      maxLength: 4000,
      minLength: 50,
    });
  });

  it("renders skill fields against the skills base path", () => {
    render(
      <SkillForm
        register={mockRegister}
        name="Node.js"
        level="4"
        index={1}
        errors={{ level: true }}
      />
    );

    expect(screen.getByText("Skill Name*")).toBeInTheDocument();
    expect(screen.getByText("Level*")).toBeInTheDocument();
    expect(mockRegister).toHaveBeenCalledWith("skills.1.name");
    expect(mockRegister).toHaveBeenCalledWith("skills.1.level");
  });

  it("renders language fields against the languages base path", () => {
    render(
      <LanguageForm
        register={mockRegister}
        name="English"
        level="5"
        index={0}
        errors={{}}
      />
    );

    expect(screen.getByText("Language Name*")).toBeInTheDocument();
    expect(mockRegister).toHaveBeenCalledWith("languages.0.name");
    expect(mockRegister).toHaveBeenCalledWith("languages.0.level");
  });

  it("renders website link fields", () => {
    render(
      <LinkForm
        register={mockRegister}
        name="Portfolio"
        url="https://example.com"
        index={0}
        errors={{ url: true }}
      />
    );

    expect(screen.getByText("Website Name")).toBeInTheDocument();
    expect(screen.getByText("Link/URL (starts with http* or www.*)")).toBeInTheDocument();
    expect(mockRegister).toHaveBeenCalledWith("links.0.name", {});
    expect(mockRegister).toHaveBeenCalledWith("links.0.url", {});
  });

  it("renders reference fields", () => {
    render(
      <ReferenceForm
        register={mockRegister}
        name="Jane Doe"
        company="Acme"
        email="jane@example.com"
        phone="1234567890"
        index={0}
        errors={{ phone: true }}
      />
    );

    expect(screen.getByText("Full Name")).toBeInTheDocument();
    expect(screen.getByText("Company Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(mockRegister).toHaveBeenCalledWith("references.0.name");
    expect(mockRegister).toHaveBeenCalledWith("references.0.company");
    expect(mockRegister).toHaveBeenCalledWith("references.0.email");
    expect(mockRegister).toHaveBeenCalledWith("references.0.phone");
  });

  it("renders the shared experience fields with the optional checkbox", () => {
    render(
      <ExperienceFormFields
        register={mockRegister}
        index={3}
        basePath="employments"
        title="Architect"
        company="Contoso"
        startDate="2021-01"
        endDate="2022-01"
        location="Bengaluru"
        summary="Delivered key systems"
        errors={{ summary: true }}
        titlePlaceholder="e.g. Software Engineer"
        titleLabel="Job Title*"
        companyLabel="Company Name*"
        showIsCurrent={true}
      />
    );

    expect(screen.getByText("Job Title*")).toBeInTheDocument();
    expect(screen.getByText("Company Name*")).toBeInTheDocument();
    expect(screen.getByText("Is Present Company?")).toBeInTheDocument();
    expect(mockRegister).toHaveBeenCalledWith("employments.3.isCurrent");
  });

  it("renders the shared proficiency fields with the expected select options", () => {
    render(
      <ProficiencyFormFields
        register={mockRegister}
        index={2}
        basePath="skills"
        name="TypeScript"
        errors={{}}
        nameLabel="Skill Name*"
        namePlaceholder="e.g. Java"
      />
    );

    expect(screen.getByText("Skill Name*")).toBeInTheDocument();
    expect(document.querySelector('option[label="Novice"]')).toBeInTheDocument();
    expect(document.querySelector('option[label="Expert"]')).toBeInTheDocument();
    expect(mockRegister).toHaveBeenCalledWith("skills.2.name");
    expect(mockRegister).toHaveBeenCalledWith("skills.2.level");
  });
});