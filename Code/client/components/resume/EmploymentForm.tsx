import { UseFormRegister } from "react-hook-form";

interface EmploymentType {
  register: UseFormRegister<any>,
  title: string,
  company: string,
  startDate: string,
  endDate: string,
  location: string,
  summary: string,
  isCurrent: boolean,
  index: number,
  delete: Function,
  errors: any,
}

export default function EmploymentForm(prop: EmploymentType) {

  return (
    <div key={prop.index} className="flex justify-between mb-5">

      <div className="">
        <div className="grid grid-cols-2 gap-12">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Job Title*</span>
            </label>
            <input type="text" className="input input-bordered" placeholder="e.g. Software Engineer" defaultValue={prop.title} {...prop.register(`employment.${prop.index}.title`)} />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Company Name*</span>
            </label>
            <input type="text" className="input input-bordered" defaultValue={prop.company} {...prop.register(`employment.${prop.index}.company`)} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Start Date*</span>
            </label>
            <input type="month" className="input input-bordered" defaultValue={prop.startDate} {...prop.register(`employment.${prop.index}.startDate`)} />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">End Date*</span>
            </label>
            <input type="month" className="input input-bordered" defaultValue={prop.endDate} {...prop.register(`employment.${prop.index}.endDate`, {})} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input type="text" className="input input-bordered" placeholder="eg. Chennai" defaultValue={prop.location} {...prop.register(`employment.${prop.index}.location`, {})} />
          </div>
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text">Is Present Company?</span>
            </label>
            <input type="checkbox" className={`${
            prop.isCurrent ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`} {...prop.register(`employment.${prop.index}.isCurrent`)} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Summary*</span>
            </label>
            <textarea className="textarea h-24 textarea-bordered" defaultValue={prop.summary} {...prop.register(`employment.${prop.index}.summary`, { required: true, maxLength: 4000, minLength: 50 })} />
          </div>
        </div>
      </div>

      <div className="ml-5 my-5">
        <button className="btn btn-outline btn-square tooltip" data-tip="Delete" onClick={() => prop.delete(prop.index)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

    </div>
  );
}