import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { FaFilePdf, FaEdit } from "react-icons/fa";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState, useMemo } from "react";
import Loader from "../Loader";

interface ResumeData {
  color?: string;
  user?: string;
  resume?: any; // You might want to type this more specifically based on your resume structure
}

export default function Preview() {
  const [loading, setLoader] = useState(true);
  const [color, setColor] = useState("grey");
  const { user, error: authError, isLoading: authLoading } = useUser();
  
  const userId = useMemo(() => {
    if (!user?.sub) return null;
    return user.sub.split("|")[1];
  }, [user?.sub]);

  // fetching data from service
  const { data, fetching, fetchError } = useFetch<ResumeData>(
    !authLoading && userId
      ? `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/resume/${userId}`
      : null
  );
  
  const storedResume = data;
  const r = storedResume?.user === userId ? storedResume?.resume : {};

  useEffect(() => {
    if (data) {
      setColor(data.color || "grey");
      setLoader(false);
    }
  }, [data]);

  const handleClick = (e: any) => {
    e.preventDefault();

    if (!document) return;

    const html = document.querySelector("#preview")?.cloneNode(true);

    const body = {
      html: new XMLSerializer().serializeToString(html as Node),
      user: userId,
      color,
    };

    setLoader(true);

    // save to database - permanent
    axios
      .post(process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT + "/pdf", body)
      .then((response) => {
        var a = document.createElement("a");
        a.href = `${process.env.NEXT_PUBLIC_S3_BUCKET}/${userId}/${userId}.pdf`;
        a.download = "ResumeVita";
        a.target = "_blank";
        a.dispatchEvent(new MouseEvent("click"));
        setLoader(false);
      })
      .catch((error) => {
        setLoader(true);
      });
  };

  if (authLoading || fetching)
    return (
      <div>
        <Loader />
      </div>
    );
  if (loading)
    return (
      <div>
        <Loader message="Downloading your PDF!" />
      </div>
    );
  if (fetchError) return <div>Failed to load the PDF, please retry!</div>;

  return (
    <>
      <div className="flex gap-4 justify-end pb-5">
        <h3>Choose Color</h3>
        <div className="grid grid-cols-4 gap-4">
          <button>
            <div
              className={`w-5 h-5 bg-gradient-to-r from-black border-2 ${
                color === "grey" && "border-gray-500"
              }`}
              onClick={() => setColor("grey")}
            ></div>
          </button>
          <button>
            <div
              className={`w-5 h-5 bg-green-400 border-2 ${
                color === "green" && "border-gray-500"
              }`}
              onClick={() => setColor("green")}
            ></div>
          </button>
          <button>
            <div
              className={`w-5 h-5 bg-red-400 border-2 ${
                color === "red" && "border-gray-500"
              }`}
              onClick={() => setColor("red")}
            ></div>
          </button>
          <button>
            <div
              className={`w-5 h-5 bg-blue-500 border-2 ${
                color === "blue" && "border-gray-500"
              }`}
              onClick={() => setColor("blue")}
            ></div>
          </button>
        </div>
        <div>
          <button
            className="btn btn-sm btn-outline btn-accent"
            onClick={handleClick}
          >
            <FaFilePdf /> &nbsp; GET PDF
          </button>
        </div>
        {/* <div className="flex-1"><button className="btn btn-outline btn-secondary"><FaFileWord /> GET Word</button> </div> */}
        <div>
          <Link href="/resume/create" passHref>
            <button className="btn btn-sm btn-outline btn-primary">
              <FaEdit /> &nbsp; Edit
            </button>
          </Link>
        </div>
      </div>

      <div id="preview">
        <div className="px-5 py-5 bg-base-100 rounded shadow">
          <header className="py-4">
            <h1 className={`text-5xl uppercase text-${color}-500`}>
              {r?.personal?.firstName + " " + r?.personal?.lastName}
            </h1>
            <span className="text-xl text-gray-500">
              {r?.employments?.[0]?.title}
            </span>
          </header>

          <hr></hr>

          <div className="flex">
            <div className="flex-none mr-5 border-left">
              {/* Size Content */}
              <section className="py-4">
                <h2
                  className={`text-2xl font-bold uppercase text-${color}-500`}
                >
                  Details
                </h2>
                <hr className="mt-2 border-t-2 border-gray-700 w-1/3"></hr>
                <div className="mt-4">
                  <h3 className="text-lg uppercase">Phone</h3>
                  <p className="mt-1 text-gray-500"> {r?.personal?.phone} </p>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg uppercase">Email</h3>
                  <p className="mt-1 text-gray-500"> {r?.personal?.email} </p>
                </div>
              </section>

              {r?.links?.[0]?.name && (
                <section className="py-4">
                  <h2
                    className={`text-2xl font-bold uppercase text-${color}-500`}
                  >
                    LINKS
                  </h2>
                  <hr className="mt-2 border-t-2 border-gray-700 w-1/3"></hr>

                  {r?.links?.map((v: any, i: number) => {
                    return (
                      <div className="mt-4" key={i}>
                        <p className="mt-1 text-gray-500">
                          <a
                            href={v?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {v?.name}
                          </a>
                        </p>
                      </div>
                    );
                  })}
                </section>
              )}

              {r?.skills?.[0]?.name && (
                <section className="py-4">
                  <h2
                    className={`text-2xl font-bold uppercase text-${color}-500`}
                  >
                    SKILLS
                  </h2>
                  <hr className="mt-2 border-t-2 border-gray-700 w-1/3"></hr>

                  {r?.skills?.map((v: any, i: number) => {
                    return (
                      <div className="mt-4" key={i}>
                        <div className={`badge bg-${color}-500`}>
                          {" "}
                          {v?.name}
                        </div>
                      </div>
                    );
                  })}
                </section>
              )}
            </div>

            {/* Divider */}
            <div className="grid grid-cols-2 divide-x divide-gray-200">
              <div></div>
              <div></div>
            </div>

            <div className="flex-auto ml-5">
              {/* Main Content */}
              <section className="py-4">
                <h2
                  className={`text-2xl font-bold uppercase text-${color}-500`}
                >
                  Profile
                </h2>
                <hr className="mt-2 border-t-2 border-gray-700 w-1/12"></hr>
                <p className="mt-4 text-gray-500">{r?.personal?.summary}</p>
              </section>

              {r?.internships?.[0]?.title && (
                <section className="py-4">
                  <h2
                    className={`text-2xl font-bold uppercase text-${color}-500`}
                  >
                    Internships{" "}
                  </h2>
                  <hr className="mt-2 border-t-2 border-gray-700 w-1/12"></hr>

                  {/* employment 0  */}
                  {r?.internships?.map((v: any, i: number) => {
                    return (
                      <article className="" key={i}>
                        <div className="flex flex-row mt-8">
                          <div className="flex-auto">
                            <h3 className="text-xl font-bold text-gray-600">
                              {v?.title + ", " + v?.company}{" "}
                            </h3>
                          </div>
                          <div className="flex-2">
                            <h3 className="">{v?.location}</h3>
                          </div>
                        </div>
                        <h4 className="mt-2">
                          {v?.startDate} to {v?.endDate}
                        </h4>
                        <p className="mt-4 text-gray-500">{v?.summary}</p>
                      </article>
                    );
                  })}
                </section>
              )}

              {r?.employments?.[0]?.title && (
                <section className="py-4">
                  <h2
                    className={`text-2xl font-bold uppercase text-${color}-500`}
                  >
                    Employment History{" "}
                  </h2>
                  <hr className="mt-2 border-t-2 border-gray-700 w-1/12"></hr>

                  {/* employment 0  */}
                  {r?.employments?.map((v: any, i: number) => {
                    return (
                      <article className="" key={i}>
                        <div className="flex flex-row mt-8">
                          <div className="flex-auto">
                            <h3 className="text-xl font-bold text-gray-600">
                              {v?.title + ", " + v?.company}{" "}
                            </h3>
                          </div>
                          <div className="flex-2">
                            <h3 className="">{v?.location}</h3>
                          </div>
                        </div>
                        <h4 className="mt-2">
                          {v?.startDate} to{" "}
                          {v?.isCurrent ? "Present" : v?.endDate}
                        </h4>
                        <p className="mt-4 text-gray-500">{v?.summary}</p>
                      </article>
                    );
                  })}
                </section>
              )}

              {r?.educations?.[0]?.institution && (
                <section className="py-4">
                  <h2
                    className={`text-2xl font-bold uppercase text-${color}-500`}
                  >
                    Education
                  </h2>
                  <hr className="mt-2 border-t-2 border-gray-700 w-1/12"></hr>

                  {/* education 0  */}
                  {r?.educations?.map((v: any, i: number) => {
                    return (
                      <article className="" key={i}>
                        <div className="flex flex-row mt-8">
                          <div className="flex-auto">
                            <h3 className="text-xl font-bold text-gray-600">
                              {v?.subject}
                            </h3>
                            <h4 className="text-lg">{v?.institution}</h4>
                          </div>
                          <div className="flex-2">
                            <h3 className="">
                              {v?.startDate} to {v?.endDate}
                            </h3>
                            {/* <h4 className="text-lg">{ r?.educations?.[0]?.score }</h4> */}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </section>
              )}

              {r?.courses?.[0]?.name && (
                <section className="py-4">
                  <h2
                    className={`text-2xl font-bold uppercase text-${color}-500`}
                  >
                    Certification
                  </h2>
                  <hr className="mt-2 border-t-2 border-gray-700 w-1/12"></hr>

                  {/* certificate 0  */}
                  {r?.courses?.map((v: any, i: number) => {
                    return (
                      <article className="mb-8" key={i}>
                        <div className="flex flex-row mt-4">
                          <div className="flex-auto">
                            <h3 className="text-xl font-bold text-gray-600">
                              {v?.name}
                            </h3>
                          </div>
                          <div className="flex-2">
                            <h3 className="">{v?.institution}</h3>
                          </div>
                        </div>
                        <h4 className="mt-2">
                          {v?.startDate}{" "}
                          {v?.startDate ? "to " + v?.startDate : ""}
                        </h4>
                      </article>
                    );
                  })}
                </section>
              )}

              {r?.references?.[0]?.name && (
                <section className="py-4">
                  <h2
                    className={`text-2xl font-bold uppercase text-${color}-500`}
                  >
                    References
                  </h2>
                  <hr className="mt-2 border-t-2 border-gray-700 w-1/12"></hr>

                  {/* education 0  */}
                  {r?.references?.map((v: any, i: number) => {
                    return (
                      <article className="" key={i}>
                        <div className="flex flex-row mt-8">
                          <div className="flex-auto">
                            <h3 className="text-xl font-bold text-gray-600">
                              {v?.company}
                            </h3>
                            {v?.phone && (
                              <p className="text-lg">Phone: {v.phone}</p>
                            )}
                            {v?.email && (
                              <p className="text-lg">Email: {v.email}</p>
                            )}
                          </div>
                          <div className="flex-2">
                            <h3 className="">{v?.name} </h3>
                            {/* <h4 className="text-lg">{ r?.educations?.[0]?.score }</h4> */}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
