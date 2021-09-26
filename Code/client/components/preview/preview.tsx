import style from '../../styles/Preview.module.css';

export default function Preview() {
  return (
    <div className="mt-5">

      <div className="px-20 py-5 bg-base-100">
        <header className="py-4">
          <h1 className="text-5xl mb-5 uppercase">Aravind Appadurai</h1>
          <span className="text-xl text-gray-500 mb-5">Senior Software Engineer II</span>
        </header>

        <hr></hr>

        <div className="flex">
          <div className="flex-none mr-5 border-left">
            {/* Size Content */}
            <section className="py-4">
              <h2 className="text-2xl font-bold uppercase">Details</h2>
              <hr className="mt-2 border-2 border-solid border-gray-700 w-1/3"></hr>
              <div className="mt-4">
                <h3 className="text-lg uppercase">Phone</h3>
                <p className="mt-1 text-gray-500"> (+91) 9710549943 </p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg uppercase">Email</h3>
                <p className="mt-1 text-gray-500"> aravin.it@gmail.com </p>
              </div>
            </section>

            <section className="py-4">
              <h2 className="text-2xl font-bold uppercase">LINKS</h2>
              <hr className="mt-2 border-2 border-solid border-gray-700 w-1/3"></hr>
              <div className="mt-4">
                <p className="mt-1 text-gray-500">
                  <a href="https://www.aravin.net" target="_blank" rel="noopener noreferrer" className="underline">Blog</a>
                </p>
              </div>
              <div className="mt-4">
                <p className="mt-1 text-gray-500">
                  <a href="https://github.com/Aravin/" target="_blank" rel="noopener noreferrer" className="underline">Github</a>
                </p>
              </div>
            </section>

            <section className="py-4">
              <h2 className="text-2xl font-bold uppercase">SKILLS</h2>
              <hr className="mt-2 border-2 border-solid border-gray-700 w-1/3"></hr>
              <div className="mt-4">
                <div className="badge"> Node.js</div>
              </div>
              <div className="mt-4">
                <div className="badge"> Typescript</div>
              </div>
              <div className="mt-4">
                <div className="badge"> Javascript</div>
              </div>
              <div className="mt-4">
                <div className="badge"> C#</div>
              </div>
              <div className="mt-4">
                <div className="badge"> SQL</div>
              </div>
              <div className="mt-4">
                <div className="badge"> HTML/CSS</div>
              </div>
              <div className="mt-4">
                <div className="badge"> React.js/Angular</div>
              </div>
              <div className="mt-4">
                <div className="badge"> Flutter</div>
              </div>
            </section>

          </div>
          <div className="grid grid-cols-2 divide-x divide-gray-200">
            <div></div>
            <div></div>
          </div>
          <div className="flex-auto ml-5">
            {/* Main Content */}
            <section className="py-4">
              <h2 className="text-2xl font-bold uppercase ">Profile</h2>
              <hr className="mt-2 border-2 border-solid border-gray-700 w-1/12"></hr>
              <p className="mt-4 text-gray-500">
                To gain a dynamic and challenging role in Information Technology, that will offer me the best opportunity for the further development of abilities, skills, and knowledge in a well-established firm with long term career growth possibilities.
              </p>
            </section>

            <section className="py-4">
              <h2 className="text-2xl font-bold uppercase">Employment History</h2>
              <hr className="mt-2 border-2 border-solid border-gray-700 w-1/12"></hr>

              {/* employment 0  */}
              <article className="">
                <div className="flex flex-row mt-8">
                  <div className="flex-auto"><h3 className="text-xl font-bold">Senior Software Engineer II, Everi Fintech</h3></div>
                  <div className="flex-2"><h3 className="">Chennai</h3></div>
                </div>
                <h4 className="mt-2">Aug 2018 - Present</h4>
                <p className="mt-4 text-gray-500">
                  Leading and Co-ordinating the team and completing the project/features/work item on the time. Supporting the peer for their queries and issues. Attending the meeting with management and consolidating the requirements. Supporting for Production issues.
                </p>
                <p>
                  <span className="text-lg text-bold">Primary Skills</span>: Node.js, React.js, Angular.js, Flutter, ISO 8583 Messages
                </p>

              </article>


              {/* employment 1  */}
              <article className="">
                <div className="flex flex-row mt-8">
                  <div className="flex-auto"><h3 className="text-xl font-bold">Senior Engineer, CSS Corp</h3></div>
                  <div className="flex-2"><h3 className="">Chennai</h3></div>
                </div>
                <h4 className="mt-2">Feb, 2017 - Jul, 2018</h4>
                <p className="mt-4 text-gray-500">
                  Maintaining and Feature enhancement for existing web application using ASP.NET MVC, C#, Oracle Databases, Web/Windows  Service, ADS server and Angular.
                </p>
              </article>

              {/* employment 2  */}
              <article className="">
                <div className="flex flex-row mt-8">
                  <div className="flex-auto"><h3 className="text-xl font-bold">Software Engineer, Quess Corp (contract on IBM)</h3></div>
                  <div className="flex-2"><h3 className="">Chennai</h3></div>
                </div>
                <h4 className="mt-2">Jun, 2016 - Feb, 2017</h4>
                <p className="mt-4 text-gray-500">
                  Developing web application using ASP.NET MVC, C#, SQL, HTML5, CSS3, JavaScript, JQuery.
                </p>
              </article>

              {/* employment 3  */}
              <article className="">
                <div className="flex flex-row mt-8">
                  <div className="flex-auto"><h3 className="text-xl font-bold">Associate, EC Software</h3></div>
                  <div className="flex-2"><h3 className="">Chennai</h3></div>
                </div>
                <h4 className="mt-2">Aug, 2014 - Apr, 2016</h4>
                <p className="mt-4 text-gray-500">
                  Developed and Maintained Online Catalog Tool using ASP.NET, C#, SQL, HTML5, CSS, JavaScript, Capybara, Calabash, Jenkins,  BrowserStack and Amazon DeviceFarm.
                </p>
              </article>

            </section>

            <section className="py-4">
              <h2 className="text-2xl font-bold uppercase">Education</h2>
              <hr className="mt-2 border-2 border-solid border-gray-700 w-1/12"></hr>

              {/* education 0  */}
              <article className="">
                <div className="flex flex-row mt-8">
                  <div className="flex-auto">
                    <h3 className="text-xl font-bold">B. Tech – Information Technology</h3>
                    <h4 className="text-lg">Bhajarang Engineering College</h4>
                  </div>
                  <div className="flex-2"><h3 className="">Apr, 2010 - Apr, 2014</h3></div>
                </div>
              </article>

              {/* education 1  */}
              <article className="">
                <div className="flex flex-row mt-8">
                  <div className="flex-auto">
                    <h3 className="text-xl font-bold">HSC (12th)</h3>
                    <h4 className="text-lg">Salvation Matriculation Hr. Sec School – Matriculation</h4>
                  </div>
                  <div className="flex-2"><h3 className="">Apr, 2009 - Apr, 2010</h3></div>
                </div>
              </article>

              {/* education 2  */}
              <article className="">
                <div className="flex flex-row mt-8">
                  <div className="flex-auto">
                    <h3 className="text-xl font-bold">SSL (10th)</h3>
                    <h4 className="text-lg">Salvation Matriculation School – Matriculation</h4>
                  </div>
                  <div className="flex-2"><h3 className="">Apr, 2007 - Apr, 2008</h3></div>
                </div>
              </article>
            </section>

            <section className="py-4">
              <h2 className="text-2xl font-bold uppercase">Certification</h2>
              <hr className="mt-2 border-2 border-solid border-gray-700 w-1/12"></hr>

              {/* certificate 0  */}
              <article className="mb-8">
                <div className="flex flex-row mt-4">
                  <div className="flex-auto">
                    <h3 className="text-xl font-bold">70-483 - Programming in C# (MCP)</h3>
                  </div>
                  <div className="flex-2"><h3 className="">Microsoft</h3></div>
                </div>
                <h4 className="mt-2">Jan, 2018</h4>
              </article>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}