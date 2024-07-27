import { render, screen, fireEvent } from "@testing-library/react";
import CourseForm from "@/components/resume/CourseForm";
import { useForm } from "react-hook-form";

jest.mock("react-hook-form");

describe("CourseForm", () => {
  const mockRegister = jest.fn();
  const mockDelete = jest.fn();
  const mockErrors = { name: { message: "Invalid name" } };

  beforeEach(() => {
    jest.clearAllMocks();
    (useForm as jest.Mock).mockReturnValue({
      register: mockRegister,
      errors: mockErrors,
    });
  });

  it("renders the CourseForm component", () => {
    render(
      <CourseForm
        register={mockRegister}
        name="Test Course"
        institution="Test Institution"
        startDate="2023-01"
        endDate="2023-06"
        index={0}
        delete={mockDelete}
        errors={mockErrors}
      />
    );

    expect(screen.getByText("Course Name")).toBeInTheDocument();
    expect(screen.getByText("Institution Name")).toBeInTheDocument();
    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByText("End Date")).toBeInTheDocument();
    // expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });

  it("calls register with the correct field names", () => {
    render(
      <CourseForm
        register={mockRegister}
        name="Test Course"
        institution="Test Institution"
        startDate="2023-01"
        endDate="2023-06"
        index={0}
        delete={mockDelete}
        errors={mockErrors}
      />
    );

    expect(mockRegister).toHaveBeenCalledWith("courses.0.name");
    // expect(mockRegister).toHaveBeenCalledWith("courses.0.institution");
    // expect(mockRegister).toHaveBeenCalledWith("courses.0.startDate");
    // expect(mockRegister).toHaveBeenCalledWith("courses.0.endDate");
  });

  it("calls delete function when delete button is clicked", () => {
    render(
      <CourseForm
        register={mockRegister}
        name="Test Course"
        institution="Test Institution"
        startDate="2023-01"
        endDate="2023-06"
        index={0}
        delete={mockDelete}
        errors={mockErrors}
      />
    );

    const deleteButton = screen.getByRole("button", { name: "Delete" });
    fireEvent.click(deleteButton);

    expect(mockDelete).toHaveBeenCalledWith(0);
  });
});
