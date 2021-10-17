export default function FeaturesList() {
  return <>

    <section className="py-20 bg-white">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tight text-center">ResumeVita&apos;s Features</h2>
        <p className="mt-2 text-lg text-center text-gray-600">Check out our list of awesome features below.</p>
        <div className="grid grid-cols-4 gap-8 mt-10 sm:grid-cols-8 lg:grid-cols-12 sm:px-8 xl:px-0">

          <div className="relative flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 overflow-hidden bg-gray-100 sm:rounded-xl">
            <div className="p-3 text-white bg-primary rounded-full">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
            </div>
            <h4 className="text-xl font-medium text-gray-700">Free</h4>
            <p className="text-base text-center text-gray-500">This application is completely free and no hidden charges or anything.</p>
          </div>

          <div className="flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 bg-gray-100 sm:rounded-xl">
            <div className="p-3 text-white bg-primary rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 " viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M18 8a3 3 0 0 1 0 6"></path><path d="M10 8v11a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5"></path><path d="M12 8h0l4.524 -3.77a0.9 .9 0 0 1 1.476 .692v12.156a0.9 .9 0 0 1 -1.476 .692l-4.524 -3.77h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h8"></path></svg>
            </div>
            <h4 className="text-xl font-medium text-gray-700">Open Source</h4>
            <p className="text-base text-center text-gray-500">This application is fully open source -  You can add, modify and customize any feature as per your choice.</p>
          </div>

          <div className="flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 bg-gray-100 sm:rounded-xl">
            <div className="p-3 text-white bg-primary rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 " viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"></polyline><line x1="12" y1="12" x2="20" y2="7.5"></line><line x1="12" y1="12" x2="12" y2="21"></line><line x1="12" y1="12" x2="4" y2="7.5"></line><line x1="16" y1="5.25" x2="8" y2="9.75"></line></svg>
            </div>
            <h4 className="text-xl font-medium text-gray-700">Export Resume</h4>
            <p className="text-base text-center text-gray-500">You can export resume as PDF, HTML, Image and Word File.</p>
          </div>

          <div className="flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 bg-gray-100 sm:rounded-xl">
            <div className="p-3 text-white bg-primary rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 " viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M8 9l3 3l-3 3"></path><line x1="13" y1="15" x2="16" y2="15"></line><rect x="3" y="4" width="18" height="16" rx="2"></rect></svg>
            </div>
            <h4 className="text-xl font-medium text-gray-700">Powerful API</h4>
            <p className="text-base text-center text-gray-500">You can also use our API to create resume and download resume.</p>
          </div>

          <div className="flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 bg-gray-100 sm:rounded-xl">
            <div className="p-3 text-white bg-primary rounded-full">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <h4 className="text-xl font-medium text-gray-700">Secured</h4>
            <p className="text-base text-center text-gray-500">All the communication is secured and stored in leading cloud service provider.</p>
          </div>

          <div className="flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 bg-gray-100 sm:rounded-xl">
            <div className="p-3 text-white bg-primary rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 " viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><line x1="15" y1="5" x2="15" y2="7"></line><line x1="15" y1="11" x2="15" y2="13"></line><line x1="15" y1="17" x2="15" y2="19"></line><path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2"></path></svg>
            </div>
            <h4 className="text-xl font-medium text-gray-700">Support</h4>
            <p className="text-base text-center text-gray-500">For any query or assistance you can reach us, we are ready to help you.</p>
          </div>

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
