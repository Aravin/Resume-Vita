import { Metadata } from "next";
import React from "react";
import ResumeForm from "../../../components/resume/Form";
import { Breadcrumbs } from "../../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Create Resume",
};

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-6xl px-2 py-2 md:px-4 md:py-3">
      <div className="w-full">
        <Breadcrumbs currentPage="Create/Edit Resume" />
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">Create Resume</h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            Fill in the sections below, reorder items where needed, then save to open the preview.
          </p>
        </div>
        <ResumeForm></ResumeForm>
      </div>
    </div>
  );
}
