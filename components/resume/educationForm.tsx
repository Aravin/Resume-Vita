import { UseFormRegister } from "react-hook-form";

interface EducationType {
  register: UseFormRegister<any>,
  institution: string,
  subject: string,
  startDate: string,
  endDate: string,
  location: string,
  score: string,
  index: number,
  delete: Function,
}

export default function EducationForm(prop: EducationType) {
  return (
    <div key={prop.index} className="flex">

      <div className="flex-1">
        <div className="flex gap-12">
          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">School</span>
            </label>
            <input type="text" className="input input-bordered" placeholder="School" defaultValue={prop.institution} {...prop.register(`education.${prop.index}.institution`, { required: true })} />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Degree</span>
            </label>
            <input type="text" className="input input-bordered" placeholder="Subject / Degree" defaultValue={prop.subject} {...prop.register(`education.${prop.index}.subject`, { required: true })} />
          </div>
        </div>

        <div className="flex gap-12">
          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Start Date</span>
            </label>
            <input type="month" className="input input-bordered" placeholder="Start Date" defaultValue={prop.startDate} {...prop.register(`education.${prop.index}.startDate`, { required: true })} />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">End Date</span>
            </label>
            <input type="month" className="input input-bordered" placeholder="End Date" defaultValue={prop.endDate} {...prop.register(`education.${prop.index}.endDate`, {})} />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input type="text" className="input input-bordered" placeholder="Location" defaultValue={prop.location} {...prop.register(`education.${prop.index}.location`, {})} />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Score</span>
            </label>
            <input type="text" className="input input-bordered" placeholder="Score % or GCPA" defaultValue={prop.score} {...prop.register(`education.${prop.index}.score`, {})} />
          </div>

        </div>
      </div>

      <div className="flex-shrink-0 ml-5 my-5">
        <button className="btn btn-outline btn-square tooltip" data-tip="Delete the Education" onClick={() => prop.delete(prop.index)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}