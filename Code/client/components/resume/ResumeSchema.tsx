import * as yup from "yup";

export const ResumeSchema = yup
  .object({
    personal: yup.object({
      firstName: yup.string().min(4).required(),
      lastName: yup.string().min(2).required(),
      email: yup.string().email().required(),
      phone: yup.number().required(),
      summary: yup.string().min(100).max(2000).required(),
    }),
    educations: yup.array().of(
      yup
        .object({
          institution: yup.string().min(3).required(),
          subject: yup.string().min(2).required(),
          startDate: yup.string().required(),
          endDate: yup.string().required(),
          score: yup.number().positive().required(),
          location: yup.string(),
        })
        .required()
    ),
    internships: yup.array().of(
      yup.object({
        title: yup.string().min(5).required(),
        company: yup.string().min(3).required(),
        startDate: yup.string().required(),
        endDate: yup.string(),
        location: yup.string(),
        summary: yup.string().min(100).max(4000).required(),
      })
    ),
    employments: yup.array().of(
      yup.object({
        title: yup.string().min(5).required(),
        company: yup.string().min(3).required(),
        startDate: yup.string().required(),
        endDate: yup
          .string()
          .when("isCurrent", { is: false, then: yup.string().required() }),
        location: yup.string(),
        isCurrent: yup.bool(),
        summary: yup.string().min(100).max(4000).required(),
      })
    ),
    skills: yup.array().of(
      yup
        .object({
          name: yup.string().min(3).required(),
          level: yup.number().positive().required(),
        })
        .required()
    ),
    languages: yup.array().of(
      yup
        .object({
          name: yup.string().min(3).required(),
          level: yup.number().positive().required(),
        })
        .required()
    ),
    links: yup.array().of(
      yup.object({
        name: yup.string().required(),
        url: yup
          .string()
          .matches(
            /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
          )
          .required(),
      })
    ),
    courses: yup
      .array()
      .of(
        yup.object({
          name: yup.string().min(3).required(),
          institution: yup.string().min(3).required(),
          endDate: yup.string(),
          score: yup.number().positive(),
        })
      )
      .optional(),
    references: yup.array().of(
      yup.object({
        name: yup.string().min(3).required(),
        company: yup.string().min(3).required(),
        phone: yup.string(),
        email: yup.string().email(),
      })
    ),
  })
  .required();
