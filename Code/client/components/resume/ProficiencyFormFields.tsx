import { UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { cn } from "@/lib/utils";

type ProficiencyFormFieldsProps = {
  register: UseFormRegister<any>;
  index: number;
  basePath: "skills" | "languages";
  name: string;
  errors: any;
  nameLabel: string;
  namePlaceholder: string;
};

const invalidFieldClassName = "border-destructive ring-destructive/20";

export default function ProficiencyFormFields({
  register,
  index,
  basePath,
  name,
  errors,
  nameLabel,
  namePlaceholder,
}: ProficiencyFormFieldsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="space-y-2">
        <Label className="text-muted-foreground">{nameLabel}</Label>
        <Input
          type="text"
          className={cn(errors?.name && invalidFieldClassName)}
          aria-invalid={Boolean(errors?.name)}
          defaultValue={name}
          placeholder={namePlaceholder}
          {...register(`${basePath}.${index}.name`)}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-muted-foreground">Level*</Label>
        <NativeSelect
          className={cn(errors?.level && invalidFieldClassName)}
          aria-invalid={Boolean(errors?.level)}
          {...register(`${basePath}.${index}.level`)}
        >
          <option value="">- Select Level -</option>
          <option value="1" label="Novice"></option>
          <option value="2" label="Beginner"></option>
          <option value="3" label="Skillful"></option>
          <option value="4" label="Experienced"></option>
          <option value="5" label="Expert"></option>
        </NativeSelect>
      </div>
    </div>
  );
}