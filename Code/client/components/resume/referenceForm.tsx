import { UseFormRegister } from "react-hook-form";

interface ReferenceType {
  register: UseFormRegister<any>,
  name: string,
  company: string,
  email: string,
  phone: string,
  index: number,
  delete: Function,
  errors: any,
}

export default function ReferenceForm(prop: ReferenceType) {
  return (
    <div key={prop.index} className="flex justify-between mb-5">

      <div className="flex-1">
        <div className="flex gap-6">
          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input type="text" className="input input-bordered" defaultValue={prop.name} {...prop.register(`reference.${prop.index}.name`)} />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Company Name</span>
            </label>
            <input type="text" className="input input-bordered" defaultValue={prop.company} {...prop.register(`reference.${prop.index}.company`)} />
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" className="input input-bordered" defaultValue={prop.email} {...prop.register(`reference.${prop.index}.email`)} />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <input type="tel" className="input input-bordered" defaultValue={prop.phone} {...prop.register(`reference.${prop.index}.phone`)} />
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 ml-5 my-5">
        <button className="btn btn-outline btn-square tooltip" data-tip="Delete" onClick={() => prop.delete(prop.index)} >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
