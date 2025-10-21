"use client";

import { useSafeUser } from "../../hooks/useSafeUser";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { FaFilePdf, FaEdit } from "react-icons/fa";
import { AiFillFileAdd, AiFillEdit } from "react-icons/ai";
import Loader from "../../components/Loader";
import useFetch from "../../hooks/useFetch";
import { useSignedUrl } from "../../hooks/useSignedUrl";
import { useDownloadPDF } from "../../hooks/useDownloadPDF";
import { Breadcrumbs } from "../../components/Breadcrumbs";

interface ResumeData {
  user: string;
  resume: any;
  isPDFGenerated?: boolean;
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
  color?: string;
  template?: string;
}

export default function Page() {
  const { user, error: authError, isLoading: authLoading } = useSafeUser();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const { getSignedUrl, isLoading: isSignedUrlLoading, error: signedUrlError } = useSignedUrl();
  const { downloadExistingPDF, isSignedUrlLoading: isDownloadLoading } = useDownloadPDF();

  // Set document title - must be before any conditional returns
  React.useEffect(() => {
    document.title = "Resume Dashboard - ResumeVita.com";
  }, []);
  
  const userId = useMemo(() => {
    if (!user?.sub) return null;
    return user.sub.split("|")[1];
  }, [user?.sub]);

  const { data, fetching, fetchError } = useFetch<ResumeData>(
    !authLoading && userId 
      ? `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/resume/${userId}`
      : null
  );

  // Load signed URL for image preview
  React.useEffect(() => {
    if (userId && data?.isPDFGenerated === true) {
      getSignedUrl(userId, 'webp')
        .then(url => setImageUrl(url))
        .catch(error => {
          // Fallback to direct URL if signed URL fails
          const s3BaseUrl = process.env.NEXT_PUBLIC_S3_BUCKET || '';
          const s3Url = s3BaseUrl.startsWith('http') ? s3BaseUrl : `https://${s3BaseUrl}`;
          setImageUrl(`${s3Url}/${userId}/${userId}.webp?t=${Date.now()}`);
        });
    }
  }, [userId, data?.isPDFGenerated, getSignedUrl]);

  // Memoized handler to prevent recreating on each render
  const handleDownload = React.useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!userId) return;
    
    await downloadExistingPDF({
      userId,
      setDownloadError,
      fileName: "ResumeVita.pdf"
    });
  }, [userId, downloadExistingPDF]);

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
      <div role="status" aria-label="Loading" className="flex flex-col items-center justify-center min-h-screen">
        <Loader />
        <p className="mt-4 text-gray-500">Loading resume data...</p>
        <p className="text-sm text-gray-400 mt-2">This may take a few moments</p>
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
          <div className="flex justify-center items-center min-h-[600px]">
            <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <div className="mb-6">
                  <div className="avatar placeholder mb-4">
                    <div className="bg-primary text-primary-content rounded-full w-24">
                      <AiFillFileAdd className="w-12 h-12" />
                    </div>
                  </div>
                  <h2 className="card-title justify-center text-2xl mb-2">No Resume Found</h2>
                  <p className="text-base-content/70 text-lg">
                    You haven&apos;t created a resume yet. Let&apos;s get started and create your professional resume!
                  </p>
                </div>
                
                <div className="card-actions justify-center">
                  <Link href="/resume/create" className="btn btn-primary btn-lg">
                    <AiFillFileAdd className="w-5 h-5 mr-2" />
                    Create Your First Resume
                  </Link>
                </div>
                
                <div className="divider">Get Started</div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="card bg-base-200">
                    <div className="card-body p-4">
                      <h3 className="card-title text-sm">Step 1: Create Resume</h3>
                      <p className="text-xs text-base-content/70">Build your professional resume from scratch</p>
                    </div>
                  </div>
                  <div className="card bg-base-200">
                    <div className="card-body p-4">
                      <h3 className="card-title text-sm">Step 2: Generate PDF</h3>
                      <p className="text-xs text-base-content/70">Download your resume in PDF format</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showGeneratePDF && (
          <div className="flex justify-center items-center min-h-[600px]">
            <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <div className="mb-6">
                  <div className="avatar placeholder mb-4">
                    <div className="bg-warning text-warning-content rounded-full w-24">
                      <AiFillEdit className="w-12 h-12" />
                    </div>
                  </div>
                  <h2 className="card-title justify-center text-2xl mb-2">Resume Created!</h2>
                  <p className="text-base-content/70 text-lg">
                    Your resume is ready, but the PDF hasn&apos;t been generated yet. Click below to edit and generate your PDF.
                  </p>
                </div>
                
                <div className="card-actions justify-center">
                  <Link href="/resume/create" className="btn btn-warning btn-lg">
                    <AiFillEdit className="w-5 h-5 mr-2" />
                    Edit & Generate PDF
                  </Link>
                </div>
                
                <div className="divider">What&apos;s Next?</div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="card bg-base-200">
                    <div className="card-body p-4">
                      <h3 className="card-title text-sm">Review Content</h3>
                      <p className="text-xs text-base-content/70">Make sure all information is accurate</p>
                    </div>
                  </div>
                  <div className="card bg-base-200">
                    <div className="card-body p-4">
                      <h3 className="card-title text-sm">Generate PDF</h3>
                      <p className="text-xs text-base-content/70">Create your downloadable resume</p>
                    </div>
                  </div>
                </div>
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
                          src={imageUrl || `${process.env.NEXT_PUBLIC_S3_BUCKET}/${userId}/${userId}.webp?t=${Date.now()}`}
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
                
                {/* Download Error Display */}
                {downloadError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <div className="text-red-800 text-sm">
                      <strong>Download Error:</strong> {downloadError}
                    </div>
                    <button 
                      onClick={() => setDownloadError(null)}
                      className="text-red-600 text-xs mt-1 hover:underline"
                    >
                      Dismiss
                    </button>
                  </div>
                )}
                
                <div className="space-y-3">
                  <Link href="/resume/create" passHref>
                    <button className="btn btn-outline btn-primary w-full h-12 normal-case" aria-label="Edit resume">
                      <FaEdit className="mr-2" /> Edit Resume
                    </button>
                  </Link>

                  <button
                    className="btn btn-outline btn-accent w-full h-12 normal-case"
                    onClick={handleDownload}
                    disabled={isDownloadLoading}
                    aria-label="Download resume"
                  >
                    <FaFilePdf className="mr-2" /> 
                    {isDownloadLoading ? 'Generating...' : 'Download Resume'}
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

            {/* Right Column - Enhanced ATS Score */}
            <div>
              {data?.atsScore && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">ATS Score Analysis</h3>
                    <div className="flex items-center gap-2">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        data.atsScore.overall >= 80 ? 'bg-green-100 text-green-800' :
                        data.atsScore.overall >= 60 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {data.atsScore.overall >= 80 ? 'Excellent' :
                         data.atsScore.overall >= 60 ? 'Good' : 'Needs Improvement'}
                      </div>
                    </div>
                  </div>

                  {/* Overall Score Circle */}
                  <div className="flex items-center justify-center mb-8">
                    <div className="relative w-32 h-32">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <span className="text-4xl font-bold text-gray-900">{data.atsScore.overall}%</span>
                          <p className="text-sm text-gray-500 mt-1">Overall Score</p>
                        </div>
                      </div>
                      <svg className="transform -rotate-90 w-32 h-32">
                        <circle
                          className="text-gray-200"
                          strokeWidth="8"
                          stroke="currentColor"
                          fill="transparent"
                          r="56"
                          cx="64"
                          cy="64"
                        />
                        <circle
                          className={`${
                            data.atsScore.overall >= 80 ? 'text-green-500' :
                            data.atsScore.overall >= 60 ? 'text-yellow-500' : 'text-red-500'
                          }`}
                          strokeWidth="8"
                          strokeDasharray={`${2 * Math.PI * 56}`}
                          strokeDashoffset={`${2 * Math.PI * 56 * (1 - data.atsScore.overall / 100)}`}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="56"
                          cx="64"
                          cy="64"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Score Breakdown */}
                  <div className="space-y-6 mb-8">
                    {Object.entries(data.atsScore.details).map(([category, score]) => {
                      const categoryLabels = {
                        keywords: 'Keywords Match',
                        format: 'Format & Structure',
                        content: 'Content Quality'
                      };
                      const categoryIcons = {
                        keywords: '🔍',
                        format: '📄',
                        content: '✨'
                      };
                      const getScoreColor = (score: number) => {
                        if (score >= 80) return 'bg-green-500';
                        if (score >= 60) return 'bg-yellow-500';
                        return 'bg-red-500';
                      };
                      
                      return (
                        <div key={category} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{categoryIcons[category as keyof typeof categoryIcons]}</span>
                              <span className="font-medium text-gray-900">{categoryLabels[category as keyof typeof categoryLabels]}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-gray-900">{score}%</span>
                              <div className={`w-3 h-3 rounded-full ${getScoreColor(score)}`}></div>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className={`h-3 rounded-full transition-all duration-500 ${getScoreColor(score)}`}
                              style={{ width: `${score}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Score Interpretation */}
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold text-blue-900 mb-2">📊 Score Interpretation</h4>
                    <p className="text-sm text-blue-800">
                      {data.atsScore.overall >= 80 
                        ? "Your resume is ATS-optimized and should pass most applicant tracking systems. Great job!"
                        : data.atsScore.overall >= 60 
                        ? "Your resume is decent but could benefit from some improvements to better pass ATS screening."
                        : "Your resume needs significant improvements to pass ATS screening. Focus on the suggestions below."
                      }
                    </p>
                  </div>

                  {/* Improvement Sections */}
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">🎯 Improvement Suggestions</h4>
                    {Object.entries(data.atsScore.improvements).map(([category, suggestions]) => 
                      suggestions.length > 0 && (
                        <div key={category} className="border-l-4 border-blue-200 pl-4">
                          <div className="flex items-center gap-2 mb-3">
                            <h5 className="font-medium text-gray-900 capitalize">{category} Improvements</h5>
                            {data.atsScore!.details[category as keyof typeof data.atsScore.details] < 70 && (
                              <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full font-medium">
                                Priority
                              </span>
                            )}
                          </div>
                          <ul className="space-y-2">
                            {suggestions.map((suggestion, index) => (
                              <li key={index} className="text-sm text-gray-700 flex gap-3 items-start">
                                <span className="text-blue-500 mt-1">✓</span>
                                <span>{suggestion}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Link href="/resume/create" className="btn btn-primary w-full">
                      <FaEdit className="mr-2" />
                      Improve Resume Based on Analysis
                    </Link>
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
