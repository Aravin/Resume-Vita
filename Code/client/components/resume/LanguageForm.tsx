import { nanoid } from "nanoid";
import { UseFormRegister } from "react-hook-form";
import ProficiencyFormFields from "./ProficiencyFormFields";

interface LanguageType {
  register: UseFormRegister<any>;
  name: string;
  level: string;
  index: number;
  errors: any;
}

export default function LanguageForm(prop: LanguageType) {
  return (
    <div key={nanoid()} className="flex justify-between mb-12 mt-6">
      <div className="flex-1 rounded">
        <ProficiencyFormFields
          register={prop.register}
          index={prop.index}
          basePath="languages"
          name={prop.name}
          errors={prop.errors}
          nameLabel="Language Name*"
          namePlaceholder="e.g English"
        />
      </div>
    </div>
  );
}
