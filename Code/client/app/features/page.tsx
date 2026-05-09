import { Metadata } from "next";
import FeaturesList from "../../components/feature/FeatureList";
import Features from "../../components/feature/Feature";
import CallToAction from "../../components/feature/CallToAction";
import { FaCheckCircle, FaFilePdf, FaLink } from "react-icons/fa";

export const metadata: Metadata = {
  title: "ResumeVita.com Features",
};

// Force dynamic rendering to prevent build-time issues
export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-emerald-500/8 via-background to-background px-4 py-20 md:py-24">
        <div className="absolute inset-0 opacity-70">
          <div className="absolute left-8 top-10 h-28 w-28 rounded-full bg-emerald-400/10 blur-3xl md:left-20 md:h-44 md:w-44" />
          <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl md:h-56 md:w-56" />
        </div>

        <div className="relative mx-auto max-w-6xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            Features
          </p>
          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl">
            Everything you need to build and share a cleaner resume.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
            Resume Vita keeps the workflow simple: write faster, export reliably, and share a polished resume without fighting unnecessary UI.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/70 bg-card/80 p-5 text-left shadow-sm dark:bg-card/70">
              <FaFilePdf className="mb-3 h-5 w-5 text-primary" />
              <p className="text-sm font-semibold text-foreground">Export-ready output</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Generate resume files that are ready for applications and recruiter handoff.</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-card/80 p-5 text-left shadow-sm dark:bg-card/70">
              <FaLink className="mb-3 h-5 w-5 text-primary" />
              <p className="text-sm font-semibold text-foreground">Easy sharing</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Publish a resume link when you need a quick, professional profile page.</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-card/80 p-5 text-left shadow-sm dark:bg-card/70">
              <FaCheckCircle className="mb-3 h-5 w-5 text-primary" />
              <p className="text-sm font-semibold text-foreground">Focused workflow</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">The editor stays simple so you spend more time refining content and less time clicking around.</p>
            </div>
          </div>
        </div>
      </section>

      <Features />
      <FeaturesList />
      <CallToAction />
    </>
  );
}
