import { UseFormRegister } from "react-hook-form";

interface ReferenceType {
  register: UseFormRegister<any>,
  name: string,
  company: string,
  email: string,
  phone: string,
  index: number,
  delete: Function,
}

export default function ReferenceForm(prop: ReferenceType) {
  return (
    <div key={prop.index} className="flex justify-between mb-5">

      <div className="flex-1">
        <div className="flex gap-12">
          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input type="text" className="input input-bordered" placeholder="Full Name" defaultValue={prop.name} {...prop.register(`course.${prop.index}.name`, { required: true, maxLength: 100 })} />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Company Name</span>
            </label>
            <input type="text" className="input input-bordered" placeholder="Company Name" defaultValue={prop.company} {...prop.register(`course.${prop.index}.company`, { required: true, maxLength: 100 })} />
          </div>
        </div>

        <div className="flex gap-12">
          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="text" className="input input-bordered" placeholder="Email" defaultValue={prop.email} {...prop.register(`course.${prop.index}.email`, { required: true, pattern: /^\S+@\S+$/i })} />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <input type="tel" className="input input-bordered" placeholder="Phone" defaultValue={prop.email} {...prop.register(`course.${prop.index}.phone`, { required: true, maxLength: 12 })} />
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
