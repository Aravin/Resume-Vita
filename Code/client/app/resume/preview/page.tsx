"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { FaFilePdf, FaEdit } from "react-icons/fa";
import axios from "axios";
import useFetch from "../../../hooks/useFetch";
import { useEffect, useState, useMemo, memo, useCallback } from "react";
import Loader from "../../../components/Loader";
import { Breadcrumbs } from "../../../components/Breadcrumbs";

const colorClasses = {
  black: "text-black",
  gray: "text-gray-500",
  blue: "text-blue-500",
  red: "text-red-500",
  green: "text-green-500",
  yellow: "text-yellow-500",
  pink: "text-pink-500"
};

const bgColorClasses = {
  black: "bg-black",
  gray: "bg-gray-500",
  blue: "bg-blue-500",
  red: "bg-red-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  pink: "bg-pink-500"
};

const SectionTitle = memo(({ children, color }: { children: React.ReactNode; color: keyof typeof colorClasses }) => (
  <>
    <h2 className={`text-2xl font-bold uppercase ${colorClasses[color]}`}>{children}</h2>
    <hr className="mt-2 border-t-2 border-gray-700 w-1/12" />
  </>
));
SectionTitle.displayName = 'SectionTitle';

const DateRange = memo(({ startDate, endDate, isCurrent }: { startDate: string; endDate?: string; isCurrent?: boolean }) => (
  <h4 className="mt-2">
    {startDate} to {isCurrent ? "Present" : endDate}
  </h4>
));
DateRange.displayName = 'DateRange';

const CompanyHeader = memo(({ title, company, location }: { title: string; company: string; location: string }) => (
  <div className="flex flex-row mt-8">
    <div className="flex-auto">
      <h3 className="text-xl font-bold text-gray-600">
        {title + ", " + company}{" "}
      </h3>
    </div>
    <div className="flex-2">
      <h3 className="">{location}</h3>
    </div>
  </div>
));
CompanyHeader.displayName = 'CompanyHeader';

export default function Page() {
  const [loading, setLoader] = useState(true);
  const [color, setColor] = useState<keyof typeof colorClasses>("black");
  const { user, error: authError, isLoading: authLoading } = useUser();
  
  const userId = useMemo(() => {
    if (!user?.sub) return null;
    return user.sub.split("|")[1];
  }, [user?.sub]);

  // fetching data from service
  const { data, fetching, fetchError } = useFetch<any>(
    !authLoading && userId
      ? `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/resume/${userId}`
      : null
  );

  const storedResume = data;
  const r = storedResume?.user === userId ? storedResume?.resume : {};

  useEffect(() => {
    if (data?.color) {
      setColor(data.color);
    }
  }, [data?.color]);

  useEffect(() => {
    if (!fetching) {
      setLoader(false);
    }
  }, [fetching]);

  const handleDownload = useCallback(async () => {
    setLoader(true);
    try {
      const html = document.querySelector("#preview")?.cloneNode(true);
      const body = {
        html: new XMLSerializer().serializeToString(html as Node),
        user: userId,
        color,
      };
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/pdf`, body);
      const blob = await response.data;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ResumeVita";
      a.target = "_blank";
      a.dispatchEvent(new MouseEvent("click"));
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
    setLoader(false);
  }, [userId, color]);

  if (authLoading || fetching)
    return (
      <>
        <Breadcrumbs currentPage="Preview Resume" />
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader />
        </div>
      </>
    );
  if (authError || fetchError) {
    return (
      <>
        <Breadcrumbs currentPage="Preview Resume" />
        <div role="alert" className="text-error p-4">
          {authError?.message || fetchError?.message || 'An error occurred while loading the preview'}
        </div>
      </>
    );
  }

  if (!userId) {
    return (
      <>
        <Breadcrumbs currentPage="Preview Resume" />
        <div role="alert" className="text-error p-4">
          Please log in to view your resume preview
        </div>
      </>
    );
  }

  if (loading)
    return (
      <div>
        <Loader message="Downloading your PDF!" />
      </div>
    );

  return (
    <>
      <Breadcrumbs currentPage="Resume Preview" />

      <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
        {/* Color Picker Section */}
        <div className="flex flex-col sm:flex-row items-center gap-3 flex-1">
          <h3 className="text-sm font-medium text-gray-700">Theme:</h3>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            <button 
              onClick={() => setColor("black")}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              title="Black"
            >
              <div className={`w-6 h-6 bg-black rounded-full ring-2 ring-offset-2 ${color === "black" ? "ring-gray-500" : "ring-transparent"}`} />
            </button>
            <button 
              onClick={() => setColor("gray")}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              title="Gray"
            >
              <div className={`w-6 h-6 bg-gray-500 rounded-full ring-2 ring-offset-2 ${color === "gray" ? "ring-gray-500" : "ring-transparent"}`} />
            </button>
            <button 
              onClick={() => setColor("blue")}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              title="Blue"
            >
              <div className={`w-6 h-6 bg-blue-500 rounded-full ring-2 ring-offset-2 ${color === "blue" ? "ring-gray-500" : "ring-transparent"}`} />
            </button>
            <button 
              onClick={() => setColor("red")}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              title="Red"
            >
              <div className={`w-6 h-6 bg-red-500 rounded-full ring-2 ring-offset-2 ${color === "red" ? "ring-gray-500" : "ring-transparent"}`} />
            </button>
            <button 
              onClick={() => setColor("green")}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              title="Green"
            >
              <div className={`w-6 h-6 bg-green-500 rounded-full ring-2 ring-offset-2 ${color === "green" ? "ring-gray-500" : "ring-transparent"}`} />
            </button>
            <button 
              onClick={() => setColor("yellow")}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              title="Yellow"
            >
              <div className={`w-6 h-6 bg-yellow-500 rounded-full ring-2 ring-offset-2 ${color === "yellow" ? "ring-gray-500" : "ring-transparent"}`} />
            </button>
            <button 
              onClick={() => setColor("pink")}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              title="Pink"
            >
              <div className={`w-6 h-6 bg-pink-500 rounded-full ring-2 ring-offset-2 ${color === "pink" ? "ring-gray-500" : "ring-transparent"}`} />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row gap-2 items-center">
          <button
            className="btn btn-sm btn-outline btn-accent gap-2"
            onClick={handleDownload}
          >
            <FaFilePdf className="text-lg" />
            <span className="hidden sm:inline">Download PDF</span>
          </button>
          <Link href="/resume/create" passHref>
            <button className="btn btn-sm btn-outline btn-primary gap-2">
              <FaEdit className="text-lg" />
              <span className="hidden sm:inline">Edit Resume</span>
            </button>
          </Link>
        </div>
      </div>

      <div id="preview" className="flex justify-center items-center w-full overflow-auto">
        <div className="p-4 rounded shadow sm:text-sm md:text-md border border-gray-300 print:border-0" style={{ width: '210mm', flex: '0 0 210mm', margin: '0 auto', minHeight: '297mm' }}>
          <div className="flex flex-col h-full">
            <header className="py-2">
              <h1 className={`text-4xl uppercase truncate ${colorClasses[color]}`}>
                {r?.personal?.firstName + " " + r?.personal?.lastName}
              </h1>
              <span className="text-lg text-gray-500 truncate">
                {r?.employments?.[0]?.title}
              </span>
            </header>

            <hr className="my-2"></hr>

            <div className="flex flex-1 gap-4">
              <div className="w-1/4 shrink-0 [&_p]:break-all [&_span]:break-all">
                {/* Size Content */}
                <section className="py-4">
                  <SectionTitle color={color}>Details</SectionTitle>
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
                    <SectionTitle color={color}>LINKS</SectionTitle>

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
                    <SectionTitle color={color}>SKILLS</SectionTitle>

                    {r?.skills?.map((v: any, i: number) => {
                      return (
                        <div className="mt-4" key={i}>
                          <div className={`badge ${bgColorClasses[color]} text-white`}>
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

              <div className="flex-1 min-w-0 [&_p]:break-all [&_span]:break-all">
                {/* Main Content */}
                <section className="py-4">
                  <SectionTitle color={color}>Profile</SectionTitle>
                  <p className="mt-4 text-gray-500">{r?.personal?.summary}</p>
                </section>

                {r?.internships?.[0]?.title && (
                  <section className="py-4">
                    <SectionTitle color={color}>Internships</SectionTitle>

                    {/* employment 0  */}
                    {r?.internships?.map((v: any, i: number) => (
                      <article className="" key={i}>
                        <CompanyHeader title={v.title} company={v.company} location={v.location} />
                        <DateRange startDate={v.startDate} endDate={v.endDate} />
                        <p className="mt-4 text-gray-500">{v?.summary}</p>
                      </article>
                    ))}
                  </section>
                )}

                {r?.employments?.[0]?.title && (
                  <section className="py-4">
                    <SectionTitle color={color}>Employment History</SectionTitle>

                    {/* employment 0  */}
                    {r?.employments?.map((v: any, i: number) => (
                      <article className="" key={i}>
                        <CompanyHeader title={v.title} company={v.company} location={v.location} />
                        <DateRange startDate={v.startDate} endDate={v.endDate} isCurrent={v.isCurrent} />
                        <p className="mt-4 text-gray-500">{v?.summary}</p>
                      </article>
                    ))}
                  </section>
                )}

                {r?.educations?.[0]?.institution && (
                  <section className="py-4">
                    <SectionTitle color={color}>Education</SectionTitle>

                    {/* education 0  */}
                    {r?.educations?.map((v: any, i: number) => (
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
                    ))}
                  </section>
                )}

                {r?.courses?.[0]?.name && (
                  <section className="py-4">
                    <SectionTitle color={color}>Certification</SectionTitle>

                    {/* certificate 0  */}
                    {r?.courses?.map((v: any, i: number) => (
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
                    ))}
                  </section>
                )}

                {r?.references?.[0]?.name && (
                  <section className="py-4">
                    <SectionTitle color={color}>References</SectionTitle>

                    {/* education 0  */}
                    {r?.references?.map((v: any, i: number) => (
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
                    ))}
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
