import { nanoid } from "nanoid";
import { UseFormRegister } from "react-hook-form";
import ProficiencyFormFields from "./ProficiencyFormFields";

interface SkillType {
  register: UseFormRegister<any>;
  name: string;
  level: string;
  index: number;
  errors: any;
}

export default function SkillForm(prop: SkillType) {
  return (
    <div key={nanoid()} className="flex justify-between mb-12 mt-6">
      <div className="flex-1">
        <ProficiencyFormFields
          register={prop.register}
          index={prop.index}
          basePath="skills"
          name={prop.name}
          errors={prop.errors}
          nameLabel="Skill Name*"
          namePlaceholder="e.g. Java"
        />
      </div>
    </div>
  );
}
