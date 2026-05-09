import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FaCheckCircle } from "react-icons/fa";

const featureHighlights = [
  "Clean resume editor built for fast iteration",
  "Professional layouts that stay readable",
  "Simple flow from writing to export",
];

export default function Features() {
  return (
    <>
      <section className="bg-muted/30 px-4 py-20 dark:bg-muted/15">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                Built for clarity
              </p>
              <h2 className="text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
                Beautiful resumes without an overcomplicated builder.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-muted-foreground lg:text-lg">
                Resume Vita helps you present your story clearly, keep sections organized, and export a format that feels ready for real hiring workflows.
              </p>
            </div>

            <div className="space-y-3">
              {featureHighlights.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card/70 px-4 py-3 text-sm text-foreground shadow-sm dark:bg-card/60">
                  <FaCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/resume" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}>
                    Try It Free
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-1 h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
              <Link href="/resume/create" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "w-full sm:w-auto")}>
                Start Building
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-primary/12 via-emerald-400/10 to-cyan-400/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/88 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.12)] dark:bg-card/72 dark:shadow-[0_30px_90px_rgba(2,6,23,0.42)]">
              <Image
                src="/resume_feature_undraw.svg"
                alt="resumevita.com feature"
                width={520}
                height={520}
                className="h-auto w-full"
              />
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-muted/70 px-4 py-3 text-center dark:bg-muted/55">
                  <p className="text-lg font-bold text-foreground">PDF</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Export</p>
                </div>
                <div className="rounded-2xl bg-muted/70 px-4 py-3 text-center dark:bg-muted/55">
                  <p className="text-lg font-bold text-foreground">Share</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Public Link</p>
                </div>
                <div className="rounded-2xl bg-muted/70 px-4 py-3 text-center dark:bg-muted/55">
                  <p className="text-lg font-bold text-foreground">ATS</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Friendly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
