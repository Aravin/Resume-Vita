import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import CourseForm from "./courseForm";
import EducationForm from "./educationForm";
import EmploymentForm from "./employmentForm";
import LanguageForm from "./languageForm";
import LinkForm from "./linkForm";
import ReferenceForm from "./referenceForm";
import SkillForm from "./skillForm";

// type Inputs = {
//   example: string,
//   exampleRequired: string,
// };

export default function ResumeForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<any>();
  const onSubmit: SubmitHandler<any> = data => console.log(JSON.stringify(data));
  console.log(errors);
  console.log(watch()); // watch input value by passing the name of it

  const employmentInit = { index: Math.floor(Math.random() * 1000), title: '', company: '', startDate: '', endDate: '', location: '', summary: '' };
  const educationInit = { index: Math.floor(Math.random() * 1000), institution: '', subject: '', startDate: '', endDate: '', location: '', score: '' };
  const linkInit = { index: Math.floor(Math.random() * 1000), name: '', url: '' };
  const skillInit = { index: Math.floor(Math.random() * 1000), name: '', level: '' };
  const langInit = { index: Math.floor(Math.random() * 1000), name: '', level: '' };
  const courseInit = { index: Math.floor(Math.random() * 1000), name: '', institution: '', startDate: '', endDate: '' };
  const referenceInit = { index: Math.floor(Math.random() * 1000), name: '', company: '', phone: '', email: '' };

  const [employmentEle, updateEmployment] = useState([employmentInit]);
  const [educationEle, updateEducation] = useState([educationInit]);
  const [linkEle, updateLink] = useState([linkInit]);
  const [skillEle, updateSkill] = useState([skillInit]);
  const [languageEle, updateLanguage] = useState([langInit]);
  const [courseEle, updateCourse] = useState([courseInit]);
  const [referenceEle, updateReference] = useState([referenceInit]);

  useEffect(() => {

  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <h2 className="py-5">Personal Details</h2>

      <div className="bg-white p-6 rounded">
        <div className="flex gap-12">
          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Work Title</span>
            </label>
            <input type="text" className="input input-bordered" placeholder="Work Title" {...register("personal.title", { required: true })} />
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
            <input type="text" className="input input-bordered" placeholder="First Name" {...register("personal.firstName", { required: true, maxLength: 100 })} />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input type="text" className="input input-bordered" placeholder="Last Name" {...register("personal.lastName", { required: true, maxLength: 100 })} />
          </div>
        </div>

        <div className="flex gap-12">
          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="text" className="input input-bordered" placeholder="Email" {...register("personal.email", { required: true, pattern: /^\S+@\S+$/i })} />
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <input type="tel" className="input input-bordered" placeholder="Phone" {...register("personal.phone", { required: true, maxLength: 12 })} />
          </div>
        </div>
      </div>

      <h2 className="py-5">Professional Summary</h2>

      <div className="flex bg-white p-6 rounded">
        <div className="flex-1 form-control">
          <label className="label">
            <span className="label-text">Summary</span>
          </label>
          <textarea className="textarea h-24 textarea-bordered"  {...register("personal.summary", { required: true, maxLength: 4000, minLength: 50 })} />
        </div>
      </div>

      <h2 className="py-5">Employment History</h2>

      <div className="bg-white p-6 rounded">

        {
          employmentEle.map((e) => {
            return EmploymentForm({ ...e, register });
          })
        }

        <div className="pt-5">
          <button className="btn btn-outline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Employment
          </button>
        </div>
      </div>

      <h2 className="py-5">Education</h2>

      <div className="bg-white p-6 rounded">

        {
          educationEle.map((e) => {
            return EducationForm({ ...e, register });
          })
        }

        <div className="pt-5">
          <button className="btn btn-outline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Education
          </button>
        </div>
      </div>

      <h2 className="py-5">Websites / Social Links</h2>

      <div className="bg-white p-6 rounded">

        {
          linkEle.map((e) => {
            return LinkForm({ ...e, register });
          })
        }

        <div className="pt-5">
          <button className="btn btn-outline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add More Links
          </button>
        </div>
      </div>

      <h2 className="py-5">Skills</h2>

      <div className="bg-white p-6 rounded">

        {
          skillEle.map((e) => {
            return SkillForm({ ...e, register });
          })
        }

        <div className="pt-5">
          <button className="btn btn-outline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add More Skill
          </button>
        </div>
      </div>

      <h2 className="py-5">Language</h2>

      <div className="bg-white p-6 rounded">

        {
          languageEle.map((e) => {
            return LanguageForm({ ...e, register });
          })
        }

        <div className="pt-5">
          <button className="btn btn-outline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add More Language
          </button>
        </div>
      </div>

      <h2 className="py-5">Courses</h2>

      <div className="bg-white p-6 rounded">

        {
          courseEle.map((e) => {
            return CourseForm({ ...e, register });
          })
        }
        <div className="pt-5">
          <button className="btn btn-outline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Course
          </button>
        </div>
      </div>

      <h2 className="py-5">References</h2>

      <div className="bg-white p-6 rounded">

        {
          referenceEle.map((e) => {
            return ReferenceForm({ ...e, register });
          })
        }

        <div className="pt-5">
          <button className="btn btn-outline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Reference
          </button>
        </div>

      </div>

      <div className="flex pt-10">
        {errors.exampleRequired && <span>This field is required</span>}

        <input className="btn btn-primary" type="submit" />
      </div>

    </form>
  );
}