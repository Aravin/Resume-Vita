"use client";

import React, { useState, useEffect } from "react";
import { useSignedUrl } from "@/hooks/useSignedUrl";

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

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white" style={{ zIndex: 9999 }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading resume...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white" style={{ zIndex: 9999 }}>
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-error mb-4">{error}</h1>
          <p className="text-gray-600">
            If you believe this is an error, please contact the resume owner.
          </p>
        </div>
      </div>
    );
  }

  if (!signedUrl) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white" style={{ zIndex: 9999 }}>
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-error mb-4">Unable to load resume</h1>
          <p className="text-gray-600">
            Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white" style={{ zIndex: 9999 }}>
      <object
        className="w-full h-full"
        data={signedUrl}
        type="application/pdf"
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center p-4">
            <p className="mb-2">Unable to display the PDF in your browser.</p>
            <a 
              href={signedUrl}
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Click here to view or download the resume directly
            </a>
          </div>
        </div>
      </object>
    </div>
  );
}