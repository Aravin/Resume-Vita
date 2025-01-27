import { nanoid } from "nanoid";
import { UseFormRegister } from "react-hook-form";

interface LinkType {
  register: UseFormRegister<any>;
  name: string;
  url: string;
  index: number;
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
    </div>
  );
}
