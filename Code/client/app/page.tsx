import Image from "next/image";
import Link from "next/link";
import React from "react";
import CallToAction from "../components/feature/CallToAction";
import Features from "../components/feature/Feature";
import FeaturesList from "../components/feature/FeatureList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ResumeVita.com - Free & Open Source Resume Generator",
  description:
    "Generate a resume, download as PDF, download as Word and share directly to your friends or recruiter. This is free and open source service.",
};

export default function Page() {
  return (
    <>
      <div className="hero min-h-screen bg-white">
        <div className="hero-content flex-col lg:flex-row">
          <div className="">
            <Image
              src="/resume_undraw.svg"
              alt="Resume Vita Hero Image"
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
              }}
              width={600}
              height={600}
            />
          </div>
          <div>
            <h1 className="mb-5 text-5xl font-bold">Resume Vita</h1>
            <p className="mb-5">
              Generate a resume, download as PDF, download as Word and share
              directly to your friends or recruiter. This is free and open
              source service.
            </p>
            <button className="btn btn-primary text-white ">
              <Link href="/resume">Get Started</Link>
            </button>
          </div>
        </div>
      </div>

      <Features />
      <FeaturesList />
      <CallToAction />
    </>
  );
}
