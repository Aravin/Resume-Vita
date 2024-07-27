import { UseFormRegister } from "react-hook-form";
import DeleteModal from "./DeleteModel";
import { nanoid } from "nanoid";

interface EducationType {
  register: UseFormRegister<any>;
  institution: string;
  subject: string;
  startDate: string;
  endDate: string;
  location: string;
  score: string;
  index: number;
  delete: Function;
  errors: any;
  setDelete: any;
  showDelete: boolean;
}

export default function EducationForm(prop: EducationType) {
  return (
    <div key={nanoid()} className="flex justify-between mb-12 mt-6">
      <div className="flex-1 xcollapse xcollapse-arrow rounded">
        {/* <input type="checkbox" className="peer" /> */}
        <div className="xcollapse-title text-lg font-medium pr-12">
          {prop.subject && prop.institution
            ? `${prop.subject} at ${prop.institution}`
            : `Education # ${prop.index + 1}`}
        </div>
        <div className="xcollapse-content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-500">
                  School/University*
                </span>
              </label>
              <input
                type="text"
                className={`input input-bordered font-medium ${
                  prop.errors?.institution && "input-error"
                }`}
                defaultValue={prop.institution}
                {...prop.register(`educations.${prop.index}.institution`)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-500">
                  Subject/Degree*
                </span>
              </label>
              <input
                type="text"
                className={`input input-bordered font-medium ${
                  prop.errors?.subject && "input-error"
                }`}
                defaultValue={prop.subject}
                {...prop.register(`educations.${prop.index}.subject`)}
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
                {...prop.register(`educations.${prop.index}.startDate`)}
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
                {...prop.register(`educations.${prop.index}.endDate`, {})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-500">Score*</span>
              </label>
              <input
                type="text"
                className={`input input-bordered font-medium ${
                  prop.errors?.score && "input-error"
                }`}
                placeholder="Score % or GPA or CGPA"
                defaultValue={prop.score}
                {...prop.register(`educations.${prop.index}.score`, {})}
              />
            </div>
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
                {...prop.register(`educations.${prop.index}.location`, {})}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 ml-5 my-5">
        <button
          className="btn btn-outline btn-square tooltip"
          data-tip="Delete"
          aria-label="Delete"
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

      {prop.showDelete && (
        <DeleteModal
          delete={prop.delete}
          index={prop.index}
          close={prop.setDelete}
        />
      )}
    </div>
  );
}
