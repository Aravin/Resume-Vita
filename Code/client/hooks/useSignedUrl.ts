import { useState, useCallback } from 'react';

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
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get signed URL');
      }

      const data: SignedUrlResponse = await response.json();
      return data.signedUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      throw err;
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
