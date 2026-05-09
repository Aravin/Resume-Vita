import { nanoid } from "nanoid";
import { UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { cn } from "@/lib/utils";

interface LanguageType {
  register: UseFormRegister<any>;
  name: string;
  level: string;
  index: number;
  errors: any;
}

export default function LanguageForm(prop: LanguageType) {
  const invalidFieldClassName = "border-destructive ring-destructive/20";
  return (
    <div key={nanoid()} className="flex justify-between mb-12 mt-6">
      <div className="flex-1 rounded">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-muted-foreground">Language Name*</Label>
            <Input
              type="text"
              className={cn(prop.errors?.name && invalidFieldClassName)}
              aria-invalid={Boolean(prop.errors?.name)}
              placeholder="e.g English"
              {...prop.register(`languages.${prop.index}.name`)}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground">Level*</Label>
            <NativeSelect
              className={cn(prop.errors?.level && invalidFieldClassName)}
              aria-invalid={Boolean(prop.errors?.level)}
              {...prop.register(`languages.${prop.index}.level`)}
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
      </div>
    </div>
  );
}
