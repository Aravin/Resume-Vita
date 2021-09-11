import { UseFormRegister } from "react-hook-form";

interface EmploymentType {
  register:  UseFormRegister<any>,
  title: string,
  company: string,
  startDate: string,
  endDate: string,
  location: string,
  summary: string,
}

export default function EmploymentForm(prop: EmploymentType) {
  return (
    <>
      <div className="flex gap-12">
        <div className="flex-1 form-control">
          <label className="label">
            <span className="label-text">Job Title</span>
          </label>
          <input type="text" className="input input-bordered" placeholder="Job Title" {...prop.register(prop.title, { required: true })} />
        </div>

        <div className="flex-1 form-control">
          <label className="label">
            <span className="label-text">Company</span>
          </label>
          <input type="text" className="input input-bordered" placeholder="Company" {...prop.register(prop.company, { required: true })} />
        </div>
      </div>

      <div className="flex gap-12">
        <div className="flex-1 form-control">
          <label className="label">
            <span className="label-text">Start Date</span>
          </label>
          <input type="month" formTarget="MM/yyyy" className="input input-bordered" placeholder="Start Date" {...prop.register(prop.startDate, { required: true })} />
        </div>

        <div className="flex-1 form-control">
          <label className="label">
            <span className="label-text">End Date</span>
          </label>
          <input type="month" className="input input-bordered" placeholder="End Date" {...prop.register(prop.endDate, {})} />
        </div>

        <div className="flex-1 form-control">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input type="text" className="input input-bordered" placeholder="Location" {...prop.register(prop.location, {})} />
        </div>
      </div>

      <div className="flex">
        <div className="flex-1 form-control">
          <label className="label">
            <span className="label-text">Summary</span>
          </label>
          <textarea className="textarea h-24 textarea-bordered"  {...prop.register(prop.summary, { required: true, maxLength: 4000, minLength: 50 })} />
        </div>
      </div>
    </>
  );
}