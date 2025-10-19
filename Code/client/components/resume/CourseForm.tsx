import { nanoid } from "nanoid";
import { UseFormRegister } from "react-hook-form";
import MonthYearPicker from "../common/MonthYearPicker";

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
  return (
    <div key={nanoid()} className="flex justify-between mb-12 mt-6">
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-500">Course Name</span>
            </label>
            <input
              type="text"
              className={`input input-bordered font-medium ${
                prop.errors?.name && "input-error"
              }`}
              defaultValue={prop.name}
              {...prop.register(`courses.${prop.index}.name`)}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-500">Institution Name</span>
            </label>
            <input
              type="text"
              className={`input input-bordered font-medium ${
                prop.errors?.institution && "input-error"
              }`}
              placeholder="e.g. Udemy"
              defaultValue={prop.institution}
              {...prop.register(`courses.${prop.index}.institution`)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-500">Start Date</span>
            </label>
            <MonthYearPicker
              register={prop.register(`courses.${prop.index}.startDate`)}
              defaultValue={prop.startDate}
              hasError={!!prop.errors?.startDate}
              placeholder="Select start month and year"
            />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text text-gray-500">End Date</span>
            </label>
            <MonthYearPicker
              register={prop.register(`courses.${prop.index}.endDate`)}
              defaultValue={prop.endDate}
              hasError={!!prop.errors?.endDate}
              placeholder="Select end month and year"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
