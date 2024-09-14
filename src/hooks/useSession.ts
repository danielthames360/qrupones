'use client';

import { ApiResponseInterface, SessionInterface } from '@/interfaces';
import { useGlobalStore } from '@/store/store';
import axios from 'axios';
import { useCallback } from 'react';
interface UseSessionInterface {
  session: SessionInterface | undefined;
  validateSession: (code?: string | null) => Promise<boolean>;
}
const backendUrl = process.env.NEXT_PUBLIC_QRUPONES_NOTIFICATION_API;
const backendKey = process.env.NEXT_PUBLIC_QRUPONES_NOTIFICATION_API_KEY;

export const useSession = (): UseSessionInterface => {
  const { session, setSession } = useGlobalStore((state) => state);

  const validateSession = useCallback(
    async (code?: string | null): Promise<boolean> => {
      const storageCode = localStorage.getItem('code');
      if (!code && !storageCode) return false;

      if (session) return true;

      try {
        const { data } = await axios.get<ApiResponseInterface<SessionInterface>>(
          `${backendUrl}/coupons/validateCode/${code || storageCode}`,
          {
            headers: {
              Authorization: `Bearer ${backendKey}`,
            },
          }
        );

        if (data.success && data.data) {
          localStorage.setItem('code', data.data.Codigo);
          setSession(data.data);
          return true;
        } else {
          localStorage.removeItem('code');
          setSession(undefined);
          return false;
        }
      } catch (error: any) {
        localStorage.removeItem('code');
        setSession(undefined);
        return false;
      }
    },
    [session, setSession]
  );

  return {
    session,
    validateSession,
  };
};
