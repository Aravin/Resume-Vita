"use client";

import React, { useState, useEffect } from "react";
import { FaDownload, FaExternalLinkAlt } from "react-icons/fa";
import { useSignedUrl } from "@/hooks/useSignedUrl";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getSignedUrl } = useSignedUrl();

  // Set document title based on state
  useEffect(() => {
    if (isLoading) {
      document.title = "Loading Resume - ResumeVita.com";
    } else if (error) {
      document.title = "Resume Not Found - ResumeVita.com";
    } else if (!signedUrl) {
      document.title = "Unable to Load Resume - ResumeVita.com";
    } else {
      document.title = "Public Resume - ResumeVita.com";
    }
  }, [isLoading, error, signedUrl]);

  useEffect(() => {
    const initializeParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };
    initializeParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;
    
    const loadSignedUrl = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const url = await getSignedUrl(id);
        setSignedUrl(url);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        if (errorMessage.includes('PDF not found')) {
          setError('Resume not found or no longer available.');
        } else {
          setError('Unable to load the resume. Please try again later.');
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadSignedUrl();
  }, [id, getSignedUrl]);

  const handleDownload = () => {
    if (!signedUrl) return;

    const link = document.createElement("a");
    link.href = signedUrl;
    link.download = `ResumeVita-${id || 'resume'}.pdf`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-white/80"></div>
          <h1 className="text-xl font-semibold">Loading public resume</h1>
          <p className="mt-2 text-sm text-white/70">Fetching the latest shared PDF.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-white">
        <div className="max-w-lg text-center">
          <h1 className="text-2xl font-semibold text-white">Unable to load this resume</h1>
          <p className="mt-3 text-sm text-white/70">{error}</p>
          <p className="mt-2 text-sm text-white/55">Ask the resume owner to regenerate or reshare the PDF if this link should still work.</p>
        </div>
      </div>
    );
  }

  if (!signedUrl) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Resume unavailable</h1>
          <p className="mt-2 text-sm text-white/70">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-neutral-950">
      <div className="pointer-events-none fixed right-4 top-1/2 z-20 flex w-auto -translate-y-1/2 flex-col gap-3 sm:right-6">
        <Button type="button" onClick={handleDownload} className="pointer-events-auto gap-2 shadow-lg">
          <FaDownload className="text-sm" />
          Download
        </Button>
        <a
          href={signedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline" }), "pointer-events-auto gap-2 border-white/20 bg-black/65 text-white shadow-lg backdrop-blur hover:bg-black/80 hover:text-white")}
        >
          <FaExternalLinkAlt className="text-xs" />
          Open
        </a>
      </div>

      <object
        className="h-screen w-full bg-white"
        data={signedUrl}
        type="application/pdf"
      >
        <div className="flex min-h-screen items-center justify-center bg-neutral-950 p-6 text-white">
          <div className="max-w-md text-center">
            <h2 className="text-lg font-semibold">PDF preview is unavailable in this browser</h2>
            <p className="mt-2 text-sm text-white/70">
              Open the file in a new tab or download it directly to view the resume.
            </p>
          </div>
        </div>
      </object>
    </div>
  );
}