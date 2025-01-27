"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { FaFilePdf, FaEdit } from "react-icons/fa";
import { AiFillFileAdd, AiFillEdit } from "react-icons/ai";
import Loader from "../../components/Loader";
import useFetch from "../../hooks/useFetch";
import { Breadcrumbs } from "../../components/Breadcrumbs";

interface ResumeData {
  isPDFGenerated: boolean;
}

export default function Page() {
  const { user, error: authError, isLoading: authLoading } = useUser();
  
  const userId = useMemo(() => {
    if (!user?.sub) return null;
    return user.sub.split("|")[1];
  }, [user?.sub]);

  const { data, fetching, fetchError } = useFetch<ResumeData>(
    !authLoading && userId 
      ? `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/resume/${userId}`
      : null
  );

  // Memoized handler to prevent recreating on each render
  const handleDownload = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!userId) return;
    const downloadUrl = `${process.env.NEXT_PUBLIC_S3_BUCKET}/${userId}/${userId}.pdf`;
    window.open(downloadUrl, '_blank');
  }, [userId]);

  if (authLoading) {
    return (
      <div role="status" aria-label="Loading">
        <Loader />
      </div>
    );
  }

  if (authError) {
    return (
      <div role="alert" className="text-error p-4">
        {authError.message || 'Authentication error occurred'}
      </div>
    );
  }

  if (!userId) {
    return (
      <div role="alert" className="text-error p-4">
        Please log in to view your resume
      </div>
    );
  }

  if (fetchError) {
    return (
      <div role="alert" className="text-error p-4">
        {fetchError.message || 'Failed to load the PDF, please retry!'}
      </div>
    );
  }

  if (fetching) {
    return (
      <div role="status" aria-label="Loading">
        <Loader />
      </div>
    );
  }

  const showCreateNew = !data;
  const showGeneratePDF = data && !data.isPDFGenerated;
  const showPDFOptions = data?.isPDFGenerated;

  return (
    <>
      <Breadcrumbs currentPage="Resume Dashboard" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 m-4 md:p-8 md:m-8">
        <div>
          {showCreateNew && (
            <div className="flex-row my-5 mx-2">
              <div className="mt-5">
                No Resume Added!, click on below image to create new Resume...
              </div>
              <div data-tip="Create Resume" className="tooltip tooltip-bottom">
                <Link href="/resume/create" aria-label="Create new resume">
                  <AiFillFileAdd className="h-24 w-24 m-4 text-primary cursor-pointer hover:opacity-50 transition-opacity" />
                </Link>
              </div>
            </div>
          )}

          {showGeneratePDF && (
            <div className="flex-row my-5 mx-2">
              <div className="mt-5">
                PDF not generated!, click on edit image and generate PDF...
              </div>
              <div data-tip="Create Resume" className="tooltip tooltip-bottom">
                <Link href="/resume/create" aria-label="Edit and generate PDF">
                  <AiFillEdit className="h-24 w-24 m-4 text-primary cursor-pointer hover:opacity-50 transition-opacity" />
                </Link>
              </div>
            </div>
          )}

          {showPDFOptions && (
            <div data-tip="Preview Resume" className="tooltip tooltip-bottom">
              <Link href="/resume/preview" aria-label="Preview resume">
                <Image
                  className="cursor-pointer hover:opacity-50 transition-opacity"
                  src={`${process.env.NEXT_PUBLIC_S3_BUCKET}/${userId}/${userId}.webp`}
                  width={240}
                  height={300}
                  alt="PDF Preview"
                  priority
                  loading="eager"
                />
              </Link>
            </div>
          )}
        </div>
        <div>
          {showPDFOptions && (
            <>
              <div className="mt-4">
                <Link href="/resume/create" passHref>
                  <button className="btn btn-outline btn-primary w-full" aria-label="Edit resume">
                    <FaEdit className="mr-2" /> Edit Resume
                  </button>
                </Link>
              </div>

              <div className="mt-4">
                <button
                  className="btn btn-outline btn-accent w-full"
                  onClick={handleDownload}
                  aria-label="Download resume"
                >
                  <FaFilePdf className="mr-2" /> Download Resume
                </button>
              </div>

              <div className="mt-4">
                <a
                  className="btn btn-outline btn-secondary w-full"
                  href={`/public/${userId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open public resume"
                >
                  <FaFilePdf className="mr-2" /> Open Public Resume
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
