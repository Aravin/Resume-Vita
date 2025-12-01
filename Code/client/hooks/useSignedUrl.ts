import { useState, useCallback } from 'react';
import { logError } from '../utils/errorTracking';

interface SignedUrlResponse {
  signedUrl: string;
  expiresIn: number;
  fileType: string;
}

interface UseSignedUrlReturn {
  getSignedUrl: (userId: string, fileType?: string) => Promise<string>;
  isLoading: boolean;
  error: string | null;
}

export const useSignedUrl = (): UseSignedUrlReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSignedUrl = useCallback(async (userId: string, fileType: string = 'pdf'): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/resume/${userId}/signed-url`, {
        method: fileType === 'pdf' ? 'GET' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: fileType !== 'pdf' ? JSON.stringify({ fileType }) : undefined,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // Use API error message if available, otherwise construct a file-type-aware message
        let errorMessage: string;
        if (errorData.message) {
          // Use the API's error message (which is file-type-aware)
          errorMessage = errorData.message;
        } else if (errorData.error) {
          // Fall back to error field if message is not available
          errorMessage = errorData.error;
        } else if (response.status === 404) {
          // Construct file-type-aware error message for 404
          const fileTypeLabel = fileType === 'pdf' ? 'PDF' : fileType === 'webp' ? 'preview image' : fileType.toUpperCase();
          errorMessage = `${fileTypeLabel} not found`;
        } else {
          errorMessage = `HTTP error! status: ${response.status}`;
        }
        
        const error = new Error(errorMessage);
        
        // Log error with context
        logError(error, {
          statusCode: response.status,
          path: `/api/resume/${userId}/signed-url`,
          userId,
          additionalInfo: {
            fileType,
            method: fileType === 'pdf' ? 'GET' : 'POST',
            responseStatus: response.status,
            responseStatusText: response.statusText,
            originalError: errorData.error,
            originalMessage: errorData.message,
          },
        });
        
        setError(errorMessage);
        throw error;
      }

      const data: SignedUrlResponse = await response.json();
      return data.signedUrl;
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      const errorMessage = errorObj.message || 'Unknown error occurred';
      
      // Only log if not already logged above
      if (!errorObj.message.includes('HTTP error')) {
        logError(errorObj, {
          path: `/api/resume/${userId}/signed-url`,
          userId,
          additionalInfo: { fileType },
        });
      }
      
      setError(errorMessage);
      throw errorObj;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    getSignedUrl,
    isLoading,
    error,
  };
};
