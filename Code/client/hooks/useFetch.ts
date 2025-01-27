import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  fetching: boolean;
  fetchError: Error | null;
}

const useFetch = <T>(url: string) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    fetching: true,
    fetchError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setState({ data, fetching: false, fetchError: null });
      } catch (error) {
        setState({
          data: null,
          fetching: false,
          fetchError: error instanceof Error ? error : new Error(String(error)),
        });
      }
    };

    fetchData();
  }, [url]);

  return state;
};

export default useFetch;
