import { useSignedUrl } from "../hooks/useSignedUrl";
import axios from "axios";
import { trackPDFDownload } from "../utils/gtag";

const BACKEND_PDF_ERROR = "PDF generation failed - backend error";
const PREPARING_PDF_MESSAGE = "The updated PDF is still being prepared. Please try again in a moment.";

interface DownloadOptions {
  userId: string;
  setDownloadError: (error: string | null) => void;
  setLoading?: (loading: boolean) => void;
  fileName?: string;
}

interface GeneratePDFOptions {
  userId: string;
  html: string;
  color: string;
  template?: string;
  setDownloadError: (error: string | null) => void;
  setLoading?: (loading: boolean) => void;
  fileName?: string;
}

export const useDownloadPDF = () => {
  const { getSignedUrl, isLoading: isSignedUrlLoading } = useSignedUrl();

  const triggerBrowserDownload = (signedUrl: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = signedUrl;
    link.download = fileName;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      link.remove();
    }, 100);
  };

  const isBackendGenerationError = (error: unknown) =>
    axios.isAxiosError(error) && error.response?.status === 500;

  const getGeneratePdfErrorMessage = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        return "Invalid resume data. Please check your resume content.";
      }

      if (error.response?.status !== 500) {
        return `Server error: ${error.response?.status || "Unknown"}`;
      }

      return null;
    }

    if (error instanceof Error) {
      if (error.message.toLowerCase().includes("not found") || error.message === "Generated PDF is still processing") {
        return PREPARING_PDF_MESSAGE;
      }

      return error.message;
    }

    return "Unknown error occurred";
  };

  const waitForSignedAsset = async (
    userId: string,
    fileType: string,
    attempts = 10,
    delayMs = 500
  ) => {
    for (let attempt = 0; attempt < attempts; attempt += 1) {
      try {
        return await getSignedUrl(userId, fileType);
      } catch (error) {
        const isMissingAsset = error instanceof Error && error.message.toLowerCase().includes("not found");

        if (!isMissingAsset || attempt === attempts - 1) {
          throw error;
        }

        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }

    throw new Error("Generated PDF is still processing");
  };

  const downloadExistingPDF = async (options: DownloadOptions) => {
    const { userId, setDownloadError, setLoading, fileName = "ResumeVita.pdf" } = options;
    
    setDownloadError(null);
    if (setLoading) setLoading(true);

    try {
      // Get signed URL for download
      const signedUrl = await getSignedUrl(userId, 'pdf');

      triggerBrowserDownload(signedUrl, fileName);
      
      // Track PDF download
      trackPDFDownload('dashboard');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setDownloadError(errorMessage);
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  const generateAndDownloadPDF = async (options: GeneratePDFOptions) => {
    const { userId, html, color, template, setDownloadError, setLoading, fileName = "ResumeVita.pdf" } = options;
    
    setDownloadError(null);
    if (setLoading) setLoading(true);

    try {
      // Prepare request body for PDF generation
      const body = {
        html,
        user: userId,
        color,
        template,
      };

      // Generate PDF on backend
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/pdf`, body);

      const signedUrl = await waitForSignedAsset(userId, 'pdf');

      triggerBrowserDownload(signedUrl, fileName);
      
      // Track PDF download
      trackPDFDownload('preview');
    } catch (error) {
      console.error('PDF generation error:', error);

      if (isBackendGenerationError(error)) {
        throw new Error(BACKEND_PDF_ERROR);
      }

      setDownloadError(getGeneratePdfErrorMessage(error));
      throw error;
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  return {
    downloadExistingPDF,
    generateAndDownloadPDF,
    isSignedUrlLoading
  };
};
