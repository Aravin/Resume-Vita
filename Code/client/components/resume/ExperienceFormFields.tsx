import { Control, Controller, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/common/RichTextEditor";
import { cn } from "@/lib/utils";

type ExperienceFormFieldsProps = {
  register: UseFormRegister<any>;
  control: Control<any>;
  index: number;
  basePath: "employments" | "internships";
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  location: string;
  summary: string;
  errors: any;
  titlePlaceholder: string;
  titleLabel: string;
  companyLabel: string;
  showIsCurrent?: boolean;
};

const invalidFieldClassName = "border-destructive ring-destructive/20";

export default function ExperienceFormFields({
  register,
  control,
  index,
  basePath,
  title,
  company,
  startDate,
  endDate,
  location,
  summary,
  errors,
  titlePlaceholder,
  titleLabel,
  companyLabel,
  showIsCurrent = false,
}: ExperienceFormFieldsProps) {
  return (
    <div className="xcollapse-content space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-muted-foreground">{titleLabel}</Label>
          <Input
            type="text"
            className={cn(errors?.title && invalidFieldClassName)}
            aria-invalid={Boolean(errors?.title)}
            placeholder={titlePlaceholder}
            defaultValue={title}
            {...register(`${basePath}.${index}.title`)}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-muted-foreground">{companyLabel}</Label>
          <Input
            type="text"
            className={cn(errors?.company && invalidFieldClassName)}
            aria-invalid={Boolean(errors?.company)}
            defaultValue={company}
            {...register(`${basePath}.${index}.company`)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-muted-foreground">Start Date*</Label>
          <Input
            type="month"
            className={cn(errors?.startDate && invalidFieldClassName)}
            aria-invalid={Boolean(errors?.startDate)}
            defaultValue={startDate}
            {...register(`${basePath}.${index}.startDate`)}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-muted-foreground">End Date*</Label>
          <Input
            type="month"
            className={cn(errors?.endDate && invalidFieldClassName)}
            aria-invalid={Boolean(errors?.endDate)}
            defaultValue={endDate}
            {...register(`${basePath}.${index}.endDate`)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-muted-foreground">Location</Label>
          <Input
            type="text"
            className={cn(errors?.location && invalidFieldClassName)}
            aria-invalid={Boolean(errors?.location)}
            placeholder="eg. Chennai"
            defaultValue={location}
            {...register(`${basePath}.${index}.location`, {})}
          />
        </div>

        {showIsCurrent && (
          <div className="space-y-2">
            <Label className="text-muted-foreground">Is Present Company?</Label>
            <input
              type="checkbox"
              className="h-5 w-5 rounded border-border text-primary focus:ring-2 focus:ring-ring/50"
              {...register(`${basePath}.${index}.isCurrent`)}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <Label className="text-muted-foreground">Summary*</Label>
          <Controller
            name={`${basePath}.${index}.summary`}
            control={control}
            render={({ field }) => (
              <RichTextEditor
                content={field.value ?? summary ?? ""}
                onChange={field.onChange}
                error={Boolean(errors?.summary)}
                minHeightClassName="min-h-[8rem]"
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}