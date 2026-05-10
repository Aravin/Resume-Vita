"use client";

// Prevent static generation for pages that require authentication
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

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
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { AtsScore } from "@/types/resume";

interface ResumeData {
  user: string;
  resume: any;
  isPDFGenerated?: boolean;
  atsScore?: AtsScore;
  color?: string;
  template?: string;
}

export default function Page() {
  const { user, error: authError, isLoading: authLoading } = useSafeUser();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageError, setImageError] = useState<boolean>(false);
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
      setIsImageLoading(true);
      setImageError(false);
      getSignedUrl(userId, 'webp')
        .then(url => {
          setImageUrl(url);
          setImageError(false);
          setIsImageLoading(false);
          // Image component will handle its own loading state
        })
        .catch(error => {
          console.error('Failed to get signed URL:', error);
          setIsImageLoading(false);
          setImageError(true);
          setImageUrl('');
          // Don't set a fallback URL - it won't work without authentication
        });
    } else {
      // Reset image URL when conditions aren't met
      setImageUrl('');
      setIsImageLoading(false);
      setImageError(false);
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
        <p className="mt-4 text-muted-foreground">Loading resume data...</p>
        <p className="mt-2 text-sm text-muted-foreground/80">This may take a few moments</p>
      </div>
    );
  }

  const showCreateNew = !data;
  const showGeneratePDF = data && !data.isPDFGenerated;
  const showPDFOptions = data?.isPDFGenerated;
  const getAtsStatusTone = (score: number) => {
    if (score >= 80) {
      return {
        badge: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
        stroke: "text-emerald-500",
        panel: "border-emerald-500/20 bg-emerald-500/8",
        progress: "bg-emerald-500",
      };
    }

    if (score >= 60) {
      return {
        badge: "bg-amber-500/12 text-amber-700 dark:text-amber-300",
        stroke: "text-amber-500",
        panel: "border-amber-500/20 bg-amber-500/8",
        progress: "bg-amber-500",
      };
    }

    return {
      badge: "bg-rose-500/12 text-rose-700 dark:text-rose-300",
      stroke: "text-rose-500",
      panel: "border-rose-500/20 bg-rose-500/8",
      progress: "bg-rose-500",
    };
  };

  return (
    <>
      <Breadcrumbs currentPage="Resume Dashboard" />

      <div className="min-h-screen bg-muted/35 p-4 md:p-8 dark:bg-muted/20">
        {showCreateNew && (
          <div className="flex justify-center items-center min-h-[600px]">
            <Card className="w-full max-w-2xl shadow-xl">
              <CardContent className="p-6 text-center md:p-8">
                <div className="mb-6">
                  <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                      <AiFillFileAdd className="w-12 h-12" />
                  </div>
                  <CardTitle className="mb-2 justify-center text-2xl">No Resume Found</CardTitle>
                  <CardDescription className="text-lg">
                    You haven&apos;t created a resume yet. Let&apos;s get started and create your professional resume!
                  </CardDescription>
                </div>
                
                <div className="flex justify-center">
                  <Link href="/resume/create" className={cn(buttonVariants({ size: "lg" }))}>
                    <AiFillFileAdd className="w-5 h-5 mr-2" />
                    Create Your First Resume
                  </Link>
                </div>
                
                <div className="my-6 flex items-center gap-4 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  <Separator className="flex-1" />
                  <span>Get Started</span>
                  <Separator className="flex-1" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Card className="bg-muted/60 shadow-none">
                    <CardContent className="p-4 text-left">
                      <CardTitle className="text-sm">Step 1: Create Resume</CardTitle>
                      <CardDescription className="text-xs">Build your professional resume from scratch</CardDescription>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/60 shadow-none">
                    <CardContent className="p-4 text-left">
                      <CardTitle className="text-sm">Step 2: Generate PDF</CardTitle>
                      <CardDescription className="text-xs">Download your resume in PDF format</CardDescription>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {showGeneratePDF && (
          <div className="flex justify-center items-center min-h-[600px]">
            <Card className="w-full max-w-2xl shadow-xl">
              <CardContent className="p-6 text-center md:p-8">
                <div className="mb-6">
                  <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 shadow-lg shadow-amber-500/10 dark:text-amber-300">
                      <AiFillEdit className="w-12 h-12" />
                  </div>
                  <CardTitle className="mb-2 justify-center text-2xl">Resume Created!</CardTitle>
                  <CardDescription className="text-lg">
                    Your resume is ready, but the PDF hasn&apos;t been generated yet. Click below to edit and generate your PDF.
                  </CardDescription>
                </div>
                
                <div className="flex justify-center">
                  <Link href="/resume/create" className={cn(buttonVariants({ size: "lg" }), "bg-amber-500 text-black hover:bg-amber-400")}>
                    <AiFillEdit className="w-5 h-5 mr-2" />
                    Edit & Generate PDF
                  </Link>
                </div>
                
                <div className="my-6 flex items-center gap-4 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  <Separator className="flex-1" />
                  <span>What&apos;s Next?</span>
                  <Separator className="flex-1" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Card className="bg-muted/60 shadow-none">
                    <CardContent className="p-4 text-left">
                      <CardTitle className="text-sm">Review Content</CardTitle>
                      <CardDescription className="text-xs">Make sure all information is accurate</CardDescription>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/60 shadow-none">
                    <CardContent className="p-4 text-left">
                      <CardTitle className="text-sm">Generate PDF</CardTitle>
                      <CardDescription className="text-xs">Create your downloadable resume</CardDescription>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {showPDFOptions && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Preview Card */}
              <Card className="bg-card/90 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Resume Preview</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="flex justify-center">
                    <Link href="/resume/preview" aria-label="Preview resume">
                      <div className="relative w-[240px] h-[300px] overflow-hidden rounded-sm shadow-sm">
                        {isImageLoading && (
                          <div className="absolute inset-0 z-10 flex items-center justify-center bg-muted/60">
                            <Loader />
                          </div>
                        )}
                        {imageUrl && !imageError ? (
                          <Image
                            className="cursor-pointer hover:opacity-50 transition-opacity object-cover object-top"
                            src={imageUrl}
                            width={240}
                            height={339}
                            alt="PDF Preview"
                            priority
                            loading="eager"
                            onLoadingComplete={() => {
                              setImageError(false);
                            }}
                            onError={() => {
                              setIsImageLoading(false);
                              setImageError(true);
                              setImageUrl('');
                            }}
                          />
                        ) : (
                          !isImageLoading && (
                            <div className="image-fallback absolute inset-0 flex items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/40">
                              <div className="text-center p-4">
                                <div className="mb-2 text-muted-foreground">Preview not available</div>
                                <div className="text-sm text-muted-foreground/80">Click to generate preview</div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </Link>
                </div>
                </CardContent>
              </Card>

              {/* Actions Card */}
              <Card className="bg-card/90 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Actions</CardTitle>
                </CardHeader>
                <CardContent>
                
                {/* Download Error Display */}
                {downloadError && (
                  <div className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 p-3">
                    <div className="text-sm text-destructive">
                      <strong>Download Error:</strong> {downloadError}
                    </div>
                    <button
                      type="button"
                      onClick={() => setDownloadError(null)}
                      className="mt-1 text-xs text-destructive hover:underline"
                    >
                      Dismiss
                    </button>
                  </div>
                )}
                
                <div className="space-y-3">
                  <Link href="/resume/create" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 w-full normal-case")} aria-label="Edit resume">
                    <FaEdit className="mr-2" /> Edit Resume
                  </Link>

                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 w-full normal-case"
                    onClick={handleDownload}
                    disabled={isDownloadLoading}
                    aria-label="Download resume"
                  >
                    <FaFilePdf className="mr-2" /> 
                    {isDownloadLoading ? 'Generating...' : 'Download Resume'}
                  </Button>

                  <a
                    className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "h-12 w-full normal-case")}
                    href={`/public/${userId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open public resume"
                  >
                    <FaFilePdf className="mr-2" /> Open Public Resume
                  </a>
                </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Enhanced ATS Score */}
            <div>
              {data?.atsScore && (
                <Card className="bg-card/90 shadow-sm">
                  <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
                    <div>
                      <CardTitle className="text-xl">ATS Score Analysis</CardTitle>
                      <CardDescription className="mt-2 max-w-xl">
                        Review the overall score, spot weak areas quickly, and jump back into editing with focused improvements.
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`rounded-full px-3 py-1 text-xs font-medium ${
                        getAtsStatusTone(data.atsScore.overall).badge
                      }`}>
                        {data.atsScore.overall >= 80 ? 'Excellent' :
                         data.atsScore.overall >= 60 ? 'Good' : 'Needs Improvement'}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>

                  {/* Overall Score Circle */}
                  <div className="mb-8 flex items-center justify-center">
                    <div className="relative w-32 h-32">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <span className="text-4xl font-bold text-foreground">{data.atsScore.overall}%</span>
                          <p className="mt-1 text-sm text-muted-foreground">Overall Score</p>
                        </div>
                      </div>
                      <svg className="transform -rotate-90 w-32 h-32">
                        <circle
                          className="text-border/70"
                          strokeWidth="8"
                          stroke="currentColor"
                          fill="transparent"
                          r="56"
                          cx="64"
                          cy="64"
                        />
                        <circle
                          className={getAtsStatusTone(data.atsScore.overall).stroke}
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
                  <div className="mb-8 space-y-4">
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
                      const tone = getAtsStatusTone(score);
                      
                      return (
                        <div key={category} className="rounded-2xl border border-border/70 bg-muted/35 p-4 dark:bg-muted/20">
                          <div className="mb-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{categoryIcons[category as keyof typeof categoryIcons]}</span>
                              <span className="font-medium text-foreground">{categoryLabels[category as keyof typeof categoryLabels]}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-foreground">{score}%</span>
                              <div className={`h-3 w-3 rounded-full ${tone.progress}`}></div>
                            </div>
                          </div>
                          <div className="h-3 w-full rounded-full bg-border/70">
                            <div 
                              className={`h-3 rounded-full transition-all duration-500 ${tone.progress}`}
                              style={{ width: `${score}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Score Interpretation */}
                  <div className={`mb-6 rounded-2xl border p-4 ${getAtsStatusTone(data.atsScore.overall).panel}`}>
                    <h4 className="mb-2 font-semibold text-foreground">📊 Score Interpretation</h4>
                    <p className="text-sm leading-7 text-muted-foreground">
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
                    <h4 className="mb-4 text-lg font-semibold text-foreground">🎯 Improvement Suggestions</h4>
                    {Object.entries(data.atsScore.improvements).map(([category, suggestions]) => 
                      suggestions.length > 0 && (
                        <div key={category} className="rounded-2xl border border-border/70 bg-muted/20 p-4">
                          <div className="mb-3 flex items-center gap-2">
                            <h5 className="font-medium capitalize text-foreground">{category} Improvements</h5>
                            {data.atsScore!.details[category as keyof typeof data.atsScore.details] < 70 && (
                              <span className="rounded-full bg-rose-500/12 px-2 py-1 text-xs font-medium text-rose-700 dark:text-rose-300">
                                Priority
                              </span>
                            )}
                          </div>
                          <ul className="space-y-2">
                            {suggestions.map((suggestion) => (
                              <li key={`${category}-${suggestion}`} className="flex items-start gap-3 text-sm text-muted-foreground">
                                <span className="mt-1 text-primary">✓</span>
                                <span>{suggestion}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="mt-6 border-t border-border/70 pt-6">
                    <Link href="/resume/create" className={cn(buttonVariants({ size: "lg" }), "w-full")}>
                      <FaEdit className="mr-2" />
                      Improve Resume Based on Analysis
                    </Link>
                  </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
