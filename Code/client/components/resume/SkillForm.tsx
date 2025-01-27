import { nanoid } from "nanoid";
import { UseFormRegister } from "react-hook-form";

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-500">Skill Name*</span>
            </label>
            <input
              type="text"
              className={`input input-bordered font-medium ${
                prop.errors?.name && "input-error"
              }`}
              placeholder="e.g. Java"
              {...prop.register(`skills.${prop.index}.name`)}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-500">Level*</span>
            </label>
            <select
              className={`select select-bordered ${
                prop.errors?.level && "select-error"
              }`}
              {...prop.register(`skills.${prop.index}.level`)}
            >
              <option
                className="select-error"
                value=""
                label="- Select Level -"
              ></option>
              <option value="1" label="Novice"></option>
              <option value="2" label="Beginner"></option>
              <option value="3" label="Skillful"></option>
              <option value="4" label="Experienced"></option>
              <option value="5" label="Expert"></option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
