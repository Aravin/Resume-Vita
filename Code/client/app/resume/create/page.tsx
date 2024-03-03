import { Metadata } from "next";
import React from "react";
import ResumeForm from "../../../components/resume/Form";
import { Breadcrumbs } from "../../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Create Resume",
};

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl w-full">
        {/* <h2>Edit Resume</h2> */}
        <Breadcrumbs currentPage="Create/Edit Resume" />
        <ResumeForm></ResumeForm>
      </div>
    </div>
  );
}
