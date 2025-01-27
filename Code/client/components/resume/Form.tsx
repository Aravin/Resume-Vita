"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import EducationForm from "./EducationForm";
import EmploymentForm from "./EmploymentForm";
import ReferenceForm from "./ReferenceForm";
import CourseForm from "./CourseForm";
import LinkForm from "./LinkForm";
import SkillForm from "./SkillForm";
import LanguageForm from "./LanguageForm";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useRouter } from "next/navigation";
import axios from "axios";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Loader from "../Loader";
import InternshipForm from "./InternshipForm";
import { resumeDefaultValues } from "./ResumeDefaultValue";
import { ResumeSchema } from "./ResumeSchema";

// Utility function for handling section items
const createSectionHandlers = (sectionName: string, getValues: any, setResume: any, reset: any) => {
  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const values = getValues();
    const items = values[sectionName];
    const updatedItems = items ? [...items, {} as any] : [{} as any];
    setResume({ ...values, [sectionName]: updatedItems });
  };

  const handleDelete = (index: number) => {
    confirmAlert({
      title: "Delete",
      message: "Are you sure want to delete this record?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const values = getValues();
            const items = values[sectionName];
            const updatedItems = items?.filter((_: any, i: number) => i !== index);
            const updatedValues = { ...values, [sectionName]: updatedItems };
            setResume(updatedValues);
            reset(updatedValues);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return { handleAdd, handleDelete };
};

// Reusable form section component
const FormSection = ({ 
  title, 
  subtitle = "", 
  children 
}: { 
  title: string; 
  subtitle?: string; 
  children: React.ReactNode 
}) => (
  <>
    <h3>{title}</h3>
    {subtitle && <p className="font-light text-sm">{subtitle}</p>}
    <div className="bg-white p-6 rounded shadow">
      {children}
    </div>
  </>
);

// Add button component
const AddButton = ({ onClick, label }: { onClick: (e: any) => void; label: string }) => (
  <div className="pt-5">
    <button className="btn btn-outline" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
          clipRule="evenodd"
        />
      </svg>
      {label}
    </button>
  </div>
);

export default function ResumeForm() {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const userId = user?.sub?.split("|")[1];
  const [resume, setResume] = useState(resumeDefaultValues);
  const [localResume, setLocalResume] = useLocalStorage("resumeData", {} as any);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(ResumeSchema),
    defaultValues: resumeDefaultValues,
  });

  // Watch for changes in employment's isCurrent field
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name?.includes('employments') && name?.endsWith('isCurrent') && type === 'change') {
        const employments = value.employments || [];
        const currentIndex = parseInt(name.split('.')[1]);
        
        // If the current checkbox is being checked and employments exist
        if (employments[currentIndex]?.isCurrent) {
          // Uncheck all other employments
          employments.forEach((_, index) => {
            if (index !== currentIndex && employments[index]?.isCurrent) {
              setValue(`employments.${index}.isCurrent`, false);
            }
          });
        }
      }
    });
    
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  // Create handlers for all sections
  const sections = {
    educations: createSectionHandlers("educations", getValues, setResume, reset),
    internships: createSectionHandlers("internships", getValues, setResume, reset),
    employments: createSectionHandlers("employments", getValues, setResume, reset),
    skills: createSectionHandlers("skills", getValues, setResume, reset),
    languages: createSectionHandlers("languages", getValues, setResume, reset),
    links: createSectionHandlers("links", getValues, setResume, reset),
    courses: createSectionHandlers("courses", getValues, setResume, reset),
    references: createSectionHandlers("references", getValues, setResume, reset),
  };

  useEffect(() => {
    let isMounted = true;

    async function fetchResume() {
      if (!userId) return;

      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT + `/resume/${userId}`
        );
        const data = await res.json();

        if (isMounted && data?.resume) {
          setResume(data.resume);
          reset(data.resume);
        }
      } catch (error) {
        console.error('Failed to fetch resume:', error);
      }
    }

    fetchResume();
    return () => { isMounted = false; };
  }, [userId, reset]);

  const onSubmit: SubmitHandler<any> = async (data) => {
    const resumeData = {
      user: userId,
      resume: data,
    };

    setLocalResume(resumeData);

    try {
      await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT + "/resume",
        resumeData
      );
      router.push("/resume/preview");
    } catch (error) {
      console.error('Failed to save resume:', error);
      // Handle error appropriately
    }
  };

  if (isLoading) return <div><Loader /></div>;

  const renderFormSection = (
    Component: any,
    items: any[],
    handlers: { handleAdd: any; handleDelete: any },
    sectionErrors: any,
    addButtonLabel: string
  ) => (
    <>
      {items?.map((item: any, index: number) => {
        item.index = index;
        return <Component key={index} {...item} register={register} delete={handlers.handleDelete} errors={sectionErrors && sectionErrors[index]} />;
      })}
      <AddButton onClick={handlers.handleAdd} label={addButtonLabel} />
    </>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormSection title="Personal Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-500">First Name*</span>
            </label>
            <input
              type="text"
              className={`input input-bordered font-medium ${
                errors.personal?.firstName ? "input-error" : ""
              }`}
              {...register("personal.firstName")}
            />
            {errors?.personal?.firstName && (
              <label className="label">
                <span className="label-text text-gray-500-alt text-red-500">
                  Please enter First Name
                </span>
              </label>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-500">Last Name*</span>
            </label>
            <input
              type="text"
              className={`input input-bordered font-medium ${
                errors.personal?.lastName ? "input-error" : ""
              }`}
              {...register("personal.lastName")}
            />
            {errors?.personal?.lastName && (
              <label className="label">
                <span className="label-text text-gray-500-alt text-red-500">
                  Please enter Last Name
                </span>
              </label>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-500">Email*</span>
            </label>
            <input
              type="text"
              className={`input input-bordered font-medium ${
                errors.personal?.email ? "input-error" : ""
              }`}
              {...register("personal.email")}
            />
            {errors?.personal?.email && (
              <label className="label">
                <span className="label-text text-gray-500-alt text-red-500">
                  Please enter Email Address
                </span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-500">Phone*</span>
            </label>
            <input
              type="tel"
              className={`input input-bordered font-medium ${
                errors.personal?.phone ? "input-error" : ""
              }`}
              {...register("personal.phone")}
            />
            {errors?.personal?.phone && (
              <label className="label">
                <span className="label-text text-gray-500-alt text-red-500">
                  Please enter Phone Number
                </span>
              </label>
            )}
          </div>
        </div>
      </FormSection>

      <FormSection title="Profile Summary">
        <div className="grid grid-cols-1 gap-6">
          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text text-gray-500">Summary*</span>
            </label>
            <textarea
              rows={8}
              className={`textarea h-60 md:h-40 lg:h20 textarea-bordered font-medium ${
                errors.personal?.summary ? "input-error" : ""
              }`}
              {...register("personal.summary")}
            />
          </div>
        </div>
      </FormSection>

      <FormSection 
        title="Education*" 
        subtitle="Info: Add minimum 3 education to make resume better"
      >
        {renderFormSection(
          EducationForm,
          resume?.educations,
          sections.educations,
          errors.educations,
          "Add Education"
        )}
      </FormSection>

      <FormSection title="Internships">
        {renderFormSection(
          InternshipForm,
          resume?.internships,
          sections.internships,
          errors.internships,
          "Add Internship"
        )}
      </FormSection>

      <FormSection title="Employment History">
        {renderFormSection(
          EmploymentForm,
          resume?.employments,
          sections.employments,
          errors.employments,
          "Add Employment"
        )}
      </FormSection>

      <FormSection 
        title="Skills"
        subtitle="Info: Add minimum 3 skills to make resume better"
      >
        {renderFormSection(
          SkillForm,
          resume?.skills,
          sections.skills,
          errors.skills,
          "Add More Skill"
        )}
      </FormSection>

      <FormSection title="Language">
        {renderFormSection(
          LanguageForm,
          resume?.languages,
          sections.languages,
          errors.languages,
          "Add More Language"
        )}
      </FormSection>

      <FormSection 
        title="Websites / Social Links"
        subtitle="Info: Add your blog/portfolio/github links"
      >
        {renderFormSection(
          LinkForm,
          resume?.links,
          sections.links,
          errors.links,
          "Add More Links"
        )}
      </FormSection>

      <FormSection title="Certifications / Courses">
        {renderFormSection(
          CourseForm,
          resume?.courses,
          sections.courses,
          errors.courses,
          "Add Course"
        )}
      </FormSection>

      <FormSection title="References">
        {renderFormSection(
          ReferenceForm,
          resume?.references,
          sections.references,
          errors.references,
          "Add Reference"
        )}
      </FormSection>

      <div className="flex py-8">
        <input
          type="submit"
          className="btn btn-primary btn-block"
          value="Save and Preview"
        />
      </div>
    </form>
  );
}
