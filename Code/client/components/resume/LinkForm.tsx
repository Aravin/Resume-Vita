import { nanoid } from "nanoid";
import { UseFormRegister } from "react-hook-form";

interface LinkType {
  register: UseFormRegister<any>;
  name: string;
  url: string;
  index: number;
  delete: Function;
  errors: any;
}

export default function LinkForm(prop: LinkType) {
  return (
    <div key={nanoid()} className="flex justify-between mb-12 mt-6">
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-500">Website Name</span>
            </label>
            <input
              type="text"
              className={`input input-bordered font-medium ${
                prop.errors?.name && "input-error"
              }`}
              placeholder="My personal site"
              defaultValue={prop.name}
              {...prop.register(`links.${prop.index}.name`, {})}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-500">
                Link/URL (starts with http* or www.*)
              </span>
            </label>
            <input
              type="text"
              className={`input input-bordered font-medium ${
                prop.errors?.url && "input-error"
              }`}
              placeholder="e.g yourname.com"
              defaultValue={prop.url}
              {...prop.register(`links.${prop.index}.url`, {})}
            />
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
