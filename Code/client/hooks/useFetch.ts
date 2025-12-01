import { useState, useEffect, useRef } from 'react';
import { logError } from '../utils/errorTracking';

interface FetchState<T> {
  data: T | null;
  fetching: boolean;
  fetchError: Error | null;
}

const useFetch = <T>(url: string | null) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    fetching: false,
    fetchError: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!url) {
      setState(prev => ({ ...prev, fetching: false, fetchError: null }));
      return;
    }

    // Cleanup previous fetch if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller for this fetch
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    let isMounted = true;

    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, fetching: true, fetchError: null }));
        
        // Add timeout to prevent infinite loading
        const timeoutId = setTimeout(() => {
          if (abortControllerRef.current) {
            abortControllerRef.current.abort();
          }
        }, 10000); // 10 second timeout
        
        const response = await fetch(url, { signal });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          if (response.status === 404) {
            if (isMounted && !signal.aborted) {
              setState({ data: null, fetching: false, fetchError: null });
            }
            return;
          }
          
          // Try to get error details from response
          let errorMessage = `HTTP error! status: ${response.status} - ${response.statusText}`;
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
          } catch {
            // If response is not JSON, use default message
          }
          
          const error = new Error(errorMessage);
          
          // Log error with context
          logError(error, {
            statusCode: response.status,
            path: url,
            additionalInfo: {
              responseStatus: response.status,
              responseStatusText: response.statusText,
            },
          });
          
          throw error;
        }

        const data = await response.json();
        
        if (isMounted && !signal.aborted) {
          setState({ data, fetching: false, fetchError: null });
        }
      } catch (error) {
        // Don't update state if the request was aborted
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        if (isMounted) {
          const errorObj = error instanceof Error ? error : new Error(String(error));
          const errorMessage = errorObj.message || 'An error occurred while fetching data';
          
          // Log error if not already logged above
          if (!errorObj.message.includes('HTTP error')) {
            logError(errorObj, {
              path: url,
              additionalInfo: {
                errorType: errorObj.constructor.name,
              },
            });
          }
          
          setState({
            data: null,
            fetching: false,
            fetchError: new Error(errorMessage),
          });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [url]);

  return state;
};

export default useFetch;
