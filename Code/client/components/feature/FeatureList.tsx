import { FaCodeBranch, FaDownload, FaFileAlt, FaGlobe, FaLock, FaToolbox } from "react-icons/fa";

const features = [
  {
    title: "Free",
    description: "Use the core resume workflow without hidden paywalls or gated basics.",
    icon: FaDownload,
  },
  {
    title: "Open Source",
    description: "Customize the app, extend the workflow, or inspect how the product works end to end.",
    icon: FaCodeBranch,
  },
  {
    title: "Export Resume",
    description: "Generate resumes in formats that are practical for applications and recruiter review.",
    icon: FaFileAlt,
  },
  {
    title: "Powerful API",
    description: "Automate resume creation and downloads when you want to plug Resume Vita into your own tools.",
    icon: FaToolbox,
  },
  {
    title: "Secured",
    description: "Resume data flows through a simpler, controlled system built for reliable access and sharing.",
    icon: FaLock,
  },
  {
    title: "Support",
    description: "Documentation, issue reporting, and community channels are there when you need help.",
    icon: FaGlobe,
  },
];

export default function FeaturesList() {
  return <>

    <section className="bg-background py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-foreground sm:text-5xl">ResumeVita&apos;s Features</h2>
          <p className="mt-3 text-lg leading-8 text-muted-foreground">
            A focused set of tools for writing, exporting, and sharing resumes without extra overhead.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-[1.75rem] border border-border/70 bg-card/88 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-card/72"
              >
                <div className="mb-5 inline-flex rounded-2xl bg-primary/12 p-3 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-3 text-base leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

  </>
}



// <!-- Section 1 -->
// <section class="py-20 bg-gray-50">
//   <div class="container items-center max-w-6xl px-4 px-10 mx-auto sm:px-20 md:px-32 lg:px-16">
//     <div class="flex flex-wrap items-center -mx-3">
//       <div class="order-1 w-full px-3 lg:w-1/2 lg:order-0">
//         <div class="w-full lg:max-w-md">
//           <h2 class="mb-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl font-heading">Jam-packed with all the tools you need to succeed!</h2>
//           <p class="mb-4 font-medium tracking-tight text-gray-400 xl:mb-6">It's never been easier to build a business of your own. Our tools will help you with the following:</p>
//           <ul>
//             <li class="flex items-center py-2 space-x-4 xl:py-3">
//               <svg class="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
//               <span class="font-medium text-gray-500">Faster Processing and Delivery</span>
//             </li>
//             <li class="flex items-center py-2 space-x-4 xl:py-3">
//               <svg class="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
//               <span class="font-medium text-gray-500">Out of the Box Tracking and Monitoring</span>
//             </li>
//             <li class="flex items-center py-2 space-x-4 xl:py-3">
//               <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
//               <span class="font-medium text-gray-500">100% Protection and Security for Your App</span>
//             </li>
//           </ul>
//         </div>
//       </div>
//       <div class="w-full px-3 mb-12 lg:w-1/2 order-0 lg:order-1 lg:mb-0"><img class="mx-auto sm:max-w-sm lg:max-w-full" src="https://cdn.devdojo.com/images/november2020/feature-graphic.png" alt="feature image"></div>
//     </div>
//   </div>
// </section>
