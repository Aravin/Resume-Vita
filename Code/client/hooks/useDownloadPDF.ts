import { useSignedUrl } from "../hooks/useSignedUrl";
import axios from "axios";

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

  const downloadExistingPDF = async (options: DownloadOptions) => {
    const { userId, setDownloadError, setLoading, fileName = "ResumeVita.pdf" } = options;
    
    setDownloadError(null);
    if (setLoading) setLoading(true);

    try {
      // Get signed URL for download
      const signedUrl = await getSignedUrl(userId, 'pdf');
      
      // Use direct download to avoid CORS issues
      const link = document.createElement("a");
      link.href = signedUrl;
      link.download = fileName;
      link.target = "_blank";
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
      
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

      // Wait a moment for PDF processing to complete
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Get signed URL for download
      const signedUrl = await getSignedUrl(userId, 'pdf');
      
      // Use direct download to avoid CORS issues
      const link = document.createElement("a");
      link.href = signedUrl;
      link.download = fileName;
      link.target = "_blank";
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
      
    } catch (error) {
      console.error('PDF generation error:', error);
      
      // Handle specific error types
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 500) {
          // Don't show error immediately, let the calling code handle fallback
          throw new Error('PDF generation failed - backend error');
        } else if (error.response?.status === 400) {
          setDownloadError('Invalid resume data. Please check your resume content.');
        } else {
          setDownloadError(`Server error: ${error.response?.status || 'Unknown'}`);
        }
      } else {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        setDownloadError(errorMessage);
      }
      
      // Re-throw the error so calling code can handle fallback
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
