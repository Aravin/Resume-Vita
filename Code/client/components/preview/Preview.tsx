import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link'
import { FaFilePdf, FaEdit } from 'react-icons/fa';
import axios from 'axios';

export default function Preview() {

  const { user, error, isLoading } = useUser();
  const userId = user?.sub?.split('|')[1];

  // local storage hook
  const [storedResume, storeResume] = useLocalStorage('resumeData', {} as any);

  const r = (storedResume?.user === userId) ? storedResume?.resume : {};

  const handleClick = (e: any) => {
    e.preventDefault();

    if (document) {
      const html = document.querySelector('#preview')?.cloneNode(true);

      const body = {
        html: (new XMLSerializer()).serializeToString(html as Node),
        user: userId,
      }

      // save to database - permanent
      axios.post(process.env.NEXT_PUBLIC_API + '/pdf', body)
        .then(function (response) {

          var link = document.createElement('a');
          link.href = `${process.env.NEXT_PUBLIC_S3_BUCKET}/${userId}/${userId}.pdf`;
          // link.download = `${process.env.NEXT_PUBLIC_S3_BUCKET}/${userId}/${userId}.pdf`;
          link.target = '_blank';
          link.dispatchEvent(new MouseEvent('click'));
        })
        .catch(function (error) {
        });
    }
  }

  return (
    <>
      <div className="flex gap-4 justify-end pb-5">
        <div>
          <button className="btn btn-sm btn-outline btn-accent" onClick={handleClick}>
            <FaFilePdf /> &nbsp; GET PDF
          </button>
        </div>
        {/* <div className="flex-1"><button className="btn btn-outline btn-secondary"><FaFileWord /> GET Word</button> </div> */}
        <div>
          <Link href="/resume/create" passHref>
            <button className="btn btn-sm btn-outline btn-primary"><FaEdit /> &nbsp; Edit</button>
          </Link>
        </div>
      </div>

      <div id="preview">
        <div className="px-5 py-5 bg-base-100 rounded shadow">
          <header className="py-4">
            <h1 className="text-5xl uppercase">{r?.personal?.firstName + ' ' + r?.personal?.lastName}</h1>
            <span className="text-xl text-gray-500">{r?.employment?.[0]?.title}</span>
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
                  <p className="mt-1 text-gray-500"> {r?.personal?.phone} </p>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg uppercase">Email</h3>
                  <p className="mt-1 text-gray-500"> {r?.personal?.email} </p>
                </div>
              </section>

              {
                r?.links?.[0]?.label &&

                <section className="py-4">
                  <h2 className="text-2xl font-bold uppercase">LINKS</h2>
                  <hr className="mt-2 border-2 border-solid border-gray-700 w-1/3"></hr>

                  {
                    r?.links.map((v: any, i: number) => {

                      return <>
                        <div className="mt-4" key={i}>
                          <p className="mt-1 text-gray-500">
                            <a href={v?.link} target="_blank" rel="noopener noreferrer" className="underline">{v?.label}</a>
                          </p>
                        </div>
                      </>
                    })
                  }
                </section>
              }

              {
                r?.skills?.[0]?.name &&

                <section className="py-4">
                  <h2 className="text-2xl font-bold uppercase">SKILLS</h2>
                  <hr className="mt-2 border-2 border-solid border-gray-700 w-1/3"></hr>

                  {
                    r?.skills.map((v: any, i: number) => {
                      return <>
                        <div className="mt-4" key={i}>
                          <div className="badge"> {v?.name}</div>
                        </div>
                      </>
                    })
                  }
                </section>
              }
            </div>

            {/* Divider */}
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
                  {r?.personal?.summary}
                </p>
              </section>

              {
                r?.employment?.[0]?.title &&

                <section className="py-4">
                  <h2 className="text-2xl font-bold uppercase">Employment History </h2>
                  <hr className="mt-2 border-2 border-solid border-gray-700 w-1/12"></hr>

                  {/* employment 0  */}
                  {
                    r?.employment.map((v: any, i: number) => {
                      return <>
                        <article className="" key={i}>
                          <div className="flex flex-row mt-8">
                            <div className="flex-auto"><h3 className="text-xl font-bold">{v?.title + ', ' + v?.company} </h3></div>
                            <div className="flex-2"><h3 className="">{v?.location}</h3></div>
                          </div>
                          <h4 className="mt-2">{v?.startDate} to {v?.isCurrent ? 'Present' : v?.endDate}</h4>
                          <p className="mt-4 text-gray-500">
                            {v?.summary}
                          </p>
                        </article>
                      </>
                    })
                  }
                </section>
              }

              {r?.education?.[0]?.institution &&

                <section className="py-4">
                  <h2 className="text-2xl font-bold uppercase">Education</h2>
                  <hr className="mt-2 border-2 border-solid border-gray-700 w-1/12"></hr>

                  {/* education 0  */}
                  {
                    r?.education?.map((v: any, i: number) => {
                      return <>
                        <article className="" key={i}>
                          <div className="flex flex-row mt-8">
                            <div className="flex-auto">
                              <h3 className="text-xl font-bold">{v?.subject}</h3>
                              <h4 className="text-lg">{v?.institution}</h4>
                            </div>
                            <div className="flex-2">
                              <h3 className="">{v?.startDate} to {v?.endDate}</h3>
                              {/* <h4 className="text-lg">{ r?.education?.[0]?.score }</h4> */}
                            </div>
                          </div>
                        </article>
                      </>
                    })
                  }
                </section>
              }

              {r?.course?.[0]?.name &&
                <section className="py-4">
                  <h2 className="text-2xl font-bold uppercase">Certification</h2>
                  <hr className="mt-2 border-2 border-solid border-gray-700 w-1/12"></hr>

                  {/* certificate 0  */}
                  {
                    r?.course.map((v: any, i: number) => {
                      return <>
                        <article className="mb-8" key={i}>
                          <div className="flex flex-row mt-4">
                            <div className="flex-auto">
                              <h3 className="text-xl font-bold">{v?.name}</h3>
                            </div>
                            <div className="flex-2"><h3 className="">{v?.institution}</h3></div>
                          </div>
                          <h4 className="mt-2">{v?.startDate} {v?.startDate ? 'to ' + v?.startDate : ''}</h4>
                        </article>
                      </>
                    })
                  }
                </section>
              }

              {r?.reference?.[0]?.name &&

                <section className="py-4">
                  <h2 className="text-2xl font-bold uppercase">References</h2>
                  <hr className="mt-2 border-2 border-solid border-gray-700 w-1/12"></hr>

                  {/* education 0  */}
                  {
                    r?.reference?.map((v: any, i: number) => {
                      return <>
                        <article className="" key={i}>
                          <div className="flex flex-row mt-8">
                            <div className="flex-auto">
                              <h3 className="text-xl font-bold">{v?.company}</h3>
                              <h4 className="text-lg">Phone: {v?.phone}, Email: {v?.email}</h4>
                            </div>
                            <div className="flex-2">
                              <h3 className="">{v?.name} </h3>
                              {/* <h4 className="text-lg">{ r?.education?.[0]?.score }</h4> */}
                            </div>
                          </div>
                        </article>
                      </>
                    })
                  }
                </section>
              }
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
