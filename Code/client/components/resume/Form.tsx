import { useUser } from "@auth0/nextjs-auth0";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import EducationForm from "./EducationForm";
import EmploymentForm from "./EmploymentForm";
import ReferenceForm from "./ReferenceForm";
import CourseForm from "./CourseForm";
import LinkForm from "./LinkForm";
import SkillForm from "./SkillForm";
import LanguageForm from "./LanguageForm";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import router from "next/router";
import axios from "axios";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Loader from "../Loader";

const defaultValues = {
  personal: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    summary: '',
  },
  educations: [{
    index: 0,
    institution: '',
    subject: '',
    startDate: '',
    endDate: '',
    score: '',
  }],
  employments: [
    // { index: 0, title: '', company: '', startDate: '', endDate: '', location: '', isCurrent: '', summary: '', }
  ],
  skills: [{
    index: 0, name: '', level: '',
  }],
  languages: [{
    index: 0, name: '', level: '',
  }],
  links: [
    // { index: 0, name: '', url: '' }
  ],
  courses: [
    // { index: 0, name: '', institution: '', startDate: '', endDate: ''}
  ],
  references: [
    // { index: 0, name: '', company: '', phone: '', email: '' }
  ],
};

const schema = yup.object({
  personal: yup.object({
    firstName: yup.string().min(4).required(),
    lastName: yup.string().min(2).required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    summary: yup.string().min(100).required(),
  }),
  educations: yup.array().of(yup.object({
    institution: yup.string().min(3).required(),
    subject: yup.string().min(2).required(),
    startDate: yup.string().required(),
    endDate: yup.string().required(),
    score: yup.number().positive().required(),
    location: yup.string(),
  }).required()),
  employments: yup.array().of(yup.object({
    title: yup.string().min(5).required(),
    company: yup.string().min(3).required(),
    startDate: yup.string().required(),
    endDate: yup.string(),
    location: yup.string(),
    isCurrent: yup.bool(),
    summary: yup.string().min(100).required(),
  })),
  skills: yup.array().of(yup.object({
    name: yup.string().min(3).required(),
    level: yup.number().positive().required(),
  }).required()),
  languages: yup.array().of(yup.object({
    name: yup.string().min(3).required(),
    level: yup.number().positive().required(),
  }).required()),
  links: yup.array().of(yup.object({
    name: yup.string().required(),
    url: yup.string().matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/).required(),
  })),
  courses: yup.array().of(yup.object({
    name: yup.string().min(3).required(),
    institution: yup.string().min(3).required(),
    endDate: yup.string(),
    score: yup.number().positive(),
  })).optional(),
  references: yup.array().of(yup.object({
    name: yup.string().min(3).required(),
    company: yup.string().min(3).required(),
    phone: yup.string(),
    email: yup.string().email(),
  })),
}).required();

export default function ResumeForm() {

  const { user, error, isLoading } = useUser();
  const userId = user?.sub?.split('|')[1];
  const [resume, setResume] = useState(defaultValues);
  // local storage hook
  const [localResume, setLocalResume] = useLocalStorage('resumeData', {} as any);

  // fetch hook
  // const { data, loading, fetchError } = useFetch(process.env.NEXT_PUBLIC_API + `/resume/${userId}`);

  const { register, handleSubmit, watch, formState: { errors }, getValues, reset } = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    async function fetchResume() {
      if (!userId) return;

      const res = await fetch(process.env.NEXT_PUBLIC_API + `/resume/${userId}`);
      const data = await res.json();

      if (data?.resume) {
        setResume(data.resume);
        reset(data.resume);
      }
    }

    fetchResume();
  }, [userId]);

  const handleEducationAdd = (e: any) => {
    e.preventDefault();
    let temp = getValues();
    const tempItem = temp.educations;
    const updatedItems = tempItem ? [...tempItem, {} as any] : [{} as any];
    temp.educations = updatedItems;
    setResume(temp);
    // reset(resume);
  }

  const handleEducationDelete = (index: number) => {
    confirmAlert({
      title: 'Delete',
      message: 'Are you sure want to delete this record?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            let temp = getValues();
            const tempEdu = temp.educations;
            const updatedEducations = tempEdu.filter((_) => _?.index !== index);
            temp.educations = updatedEducations;
            setResume(temp);
            reset(temp);
          }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });
  }

  const handleEmploymentAdd = (e: any) => {
    e.preventDefault();
    let temp = getValues();
    const tempItem = temp.employments;
    const updatedItems = tempItem ? [...tempItem, {} as any] : [{} as any];
    temp.employments = updatedItems;
    setResume(temp);
    // reset(resume);
  }

  const handleEmploymentDelete = (index: number) => {
    confirmAlert({
      title: 'Delete',
      message: 'Are you sure want to delete this record?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            let temp = getValues();
            const tempItem = temp.employments;
            const updatedItems = tempItem.filter((_) => _?.index !== index);
            temp.employments = updatedItems;
            setResume(temp);
            reset(temp);
          }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });
  }

  const handleSkillAdd = (e: any) => {
    e.preventDefault();
    let temp = getValues();
    const tempItem = temp.skills;
    const updatedItems = tempItem ? [...tempItem, {} as any] : [{} as any];
    temp.skills = updatedItems;
    setResume(temp);
    // reset(temp);
  }

  const handleSkillDelete = (index: number) => {
    confirmAlert({
      title: 'Delete',
      message: 'Are you sure want to delete this record?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            let temp = getValues();
            const tempItem = temp.skills;
            const updatedItems = tempItem.filter((_) => _?.index !== index);
            temp.skills = updatedItems;
            setResume(temp);
            reset(temp);
          }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });
  }

  const handleLangAdd = (e: any) => {
    e.preventDefault();
    let temp = getValues();
    const tempItem = temp.languages;
    const updatedItems = tempItem ? [...tempItem, {} as any] : [{} as any];
    temp.languages = updatedItems;
    setResume(temp);
    // reset(resume);
  }

  const handleLangDelete = (index: number) => {
    confirmAlert({
      title: 'Delete',
      message: 'Are you sure want to delete this record?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            let temp = getValues();
            const tempItem = temp.languages;
            const updatedItems = tempItem.filter((_) => _?.index !== index);
            temp.languages = updatedItems;
            setResume(temp);
            reset(temp);
          }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });
  }

  const handleLinkAdd = (e: any) => {
    e.preventDefault();
    let temp = getValues();
    const tempItem = temp.links;
    const updatedItems = tempItem ? [...tempItem, {} as any] : [{} as any];
    temp.links = updatedItems;
    setResume(temp);
    // reset(resume);
  }

  const handleLinkDelete = (index: number) => {
    confirmAlert({
      title: 'Delete',
      message: 'Are you sure want to delete this record?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            let temp = getValues();
            const tempItem = temp.links;
            const updatedItems = tempItem.filter((_) => _?.index !== index);
            temp.links = updatedItems;
            setResume(temp);
            reset(temp);
          }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });
  }

  const handleCourseAdd = (e: any) => {
    e.preventDefault();
    let temp = getValues();
    const tempItem = temp.courses;
    const updatedItems = tempItem ? [...tempItem, {} as any] : [{} as any];
    temp.courses = updatedItems;
    setResume(temp);
    // reset(resume);
  }

  const handleCourseDelete = (index: number) => {
    confirmAlert({
      title: 'Delete',
      message: 'Are you sure want to delete this record?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            let temp = getValues();
            const tempItem = temp.courses;
            const updatedItems = tempItem.filter((_) => _?.index !== index);
            temp.courses = updatedItems;
            setResume(temp);
            reset(temp);
          }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });
  }

  const handleReferenceAdd = (e: any) => {
    e.preventDefault();
    let temp = getValues();
    const tempItem = temp.references;
    const updatedItems = tempItem ? [...tempItem, {} as any] : [{} as any];
    temp.references = updatedItems;
    setResume(temp);
    // reset(resume);
  }

  const handleReferenceDelete = (index: number) => {
    confirmAlert({
      title: 'Delete',
      message: 'Are you sure want to delete this record?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            let temp = getValues();
            const tempItem = temp.references;
            const updatedItems = tempItem.filter((_) => _?.index !== index);
            temp.references = updatedItems;
            setResume(temp);
            reset(temp);
          }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });
  }

  const onSubmit: SubmitHandler<any> = data => {
    // console.log(initialResumeData);
    // // if data is same, dont save
    // if (JSON.stringify(data) === JSON.stringify(initialResumeData)) {
    //   return router.push('/resume/preview');
    // }

    // create object
    const resumeData = {
      user: userId,
      resume: data,
    }

    // store to localStorage - temp
    setLocalResume(resumeData);

    // save to database - permanent
    axios.post(process.env.NEXT_PUBLIC_API + '/resume', resumeData)
      .then(function (response) {

        router.push('/resume/preview');
      })
      .catch(function (error) {
      });
  };

  if (isLoading) return <div><Loader /></div>;

  return (
    <form onSubmit={(e) => e.preventDefault()}>

      <h3>Personal Details</h3>

      {/* Section 1 */}
      <div className="bg-white p-6 rounded shadow">

        <div className="grid grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-500">First Name*</span>
            </label>
            <input type="text" className={`input input-bordered font-medium ${errors.personal?.firstName ? 'input-error' : ''}`} {...register("personal.firstName")} />
            {
              errors?.personal?.firstName &&
              <label className="label">
                <span className="label-text text-gray-500-alt text-red-500">Please enter First Name</span>
              </label>
            }
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-500">Last Name*</span>
            </label>
            <input type="text" className={`input input-bordered font-medium ${errors.personal?.lastName ? 'input-error' : ''}`} {...register("personal.lastName")} />
            {
              errors?.personal?.lastName &&
              <label className="label">
                <span className="label-text text-gray-500-alt text-red-500">Please enter Last Name</span>
              </label>
            }
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-500">Email*</span>
            </label>
            <input type="text" className={`input input-bordered font-medium ${errors.personal?.email ? 'input-error' : ''}`} {...register("personal.email")} />
            {
              errors?.personal?.email &&
              <label className="label">
                <span className="label-text text-gray-500-alt text-red-500">Please enter Email Address</span>
              </label>
            }
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-500">Phone*</span>
            </label>
            <input type="tel" className={`input input-bordered font-medium ${errors.personal?.phone ? 'input-error' : ''}`} {...register("personal.phone")} />
            {
              errors?.personal?.phone &&
              <label className="label">
                <span className="label-text text-gray-500-alt text-red-500">Please enter Phone Number</span>
              </label>
            }
          </div>
        </div>

      </div>

      <h3>Profile Summary</h3>

      {/* Section 2 */}
      <div className="bg-white p-6 rounded shadow">

        <div className="grid grid-cols-1 gap-6">
          <div className="flex-1 form-control">
            <label className="label">
              <span className="label-text text-gray-500">Summary*</span>
            </label>
            <textarea className={`textarea h-24 textarea-bordered font-medium ${errors.personal?.summary ? 'input-error' : ''}`}  {...register("personal.summary")} />
          </div>
        </div>

      </div>

      <h3>Education*</h3>
      <p className="font-light text-sm">Info: Add minimum 3 education to make resume better</p>

      {/* Section 3 */}

      <div className="bg-white p-6 rounded shadow">
        {
          resume?.educations?.map((e: any, i: number) => {
            e.index = i;
            return EducationForm({ ...e, register, delete: handleEducationDelete, errors: errors.educations && errors.educations[i] });
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
          resume?.employments?.map((e: any, i: number) => {
            e.index = i;
            return EmploymentForm({ ...e, register, delete: handleEmploymentDelete, errors: errors.employments && errors.employments[i] });
          })
        }

        <div className="pt-5">
          <button className="btn btn-outline" onClick={handleEmploymentAdd}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Employment
          </button>
        </div>
      </div>

      <h3>Skills</h3>
      <p className="font-light text-sm">Info: Add minimum 3 skills to make resume better</p>

      <div className="bg-white p-6 rounded shadow">

        {
          resume?.skills?.map((e: any, i: number) => {
            e.index = i;
            return SkillForm({ ...e, register, delete: handleSkillDelete, errors: errors.skills && errors.skills[i] });
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
          resume?.languages?.map((e: any, i: number) => {
            e.index = i;
            return LanguageForm({ ...e, register, delete: handleLangDelete, errors: errors.languages && errors.languages[i] });
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
      <p className="font-light text-sm">Info: Add your blog/portfolio/github links</p>

      <div className="bg-white p-6 rounded shadow">

        {
          resume?.links?.map((e: any, i: number) => {
            e.index = i;
            return LinkForm({ ...e, register, delete: handleLinkDelete, errors: errors.links && errors.links[i] });
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
          resume?.courses?.map((e: any, i: number) => {
            e.index = i;
            return CourseForm({ ...e, register, delete: handleCourseDelete, errors: errors.courses && errors.courses[i] });
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
          resume?.references?.map((e: any, i: number) => {
            e.index = i;
            return ReferenceForm({ ...e, register, delete: handleReferenceDelete, errors: errors.references && errors.references[i] });
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

      <div className="flex py-8">
        <input type="submit" className="btn btn-primary btn-block" value="Save and Preview" onClick={handleSubmit(onSubmit)} />
      </div>

    </form>
  );
}
