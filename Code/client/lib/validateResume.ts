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

  (resume.educations || []).forEach((it: any, i: number) => checkPair("educations", it, i));
  (resume.internships || []).forEach((it: any, i: number) => checkPair("internships", it, i));
  (resume.courses || []).forEach((it: any, i: number) => checkPair("courses", it, i));
  (resume.employments || []).forEach((it: any, i: number) => checkPair("employments", it, i, true));

  return errors;
}
