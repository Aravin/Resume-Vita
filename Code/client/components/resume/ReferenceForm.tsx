import { nanoid } from "nanoid";
import { UseFormRegister } from "react-hook-form";

interface ReferenceType {
  register: UseFormRegister<any>;
  name: string;
  company: string;
  email: string;
  phone: string;
  index: number;
  delete: Function;
  errors: any;
}

export default function ReferenceForm(prop: ReferenceType) {
  return (
    <div key={nanoid()} className="flex justify-between mb-12 mt-6">
      <div className="flex-1">
        <div className="grid-cols-1 md:grid-cols-2 gap-2 sm:gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-500">Full Name</span>
            </label>
            <input
              type="text"
              className={`input input-bordered font-medium ${
                prop.errors?.name && "input-error"
              }`}
              defaultValue={prop.name}
              {...prop.register(`references.${prop.index}.name`)}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-500">Company Name</span>
            </label>
            <input
              type="text"
              className={`input input-bordered font-medium ${
                prop.errors?.company && "input-error"
              }`}
              defaultValue={prop.company}
              {...prop.register(`references.${prop.index}.company`)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-500">Email</span>
            </label>
            <input
              type="email"
              className={`input input-bordered font-medium ${
                prop.errors?.email && "input-error"
              }`}
              defaultValue={prop.email}
              {...prop.register(`references.${prop.index}.email`)}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-500">Phone</span>
            </label>
            <input
              type="tel"
              className={`input input-bordered font-medium ${
                prop.errors?.phone && "input-error"
              }`}
              defaultValue={prop.phone}
              {...prop.register(`references.${prop.index}.phone`)}
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
