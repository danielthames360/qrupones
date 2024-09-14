'use client';

import { ApiResponseInterface, SessionInterface } from '@/interfaces';
import { useGlobalStore } from '@/store/store';
import axios from 'axios';
import { useCallback } from 'react';
interface UseSessionInterface {
  verificationCode: string | undefined;
  hasHydrated: boolean;
  validateSession: (code?: string | null) => Promise<boolean>;
}
const backendUrl = process.env.NEXT_PUBLIC_QRUPONES_NOTIFICATION_API;
const backendKey = process.env.NEXT_PUBLIC_QRUPONES_NOTIFICATION_API_KEY;

export const useSession = (): UseSessionInterface => {
  const { verificationCode, setVerificationCode, hasHydrated } = useGlobalStore((state) => state);

  const validateSession = useCallback(
    async (code?: string | null): Promise<boolean> => {
      if (!code) return false;

      if (verificationCode) return true;

      try {
        const { data } = await axios.get<ApiResponseInterface<SessionInterface>>(
          `${backendUrl}/coupons/validateCode/${code}`,
          {
            headers: {
              Authorization: `Bearer ${backendKey}`,
            },
          }
        );

        if (data.success && data.data) {
          setVerificationCode(data.data.Codigo);
          return true;
        } else {
          setVerificationCode(undefined);
          return false;
        }
      } catch (error: any) {
        setVerificationCode(undefined);
        return false;
      }
    },
    [setVerificationCode, verificationCode]
  );

  return {
    verificationCode,
    validateSession,
    hasHydrated
  };
};
