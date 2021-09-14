import { list } from "postcss";
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

  const employmentInit = { index: 0, title: '', company: '', startDate: '', endDate: '', location: '', summary: '' };
  const educationInit = { index: 0, institution: '', subject: '', startDate: '', endDate: '', location: '', score: '' };
  const skillInit = { index: 0, name: '', level: '' };
  const langInit = { index: 0, name: '', level: '' };
  const linkInit = { index: 0, name: '', url: '' };
  const courseInit = { index: 0, name: '', institution: '', startDate: '', endDate: '' };
  const referenceInit = { index: 0, name: '', company: '', phone: '', email: '' };

  const [employmentEle, updateEmployment] = useState([employmentInit]);
  const [educationEle, updateEducation] = useState([educationInit]);
  const [skillEle, updateSkill] = useState([skillInit]);
  const [languageEle, updateLanguage] = useState([langInit]);
  const [linkEle, updateLink] = useState([linkInit]);
  const [courseEle, updateCourse] = useState([courseInit]);
  const [referenceEle, updateReference] = useState([referenceInit]);

  // employee functions
  const handleEmployeeAdd = (e: any) => {
    e.preventDefault();
    updateEmployment([...employmentEle, employmentInit]);
  }

  const handleEmployeeDelete = (index: number) => {
    const list = [...employmentEle];
    list.splice(index, 1);
    updateEmployment(list);
  }
  // end of employee functions

  // education functions
  const handleEducationAdd = (e: any) => {
    e.preventDefault();
    updateEducation([...educationEle, educationInit]);
  }

  const handleEducationDelete = (index: number) => {
    const list = [...educationEle];
    list.splice(index, 1);
    updateEducation(list);
  }
  // end of education functions

  // skill functions
  const handleSkillAdd = (e: any) => {
    e.preventDefault();
    updateSkill([...skillEle, skillInit]);
  }

  const handleSkillDelete = (index: number) => {
    const list = [...skillEle];
    list.splice(index, 1);
    updateSkill(list);
  }
  // end of education functions

  // Lang functions
  const handleLangAdd = (e: any) => {
    e.preventDefault();
    updateLanguage([...languageEle, langInit]);
  }

  const handleLangDelete = (index: number) => {
    const list = [...languageEle];
    list.splice(index, 1);
    updateLanguage(list);
  }
  // end of Lang functions

  // Link functions
  const handleLinkAdd = (e: any) => {
    e.preventDefault();
    updateLink([...linkEle, linkInit]);
  }

  const handleLinkDelete = (index: number) => {
    const list = [...linkEle];
    list.splice(index, 1);
    updateLink(list);
  }
  // end of Link functions

  // Course functions
  const handleCourseAdd = (e: any) => {
    e.preventDefault();
    updateCourse([...courseEle, courseInit]);
  }

  const handleCourseDelete = (index: number) => {
    const list = [...courseEle];
    list.splice(index, 1);
    updateCourse(list);
  }
  // end of Course functions

  // Reference functions
  const handleReferenceAdd = (e: any) => {
    e.preventDefault();
    updateReference([...referenceEle, referenceInit]);
  }

  const handleReferenceDelete = (index: number) => {
    const list = [...referenceEle];
    list.splice(index, 1);
    updateReference(list);
  }
  // end of Reference functions

  useEffect(() => {
  }, []);


  return (
    // onSubmit={handleSubmit(onSubmit)}
    <form onSubmit={handleSubmit(onSubmit)}>

      <h2 className="py-5">Personal Details</h2>

      <div className="bg-white p-6 rounded">
        <div className="flex gap-12">
          <div className="flex-1 form-control w-1/2">
            <label className="label">
              <span className="label-text">Work Title</span>
            </label>
            <input type="text" className="input input-bordered solid" placeholder="Work Title" {...register("personal.title", { required: true })} />
          </div>
          <div className="flex-1 form-control grid grid-cols-2 ">
            <div className="">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input type="file" accept="image/*" className="input" placeholder="Photo" {...register("Photo", { required: false })} />
            </div>
            <div className="avatar">
              <div className="mb-8 rounded-btn w-18 h-18">
                <img src={watch("photo")} />
              </div>
            </div>
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
          employmentEle.map((e, i) => {
            e.index = i;
            return EmploymentForm({ ...e, register, delete: handleEmployeeDelete });
          })
        }

        <div className="pt-5">
          <button className="btn btn-outline" onClick={handleEmployeeAdd}>
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
          educationEle.map((e, i) => {
            e.index = i;
            return EducationForm({ ...e, register, delete: handleEducationDelete });
          })
        }

        <div className="pt-5">
          <button className="btn btn-outline" onClick={handleEducationAdd}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Education
          </button>
        </div>
      </div>

      <h2 className="py-5">Skills</h2>

      <div className="bg-white p-6 rounded">

        {
          skillEle.map((e, i) => {
            e.index = i;
            return SkillForm({ ...e, register, delete: handleSkillDelete });
          })
        }

        <div className="pt-5">
          <button className="btn btn-outline" onClick={handleSkillAdd}>
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
          languageEle.map((e, i) => {
            e.index = i;
            return LanguageForm({ ...e, register, delete: handleLangDelete });
          })
        }

        <div className="pt-5">
          <button className="btn btn-outline" onClick={handleLangAdd}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add More Language
          </button>
        </div>
      </div>

      <h2 className="py-5">Websites / Social Links</h2>

      <div className="bg-white p-6 rounded">

        {
          linkEle.map((e, i) => {
            e.index = i;
            return LinkForm({ ...e, register, delete: handleLinkDelete });
          })
        }

        <div className="pt-5">
          <button className="btn btn-outline" onClick={handleLinkAdd}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add More Links
          </button>
        </div>
      </div>

      <h2 className="py-5">Courses</h2>

      <div className="bg-white p-6 rounded">

        {
          courseEle.map((e, i) => {
            e.index = i;
            return CourseForm({ ...e, register, delete: handleCourseDelete });
          })
        }
        <div className="pt-5">
          <button className="btn btn-outline" onClick={handleCourseAdd}>
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
          referenceEle.map((e, i) => {
            e.index = i;
            return ReferenceForm({ ...e, register, delete: handleReferenceDelete });
          })
        }

        <div className="pt-5">
          <button className="btn btn-outline" onClick={handleReferenceAdd}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Reference
          </button>
        </div>

      </div>

      <input type="hidden" autoFocus={true} />

      <div className="flex pt-10">
        {errors.exampleRequired && <span>This field is required</span>}

        <input className="btn btn-primary" type="submit" />
      </div>

    </form>
  );
}