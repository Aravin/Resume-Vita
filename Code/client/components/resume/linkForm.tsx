import { UseFormRegister } from "react-hook-form";

interface LinkType {
  register: UseFormRegister<any>,
  name: string,
  url: string,
  index: number,
  delete: Function,
  errors: any,
}

export default function LinkForm(prop: LinkType) {
  return (
    <div key={prop.index} className="flex justify-between mb-5">

      <div className="flex-1">
        <div className="flex gap-6">
          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Website Name</span>
            </label>
            <input type="text" className="input input-bordered" placeholder="My personal site" defaultValue={prop.name} {...prop.register(`link.${prop.index}.label`, {})} />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Link/URL</span>
            </label>
            <input type="url" className="input input-bordered" placeholder="e.g yourname.com" defaultValue={prop.url} {...prop.register(`link.${prop.index}.link`, {})} />
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 ml-5 my-5">
        <button className="btn btn-outline btn-square tooltip" data-tip="Delete" onClick={() => prop.delete(prop.index)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}