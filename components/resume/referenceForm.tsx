import { UseFormRegister } from "react-hook-form";

interface ReferenceType {
  register: UseFormRegister<any>,
  name: string,
  company: string,
  email: string,
  phone: string,
  index: number,
}

export default function ReferenceForm(prop: ReferenceType) {
  return (
    <div key={prop.index} className="flex">

      <div className="flex-1">
        <div className="flex gap-12">
          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input type="text" className="input input-bordered" placeholder="Full Name" defaultValue={prop.name} {...prop.register("name", { required: true, maxLength: 100 })} />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Company Name</span>
            </label>
            <input type="text" className="input input-bordered" placeholder="Company Name" defaultValue={prop.company} {...prop.register("company", { required: true, maxLength: 100 })} />
          </div>
        </div>

        <div className="flex gap-12">
          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="text" className="input input-bordered" placeholder="Email" defaultValue={prop.email} {...prop.register("email", { required: true, pattern: /^\S+@\S+$/i })} />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <input type="tel" className="input input-bordered" placeholder="Phone" defaultValue={prop.email} {...prop.register("phone", { required: true, maxLength: 12 })} />
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 ml-5 my-5">
        <button className="btn btn-outline btn-square tooltip" data-tip="Delete the Reference">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
