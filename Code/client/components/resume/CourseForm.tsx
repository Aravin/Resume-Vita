import { UseFormRegister } from "react-hook-form";

interface CourseType {
  register: UseFormRegister<any>,
  name: string,
  institution: string,
  startDate: string,
  endDate: string,
  index: number,
  delete: Function,
  errors: any,
}

export default function CourseForm(prop: CourseType) {
  return (
    <div key={prop.index} className="flex justify-between mb-5">

      <div className="flex-1">
        <div className="flex gap-6">
          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text text-gray-500">Course Name</span>
            </label>
            <input type="text" className="input input-bordered font-medium" placeholder="e.g. Node.js Foundation" defaultValue={prop.name} {...prop.register(`courses.${prop.index}.name`)} />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text text-gray-500">Institution Name</span>
            </label>
            <input type="text" className="input input-bordered font-medium" placeholder="e.g. Udemy" defaultValue={prop.institution} {...prop.register(`courses.${prop.index}.institution`)} />
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text text-gray-500">Start Date</span>
            </label>
            <input type="month" className="input input-bordered font-medium" placeholder="Start Date" defaultValue={prop.startDate} {...prop.register(`courses.${prop.index}.startDate`, )} />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text text-gray-500">End Date</span>
            </label>
            <input type="month" className="input input-bordered font-medium" placeholder="End Date" defaultValue={prop.endDate}  {...prop.register(`courses.${prop.index}.endDate`, {})} />
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
