"use client";

import React, { useState, useEffect } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const path = `${process.env.NEXT_PUBLIC_S3_BUCKET}/${id}/${id}.pdf`;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkPdfExists = async () => {
      try {
        const response = await fetch(path, { method: 'HEAD' });
        if (!response.ok) {
          setError('Resume not found or no longer available.');
        }
      } catch (err) {
        setError('Unable to load the resume. Please try again later.');
      }
    };
    checkPdfExists();
  }, [path]);

  if (error) {
    return (
      <div className="top-0 left-0 bottom-0 right-0 absolute flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-error mb-4">{error}</h1>
          <p className="text-gray-600">
            If you believe this is an error, please contact the resume owner.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="top-0 left-0 bottom-0 right-0 absolute">
      <object
        className="w-full h-screen"
        data={path}
        type="application/pdf"
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center p-4">
            <p className="mb-2">Unable to display the PDF in your browser.</p>
            <a 
              href={path}
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
