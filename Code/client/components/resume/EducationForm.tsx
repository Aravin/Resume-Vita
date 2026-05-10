import { UseFormRegister } from "react-hook-form";
import { nanoid } from "nanoid";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface EducationType {
  register: UseFormRegister<any>;
  institution: string;
  subject: string;
  startDate: string;
  endDate: string;
  location: string;
  score: string;
  index: number;
  errors: any;
}

export default function EducationForm(prop: EducationType) {
  const invalidFieldClassName = "border-destructive ring-destructive/20";
  return (
    <div key={nanoid()} className="flex justify-between mb-12 mt-6">
      <div className="flex-1 xcollapse xcollapse-arrow rounded">
        {/* <input type="checkbox" className="peer" /> */}
        <div className="xcollapse-title text-lg font-medium pr-12">
          {prop.subject && prop.institution
            ? `${prop.subject} at ${prop.institution}`
            : `Education # ${prop.index + 1}`}
        </div>
        <div className="xcollapse-content space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-muted-foreground">School/University*</Label>
              <Input
                type="text"
                className={cn(prop.errors?.institution && invalidFieldClassName)}
                aria-invalid={Boolean(prop.errors?.institution)}
                defaultValue={prop.institution}
                {...prop.register(`educations.${prop.index}.institution`)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground">Subject/Degree*</Label>
              <Input
                type="text"
                className={cn(prop.errors?.subject && invalidFieldClassName)}
                aria-invalid={Boolean(prop.errors?.subject)}
                defaultValue={prop.subject}
                {...prop.register(`educations.${prop.index}.subject`)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Start Date*</Label>
              <Input
                type="month"
                className={cn(prop.errors?.startDate && invalidFieldClassName)}
                aria-invalid={Boolean(prop.errors?.startDate)}
                defaultValue={prop.startDate}
                {...prop.register(`educations.${prop.index}.startDate`)}
              />
              {(
                prop.errors?.startDate?.message ||
                prop.errors?.endDate?.message ||
                (prop.errors?.message && String(prop.errors?.message))
              ) && (
                <p className="text-destructive text-sm mt-1">
                  {prop.errors?.startDate?.message || prop.errors?.endDate?.message || prop.errors?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground">End Date*</Label>
              <Input
                type="month"
                className={cn(prop.errors?.endDate && invalidFieldClassName)}
                aria-invalid={Boolean(prop.errors?.endDate)}
                defaultValue={prop.endDate}
                {...prop.register(`educations.${prop.index}.endDate`)}
              />
              {(
                prop.errors?.startDate?.message ||
                prop.errors?.endDate?.message ||
                (prop.errors?.message && String(prop.errors?.message))
              ) && (
                <p className="text-destructive text-sm mt-1">
                  {prop.errors?.startDate?.message || prop.errors?.endDate?.message || prop.errors?.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Score*</Label>
              <Input
                type="text"
                className={cn(prop.errors?.score && invalidFieldClassName)}
                aria-invalid={Boolean(prop.errors?.score)}
                placeholder="Score % or GPA or CGPA"
                defaultValue={prop.score}
                {...prop.register(`educations.${prop.index}.score`, {})}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Location</Label>
              <Input
                type="text"
                className={cn(prop.errors?.location && invalidFieldClassName)}
                aria-invalid={Boolean(prop.errors?.location)}
                placeholder="eg. Chennai"
                defaultValue={prop.location}
                {...prop.register(`educations.${prop.index}.location`, {})}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
