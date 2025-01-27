import { nanoid } from "nanoid";
import { UseFormRegister } from "react-hook-form";

interface ReferenceType {
  register: UseFormRegister<any>;
  name: string;
  company: string;
  email: string;
  phone: string;
  index: number;
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
    </div>
  );
}
