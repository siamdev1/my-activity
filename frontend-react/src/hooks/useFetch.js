import { useState, useEffect, useCallback } from 'react';

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message || 'Error occurred while fetching resource');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [fetchData, url]);

  return { data, loading, error, refetch: fetchData };
};
