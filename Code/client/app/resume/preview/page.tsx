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

  const handlePreferenceUpdate = useCallback(async (updates: { color?: string; theme?: 'default' | 'modern' }) => {
    if (!userId) return;
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/resume/${userId}`, updates);
    } catch (error) {
      console.error('Failed to update preferences:', error);
    }
  }, [userId]);

  const handleColorChange = useCallback((newColor: keyof typeof colorClasses) => {
    setColor(newColor);
    handlePreferenceUpdate({ color: newColor });
  }, [handlePreferenceUpdate]);

  const handleTemplateChange = useCallback((newTemplate: 'default' | 'modern') => {
    setTemplate(newTemplate);
    handlePreferenceUpdate({ theme: newTemplate });
  }, [handlePreferenceUpdate]);

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

      <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
        {/* Color Picker Section */}
        <div className="flex flex-col sm:flex-row items-center gap-3 flex-1">
          <h3 className="text-sm font-medium text-gray-700">Theme:</h3>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            <button 
              onClick={() => handleColorChange("black")}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              title="Black"
            >
              <div className={`w-6 h-6 bg-black rounded-full ring-2 ring-offset-2 ${color === "black" ? "ring-gray-500" : "ring-transparent"}`} />
            </button>
            <button 
              onClick={() => handleColorChange("gray")}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              title="Gray"
            >
              <div className={`w-6 h-6 bg-gray-500 rounded-full ring-2 ring-offset-2 ${color === "gray" ? "ring-gray-500" : "ring-transparent"}`} />
            </button>
            <button 
              onClick={() => handleColorChange("blue")}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              title="Blue"
            >
              <div className={`w-6 h-6 bg-blue-500 rounded-full ring-2 ring-offset-2 ${color === "blue" ? "ring-gray-500" : "ring-transparent"}`} />
            </button>
            <button 
              onClick={() => handleColorChange("red")}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              title="Red"
            >
              <div className={`w-6 h-6 bg-red-500 rounded-full ring-2 ring-offset-2 ${color === "red" ? "ring-gray-500" : "ring-transparent"}`} />
            </button>
            <button 
              onClick={() => handleColorChange("green")}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              title="Green"
            >
              <div className={`w-6 h-6 bg-green-500 rounded-full ring-2 ring-offset-2 ${color === "green" ? "ring-gray-500" : "ring-transparent"}`} />
            </button>
            <button 
              onClick={() => handleColorChange("yellow")}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              title="Yellow"
            >
              <div className={`w-6 h-6 bg-yellow-500 rounded-full ring-2 ring-offset-2 ${color === "yellow" ? "ring-gray-500" : "ring-transparent"}`} />
            </button>
            <button 
              onClick={() => handleColorChange("pink")}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              title="Pink"
            >
              <div className={`w-6 h-6 bg-pink-500 rounded-full ring-2 ring-offset-2 ${color === "pink" ? "ring-gray-500" : "ring-transparent"}`} />
            </button>
          </div>
        </div>

        {/* Template Picker Section */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${template === 'default' ? bgColorClasses[color] + ' text-white' : 'border border-gray-300'}`}
            onClick={() => handleTemplateChange('default')}
          >
            Default Template
          </button>
          <button
            className={`px-4 py-2 rounded ${template === 'modern' ? bgColorClasses[color] + ' text-white' : 'border border-gray-300'}`}
            onClick={() => handleTemplateChange('modern')}
          >
            Modern Template
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row gap-2 items-center">
          <button
            className="btn btn-sm btn-outline btn-accent gap-2"
            onClick={handleDownload}
          >
            <FaFilePdf className="text-lg" />
            <span className="hidden sm:inline">Download PDF</span>
          </button>
          <Link href="/resume/create" passHref>
            <button className="btn btn-sm btn-outline btn-primary gap-2">
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
