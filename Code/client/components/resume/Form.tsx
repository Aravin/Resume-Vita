"use client";

import { useSafeUser } from "../../hooks/useSafeUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Controller,
  FieldErrors,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResumeSchema } from "./ResumeSchema";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { resumeDefaultValues } from "./ResumeDefaultValue";
import EducationForm from "./EducationForm";
import EmploymentForm from "./EmploymentForm";
import InternshipForm from "./InternshipForm";
import SkillForm from "./SkillForm";
import LanguageForm from "./LanguageForm";
import LinkForm from "./LinkForm";
import CourseForm from "./CourseForm";
import ReferenceForm from "./ReferenceForm";
import DraggableFormItem from "../common/DraggableFormItem";
import Loader from "../Loader";
import axios from "axios";
import ScrollToTop from "../ScrollToTop";
import RichTextEditor from "../common/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { AtsScore } from "@/types/resume";
import { sanitizeResumeRichTextFields } from "@/utils/richText";

interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  summary: string;
}

interface EducationEntry {
  index?: number;
  institution: string;
  subject: string;
  startDate: string;
  endDate: string;
  score: number;
  location: string;
}

interface ExperienceEntry {
  index?: number;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  location: string;
  summary: string;
  isCurrent: boolean;
}

interface SkillEntry {
  index?: number;
  name: string;
  level: number;
}

interface LanguageEntry {
  index?: number;
  name: string;
  level: number;
}

interface LinkEntry {
  index?: number;
  name: string;
  url: string;
}

interface CourseEntry {
  index?: number;
  name: string;
  institution: string;
  startDate: string;
  endDate: string;
}

interface ReferenceEntry {
  index?: number;
  name: string;
  company: string;
  phone: string;
  email: string;
}

interface ResumeFormValues {
  personal: PersonalDetails;
  educations: EducationEntry[];
  internships: ExperienceEntry[];
  employments: ExperienceEntry[];
  skills: SkillEntry[];
  languages: LanguageEntry[];
  links: LinkEntry[];
  courses: CourseEntry[];
  references: ReferenceEntry[];
}

interface ResumeStoragePayload {
  user?: string;
  resume: ResumeFormValues;
}

interface ServerValidationError {
  path?: string;
}

type SectionName = Exclude<keyof ResumeFormValues, "personal">;
type SectionItemMap = {
  educations: EducationEntry;
  internships: ExperienceEntry;
  employments: ExperienceEntry;
  skills: SkillEntry;
  languages: LanguageEntry;
  links: LinkEntry;
  courses: CourseEntry;
  references: ReferenceEntry;
};
type MoveDirection = "up" | "down" | "top" | "bottom";
type SectionHandlers = {
  handleAdd: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleDelete: (index: number) => void;
  handleReorder: (oldIndex: number, newIndex: number) => void;
  handleMove: (index: number, direction: MoveDirection) => void;
};
type RenderableSectionItem = SectionItemMap[SectionName];
type FormGetValues = () => unknown;
type FormSetValue = (name: string, value: unknown) => void;

const emptySectionItems: SectionItemMap = {
  educations: {
    institution: "",
    subject: "",
    startDate: "",
    endDate: "",
    score: 0,
    location: "",
  },
  internships: {
    title: "",
    company: "",
    startDate: "",
    endDate: "",
    location: "",
    summary: "",
    isCurrent: false,
  },
  employments: {
    title: "",
    company: "",
    startDate: "",
    endDate: "",
    location: "",
    summary: "",
    isCurrent: false,
  },
  skills: {
    name: "",
    level: 0,
  },
  languages: {
    name: "",
    level: 0,
  },
  links: {
    name: "",
    url: "",
  },
  courses: {
    name: "",
    institution: "",
    startDate: "",
    endDate: "",
  },
  references: {
    name: "",
    company: "",
    phone: "",
    email: "",
  },
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const hasFieldErrorDetails = (value: unknown): value is { message?: unknown; type?: unknown } =>
  isRecord(value) && ("message" in value || "type" in value);

const hasUnsubscribeMethod = (value: unknown): value is { unsubscribe: () => void } =>
  isRecord(value) && typeof value.unsubscribe === "function";

const extractServerValidationErrors = (error: unknown): ServerValidationError[] => {
  let data: unknown;
  if (axios.isAxiosError(error)) {
    data = error.response?.data;
  } else if (isRecord(error)) {
    const maybeResponse = (error as Record<string, unknown>).response;
    if (isRecord(maybeResponse)) {
      data = maybeResponse.data;
    } else {
      data = undefined;
    }
  } else {
    data = undefined;
  }

  const maybeErrors = isRecord(data) ? (data as Record<string, unknown>).errors : undefined;

  if (!Array.isArray(maybeErrors)) {
    return [];
  }

  return maybeErrors.filter((item): item is ServerValidationError => isRecord(item));
};

const focusFieldByName = (fieldName: string) => {
  setTimeout(() => {
    const element =
      document.querySelector<HTMLElement>(`[data-field-name="${fieldName}"]`) ??
      document.querySelector<HTMLElement>(`[name="${fieldName}"]`);

    if (!element) {
      return;
    }

    try {
      if (typeof element.scrollIntoView === "function") {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } catch {}

    try {
      element.focus();
    } catch {}

    const wrapper = element.closest(".group") ?? element.closest('[data-slot="card"]');

    if (wrapper instanceof HTMLElement) {
      wrapper.classList.add("ring-4", "ring-destructive/30", "shadow-lg");
      setTimeout(() => {
        wrapper.classList.remove("ring-4", "ring-destructive/30", "shadow-lg");
      }, 2000);
    }
  }, 50);
};

interface ResumeResponse {
  resume?: ResumeFormValues;
  atsScore?: AtsScore;
}

type AtsImprovementCategory = keyof AtsScore["improvements"];
type SectionHintKey =
  | "personal"
  | "summary"
  | "education"
  | "internships"
  | "employment"
  | "skills"
  | "courses"
  | "links";

const POSITIVE_SUGGESTION_PATTERNS = [
  /well-structured/i,
  /looks good/i,
  /is strong/i,
  /great job/i,
  /excellent/i,
];

const SKILLS_LIST_SUGGESTION_PATTERNS = [
  /diverse skills/i,
  /technical skills/i,
  /soft skills/i,
  /key skills/i,
  /add more skills/i,
  /skill section/i,
];

const suggestionMatches = (suggestion: string, patterns: RegExp[]) =>
  patterns.some((pattern) => pattern.test(suggestion));

const normalizeAtsImprovements = (improvements: AtsScore["improvements"]) =>
  Object.fromEntries(
    Object.entries(improvements).map(([category, suggestions]) => [
      category,
      suggestions.filter((suggestion) => !suggestionMatches(suggestion, POSITIVE_SUGGESTION_PATTERNS)),
    ])
  ) as AtsScore["improvements"];

const getSectionSuggestions = (
  section: SectionHintKey,
  improvements: AtsScore["improvements"]
) => {
  const sources: Record<SectionHintKey, AtsImprovementCategory[]> = {
    personal: ["format"],
    summary: ["keywords", "content"],
    education: ["content", "format"],
    internships: ["content", "keywords"],
    employment: ["keywords", "content"],
    skills: ["keywords", "content", "format"],
    courses: ["content", "format"],
    links: ["format"],
  };

  const suggestions = sources[section].flatMap((category) => improvements[category]);

  if (section === "skills") {
    return suggestions
      .filter((suggestion) => suggestionMatches(suggestion, SKILLS_LIST_SUGGESTION_PATTERNS))
      .slice(0, 2);
  }

  return suggestions
    .filter((suggestion) => !suggestionMatches(suggestion, SKILLS_LIST_SUGGESTION_PATTERNS))
    .slice(0, 2);
};

const AddButton = ({ onClick, label }: { onClick: (event: React.MouseEvent<HTMLButtonElement>) => void; label: string }) => (
  <Button
    type="button"
    variant="outline"
    className="mt-4"
    onClick={onClick}
  >
    {label}
  </Button>
);

const FormSection = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => (
  <Card className="border-border/70 bg-card/95 shadow-sm">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      {subtitle && <CardDescription>{subtitle}</CardDescription>}
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

const InlineAtsGuide = ({
  title,
  description,
  suggestions,
}: {
  title: string;
  description: string;
  suggestions?: string[];
}) => {
  if (!suggestions?.length) {
    return null;
  }

  return (
    <div
      data-testid="inline-ats-guide"
      className="mb-4 rounded-2xl border border-amber-500/25 bg-amber-500/10 p-4"
    >
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">ATS field guide</p>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <ul className="mt-3 space-y-2">
        {suggestions.map((suggestion) => (
          <li key={`${title}-${suggestion}`} className="flex items-start gap-3 text-sm text-muted-foreground">
            <span className="mt-1 text-amber-700 dark:text-amber-300">•</span>
            <span>{suggestion}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Utility function for handling section items
const createSectionHandlers = <K extends SectionName>(
  sectionName: K,
  getValues: FormGetValues,
  setResume: React.Dispatch<React.SetStateAction<ResumeFormValues>>,
  setValue: FormSetValue
): SectionHandlers => {
  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const values = getValues() as ResumeFormValues;
    const items = values[sectionName];
    const newItems = [...items, { ...emptySectionItems[sectionName] }];
    // Update both resume state and form state
    setResume((prev) => ({ ...prev, [sectionName]: newItems }));
    setValue(sectionName, newItems);
  };

  const handleDelete = (index: number) => {
    const values = getValues() as ResumeFormValues;
    const items = values[sectionName];
    const newItems = items.filter((_, itemIndex: number) => itemIndex !== index);
    // Update both resume state and form state
    setResume((prev) => ({ ...prev, [sectionName]: newItems }));
    setValue(sectionName, newItems);
  };

  const handleMove = (index: number, direction: MoveDirection) => {
    const values = getValues() as ResumeFormValues;
    const items = [...values[sectionName]];
    const item = items[index];
    
    items.splice(index, 1);
    
    switch (direction) {
      case 'up':
        items.splice(index - 1, 0, item);
        break;
      case 'down':
        items.splice(index + 1, 0, item);
        break;
      case 'top':
        items.unshift(item);
        break;
      case 'bottom':
        items.push(item);
        break;
    }
    
    // Update both resume state and form state
    setResume((prev) => ({ ...prev, [sectionName]: items }));
    setValue(sectionName, items);
  };

  const handleReorder = (oldIndex: number, newIndex: number) => {
    const values = getValues() as ResumeFormValues;
    const items = [...values[sectionName]];
    const [movedItem] = items.splice(oldIndex, 1);
    items.splice(newIndex, 0, movedItem);
    // Update both resume state and form state
    setResume((prev) => ({ ...prev, [sectionName]: items }));
    setValue(sectionName, items);
  };

  return { handleAdd, handleDelete, handleReorder, handleMove };
};

const renderFormSection = (
  Component: React.ElementType,
  items: RenderableSectionItem[] | undefined,
  handlers: SectionHandlers,
  sectionErrors: unknown,
  addButtonLabel: string,
  register: unknown,
  control: unknown
) => (
  <div className="relative">
    <div className="space-y-4">
      {items?.map((item, index) => {
        return (
          <DraggableFormItem 
            key={index} 
            index={index}
            totalItems={items.length}
            onDragStop={handlers.handleReorder}
            onMove={handlers.handleMove}
            onDelete={handlers.handleDelete}
          >
            <Component 
              {...item} 
              index={index}
              register={register} 
              control={control}
              errors={Array.isArray(sectionErrors) ? sectionErrors[index] : undefined} 
            />
          </DraggableFormItem>
        );
      })}
    </div>
    <AddButton onClick={handlers.handleAdd} label={addButtonLabel} />
  </div>
);

export default function ResumeForm() {
  const router = useRouter();
  const { user, error, isLoading } = useSafeUser();
  const userId = user?.sub?.split("|")[1];
  const [resume, setResume] = useState<ResumeFormValues>(resumeDefaultValues);
  const [atsScore, setAtsScore] = useState<AtsScore | null>(null);
  const [isAtsGuideOpen, setIsAtsGuideOpen] = useState(true);
  const [, setLocalResume] = useLocalStorage<ResumeStoragePayload | null>("resumeData", null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    getValues,
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(ResumeSchema),
    defaultValues: resumeDefaultValues,
  });

  // Safe wrapper for `setValue` to allow dynamic field paths at runtime.
  // React Hook Form's `setValue` has a narrow, generated union type for field names,
  // so cast to `any` for dynamic updates (e.g., `employments.${i}.isCurrent`).
  const setValueSafe = (name: string, value: unknown) => setValue(name as any, value as any);

  // Watch for changes in employment's isCurrent field
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name?.includes('employments') && name?.endsWith('isCurrent') && type === 'change') {
        const employments = (value.employments as ResumeFormValues["employments"] | undefined) ?? [];
        const currentIndex = Number.parseInt(name.split('.')[1], 10);

        if (Number.isNaN(currentIndex)) {
          return;
        }
        
        // If the current checkbox is being checked and employments exist
        if (employments[currentIndex]?.isCurrent) {
          // Uncheck all other employments
          employments.forEach((_, index) => {
            if (index !== currentIndex && employments[index]?.isCurrent) {
              const isCurrentPath = `employments.${index}.isCurrent`;
              setValueSafe(isCurrentPath, false);
            }
          });
        }
      }
    });
    
    return () => {
      if (!subscription) return;
      const watchSubscription: unknown = subscription;
      if (typeof watchSubscription === "function") {
        watchSubscription();
        return;
      }
      if (hasUnsubscribeMethod(watchSubscription)) {
        watchSubscription.unsubscribe();
      }
    };
  }, [watch, setValue]);

  // Create handlers for all sections
    const sections = {
    educations: createSectionHandlers("educations", getValues as FormGetValues, setResume, setValueSafe as FormSetValue),
    internships: createSectionHandlers("internships", getValues as FormGetValues, setResume, setValueSafe as FormSetValue),
    employments: createSectionHandlers("employments", getValues as FormGetValues, setResume, setValueSafe as FormSetValue),
    skills: createSectionHandlers("skills", getValues as FormGetValues, setResume, setValueSafe as FormSetValue),
    languages: createSectionHandlers("languages", getValues as FormGetValues, setResume, setValueSafe as FormSetValue),
    links: createSectionHandlers("links", getValues as FormGetValues, setResume, setValueSafe as FormSetValue),
    courses: createSectionHandlers("courses", getValues as FormGetValues, setResume, setValueSafe as FormSetValue),
    references: createSectionHandlers("references", getValues as FormGetValues, setResume, setValueSafe as FormSetValue),
  };

  useEffect(() => {
    let isMounted = true;

    const emptyAtsSuggestions = {
      keywords: [],
      format: [],
      content: [],
    };

    async function fetchResume() {
      if (!userId) return;

      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT + `/resume/${userId}`
        );
        const data: ResumeResponse = await res.json();

        if (!isMounted) {
          return;
        }

        setAtsScore(
          data?.atsScore
            ? {
                ...data.atsScore,
                improvements: {
                  ...emptyAtsSuggestions,
                  ...data.atsScore.improvements,
                },
              }
            : null
        );

        if (data?.resume) {
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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setSubmitError(null);

    const normalizedResume = sanitizeResumeRichTextFields(data as ResumeFormValues);

    const resumeData = {
      user: userId,
      resume: normalizedResume,
    };

    setLocalResume(resumeData);

    try {
        await axios.post(
          "/api/resume",
          resumeData
        );
      router.push("/resume/preview");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Failed to save resume:", {
          message: error.message,
          status: error.response?.status,
          errors: (error.response?.data as any)?.errors,
        });
      } else {
        console.error("Failed to save resume:", { message: (error as any)?.message ?? String(error) });
      }
      // If server returned structured validation errors, focus the first problematic field
      const serverErrors = extractServerValidationErrors(error);
      if (Array.isArray(serverErrors) && serverErrors.length) {
        const first = serverErrors[0];
        const path = first?.path;
        if (path) {
          const fieldName = /^(educations|internships|courses|employments)\.\d+$/.test(path)
            ? `${path}.startDate`
            : path;

          focusFieldByName(fieldName);
        }
      }

      setSubmitError("We couldn’t save the resume right now. Please retry in a moment.");
    }
  };

  const findFirstErrorPath = (errs: unknown, prefix = ""): string | null => {
    if (!isRecord(errs)) return null;
    for (const key of Object.keys(errs)) {
      const val = errs[key];
      const path = prefix ? `${prefix}.${key}` : key;
      if (hasFieldErrorDetails(val)) {
        return path;
      }
      const inner = findFirstErrorPath(val, path);
      if (inner) return inner;
    }
    return null;
  };

  const onInvalid = (errs: FieldErrors<FieldValues>) => {
    const path = findFirstErrorPath(errs);
    if (!path) return;

    const fieldName = /^(educations|internships|courses|employments)\.\d+$/.test(path)
      ? `${path}.startDate`
      : path;

    focusFieldByName(fieldName);
  };

  if (isLoading) return <div><Loader /></div>;

  const invalidFieldClassName = "border-destructive ring-destructive/20";
  const getAtsStatusTone = (score: number) => {
    if (score >= 80) {
      return {
        badge: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
        border: "border-emerald-500/20",
        progress: "bg-emerald-500",
      };
    }

    if (score >= 60) {
      return {
        badge: "bg-amber-500/12 text-amber-700 dark:text-amber-300",
        border: "border-amber-500/20",
        progress: "bg-amber-500",
      };
    }

    return {
      badge: "bg-rose-500/12 text-rose-700 dark:text-rose-300",
      border: "border-rose-500/20",
      progress: "bg-rose-500",
    };
  };

  const atsCategoryMeta = {
    keywords: {
      label: "Keywords Match",
      emoji: "🔍",
      sections: "Profile Summary, Employment History, Skills, Websites / Social Links",
    },
    format: {
      label: "Format & Structure",
      emoji: "📄",
      sections: "Section completeness, dates, headings, links",
    },
    content: {
      label: "Content Quality",
      emoji: "✨",
      sections: "Profile Summary, Employment History, Education",
    },
  } satisfies Record<keyof AtsScore["details"], { label: string; emoji: string; sections: string }>;

  const filteredImprovements = atsScore
    ? normalizeAtsImprovements(atsScore.improvements)
    : null;

  const sectionHints = filteredImprovements
    ? {
        personal: getSectionSuggestions("personal", filteredImprovements),
        summary: getSectionSuggestions("summary", filteredImprovements),
        education: getSectionSuggestions("education", filteredImprovements),
        internships: getSectionSuggestions("internships", filteredImprovements),
        employment: getSectionSuggestions("employment", filteredImprovements),
        skills: getSectionSuggestions("skills", filteredImprovements),
        courses: getSectionSuggestions("courses", filteredImprovements),
        links: getSectionSuggestions("links", filteredImprovements),
      }
    : null;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-6">
        <Card className="border-border/70 bg-muted/20 shadow-sm">
          <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Editing Flow
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Complete the sections below, then save once to generate the latest preview.
              </p>
            </div>
            <div className="rounded-full border border-border/70 bg-background px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {isSubmitting ? "Saving..." : "Preview after save"}
            </div>
          </CardContent>
        </Card>
        {submitError && (
          <Card className="border-destructive/30 bg-destructive/10 shadow-none">
            <CardContent className="p-4 text-sm text-destructive">
              {submitError}
            </CardContent>
          </Card>
        )}

        <FormSection title="Personal Details">
          <div className="space-y-6">
            <InlineAtsGuide
              title="Keep contact details complete and parseable"
              description="ATS systems rely on clean contact and profile data. Make sure your details are complete and consistent."
              suggestions={sectionHints?.personal}
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="personal-firstName" className="text-muted-foreground">First Name*</Label>
                <Input
                  id="personal-firstName"
                  type="text"
                  className={cn(errors.personal?.firstName && invalidFieldClassName)}
                  aria-invalid={Boolean(errors.personal?.firstName)}
                  {...register("personal.firstName")}
                />
                {errors?.personal?.firstName && (
                  <p className="text-sm text-destructive">Please enter First Name</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="personal-lastName" className="text-muted-foreground">Last Name*</Label>
                <Input
                  id="personal-lastName"
                  type="text"
                  className={cn(errors.personal?.lastName && invalidFieldClassName)}
                  aria-invalid={Boolean(errors.personal?.lastName)}
                  {...register("personal.lastName")}
                />
                {errors?.personal?.lastName && (
                  <p className="text-sm text-destructive">Please enter Last Name</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="personal-email" className="text-muted-foreground">Email*</Label>
                <Input
                  id="personal-email"
                  type="text"
                  className={cn(errors.personal?.email && invalidFieldClassName)}
                  aria-invalid={Boolean(errors.personal?.email)}
                  {...register("personal.email")}
                />
                {errors?.personal?.email && (
                  <p className="text-sm text-destructive">Please enter Email Address</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="personal-phone" className="text-muted-foreground">Phone*</Label>
                <Input
                  id="personal-phone"
                  type="tel"
                  className={cn(errors.personal?.phone && invalidFieldClassName)}
                  aria-invalid={Boolean(errors.personal?.phone)}
                  {...register("personal.phone")}
                />
                {errors?.personal?.phone && (
                  <p className="text-sm text-destructive">Please enter Phone Number</p>
                )}
              </div>
            </div>
          </div>
        </FormSection>

        <FormSection title="Profile Summary">
          <div className="grid grid-cols-1 gap-6">
            <div className="flex-1 space-y-2">
              <Label htmlFor="personal-summary" className="text-muted-foreground">Summary*</Label>
              <InlineAtsGuide
                title="Strengthen the summary for keyword match"
                description="Mirror the job language and describe measurable strengths in a compact opening paragraph."
                suggestions={sectionHints?.summary}
              />
              <Controller
                name="personal.summary"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    content={field.value ?? ""}
                    onChange={field.onChange}
                    error={Boolean(errors.personal?.summary)}
                    minHeightClassName="min-h-[15rem] md:min-h-[10rem]"
                  />
                )}
              />
              {errors?.personal?.summary && (
                <p className="text-sm text-destructive">Please enter a stronger summary</p>
              )}
            </div>
          </div>
        </FormSection>

        <FormSection 
          title="Education*" 
          subtitle="Info: Add minimum 3 education to make resume better"
        >
          <InlineAtsGuide
            title="Use education to reinforce structure and credibility"
            description="Clear degree, school, and date details help ATS parsing and give reviewers more context."
            suggestions={sectionHints?.education}
          />
          {renderFormSection(
            EducationForm,
            resume?.educations,
            sections.educations,
            errors.educations,
            "Add Education",
            register,
            control
          )}
        </FormSection>

        <FormSection title="Internships">
          <InlineAtsGuide
            title="Show impact, not just responsibilities"
            description="Internship entries still help ATS scoring when they include relevant terms and concrete outcomes."
            suggestions={sectionHints?.internships}
          />
          {renderFormSection(
            InternshipForm,
            resume?.internships,
            sections.internships,
            errors.internships,
            "Add Internship",
            register,
            control
          )}
        </FormSection>

        <FormSection title="Employment History">
          <InlineAtsGuide
            title="Align each role with target-job keywords"
            description="This section usually has the biggest ATS impact. Prioritize role-specific language and measurable achievements here first."
            suggestions={sectionHints?.employment}
          />
          {renderFormSection(
            EmploymentForm,
            resume?.employments,
            sections.employments,
            errors.employments,
            "Add Employment",
            register,
            control
          )}
        </FormSection>

        <FormSection 
          title="Skills"
          subtitle="Info: Add minimum 3 skills to make resume better"
        >
          <InlineAtsGuide
            title="Tighten the skill list around search terms"
            description="ATS scanners look for direct matches here, so keep skills specific and close to the language used in the job post."
            suggestions={sectionHints?.skills}
          />
          {renderFormSection(
            SkillForm,
            resume?.skills,
            sections.skills,
            errors.skills,
            "Add More Skill",
            register,
            control
          )}
        </FormSection>

        <FormSection title="Language">
          {renderFormSection(
            LanguageForm,
            resume?.languages,
            sections.languages,
            errors.languages,
            "Add More Language",
            register,
            control
          )}
        </FormSection>

        <FormSection 
          title="Websites / Social Links"
          subtitle="Info: Add your blog/portfolio/github links"
        >
          <InlineAtsGuide
            title="Use links to support clarity and completeness"
            description="Well-labeled profile links improve structure and give recruiters direct access to supporting work."
            suggestions={sectionHints?.links}
          />
          {renderFormSection(
            LinkForm,
            resume?.links,
            sections.links,
            errors.links,
            "Add More Links",
            register,
            control
          )}
        </FormSection>

        <FormSection title="Certifications / Courses">
          <InlineAtsGuide
            title="Surface relevant coursework and certifications"
            description="Use this area to reinforce domain knowledge, tools, and qualifications mentioned in the target role."
            suggestions={sectionHints?.courses}
          />
          {renderFormSection(
            CourseForm,
            resume?.courses,
            sections.courses,
            errors.courses,
            "Add Course",
            register,
            control
          )}
        </FormSection>

        <FormSection title="References">
          {renderFormSection(
            ReferenceForm,
            resume?.references,
            sections.references,
            errors.references,
            "Add Reference",
            register,
            control
          )}
        </FormSection>

        {atsScore && (
          <Card className="border-border/70 bg-card/95 shadow-sm" data-testid="ats-guidance-panel">
            <CardHeader>
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <CardTitle>ATS Improvement Guide</CardTitle>
                  <CardDescription className="mt-2 max-w-3xl">
                    The section guides above are the primary edit prompts. Use this recap to double-check remaining weak areas before you save and preview.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-3 self-start md:self-auto">
                  <div className={cn("rounded-full px-3 py-1 text-xs font-medium", getAtsStatusTone(atsScore.overall).badge)}>
                    Overall ATS Score: {atsScore.overall}%
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    aria-expanded={isAtsGuideOpen}
                    aria-controls="ats-improvement-guide-content"
                    onClick={() => setIsAtsGuideOpen((isOpen) => !isOpen)}
                  >
                    {isAtsGuideOpen ? "Hide overview" : "Show overview"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            {isAtsGuideOpen && (
            <CardContent id="ats-improvement-guide-content" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                {Object.entries(atsScore.details).map(([category, score]) => {
                  const meta = atsCategoryMeta[category as keyof AtsScore["details"]];
                  const tone = getAtsStatusTone(score);

                  return (
                    <div key={category} className={cn("rounded-2xl border bg-muted/20 p-4", tone.border)}>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span aria-hidden="true">{meta.emoji}</span>
                          <span className="text-sm font-medium text-foreground">{meta.label}</span>
                        </div>
                        <span className="text-sm font-semibold text-foreground">{score}%</span>
                      </div>
                      <p className="mb-3 text-xs text-muted-foreground">Focus edits in: {meta.sections}</p>
                      <div className="h-2 w-full rounded-full bg-border/70">
                        <div className={cn("h-2 rounded-full transition-all", tone.progress)} style={{ width: `${score}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-4">
                {Object.entries(filteredImprovements ?? {}).map(([category, suggestions]) => {
                  if (!suggestions.length) {
                    return null;
                  }

                  const meta = atsCategoryMeta[category as keyof AtsScore["details"]];

                  return (
                    <div key={category} className="rounded-2xl border border-border/70 bg-muted/20 p-4">
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-semibold text-foreground">{meta.label}</h3>
                          <p className="mt-1 text-xs text-muted-foreground">Best places to edit: {meta.sections}</p>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {suggestions.map((suggestion) => (
                          <li key={`${category}-${suggestion}`} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <span className="mt-1 text-primary">•</span>
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </CardContent>
            )}
          </Card>
        )}

        <Card className="sticky bottom-4 z-20 border-border/70 bg-background/95 shadow-xl backdrop-blur supports-[backdrop-filter]:bg-background/85">
          <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Ready to review?</p>
              <p className="text-sm text-muted-foreground">
                Saving will update the resume and open the preview page.
              </p>
            </div>
            <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save and Preview"}
            </Button>
          </CardContent>
        </Card>
      </form>
      <ScrollToTop />
    </>
  );
}
