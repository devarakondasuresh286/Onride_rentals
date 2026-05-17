import { useState, useCallback } from "react";

export const useApi = (apiFunction) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const execute = useCallback(
        async (...params) => {
            setLoading(true);
            setError(null);
            try {
                const response = await apiFunction(...params);
                setData(response.data);
                return { success: true, data: response.data };
            } catch (err) {
                const errorMessage = err.response?.data?.detail || err.message || "An error occurred";
                setError(errorMessage);
                return { success: false, error: errorMessage };
            } finally {
                setLoading(false);
            }
        },
        [apiFunction]
    );

    const reset = useCallback(() => {
        setData(null);
        setError(null);
        setLoading(false);
    }, []);

    return { data, loading, error, execute, reset };
};

export default useApi;
