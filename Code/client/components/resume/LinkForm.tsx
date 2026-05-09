import { nanoid } from "nanoid";
import { UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface LinkType {
  register: UseFormRegister<any>;
  name: string;
  url: string;
  index: number;
  errors: any;
}

export default function LinkForm(prop: LinkType) {
  const invalidFieldClassName = "border-destructive ring-destructive/20";
  return (
    <div key={nanoid()} className="flex justify-between mb-12 mt-6">
      <div className="flex-1">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-muted-foreground">Website Name</Label>
            <Input
              type="text"
              className={cn(prop.errors?.name && invalidFieldClassName)}
              aria-invalid={Boolean(prop.errors?.name)}
              placeholder="My personal site"
              defaultValue={prop.name}
              {...prop.register(`links.${prop.index}.name`, {})}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground">Link/URL (starts with http* or www.*)</Label>
            <Input
              type="text"
              className={cn(prop.errors?.url && invalidFieldClassName)}
              aria-invalid={Boolean(prop.errors?.url)}
              placeholder="e.g yourname.com"
              defaultValue={prop.url}
              {...prop.register(`links.${prop.index}.url`, {})}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
