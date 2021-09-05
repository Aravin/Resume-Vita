import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// type Inputs = {
//   example: string,
//   exampleRequired: string,
// };

export default function InvoiceForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<any>();
  const onSubmit: SubmitHandler<any> = data => console.log(JSON.stringify(data));
  console.log(errors);
  console.log(watch()) // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>

      <h2 className="pt-8">Personal Details</h2>

      <div className="flex py-4 gap-12">
        <div className="flex-1 form-control">
          <label className="label">
            <span className="label-text">Work Title</span>
          </label>
          <input type="text" className="input input-bordered input-primary" placeholder="Work Title" {...register("personal.title", { required: true })} />
        </div>
        <div className="flex-1 form-control">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input type="file" className="input" placeholder="Photo" {...register("Photo", { required: false })} />
        </div>
      </div>

      <div className="flex gap-12">
        <div className="flex-1 form-control">
          <label className="label">
            <span className="label-text">First Name</span>
          </label>
          <input type="text" className="input input-bordered input-primary" placeholder="First Name" {...register("personal.firstName", { required: true, maxLength: 100 })} />
        </div>

        <div className="flex-1 form-control">
          <label className="label">
            <span className="label-text">Last Name</span>
          </label>
          <input type="text" className="input input-bordered input-primary" placeholder="Last Name" {...register("personal.lastName", { required: true, maxLength: 100 })} />
        </div>
      </div>

      <div className="flex gap-12">
        <div className="flex-1 form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text" className="input input-bordered input-primary" placeholder="Email" {...register("personal.email", { required: true, pattern: /^\S+@\S+$/i })} />
        </div>

        <div className="flex-1 form-control">
          <label className="label">
            <span className="label-text">Phone</span>
          </label>
          <input type="tel" className="input input-bordered input-primary" placeholder="Phone" {...register("personal.phone", { required: true, maxLength: 12 })} />
        </div>
      </div>

      <h2 className="pt-8">Professional Summary</h2>

      <div className="flex">
        <div className="flex-1 form-control">
          <label className="label">
            <span className="label-text">Summary</span>
          </label>
          <textarea className="textarea h-24 textarea-bordered input-primary"  {...register("personal.summary", { required: true, maxLength: 4000, minLength: 50 })} />
        </div>
      </div>

      <h2 className="pt-8">Employment History</h2>

      <div>
        <div className="flex gap-12">
          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Job Title</span>
            </label>
            <input type="text" className="input input-bordered input-primary" placeholder="Job Title" {...register("employment.title", { required: true })} />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Company</span>
            </label>
            <input type="text" className="input input-bordered input-primary" placeholder="Company" {...register("employment.company", { required: true })} />
          </div>
        </div>

        <div className="flex gap-12">
          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Start Date</span>
            </label>
            <input type="month" formTarget="MM/yyyy" className="input input-bordered input-primary" placeholder="Start Date" {...register("employment.startDate", { required: true })} />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">End Date</span>
            </label>
            <input type="month" className="input input-bordered input-primary" placeholder="End Date" {...register("employment.endDate", {})} />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input type="text" className="input input-bordered input-primary" placeholder="Location" {...register("employment.location", {})} />
          </div>
        </div>
      </div>

      <h2 className="pt-8">Education</h2>

      <div>
        <div className="flex gap-12">
          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">School</span>
            </label>
            <input type="text" className="input input-bordered input-primary" placeholder="School" {...register("education.school", { required: true })} />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Degree</span>
            </label>
            <input type="text" className="input input-bordered input-primary" placeholder="Degree" {...register("education.degree", { required: true })} />
          </div>
        </div>

        <div className="flex gap-12">
          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Start Date</span>
            </label>
            <input type="month" className="input input-bordered input-primary" placeholder="Start Date" {...register("education.startDate", { required: true })} />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">End Date</span>
            </label>
            <input type="month" className="input input-bordered input-primary" placeholder="End Date" {...register("education.endDate", {})} />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input type="text" className="input input-bordered input-primary" placeholder="Location" {...register("education.location", {})} />
          </div>
        </div>
      </div>

      <h2 className="pt-8">Websites / Social Links</h2>

      <div className="flex gap-12">
        <div className="flex-1 form-control">
          <label className="label">
            <span className="label-text">Label</span>
          </label>
          <input type="text" className="input input-bordered input-primary" placeholder="Label" {...register("link.label", {})} />
        </div>

        <div className="flex-1 form-control">
          <label className="label">
            <span className="label-text">Link</span>
          </label>
          <input type="url" className="input input-bordered input-primary" placeholder="Link" {...register("link.link", {})} />
        </div>
      </div>

      <h2 className="pt-8">Skills</h2>

      <div className="flex gap-12">
        <div className="flex-1 form-control">
          <label className="label">
            <span className="label-text">Label</span>
          </label>
          <input type="text" className="input input-bordered input-primary" placeholder="Label" {...register("skill.label", { required: true })} />
        </div>

        <div className="flex-1 form-control">
          <label className="label">
            <span className="label-text">Level</span>
          </label>
          <select className="select select-bordered select-primary" placeholder="Level" {...register("skill.Level", { required: true })}>
          <option value="0" label="Novice"></option>
            <option value="1" label="Beginner"></option>
            <option value="2" label="Skillful"></option>
            <option value="3" label="Experienced"></option>
            <option value="4" label="Expert"></option>
          </select>

        </div>
      </div>

      <h2 className="pt-8">Language</h2>

      <div className="flex gap-12">
        <div className="flex-1 form-control">
          <label className="label">
            <span className="label-text">Skill</span>
          </label>
          <input type="text" className="input input-bordered input-primary" placeholder="Language Name" {...register("language.name", { required: true })} />
        </div>

        <div className="flex-1 form-control">
          <label className="label">
            <span className="label-text">Level</span>
          </label>
          <select className="select select-bordered select-primary" placeholder="Language Level" {...register("language.Level", { required: true })}>
          <option value="0" label="Novice"></option>
            <option value="1" label="Beginner"></option>
            <option value="2" label="Skillful"></option>
            <option value="3" label="Experienced"></option>
            <option value="4" label="Expert"></option>
          </select>
        </div>
      </div>

      <h2 className="pt-8">Courses</h2>

      <div>
        <div className="flex gap-12">
          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Course</span>
            </label>
            <input type="text" className="input input-bordered input-primary" placeholder="Course" {...register("course.name", { required: true })} />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Institution</span>
            </label>
            <input type="text" className="input input-bordered input-primary" placeholder="Institution" {...register("course.institution", { required: true })} />
          </div>
        </div>

        <div className="flex gap-12">
          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Start Date</span>
            </label>
            <input type="month" className="input input-bordered input-primary" placeholder="Start Date" {...register("course.startDate", { required: true })} />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">End Date</span>
            </label>
            <input type="month" className="input input-bordered input-primary" placeholder="End Date" {...register("course.endDate", {})} />
          </div>

        </div>
      </div>

      <h2 className="pt-8">References</h2>

      <div>
        <div className="flex gap-12">
          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input type="text" className="input input-bordered input-primary" placeholder="Full Name" {...register("reference.name", { required: true, maxLength: 100 })} />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Company Name</span>
            </label>
            <input type="text" className="input input-bordered input-primary" placeholder="Company Name" {...register("reference.company", { required: true, maxLength: 100 })} />
          </div>
        </div>

        <div className="flex gap-12">
          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="text" className="input input-bordered input-primary" placeholder="Email" {...register("reference.email", { required: true, pattern: /^\S+@\S+$/i })} />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <input type="tel" className="input input-bordered input-primary" placeholder="Phone" {...register("reference.phone", { required: true, maxLength: 12 })} />
          </div>
        </div>
      </div>

      <div className="flex pt-10">
        {errors.exampleRequired && <span>This field is required</span>}

        <input className="btn btn-primary" type="submit" />
      </div>

    </form>
  );
}