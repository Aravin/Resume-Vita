import { nanoid } from "nanoid";
import { UseFormRegister } from "react-hook-form";

interface EmploymentType {
  register: UseFormRegister<any>;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  location: string;
  summary: string;
  isCurrent: boolean;
  index: number;
  delete: Function;
  errors: any;
}

export default function EmploymentForm(prop: EmploymentType) {
  return (
    <div key={nanoid()} className="flex justify-between mb-12 mt-6">
      <div className="flex-1 xcollapse xcollapse-arrow rounded">
        {/* <input type="checkbox" className="peer" /> */}
        <div className="xcollapse-title text-lg font-medium pr-12">
          {prop.title && prop.company
            ? `${prop.title} at ${prop.company}`
            : `Employment # ${prop.index + 1}`}
        </div>
        <div className="xcollapse-content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-500">Job Title*</span>
              </label>
              <input
                type="text"
                className={`input input-bordered font-medium ${
                  prop.errors?.title && "input-error"
                }`}
                placeholder="e.g. Software Engineer"
                defaultValue={prop.title}
                {...prop.register(`employments.${prop.index}.title`)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-500">Company Name*</span>
              </label>
              <input
                type="text"
                className={`input input-bordered font-medium ${
                  prop.errors?.company && "input-error"
                }`}
                defaultValue={prop.company}
                {...prop.register(`employments.${prop.index}.company`)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-500">Start Date*</span>
              </label>
              <input
                type="month"
                className={`input input-bordered font-medium ${
                  prop.errors?.startDate && "input-error"
                }`}
                defaultValue={prop.startDate}
                {...prop.register(`employments.${prop.index}.startDate`)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-500">End Date*</span>
              </label>
              <input
                type="month"
                className={`input input-bordered font-medium ${
                  prop.errors?.endDate && "input-error"
                }`}
                defaultValue={prop.endDate}
                {...prop.register(`employments.${prop.index}.endDate`, {})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-500">Location</span>
              </label>
              <input
                type="text"
                className={`input input-bordered font-medium ${
                  prop.errors?.location && "input-error"
                }`}
                placeholder="eg. Chennai"
                defaultValue={prop.location}
                {...prop.register(`employments.${prop.index}.location`, {})}
              />
            </div>
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text text-gray-500">
                  Is Present Company?
                </span>
              </label>
              <input
                type="checkbox"
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                {...prop.register(`employments.${prop.index}.isCurrent`)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-500">Summary*</span>
              </label>
              <textarea
                className={`textarea h-24 textarea-bordered font-medium ${
                  prop.errors?.summary && "input-error"
                }`}
                defaultValue={prop.summary}
                {...prop.register(`employments.${prop.index}.summary`, {
                  required: true,
                  maxLength: 4000,
                  minLength: 50,
                })}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="ml-5 my-5">
        <button
          className="btn btn-outline btn-square tooltip"
          data-tip="Delete"
          onClick={() => prop.delete(prop.index)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
