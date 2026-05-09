import { nanoid } from "nanoid";
import { UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface EmploymentType {
  register: UseFormRegister<any>;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  location: string;
  summary: string;
  isCurrent: boolean;
  index: number;
  errors: any;
}

export default function EmploymentForm(prop: EmploymentType) {
  const invalidFieldClassName = "border-destructive ring-destructive/20";
  return (
    <div key={nanoid()} className="flex justify-between mb-12 mt-6">
      <div className="flex-1 xcollapse xcollapse-arrow rounded">
        {/* <input type="checkbox" className="peer" /> */}
        <div className="xcollapse-title text-lg font-medium pr-12">
          {prop.title && prop.company
            ? `${prop.title} at ${prop.company}`
            : `Employment # ${prop.index + 1}`}
        </div>
        <div className="xcollapse-content space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Job Title*</Label>
              <Input
                type="text"
                className={cn(prop.errors?.title && invalidFieldClassName)}
                aria-invalid={Boolean(prop.errors?.title)}
                placeholder="e.g. Software Engineer"
                defaultValue={prop.title}
                {...prop.register(`employments.${prop.index}.title`)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground">Company Name*</Label>
              <Input
                type="text"
                className={cn(prop.errors?.company && invalidFieldClassName)}
                aria-invalid={Boolean(prop.errors?.company)}
                defaultValue={prop.company}
                {...prop.register(`employments.${prop.index}.company`)}
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
                {...prop.register(`employments.${prop.index}.startDate`)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground">End Date*</Label>
              <Input
                type="month"
                className={cn(prop.errors?.endDate && invalidFieldClassName)}
                aria-invalid={Boolean(prop.errors?.endDate)}
                defaultValue={prop.endDate}
                {...prop.register(`employments.${prop.index}.endDate`)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Location</Label>
              <Input
                type="text"
                className={cn(prop.errors?.location && invalidFieldClassName)}
                aria-invalid={Boolean(prop.errors?.location)}
                placeholder="eg. Chennai"
                defaultValue={prop.location}
                {...prop.register(`employments.${prop.index}.location`, {})}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Is Present Company?</Label>
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-border text-primary focus:ring-2 focus:ring-ring/50"
                {...prop.register(`employments.${prop.index}.isCurrent`)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Summary*</Label>
              <Textarea
                className={cn("h-24", prop.errors?.summary && invalidFieldClassName)}
                aria-invalid={Boolean(prop.errors?.summary)}
                defaultValue={prop.summary}
                {...prop.register(`employments.${prop.index}.summary`, {
                  required: true,
                  maxLength: 4000,
                  minLength: 50,
                })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
