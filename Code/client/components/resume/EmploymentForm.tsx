import { nanoid } from "nanoid";
import { UseFormRegister } from "react-hook-form";
import ExperienceFormFields from "./ExperienceFormFields";

interface EmploymentType {
  register: UseFormRegister<any>;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  location: string;
  summary: string;
  isCurrent: boolean;
  index: number;
  errors: any;
}

export default function EmploymentForm(prop: EmploymentType) {
  return (
    <div key={nanoid()} className="flex justify-between mb-12 mt-6">
      <div className="flex-1 xcollapse xcollapse-arrow rounded">
        {/* <input type="checkbox" className="peer" /> */}
        <div className="xcollapse-title text-lg font-medium pr-12">
          {prop.title && prop.company
            ? `${prop.title} at ${prop.company}`
            : `Employment # ${prop.index + 1}`}
        </div>
        <ExperienceFormFields
          register={prop.register}
          index={prop.index}
          basePath="employments"
          title={prop.title}
          company={prop.company}
          startDate={prop.startDate}
          endDate={prop.endDate}
          location={prop.location}
          summary={prop.summary}
          errors={prop.errors}
          titlePlaceholder="e.g. Software Engineer"
          titleLabel="Job Title*"
          companyLabel="Company Name*"
          showIsCurrent={true}
        />
      </div>
    </div>
  );
}
