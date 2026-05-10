import { isStartBeforeEnd } from "@/lib/dateUtils";

type ValidationError = { path: string; message: string };

export function validateResumePayload(payload: any): ValidationError[] {
  const errors: ValidationError[] = [];
  const resume = payload?.resume;
  if (!resume) return errors;

  const checkPair = (basePath: string, item: any, index: number, allowCurrent = false) => {
    const start = item?.startDate;
    const end = item?.endDate;
    const isCurrent = !!item?.isCurrent;

    if (allowCurrent && isCurrent) return;
    if (!start || !end) return;
    if (!isStartBeforeEnd(start, end)) {
      errors.push({ path: `${basePath}.${index}`, message: "Start Date must be before End Date" });
    }
  };

  if (Array.isArray(resume.educations)) {
    resume.educations.forEach((it: any, i: number) => checkPair("educations", it, i));
  } else if (resume.educations !== undefined) {
    errors.push({ path: "educations", message: "Expected educations to be an array" });
  }

  if (Array.isArray(resume.internships)) {
    resume.internships.forEach((it: any, i: number) => checkPair("internships", it, i));
  } else if (resume.internships !== undefined) {
    errors.push({ path: "internships", message: "Expected internships to be an array" });
  }

  if (Array.isArray(resume.courses)) {
    resume.courses.forEach((it: any, i: number) => checkPair("courses", it, i));
  } else if (resume.courses !== undefined) {
    errors.push({ path: "courses", message: "Expected courses to be an array" });
  }

  if (Array.isArray(resume.employments)) {
    resume.employments.forEach((it: any, i: number) => checkPair("employments", it, i, true));
  } else if (resume.employments !== undefined) {
    errors.push({ path: "employments", message: "Expected employments to be an array" });
  }

  return errors;
}
