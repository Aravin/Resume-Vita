"use client";

// Prevent static generation for pages that require authentication
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

import { useSafeUser } from "../../../hooks/useSafeUser";
import Link from "next/link";
import { FaFilePdf, FaEdit } from "react-icons/fa";
import axios from "axios";
import useFetch from "../../../hooks/useFetch";
import { useDownloadPDF } from "../../../hooks/useDownloadPDF";
import { useEffect, useState, useMemo, memo, useCallback } from "react";
import Loader from "../../../components/Loader";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import DefaultTemplate from "@/components/preview/DefaultTemplate";
import ModernTemplate from "@/components/preview/ModernTemplate";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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

const templateOptions = [
  {
    value: "default",
    name: "Default",
    description: "Balanced two-column layout for classic resumes.",
  },
  {
    value: "modern",
    name: "Modern",
    description: "More visual emphasis for current experience and skills.",
  },
] as const;

const colorOptions = [
  { name: "Black", value: "black", bg: "bg-black" },
  { name: "Gray", value: "gray", bg: "bg-gray-500" },
  { name: "Blue", value: "blue", bg: "bg-blue-500" },
  { name: "Red", value: "red", bg: "bg-red-500" },
  { name: "Green", value: "green", bg: "bg-green-500" },
  { name: "Yellow", value: "yellow", bg: "bg-yellow-500" },
  { name: "Pink", value: "pink", bg: "bg-pink-500" },
] as const;

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
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [themeSaveError, setThemeSaveError] = useState<string | null>(null);
  const [isSavingTheme, setIsSavingTheme] = useState(false);

  // Set document title
  useEffect(() => {
    document.title = "Resume Preview - ResumeVita.com";
  }, []);

  const { user, error: authError, isLoading: authLoading } = useSafeUser();
  const { downloadExistingPDF, generateAndDownloadPDF, isSignedUrlLoading: isDownloadLoading } = useDownloadPDF();
  
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
  const r = useMemo(() => (storedResume?.user === userId ? storedResume?.resume : {}), [storedResume, userId]);

  useEffect(() => {
    if (data?.color) {
      setColor(data.color);
    }
    if (data?.template) {
      setTemplate(data.template);
    } else {
      setTemplate('default'); // Fallback to default theme
    }
  }, [data?.color, data?.template]);

  useEffect(() => {
    if (!fetching) {
      setLoader(false);
    }
  }, [fetching]);

  const persistPreviewTheme = useCallback(
    async (nextColor: keyof typeof colorClasses, nextTemplate: 'default' | 'modern') => {
      if (!userId) return;

      setThemeSaveError(null);
      setIsSavingTheme(true);

      try {
        await axios.post(
          process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT + "/resume",
          {
            user: userId,
            resume: r,
            color: nextColor,
            template: nextTemplate,
          }
        );
      } catch (error) {
        console.error("Failed to save preview theme:", error);
        setThemeSaveError("Theme changes were applied locally but could not be saved.");
      } finally {
        setIsSavingTheme(false);
      }
    },
    [r, userId]
  );

  const handleDownload = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!userId) return;
    
    // Get and validate preview element
    const previewElement = document.querySelector("#preview");
    if (!previewElement) {
      setDownloadError('Preview element not found');
      return;
    }

    // Generate HTML with current theme and color
    const html = new XMLSerializer().serializeToString(previewElement.cloneNode(true) as Node);
    
    try {
      await generateAndDownloadPDF({
        userId,
        html,
        color,
        template,
        setDownloadError,
        setLoading: setLoader,
        fileName: "ResumeVita.pdf"
      });
    } catch (error) {
      if (!(error instanceof Error) || error.message !== 'PDF generation failed - backend error') {
        return;
      }

      console.error('PDF generation failed, falling back to existing PDF:', error);
      
      // Clear any error messages from failed generation
      setDownloadError(null);
      
      // Fallback to existing PDF if generation fails
      await downloadExistingPDF({
        userId,
        setDownloadError,
        setLoading: setLoader,
        fileName: "ResumeVita.pdf"
      });
    }
  }, [userId, color, template, generateAndDownloadPDF, downloadExistingPDF]);


  const handleColorChange = useCallback((newColor: keyof typeof colorClasses) => {
    setColor(newColor);
    void persistPreviewTheme(newColor, template);
  }, [persistPreviewTheme, template]);

  const handleTemplateChange = useCallback((newTemplate: 'default' | 'modern') => {
    setTemplate(newTemplate);
    void persistPreviewTheme(color, newTemplate);
  }, [color, persistPreviewTheme]);

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

      <div className="grid gap-6 xl:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
        <Card className="border-border/70 bg-card/95 shadow-sm xl:sticky xl:top-24 xl:h-fit">
          <CardHeader>
            <CardTitle>Preview Theme</CardTitle>
            <CardDescription>
              Switch templates, adjust the accent color, and download the current preview.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground">Template</p>
                <p className="text-sm text-muted-foreground">Choose the layout that matches your target role.</p>
              </div>
              <div className="grid gap-3">
                {templateOptions.map((templateOption) => {
                  const isActive = template === templateOption.value;

                  return (
                    <button
                      key={templateOption.value}
                      type="button"
                      onClick={() => handleTemplateChange(templateOption.value)}
                      className={cn(
                        "rounded-xl border px-4 py-3 text-left transition-colors",
                        isActive
                          ? `${bgColorClasses[color]} text-white border-transparent shadow-sm`
                          : "border-border/70 bg-background hover:border-primary/40 hover:bg-muted/40"
                      )}
                      aria-pressed={isActive}
                    >
                      <div className="font-medium">{templateOption.name}</div>
                      <div className={cn("mt-1 text-sm", isActive ? "text-white/85" : "text-muted-foreground")}>{templateOption.description}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground">Accent Color</p>
                <p className="text-sm text-muted-foreground">Apply a consistent accent across headings and highlights.</p>
              </div>
              <div className="grid grid-cols-4 gap-3 sm:grid-cols-7 xl:grid-cols-4">
                {colorOptions.map((colorOption) => {
                  const isActive = color === colorOption.value;

                  return (
                    <button
                      key={colorOption.value}
                      type="button"
                      onClick={() => handleColorChange(colorOption.value)}
                      className="group flex flex-col items-center gap-2"
                      aria-label={`Select ${colorOption.name} color`}
                      aria-pressed={isActive}
                    >
                      <span
                        className={cn(
                          "flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background transition-transform group-hover:scale-105",
                          isActive && "border-primary shadow-sm"
                        )}
                      >
                        <span
                          className={cn(
                            "h-7 w-7 rounded-full ring-2 ring-offset-2 ring-offset-background",
                            colorOption.bg,
                            isActive ? "ring-primary" : "ring-transparent"
                          )}
                        />
                      </span>
                      <span className="text-xs font-medium text-muted-foreground">{colorOption.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-xl border border-border/70 bg-muted/30 p-4 text-sm">
              <p className="font-medium text-foreground">Current selection</p>
              <p className="mt-1 text-muted-foreground">
                {templateOptions.find((option) => option.value === template)?.name} template with the {colorOptions.find((option) => option.value === color)?.name?.toLowerCase()} accent.
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {isSavingTheme
                  ? "Saving theme preferences..."
                  : themeSaveError
                    ? themeSaveError
                    : "Theme changes are saved automatically for future visits."}
              </p>
            </div>

            {downloadError && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {downloadError}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row xl:flex-col">
              <Button
                type="button"
                onClick={handleDownload}
                className="w-full gap-2"
                disabled={loading || isDownloadLoading}
              >
                <FaFilePdf className="text-base" />
                {loading || isDownloadLoading ? "Generating PDF..." : "Download PDF"}
              </Button>
              <Link
                href="/resume/create"
                className={cn(buttonVariants({ variant: "outline" }), "w-full gap-2")}
              >
                <FaEdit className="text-base" />
                Edit Resume
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="rounded-3xl border border-border/70 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_35%),linear-gradient(to_bottom,_rgba(255,255,255,0.98),_rgba(248,250,252,0.92))] p-3 shadow-sm sm:p-6">
          <div id="preview" className="flex w-full items-start justify-center overflow-auto rounded-2xl bg-white/70 p-2 sm:p-4">
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
        </div>
      </div>
    </>
  );
}
