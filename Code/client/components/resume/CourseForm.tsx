import { nanoid } from "nanoid";
import { UseFormRegister } from "react-hook-form";

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
            <input
              type="month"
              className="input input-bordered font-medium"
              placeholder="Start Date"
              defaultValue={prop.startDate}
              {...prop.register(`courses.${prop.index}.startDate`)}
            />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text text-gray-500">End Date</span>
            </label>
            <input
              type="month"
              className="input input-bordered font-medium"
              placeholder="End Date"
              defaultValue={prop.endDate}
              {...prop.register(`courses.${prop.index}.endDate`, {})}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
