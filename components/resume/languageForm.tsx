import { UseFormRegister } from "react-hook-form";

interface LanguageType {
  register: UseFormRegister<any>,
  name: string,
  level: string,
  index: number,
};

export default function LanguageForm(prop: LanguageType) {

  return (
    <div key={prop.index} className="flex">

      <div className="flex-1">
        <div className="flex gap-12">
          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Language</span>
            </label>
            <input type="text" className="input input-bordered" placeholder="Language Name" {...prop.register("name", { required: true })} />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Level</span>
            </label>
            <select className="select select-bordered select-primary" placeholder="Language Level" {...prop.register("level", { required: true })}>
              <option value="0" label="Novice"></option>
              <option value="1" label="Beginner"></option>
              <option value="2" label="Skillful"></option>
              <option value="3" label="Experienced"></option>
              <option value="4" label="Expert"></option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 ml-5 my-5">
        <button className="btn btn-outline btn-square tooltip" data-tip="Delete the Language">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
