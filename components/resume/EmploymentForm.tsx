import { UseFormRegister } from "react-hook-form";

interface EmploymentType {
  register: UseFormRegister<any>,
  title: string,
  company: string,
  startDate: string,
  endDate: string,
  location: string,
  summary: string,
  index: number,
}

export default function EmploymentForm(prop: EmploymentType) {
  return (
    <div key={prop.index} className="flex">

      <div className="flex-1">
        <div className="flex gap-12">
          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Job Title</span>
            </label>
            <input type="text" className="input input-bordered" placeholder="Job Title" defaultValue={prop.title} {...prop.register("title", { required: true })} />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Company</span>
            </label>
            <input type="text" className="input input-bordered" placeholder="Company" defaultValue={prop.company} {...prop.register("company", { required: true })} />
          </div>
        </div>

        <div className="flex gap-12">
          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Start Date</span>
            </label>
            <input type="month" formTarget="MM/yyyy" className="input input-bordered" defaultValue="Start Date" {...prop.register("startDate", { required: true })} />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">End Date</span>
            </label>
            <input type="month" className="input input-bordered" placeholder="End Date" defaultValue={prop.endDate} {...prop.register("endDate", {})} />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input type="text" className="input input-bordered" placeholder="Location" defaultValue={prop.location} {...prop.register("location", {})} />
          </div>
        </div>

        <div className="flex">
          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Summary</span>
            </label>
            <textarea className="textarea h-24 textarea-bordered" defaultValue={prop.summary} {...prop.register("summary", { required: true, maxLength: 4000, minLength: 50 })} />
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 ml-5 my-5">
        <button className="btn btn-outline btn-square tooltip" data-tip="Delete the Employment">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

    </div>
  );
}