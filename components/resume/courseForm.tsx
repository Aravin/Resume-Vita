import { UseFormRegister } from "react-hook-form";

interface CourseType {
  register: UseFormRegister<any>,
  name: string,
  institution: string,
  startDate: string,
  endDate: string,
  index: number,
}

export default function CourseForm(prop: CourseType) {
  return (
    <div key={prop.index} className="flex">

      <div className="flex-1">
        <div className="flex gap-12">
          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Course</span>
            </label>
            <input type="text" className="input input-bordered" placeholder="Course" defaultValue={prop.name} {...prop.register("name", { required: true })} />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Institution</span>
            </label>
            <input type="text" className="input input-bordered" placeholder="Institution" defaultValue={prop.institution} {...prop.register("institution", { required: true })} />
          </div>
        </div>

        <div className="flex gap-12">
          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Start Date</span>
            </label>
            <input type="month" className="input input-bordered" placeholder="Start Date" defaultValue={prop.startDate} {...prop.register("startDate", { required: true })} />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">End Date</span>
            </label>
            <input type="month" className="input input-bordered" placeholder="End Date" defaultValue={prop.endDate}  {...prop.register("endDate", {})} />
          </div>

        </div>
      </div>

      <div className="flex-shrink-0 ml-5 my-5">
        <button className="btn btn-outline btn-square tooltip" data-tip="Delete the Course">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
