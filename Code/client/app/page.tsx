import Image from "next/image";
import Link from "next/link";
import React from "react";
import CallToAction from "../components/feature/CallToAction";
import Features from "../components/feature/Feature";
import FeaturesList from "../components/feature/FeatureList";
import { Metadata } from "next";
import { FaRocket, FaDownload, FaShare, FaUsers, FaStar, FaCheckCircle } from "react-icons/fa";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const featureCards = [
  {
    title: "PDF Export",
    description: "Download your resume in high-quality PDF format",
    icon: FaDownload,
    iconClassName: "text-primary",
    backgroundClassName: "bg-primary/12",
  },
  {
    title: "Public Sharing",
    description: "Share your resume with a simple link",
    icon: FaShare,
    iconClassName: "text-emerald-500 dark:text-emerald-300",
    backgroundClassName: "bg-emerald-500/12 dark:bg-emerald-400/12",
  },
  {
    title: "ATS Friendly",
    description: "Optimized for Applicant Tracking Systems",
    icon: FaUsers,
    iconClassName: "text-cyan-600 dark:text-cyan-300",
    backgroundClassName: "bg-cyan-500/12 dark:bg-cyan-400/12",
  },
  {
    title: "Professional",
    description: "Industry-standard templates and layouts",
    icon: FaCheckCircle,
    iconClassName: "text-amber-500 dark:text-amber-300",
    backgroundClassName: "bg-amber-500/12 dark:bg-amber-400/12",
  },
];

export const metadata: Metadata = {
  title: "ResumeVita.com - Free & Open Source Resume Generator",
  description:
    "Generate a resume, download as PDF, download as Word and share directly to your friends or recruiter. This is free and open source service.",
};

export default function Page() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/8 via-background to-emerald-500/8 px-4 py-16 md:py-24">
        <div className="absolute inset-0 opacity-60 dark:opacity-90">
          <div className="absolute left-6 top-12 h-24 w-24 rounded-full bg-primary/16 blur-3xl md:left-20 md:top-20 md:h-40 md:w-40" />
          <div className="absolute bottom-10 right-8 h-28 w-28 rounded-full bg-cyan-500/12 blur-3xl md:bottom-16 md:right-24 md:h-44 md:w-44 dark:bg-cyan-400/10" />
          <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/10 blur-3xl md:h-64 md:w-64 dark:bg-emerald-300/10" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl flex-col items-center gap-10 lg:flex-row lg:gap-20">
          <div className="flex-1 px-4 text-center lg:text-left">
            <div className="mb-6">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur-sm dark:border-primary/30 dark:bg-primary/12 dark:text-emerald-300">
                <FaStar className="h-3 w-3 md:h-4 md:w-4" />
                <span className="text-xs md:text-sm">Free & Open Source</span>
              </div>

              <h1 className="mb-4 text-4xl font-bold leading-tight text-foreground sm:text-5xl md:mb-6 md:text-6xl lg:text-7xl">
                Resume Vita
              </h1>

              <p className="mx-auto mb-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg md:mb-8 md:text-xl lg:mx-0 lg:text-2xl">
                Create professional resumes that stand out. Download as PDF, share with recruiters, and land your dream job with our free, open-source resume builder.
              </p>
            </div>

            <div className="mb-6 flex flex-col justify-center gap-3 sm:flex-row md:mb-8 md:gap-4 lg:justify-start">
              <Link
                href="/resume"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 px-7 text-base shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25 md:h-14 md:px-8 md:text-lg"
                )}
              >
                <FaRocket className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Get Started Free
              </Link>
              <Link
                href="/features"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "h-12 border-border/80 bg-background/80 px-7 text-base shadow-sm backdrop-blur-sm hover:bg-accent hover:text-accent-foreground md:h-14 md:px-8 md:text-lg"
                )}
              >
                Learn More
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-sm md:max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-xl md:text-3xl font-bold text-primary">100%</div>
                <div className="text-xs md:text-sm text-muted-foreground">Free</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-3xl font-bold text-cyan-600 dark:text-cyan-300">ATS</div>
                <div className="text-xs md:text-sm text-muted-foreground">Optimized</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-3xl font-bold text-emerald-500 dark:text-emerald-300">Open</div>
                <div className="text-xs md:text-sm text-muted-foreground">Source</div>
              </div>
            </div>
          </div>

          <div className="flex flex-1 justify-center px-4 lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-none">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-r from-primary/15 via-emerald-400/10 to-cyan-500/15 blur-2xl md:-inset-5 dark:from-primary/20 dark:via-emerald-300/12 dark:to-cyan-300/16" />
              <div className="relative rounded-[2rem] border border-border/70 bg-card/88 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.14)] backdrop-blur-md md:p-8 dark:bg-card/78 dark:shadow-[0_32px_90px_rgba(2,6,23,0.45)]">
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
      </section>

      <section className="px-4 py-12 md:py-20">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl md:mb-6 md:text-4xl lg:text-5xl">Why Choose Resume Vita?</h2>
            <p className="mx-auto max-w-3xl text-base text-muted-foreground sm:text-lg md:text-xl">
              Built for modern job seekers with cutting-edge features and professional templates
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {featureCards.map((feature) => {
              const Icon = feature.icon;

              return (
                <Card
                  key={feature.title}
                  className="border border-border/70 bg-card/88 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-card/82"
                >
                  <CardContent className="p-4 text-center md:p-6">
                    <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full md:mb-4 md:h-16 md:w-16 ${feature.backgroundClassName}`}>
                      <Icon className={`h-6 w-6 md:h-8 md:w-8 ${feature.iconClassName}`} />
                    </div>
                    <CardTitle className="mb-2 justify-center text-sm md:text-base">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-xs md:text-sm">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Features />
      <FeaturesList />
      <CallToAction />
    </>
  );
}
