import * as yup from "yup";
import { getRichTextCharacterCount, isRichTextEffectivelyEmpty } from "@/utils/richText";
import { isStartBeforeEnd } from "@/lib/dateUtils";

const richTextSummary = (minimum: number, maximum: number) =>
  yup
    .string()
    .test("required-visible-text", "required", (value) => !isRichTextEffectivelyEmpty(value))
    .test("min-visible-text", `minimum-${minimum}`, (value) => getRichTextCharacterCount(value) >= minimum)
    .test("max-visible-text", `maximum-${maximum}`, (value) => getRichTextCharacterCount(value) <= maximum)
    .required();

export const ResumeSchema = yup
  .object({
    personal: yup.object({
      firstName: yup.string().min(4).required(),
      lastName: yup.string().min(2).required(),
      email: yup.string().email().required(),
      phone: yup.string().required(),
      summary: richTextSummary(100, 2000),
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
        .test(
          "start-before-end",
          "Start Date must be before End Date",
          (value) => {
            if (!value) return true;
            const { startDate, endDate } = value as any;
            if (!startDate || !endDate) return true;
            return isStartBeforeEnd(startDate, endDate);
          }
        )
        .required()
    ),
    internships: yup.array().of(
      yup.object({
        title: yup.string().min(5).required(),
        company: yup.string().min(3).required(),
        startDate: yup.string().required(),
        endDate: yup.string(),
        location: yup.string(),
        summary: richTextSummary(100, 4000),
      })
      .test(
        "start-before-end-internship",
        "Start Date must be before End Date",
        (value) => {
          if (!value) return true;
          const { startDate, endDate } = value as any;
          if (!startDate || !endDate) return true;
          return isStartBeforeEnd(startDate, endDate);
        }
      )
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
        summary: richTextSummary(100, 4000),
      })
      .test(
        "start-before-end-employment",
        "Start Date must be before End Date",
        (value) => {
          if (!value) return true;
          const { startDate, endDate, isCurrent } = value as any;
          if (isCurrent) return true;
          if (!startDate || !endDate) return true;
          return isStartBeforeEnd(startDate, endDate);
        }
      )
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
        .test(
          "start-before-end-course",
          "Start Date must be before End Date",
          (value) => {
            if (!value) return true;
            const { startDate, endDate } = value as any;
            if (!startDate || !endDate) return true;
            return isStartBeforeEnd(startDate, endDate);
          }
        )
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
