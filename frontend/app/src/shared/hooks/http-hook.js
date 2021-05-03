import { useState, useCallback, useRef, useEffect } from 'react';

const useHttpRequest = () => {
  // 2 states: loading, and error
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cancel ongoing HTTP Requests
  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);
      // Add signal to ref
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          setIsLoading(false);
          throw new Error(responseData.msg);
        }
        setIsLoading(false);

        return responseData;
      } catch (err) {
        setIsLoading(false);
        console.log(err);
        setError(err.message || 'Something went wrong, please try again');
        throw error;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    // Clean up function
    return () => {
      // Aborts after every signal
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, clearError, sendRequest };
};

export default useHttpRequest;
