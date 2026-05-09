import { nanoid } from "nanoid";
import { UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ReferenceType {
  register: UseFormRegister<any>;
  name: string;
  company: string;
  email: string;
  phone: string;
  index: number;
  errors: any;
}

export default function ReferenceForm(prop: ReferenceType) {
  const invalidFieldClassName = "border-destructive ring-destructive/20";
  return (
    <div key={nanoid()} className="flex justify-between mb-12 mt-6">
      <div className="flex-1">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Full Name</Label>
              <Input
                type="text"
                className={cn(prop.errors?.name && invalidFieldClassName)}
                aria-invalid={Boolean(prop.errors?.name)}
                defaultValue={prop.name}
                {...prop.register(`references.${prop.index}.name`)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground">Company Name</Label>
              <Input
                type="text"
                className={cn(prop.errors?.company && invalidFieldClassName)}
                aria-invalid={Boolean(prop.errors?.company)}
                defaultValue={prop.company}
                {...prop.register(`references.${prop.index}.company`)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Email</Label>
              <Input
                type="email"
                className={cn(prop.errors?.email && invalidFieldClassName)}
                aria-invalid={Boolean(prop.errors?.email)}
                defaultValue={prop.email}
                {...prop.register(`references.${prop.index}.email`)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground">Phone</Label>
              <Input
                type="tel"
                className={cn(prop.errors?.phone && invalidFieldClassName)}
                aria-invalid={Boolean(prop.errors?.phone)}
                defaultValue={prop.phone}
                {...prop.register(`references.${prop.index}.phone`)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
