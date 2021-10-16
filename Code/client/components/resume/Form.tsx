import React, { useEffect, useState } from "react";
import Router from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import CourseForm from "./CourseForm";
import EducationForm from "./EducationForm";
import EmploymentForm from "./EmploymentForm";
import LanguageForm from "./LanguageForm";
import LinkForm from "./LinkForm";
import ReferenceForm from "./ReferenceForm";
import SkillForm from "./SkillForm";

import axios from 'axios';

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
// import FilePondPluginImagePreview from "filepond-plugin-image-preview";
// import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
// import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
// import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
// import FilePondPluginImageResize from 'filepond-plugin-image-resize';
// import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
// import FilePondPluginImageEdit from 'filepond-plugin-image-edit';

// import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
// import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css';
import { useLocalStorage } from "../../hooks/useLocalStorage";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader";

// Register the plugins
registerPlugin(
  // FilePondPluginImageExifOrientation,
  // FilePondPluginImagePreview,
  // FilePondPluginFileValidateType,
  // FilePondPluginFileValidateSize,
  // FilePondPluginImageCrop,
  // FilePondPluginImageResize,
  // FilePondPluginImageTransform,
  // FilePondPluginImageEdit,
);

// type Inputs = {
//   example: string,
//   exampleRequired: string,
// };

const schema = yup.object({
  personal: yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    summary: yup.string().required(),
  }),
  education: yup.array().of(yup.object({
    institution: yup.string().required(),
    subject: yup.string().required(),
    startDate: yup.string().required(),
    endDate: yup.string().required(),
    score: yup.number().positive().required(),
  })),
  employment: yup.array().of(yup.object({
    title: yup.string(),
    company: yup.string(),
    startDate: yup.string(),
    endDate: yup.string(),
    location: yup.string(),
    isCurrent: yup.bool(),
    summary: yup.string(),
  })),
  skill: yup.array().of(yup.object({
    name: yup.string().required(),
    level: yup.number().positive().required(),
  })),
  language: yup.array().of(yup.object({
    name: yup.string().required(),
    level: yup.number().positive().required(),
  })),
}).required();

export default function ResumeForm() {

  const employmentInit = { index: 0, title: '', company: '', startDate: '', endDate: '', isCurrent: '', location: '', summary: '' };
  const educationInit = { index: 0, institution: '', subject: '', startDate: '', endDate: '', location: '', score: '' };
  const skillInit = { index: 0, name: '', level: '' };
  const langInit = { index: 0, name: '', level: '' };
  const linkInit = { index: 0, name: '', url: '' };
  const courseInit = { index: 0, name: '', institution: '', startDate: '', endDate: '' };
  const referenceInit = { index: 0, name: '', company: '', phone: '', email: '' };

  const [storedResume, setResume] = useState({} as any);
  // auth hook
  const { user, error, isLoading } = useUser();
  const userId = user?.sub?.split('|')[1];

  // local storage hook
  const [localResume, setLocalResume] = useLocalStorage('resumeData', {} as any);

  // form hook
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: storedResume || {},
  });

  // fetch hook
  const { data, loading, fetchError } = useFetch(process.env.NEXT_PUBLIC_API + `/resume/${userId}`);

  // ref hook
  const initialResumeData = data.resume;

  const [employmentEle, updateEmployment] = useState(storedResume?.employment || [employmentInit]);
  const [educationEle, updateEducation] = useState(storedResume?.education || [educationInit]);
  const [skillEle, updateSkill] = useState(storedResume?.skills || [skillInit]);
  const [languageEle, updateLanguage] = useState(storedResume?.language || [langInit]);
  const [linkEle, updateLink] = useState(storedResume?.links || [linkInit]);
  const [courseEle, updateCourse] = useState(storedResume?.course || [courseInit]);
  const [referenceEle, updateReference] = useState(storedResume?.reference || [referenceInit]);

  // onchange hook
  useEffect(() => {
    setResume(data?.resume);
    reset(data.resume);
    updateEmployment(data?.resume?.employment || []);
    updateEducation(data?.resume?.education || []);
    updateSkill(data?.resume?.skills || []);
    updateLanguage(data?.resume?.language || []);
    updateLink(data?.resume?.links || []);
    updateCourse(data?.resume?.course || []);
    updateReference(data?.resume?.reference || []);
  },
    [setResume, reset, data.resume]);

  if (isLoading || loading) return <div><Loader /></div>;
  // if (fetchError) return <div>{fetchError}</div>;


  // resume submit
  const onSubmit: SubmitHandler<any> = data => {

    // create object
    const resumeData = {
      user: userId,
      resume: data,
    }

    // store to localStorage - temp
    setLocalResume(resumeData);

    // if data is same, dont save
    if (JSON.stringify(data) === JSON.stringify(initialResumeData)) {
      return Router.push('/resume/preview');
    }
    // save to database - permanent
    axios.post(process.env.NEXT_PUBLIC_API + '/resume', resumeData)
      .then(function (response) {

        Router.push('/resume/preview');
      })
      .catch(function (error) {
      });
  }
  // console.log({ errors: errors });
  // console.log(watch()); // watch input value by passing the name of it

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

  return (
    // onSubmit={handleSubmit(onSubmit)}
    <form onSubmit={handleSubmit(onSubmit)}>

      <h3>Personal Details</h3>

      <div className="bg-white p-6 rounded shadow">
        <div className="flex gap-6">
          <div className="flex-1">
            <div className="form-control max-w-sm">
              <label className="label">
                <span className="label-text">First Name*</span>
              </label>
              <input type="text" className={`input input-bordered ${errors.personal?.firstName ? 'input-error' : ''}`} {...register("personal.firstName")} />
              {
                errors?.personal?.firstName &&
                <label className="label">
                  <span className="label-text-alt text-red-500">Please enter First Name</span>
                </label>
              }
            </div>
            <div className="form-control max-w-sm">
              <label className="label">
                <span className="label-text">Last Name*</span>
              </label>
              <input type="text" className={`input input-bordered ${errors.personal?.lastName ? 'input-error' : ''}`} {...register("personal.lastName")} />
              {
                errors?.personal?.lastName &&
                <label className="label">
                  <span className="label-text-alt text-red-500">Please enter Last Name</span>
                </label>
              }
            </div>
          </div>

          {/* <div className="flex-1 h-full items-center self-center">
            <FilePond
              files={[]}
              acceptedFileTypes={['image/*']}
              maxFileSize={'1MB'}
              imagePreviewHeight={128}
              allowMultiple={false}
              stylePanelLayout='compact'
              // name="files"
              labelIdle='Add Photo (Optional) <span class="filepond--label-action">Browse</span>'
              // oninit={() => this.handleInit()}
              onupdatefiles={fileItems => {
                console.log(fileItems)
              }}
              {...register("personal.photo")}
            />
          </div> */}
        </div>

        <div className="flex gap-6">
          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Email*</span>
            </label>
            <input type="text" className={`input input-bordered ${errors.personal?.email ? 'input-error' : ''}`} {...register("personal.email")} />
            {
              errors?.personal?.email &&
              <label className="label">
                <span className="label-text-alt text-red-500">Please enter Email Address</span>
              </label>
            }
          </div>

          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text">Phone*</span>
            </label>
            <input type="tel" className={`input input-bordered ${errors.personal?.phone ? 'input-error' : ''}`} {...register("personal.phone")} />
            {
              errors?.personal?.phone &&
              <label className="label">
                <span className="label-text-alt text-red-500">Please enter Phone Number</span>
              </label>
            }
          </div>
        </div>
      </div>

      <h3>Profile Summary</h3>

      <div className="flex bg-white p-6 rounded shadow">
        <div className="flex-1 form-control">
          <label className="label">
            <span className="label-text">Summary*</span>
          </label>
          <textarea className={`textarea h-24 textarea-bordered ${errors.personal?.summary ? 'input-error' : ''}`}  {...register("personal.summary")} />
        </div>
      </div>

      <h3>Education*</h3>

      <div className="bg-white p-6 rounded shadow">

        {
          educationEle.map((e: any, i: number) => {
            e.index = i;
            return EducationForm({ ...e, register, delete: handleEducationDelete, errors: errors.education });
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

      <h3>Employment History</h3>

      <div className="bg-white p-6 rounded shadow">

        {
          employmentEle.map((e: any, i: number) => {
            e.index = i;
            return EmploymentForm({ ...e, register, delete: handleEmployeeDelete, errors: errors.employee });
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

      <h3>Skills</h3>

      <div className="bg-white p-6 rounded shadow">

        {
          skillEle.map((e: any, i: number) => {
            e.index = i;
            return SkillForm({ ...e, register, delete: handleSkillDelete, errors: errors.skills });
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

      <h3>Language</h3>

      <div className="bg-white p-6 rounded shadow">

        {
          languageEle.map((e: any, i: number) => {
            e.index = i;
            return LanguageForm({ ...e, register, delete: handleLangDelete, errors: errors.language });
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

      <h3>Websites / Social Links</h3>

      <div className="bg-white p-6 rounded shadow">

        {
          linkEle.map((e: any, i: number) => {
            e.index = i;
            return LinkForm({ ...e, register, delete: handleLinkDelete, errors: errors.links });
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

      <h3>Courses</h3>

      <div className="bg-white p-6 rounded shadow">

        {
          courseEle.map((e: any, i: number) => {
            e.index = i;
            return CourseForm({ ...e, register, delete: handleCourseDelete, errors: errors.course });
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

      <h3>References</h3>

      <div className="bg-white p-6 rounded shadow">

        {
          referenceEle.map((e: any, i: number) => {
            e.index = i;
            return ReferenceForm({ ...e, register, delete: handleReferenceDelete, errors: errors.reference });
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

      <div className="flex pt-10">
        <input className="btn btn-primary btn-block" type="submit" value="Save and Preview" />
      </div>

    </form>
  );
}
