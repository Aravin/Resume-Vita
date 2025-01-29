import { useState, useEffect, useRef } from 'react';

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
        
        const response = await fetch(url, { signal });
        
        if (!response.ok) {
          if (response.status === 404) {
            if (isMounted && !signal.aborted) {
              setState({ data: null, fetching: false, fetchError: null });
            }
            return;
          }
          throw new Error(
            `HTTP error! status: ${response.status} - ${response.statusText}`
          );
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
          const errorMessage = error instanceof Error 
            ? error.message 
            : 'An error occurred while fetching data';
          
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
