"use client";

//useFetch.js
// inspired by https://dev.to/techcheck/custom-react-hook-usefetch-eid
import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(url: string) {
  const [data, setData] = useState({} as any);
  const [fetching, setLoading] = useState(false);
  const [fetchError, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setData("");
    setError("");

    const source = axios.CancelToken.source();

    axios
      .get(url, { cancelToken: source.token })
      .then((res) => {
        setLoading(false);
        //checking for multiple responses for more flexibility
        //with the url we send in.
        res.data && setData(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(`An error occurred. ${err.message}`);
      });

    return () => {
      // source.cancel();
    };
  }, [url]);

  return { data, fetching, fetchError };
}

export default useFetch;
