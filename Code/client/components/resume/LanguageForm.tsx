import { nanoid } from "nanoid";
import { UseFormRegister } from "react-hook-form";

interface LanguageType {
  register: UseFormRegister<any>;
  name: string;
  level: string;
  index: number;
  delete: Function;
  errors: any;
}

export default function LanguageForm(prop: LanguageType) {
  return (
    <div key={nanoid()} className="flex justify-between mb-12 mt-6">
      <div className="flex-1 rounded">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-500">Language Name*</span>
            </label>
            <input
              type="text"
              className={`input input-bordered font-medium ${
                prop.errors?.name && "input-error"
              }`}
              placeholder="e.g English"
              {...prop.register(`languages.${prop.index}.name`)}
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
              {...prop.register(`languages.${prop.index}.level`)}
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

      <div className="flex-shrink-0 ml-5 my-5">
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
