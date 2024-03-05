"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFilePdf, FaEdit } from "react-icons/fa";
import { AiFillFileAdd, AiFillEdit } from "react-icons/ai";
import Loader from "../../components/Loader";
import useFetch from "../../hooks/useFetch";
import { Breadcrumbs } from "../../components/Breadcrumbs";

export default function Page() {
  const { user, error, isLoading } = useUser();
  const userId = user?.sub?.split("|")[1];

  // fetch hook
  const { data, fetching, fetchError } = useFetch(
    process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT + `/resume/${userId}`
  );

  if (isLoading || fetching)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error) return <div>{error.message}</div>;
  // if (fetchError) return <div>Failed to load the PDF, please retry!</div>

  const handleClick = (e: any) => {
    e.preventDefault();

    var a = document.createElement("a");
    a.href = `${process.env.NEXT_PUBLIC_S3_BUCKET}/${userId}/${userId}.pdf`;
    // link.download = `${process.env.NEXT_PUBLIC_S3_BUCKET}/${userId}/${userId}.pdf`;
    a.dispatchEvent(new MouseEvent("click"));
  };

  return (
    <>
      {/* breadcrumbs */}
      <Breadcrumbs currentPage="Resume Dashboard" />

      {/* Grids */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 m-4 md:p-8 md:m-8">
        <div>
          {/* resume not generated */}
          {data === "" && (
            <div className="flex-row my-5 mx-2">
              <div className="mt-5">
                No Resume Added!, click on below image to create new Resume...
              </div>
              <div data-tip="Create Resume" className="tooltip tooltip-bottom">
                <Link href="/resume/create" passHref>
                  <AiFillFileAdd className="h-24 w-24 m-4 text-primary cursor-pointer hover:opacity-50 hover:tooltip" />
                </Link>
              </div>
            </div>
          )}

          {/* PDF  generated */}

          {data !== "" && !data.isPDFGenerated && (
            <div className="flex-row my-5 mx-2">
              <div className="mt-5">
                PDF not generated!, click on edit image and generate PDF...
              </div>
              <div data-tip="Create Resume" className="tooltip tooltip-bottom">
                <Link href="/resume/create" passHref>
                  <AiFillEdit className="h-24 w-24 m-4 text-primary cursor-pointer hover:opacity-50 hover:tooltip" />
                </Link>
              </div>
            </div>
          )}

          {/* PDF generated */}
          {data.isPDFGenerated && (
            <div data-tip="Preview Resume" className="tooltip tooltip-bottom">
              <Link href="/resume/preview" passHref>
                <Image
                  className="cursor-pointer hover:opacity-50 hover:tooltip"
                  src={`${process.env.NEXT_PUBLIC_S3_BUCKET}/${userId}/${userId}.webp`}
                  width="240"
                  height="300"
                  alt="PDF Preview"
                />
              </Link>
            </div>
          )}
        </div>
        <div>
          {data.isPDFGenerated && (
            <>
              <div className="mt-4">
                <Link href="/resume/create" passHref>
                  <button className="btn btn-outline btn-primary">
                    <FaEdit /> &nbsp;Edit Resume
                  </button>
                </Link>
              </div>

              <div className="mt-4">
                <button
                  className="btn btn-outline btn-accent"
                  onClick={handleClick}
                >
                  <FaFilePdf /> &nbsp;Download Resume
                </button>
              </div>

              <div className="mt-4">
                <a
                  className="btn btn-outline btn-secondary"
                  href={`/public/${userId}`}
                  target={"_blank"}
                  rel={"noreferrer"}
                >
                  <FaFilePdf /> &nbsp;Open Public Resume
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
