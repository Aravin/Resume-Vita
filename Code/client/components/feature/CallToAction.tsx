/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CallToAction() {
  return <>
    <section className="bg-muted/35 py-8 leading-7 sm:py-12 md:py-16 lg:py-24 dark:bg-muted/20">
      <div className="mx-auto max-w-6xl px-4 px-10 lg:px-12">
        <div className="flex flex-col items-start rounded-[2rem] border border-border/70 bg-card/85 p-8 shadow-lg lg:flex-row lg:items-center lg:p-12 dark:bg-card/75">
          <div className="box-border flex-1 text-center sm:text-left">
            <h2 className="m-0 text-left text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              Boost Your Productivity
            </h2>
            <p className="mt-2 text-left text-xl text-muted-foreground sm:text-2xl">
              Our service will help you maximize and boost your productivity.
            </p>
          </div>
          <Link
            href="/resume"
            className={cn(buttonVariants({ size: "lg" }), "mt-6 w-full md:w-auto lg:ml-6 lg:mt-0")}
          >
            Get Started
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  </>;
}
