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
      <div className="hero min-h-screen bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5 relative overflow-hidden px-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 md:top-20 md:left-20 w-16 h-16 md:w-32 md:h-32 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-20 h-20 md:w-40 md:h-40 bg-secondary rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-60 md:h-60 bg-accent rounded-full blur-3xl"></div>
        </div>
        
        <div className="hero-content flex-col lg:flex-row gap-8 lg:gap-20 relative z-10 max-w-7xl mx-auto">
          {/* Left Column - Content */}
          <div className="flex-1 text-center lg:text-left px-4">
            <div className="mb-6">
              <div className="badge badge-primary badge-sm md:badge-lg mb-4 animate-pulse">
                <FaStar className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                <span className="text-xs md:text-sm">Free & Open Source</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4 md:mb-6 leading-tight">
                Resume Vita
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-base-content/80 mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Create professional resumes that stand out. Download as PDF, share with recruiters, and land your dream job with our free, open-source resume builder.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start mb-6 md:mb-8">
              <Link href="/resume" className="btn btn-primary btn-md md:btn-lg text-base md:text-lg px-6 md:px-8 py-3 md:py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <FaRocket className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Get Started Free
              </Link>
              <Link href="/features" className="btn btn-outline btn-md md:btn-lg text-base md:text-lg px-6 md:px-8 py-3 md:py-4 hover:btn-primary transition-all duration-300">
                Learn More
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-sm md:max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-xl md:text-3xl font-bold text-primary">100%</div>
                <div className="text-xs md:text-sm text-base-content/70">Free</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-3xl font-bold text-secondary">ATS</div>
                <div className="text-xs md:text-sm text-base-content/70">Optimized</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-3xl font-bold text-accent">Open</div>
                <div className="text-xs md:text-sm text-base-content/70">Source</div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Image */}
          <div className="flex-1 flex justify-center lg:justify-end px-4">
            <div className="relative w-full max-w-md lg:max-w-none">
              <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl md:rounded-3xl blur-xl md:blur-2xl"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl">
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
      <div className="py-10 md:py-20 bg-base-200/50 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Why Choose Resume Vita?</h2>
            <p className="text-base sm:text-lg md:text-xl text-base-content/70 max-w-3xl mx-auto">
              Built for modern job seekers with cutting-edge features and professional templates
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="card-body text-center p-4 md:p-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <FaDownload className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <h3 className="card-title justify-center mb-2 text-sm md:text-base">PDF Export</h3>
                <p className="text-xs md:text-sm text-base-content/70">Download your resume in high-quality PDF format</p>
              </div>
            </div>
            
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="card-body text-center p-4 md:p-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <FaShare className="w-6 h-6 md:w-8 md:h-8 text-secondary" />
                </div>
                <h3 className="card-title justify-center mb-2 text-sm md:text-base">Public Sharing</h3>
                <p className="text-xs md:text-sm text-base-content/70">Share your resume with a simple link</p>
              </div>
            </div>
            
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="card-body text-center p-4 md:p-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <FaUsers className="w-6 h-6 md:w-8 md:h-8 text-accent" />
                </div>
                <h3 className="card-title justify-center mb-2 text-sm md:text-base">ATS Friendly</h3>
                <p className="text-xs md:text-sm text-base-content/70">Optimized for Applicant Tracking Systems</p>
              </div>
            </div>
            
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="card-body text-center p-4 md:p-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <FaCheckCircle className="w-6 h-6 md:w-8 md:h-8 text-success" />
                </div>
                <h3 className="card-title justify-center mb-2 text-sm md:text-base">Professional</h3>
                <p className="text-xs md:text-sm text-base-content/70">Industry-standard templates and layouts</p>
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
