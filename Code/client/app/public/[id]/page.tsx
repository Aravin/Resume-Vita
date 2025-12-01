"use client";

import React, { useState, useEffect } from "react";
import { useSignedUrl } from "@/hooks/useSignedUrl";
import ErrorDisplay from "@/components/common/ErrorDisplay";
import { logError } from "@/utils/errorTracking";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
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
        const errorObj = err instanceof Error ? err : new Error(String(err));
        logError(errorObj, {
          path: `/public/${id}`,
          additionalInfo: { userId: id },
        });
        
        // Check for 404 errors - either by message content or status code
        const isNotFound = 
          errorObj.message.includes('PDF not found') ||
          errorObj.message.includes('not found') ||
          errorObj.message.includes('does not exist');
        
        if (isNotFound) {
          setError(new Error('Resume not found or no longer available.'));
        } else {
          setError(errorObj);
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
      <div className="fixed inset-0 bg-white" style={{ zIndex: 9999 }}>
        <ErrorDisplay
          error={error}
          title={error.message.includes('not found') ? 'Resume Not Found' : 'Unable to Load Resume'}
          context={{ path: `/public/${id}` }}
          onRetry={() => {
            setError(null);
            setIsLoading(true);
            if (id) {
              getSignedUrl(id)
                .then(url => {
                  setSignedUrl(url);
                  setIsLoading(false);
                })
                .catch(err => {
                  const errorObj = err instanceof Error ? err : new Error(String(err));
                  setError(errorObj);
                  setIsLoading(false);
                });
            }
          }}
        />
      </div>
    );
  }

  if (!signedUrl) {
    return (
      <div className="fixed inset-0 bg-white" style={{ zIndex: 9999 }}>
        <ErrorDisplay
          error="Unable to load resume. Please try again later."
          title="Loading Error"
          context={{ path: `/public/${id}` }}
          onRetry={() => {
            if (id) {
              setIsLoading(true);
              getSignedUrl(id)
                .then(url => {
                  setSignedUrl(url);
                  setIsLoading(false);
                })
                .catch(err => {
                  const errorObj = err instanceof Error ? err : new Error(String(err));
                  setError(errorObj);
                  setIsLoading(false);
                });
            }
          }}
        />
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