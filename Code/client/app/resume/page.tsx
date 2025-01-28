"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { FaFilePdf, FaEdit } from "react-icons/fa";
import { AiFillFileAdd, AiFillEdit } from "react-icons/ai";
import Loader from "../../components/Loader";
import useFetch from "../../hooks/useFetch";
import { Breadcrumbs } from "../../components/Breadcrumbs";

interface ResumeData {
  isPDFGenerated: boolean;
  atsScore?: {
    overall: number;
    details: {
      keywords: number;
      format: number;
      content: number;
    };
    improvements: {
      keywords: string[];
      format: string[];
      content: string[];
    };
  };
}

export default function Page() {
  const { user, error: authError, isLoading: authLoading } = useUser();
  const [isImageLoading, setIsImageLoading] = useState(true);
  
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
  const handleDownload = React.useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!userId) return;
    
    try {
      const downloadUrl = `${process.env.NEXT_PUBLIC_S3_BUCKET}/${userId}/${userId}.pdf`;
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `resume.pdf`;  // Set the download filename
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL object
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Download failed:', error);
      // You might want to show an error message to the user here
    }
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

      <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
        {showCreateNew && (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="mb-4">
                No Resume Added!, click on below image to create new Resume...
              </div>
              <div data-tip="Create Resume" className="tooltip tooltip-bottom">
                <Link href="/resume/create" aria-label="Create new resume">
                  <AiFillFileAdd className="h-24 w-24 mx-auto text-primary cursor-pointer hover:opacity-50 transition-opacity" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {showGeneratePDF && (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="mb-4">
                PDF not generated!, click on edit image and generate PDF...
              </div>
              <div data-tip="Create Resume" className="tooltip tooltip-bottom">
                <Link href="/resume/create" aria-label="Edit and generate PDF">
                  <AiFillEdit className="h-24 w-24 mx-auto text-primary cursor-pointer hover:opacity-50 transition-opacity" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {showPDFOptions && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Preview Card */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-6">Resume Preview</h3>
                <div className="flex justify-center">
                  <div data-tip="Preview Resume" className="tooltip tooltip-bottom">
                    <Link href="/resume/preview" aria-label="Preview resume">
                      <div className="relative w-[240px] h-[300px] overflow-hidden rounded-sm shadow-sm">
                        {isImageLoading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                            <Loader />
                          </div>
                        )}
                        <Image
                          className="cursor-pointer hover:opacity-50 transition-opacity object-cover object-top"
                          src={`${process.env.NEXT_PUBLIC_S3_BUCKET}/${userId}/${userId}.webp?t=${Date.now()}`}
                          width={240}
                          height={339}
                          alt="PDF Preview"
                          priority
                          loading="eager"
                          onLoadingComplete={() => setIsImageLoading(false)}
                          onError={(e) => {
                            setIsImageLoading(false);
                            const img = e.target as HTMLImageElement;
                            img.style.display = 'none';
                            const fallback = img.parentElement?.querySelector('.image-fallback');
                            if (fallback) fallback.classList.remove('hidden');
                          }}
                        />
                        <div className="image-fallback hidden absolute inset-0 flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
                          <div className="text-center p-4">
                            <div className="text-gray-500 mb-2">Preview not available</div>
                            <div className="text-sm text-gray-400">Click to generate preview</div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Actions Card */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-6">Actions</h3>
                <div className="space-y-3">
                  <Link href="/resume/create" passHref>
                    <button className="btn btn-outline btn-primary w-full h-12 normal-case" aria-label="Edit resume">
                      <FaEdit className="mr-2" /> Edit Resume
                    </button>
                  </Link>

                  <button
                    className="btn btn-outline btn-accent w-full h-12 normal-case"
                    onClick={handleDownload}
                    aria-label="Download resume"
                  >
                    <FaFilePdf className="mr-2" /> Download Resume
                  </button>

                  <a
                    className="btn btn-outline btn-secondary w-full h-12 normal-case"
                    href={`/public/${userId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open public resume"
                  >
                    <FaFilePdf className="mr-2" /> Open Public Resume
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - ATS Score */}
            <div>
              {data?.atsScore && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-6">ATS Score Analysis</h3>
                  <div className="flex items-start mb-8">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold">{data.atsScore.overall}%</span>
                      </div>
                      <svg className="transform -rotate-90 w-20 h-20">
                        <circle
                          className="text-gray-200"
                          strokeWidth="6"
                          stroke="currentColor"
                          fill="transparent"
                          r="34"
                          cx="40"
                          cy="40"
                        />
                        <circle
                          className="text-primary"
                          strokeWidth="6"
                          strokeDasharray={`${2 * Math.PI * 34}`}
                          strokeDashoffset={`${2 * Math.PI * 34 * (1 - data.atsScore.overall / 100)}`}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="34"
                          cx="40"
                          cy="40"
                        />
                      </svg>
                    </div>
                    <div className="ml-8 flex-1 space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Keywords Match</span>
                          <span className="text-sm font-medium">{data.atsScore.details.keywords}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-yellow-400"
                            style={{ width: `${data.atsScore.details.keywords}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Format</span>
                          <span className="text-sm font-medium">{data.atsScore.details.format}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-gray-300"
                            style={{ width: `${data.atsScore.details.format}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Content Quality</span>
                          <span className="text-sm font-medium">{data.atsScore.details.content}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-gray-300"
                            style={{ width: `${data.atsScore.details.content}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Improvement Sections */}
                  <div className="space-y-6">
                    {data.atsScore && Object.entries(data.atsScore.improvements).map(([category, suggestions]) => 
                      suggestions.length > 0 && (
                        <div key={category}>
                          <div className="flex items-center gap-2 mb-3">
                            <h4 className="text-sm font-medium capitalize">{category} Improvements</h4>
                            {data.atsScore!.details[category as keyof typeof data.atsScore.details] < 70 && (
                              <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded">
                                Needs Attention
                              </span>
                            )}
                          </div>
                          <ul className="space-y-2">
                            {suggestions.map((suggestion, index) => (
                              <li key={index} className="text-sm text-gray-600 flex gap-2">
                                <span className="text-gray-400">•</span>
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
