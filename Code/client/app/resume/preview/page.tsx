"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { FaFilePdf, FaEdit } from "react-icons/fa";
import axios from "axios";
import useFetch from "../../../hooks/useFetch";
import { useEffect, useState, useMemo, memo, useCallback } from "react";
import Loader from "../../../components/Loader";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import DefaultTemplate from "@/components/preview/DefaultTemplate";
import ModernTemplate from "@/components/preview/ModernTemplate";

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
  const [template, setTemplate] = useState<'default' | 'modern'>('default');
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
    if (data?.theme) {
      setTemplate(data.theme);
    } else {
      setTemplate('default'); // Fallback to default theme
    }
  }, [data?.color, data?.theme]);

  useEffect(() => {
    if (!fetching) {
      setLoader(false);
    }
  }, [fetching]);

  const handleDownload = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // Early return if no document or userId
    if (!document || !userId) {
      console.error('Document or userId not available');
      return;
    }

    setLoader(true);

    try {
      // Get and validate preview element
      const previewElement = document.querySelector("#preview");
      if (!previewElement) {
        throw new Error('Preview element not found');
      }

      // Prepare request body
      const body = {
        html: new XMLSerializer().serializeToString(previewElement.cloneNode(true) as Node),
        user: userId,
        color,
      };

      // Make API request
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/pdf`, body);

      // Create and trigger download link
      const downloadUrl = `${process.env.NEXT_PUBLIC_S3_BUCKET}/${userId}/${userId}.pdf`;
      const downloadLink = document.createElement("a");
      downloadLink.href = downloadUrl;
      downloadLink.download = "ResumeVita";
      downloadLink.target = "_blank";
      downloadLink.dispatchEvent(new MouseEvent("click"));
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    } finally {
      setLoader(false);
    }
  }, [userId, color]);


  const handleColorChange = useCallback((newColor: keyof typeof colorClasses) => {
    setColor(newColor);
  }, []);

  const handleTemplateChange = useCallback((newTemplate: 'default' | 'modern') => {
    setTemplate(newTemplate);
  }, []);

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

      <div className="flex flex-col md:flex-row items-stretch gap-6 p-4 bg-gray-50 rounded-lg shadow-sm">
        {/* Color Picker Section */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <h3 className="text-sm font-medium text-gray-700 whitespace-nowrap">Color:</h3>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
            {[
              { name: "Black", value: "black", bg: "bg-black" },
              { name: "Gray", value: "gray", bg: "bg-gray-500" },
              { name: "Blue", value: "blue", bg: "bg-blue-500" },
              { name: "Red", value: "red", bg: "bg-red-500" },
              { name: "Green", value: "green", bg: "bg-green-500" },
              { name: "Yellow", value: "yellow", bg: "bg-yellow-500" },
              { name: "Pink", value: "pink", bg: "bg-pink-500" }
            ].map((colorOption) => (
              <div key={colorOption.value} className="group relative">
                <button
                  onClick={() => handleColorChange(colorOption.value as keyof typeof colorClasses)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label={`Select ${colorOption.name} color`}
                >
                  <div className={`w-6 h-6 ${colorOption.bg} rounded-full ring-2 ring-offset-2 ${
                    color === colorOption.value ? "ring-gray-500" : "ring-transparent"
                  }`} />
                </button>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded 
                             opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {colorOption.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Template Picker Section */}
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { name: "Default Template", value: "default" },
            { name: "Modern Template", value: "modern" }
          ].map((templateOption) => (
            <button
              key={templateOption.value}
              className={`px-4 py-2 rounded transition-colors ${
                template === templateOption.value 
                  ? bgColorClasses[color] + ' text-white' 
                  : 'border border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => handleTemplateChange(templateOption.value as 'default' | 'modern')}
            >
              {templateOption.name}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3 ml-auto">
          <button
            className="btn btn-sm btn-outline btn-accent gap-2 min-w-[40px]"
            onClick={handleDownload}
            title="Download PDF"
          >
            <FaFilePdf className="text-lg" />
            <span className="hidden sm:inline">Download PDF</span>
          </button>
          <Link href="/resume/create" passHref>
            <button 
              className="btn btn-sm btn-outline btn-primary gap-2 min-w-[40px]"
              title="Edit Resume"
            >
              <FaEdit className="text-lg" />
              <span className="hidden sm:inline">Edit Resume</span>
            </button>
          </Link>
        </div>
      </div>

      <div id="preview" className="flex justify-center items-center w-full overflow-auto">
        {template === 'default' ? (
          <DefaultTemplate 
            data={r} 
            color={color} 
            colorClasses={colorClasses} 
            bgColorClasses={bgColorClasses} 
          />
        ) : (
          <ModernTemplate 
            data={r} 
            color={color} 
            colorClasses={colorClasses} 
            bgColorClasses={bgColorClasses} 
          />
        )}
      </div>
    </>
  );
}
