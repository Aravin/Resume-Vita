import { validateResumePayload } from "@/lib/validateResume";

describe("validateResumePayload", () => {
  it("returns error for reversed education dates", () => {
    const payload = {
      resume: {
        educations: [
          { institution: "X", subject: "Y", startDate: "2024-05", endDate: "2024-04", score: 5 },
        ],
      },
    };

    const errors = validateResumePayload(payload);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].path).toBe("educations.0");
  });

  it("does not return error when employment is current and endDate missing", () => {
    const payload = {
      resume: {
        employments: [
          { title: "Dev", company: "Acme", startDate: "2023-01", isCurrent: true },
        ],
      },
    };

    const errors = validateResumePayload(payload);
    expect(errors).toHaveLength(0);
  });

  it("returns error for reversed internship dates when endDate present", () => {
    const payload = {
      resume: {
        internships: [
          { title: "Intern", company: "Acme", startDate: "2024-06", endDate: "2024-05" },
        ],
      },
    };

    const errors = validateResumePayload(payload);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].path).toBe("internships.0");
  });
});
