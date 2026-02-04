import { useState, useEffect, useCallback } from 'react';
import { ApiResponseInterface } from '@/interfaces';

interface UseFetchApiOptions {
  endpoint: string;
  enabled?: boolean;
}

interface UseFetchApiResult<T> {
  data: T[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useFetchApi<T>({ endpoint, enabled = true }: UseFetchApiOptions): UseFetchApiResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Session is validated via cookies automatically
      const response = await fetch(endpoint, {
        method: 'GET',
        credentials: 'include',
      });

      const result: ApiResponseInterface<T[]> = await response.json();

      if (result.success && result.data) {
        setData(result.data);
      } else {
        setError(result.message || 'Error al obtener los datos');
        setData([]);
      }
    } catch {
      setError('Error de conexión');
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, enabled]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}
