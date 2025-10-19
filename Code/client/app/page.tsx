import Image from "next/image";
import Link from "next/link";
import React from "react";
import CallToAction from "../components/feature/CallToAction";
import Features from "../components/feature/Feature";
import FeaturesList from "../components/feature/FeatureList";
import { Metadata } from "next";
import { FaRocket, FaDownload, FaShare, FaUsers, FaStar, FaCheckCircle } from "react-icons/fa";

export const metadata: Metadata = {
  title: "ResumeVita.com - Free & Open Source Resume Generator",
  description:
    "Generate a resume, download as PDF, download as Word and share directly to your friends or recruiter. This is free and open source service.",
};

export default function Page() {
  return (
    <>
      {/* Hero Section */}
      <div className="hero min-h-screen bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent rounded-full blur-3xl"></div>
        </div>
        
        <div className="hero-content flex-col lg:flex-row gap-12 lg:gap-20 relative z-10">
          {/* Left Column - Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-6">
              <div className="badge badge-primary badge-lg mb-4 animate-pulse">
                <FaStar className="w-4 h-4 mr-1" />
                Free & Open Source
              </div>
              <h1 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6 leading-tight">
                Resume Vita
              </h1>
              <p className="text-xl lg:text-2xl text-base-content/80 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Create professional resumes that stand out. Download as PDF, share with recruiters, and land your dream job with our free, open-source resume builder.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link href="/resume" className="btn btn-primary btn-lg text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <FaRocket className="w-5 h-5 mr-2" />
                Get Started Free
              </Link>
              <Link href="/features" className="btn btn-outline btn-lg text-lg px-8 py-4 hover:btn-primary transition-all duration-300">
                Learn More
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-base-content/70">Free</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">ATS</div>
                <div className="text-sm text-base-content/70">Optimized</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">Open</div>
                <div className="text-sm text-base-content/70">Source</div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                <Image
                  src="/resume_undraw.svg"
                  alt="Resume Vita Hero Image"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Preview */}
      <div className="py-20 bg-base-200/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Why Choose Resume Vita?</h2>
            <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
              Built for modern job seekers with cutting-edge features and professional templates
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="card-body text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaDownload className="w-8 h-8 text-primary" />
                </div>
                <h3 className="card-title justify-center mb-2">PDF Export</h3>
                <p className="text-sm text-base-content/70">Download your resume in high-quality PDF format</p>
              </div>
            </div>
            
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="card-body text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaShare className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="card-title justify-center mb-2">Public Sharing</h3>
                <p className="text-sm text-base-content/70">Share your resume with a simple link</p>
              </div>
            </div>
            
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="card-body text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUsers className="w-8 h-8 text-accent" />
                </div>
                <h3 className="card-title justify-center mb-2">ATS Friendly</h3>
                <p className="text-sm text-base-content/70">Optimized for Applicant Tracking Systems</p>
              </div>
            </div>
            
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="card-body text-center">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="w-8 h-8 text-success" />
                </div>
                <h3 className="card-title justify-center mb-2">Professional</h3>
                <p className="text-sm text-base-content/70">Industry-standard templates and layouts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Features />
      <FeaturesList />
      <CallToAction />
    </>
  );
}
