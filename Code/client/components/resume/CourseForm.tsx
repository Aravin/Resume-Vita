import { nanoid } from "nanoid";
import { UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CourseType {
  register: UseFormRegister<any>;
  name: string;
  institution: string;
  startDate: string;
  endDate: string;
  index: number;
  errors: any;
}

export default function CourseForm(prop: CourseType) {
  const nameId = `courses-${prop.index}-name`;
  const institutionId = `courses-${prop.index}-institution`;
  const startDateId = `courses-${prop.index}-startDate`;
  const endDateId = `courses-${prop.index}-endDate`;

  return (
    <div key={nanoid()} className="flex justify-between mb-12 mt-6">
      <div className="flex-1">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor={nameId} className="text-muted-foreground">
              Course Name
            </Label>
            <Input
              id={nameId}
              type="text"
              className={cn(prop.errors?.name && "border-destructive ring-destructive/20")}
              aria-invalid={Boolean(prop.errors?.name)}
              defaultValue={prop.name}
              {...prop.register(`courses.${prop.index}.name`)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={institutionId} className="text-muted-foreground">
              Institution Name
            </Label>
            <Input
              id={institutionId}
              type="text"
              className={cn(prop.errors?.institution && "border-destructive ring-destructive/20")}
              aria-invalid={Boolean(prop.errors?.institution)}
              placeholder="e.g. Udemy"
              defaultValue={prop.institution}
              {...prop.register(`courses.${prop.index}.institution`)}
            />
          </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={startDateId} className="text-muted-foreground">
                Start Date
              </Label>
              <Input
                id={startDateId}
                type="month"
                className={cn(prop.errors?.startDate && "border-destructive ring-destructive/20")}
                aria-invalid={Boolean(prop.errors?.startDate)}
                defaultValue={prop.startDate}
                {...prop.register(`courses.${prop.index}.startDate`)}
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

            <div className="flex-1 space-y-2">
              <Label htmlFor={endDateId} className="text-muted-foreground">
                End Date
              </Label>
              <Input
                id={endDateId}
                type="month"
                className={cn(prop.errors?.endDate && "border-destructive ring-destructive/20")}
                aria-invalid={Boolean(prop.errors?.endDate)}
                defaultValue={prop.endDate}
                {...prop.register(`courses.${prop.index}.endDate`)}
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
        </div>
      </div>
    </div>
  );
}
