import { UseFormRegister } from "react-hook-form";

interface LinkType {
  register:  UseFormRegister<any>,
  name: string,
  url: string,
  index: number,
}

export default function LinkForm(prop: LinkType) {
  return (
    <div key={prop.index} className="flex">
      
      <div className="flex-1">
      <div className="flex gap-12">
        <div className="flex-1 form-control">
          <label className="label">
            <span className="label-text">Label</span>
          </label>
          <input type="text" className="input input-bordered" placeholder="Label" defaultValue={prop.name} {...prop.register("link.label", {})} />
        </div>

        <div className="flex-1 form-control">
          <label className="label">
            <span className="label-text">Link</span>
          </label>
          <input type="url" className="input input-bordered" placeholder="Link" defaultValue={prop.url} {...prop.register("link.link", {})} />
        </div>
      </div>
      </div>

      <div className="flex-shrink-0 ml-5 my-5">
        <button className="btn btn-outline btn-square tooltip" data-tip="Delete the Link">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}