'use client';

import { signIn } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const CouponPage = () => {
  const router = useRouter();
  const params = useParams();
  const code = params.code as string;
  const [status, setStatus] = useState<'loading' | 'error'>('loading');

  useEffect(() => {
    const login = async () => {
      if (!code) {
        router.push('/customers');
        return;
      }

      try {
        const res = await signIn('credentials', {
          code,
          redirect: false,
        });

        if (res?.ok) {
          router.push('/coupons');
        } else {
          setStatus('error');
          setTimeout(() => router.push('/customers'), 2000);
        }
      } catch {
        setStatus('error');
        setTimeout(() => router.push('/customers'), 2000);
      }
    };

    login();
  }, [code, router]);

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-[24px]"
      style={{ fontSize: '16px' }}
    >
      <div className="text-center max-w-[320px]">
        {status === 'loading' ? (
          <>
            {/* Loading animation */}
            <div className="relative w-[80px] h-[80px] mx-auto mb-[24px]">
              <div className="absolute inset-0 rounded-full border-[3px] border-gray-200" />
              <div
                className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#a780b7] animate-spin"
                style={{ animationDuration: '1s' }}
              />
              <div className="absolute inset-[12px] bg-gradient-to-br from-[#a780b7] to-[#64cad8] rounded-full flex items-center justify-center">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </div>
            </div>

            <h2
              className="text-[#002239] font-semibold mb-[8px]"
              style={{ fontSize: '20px' }}
            >
              Validando tu código
            </h2>
            <p className="text-gray-500" style={{ fontSize: '15px' }}>
              Un momento por favor...
            </p>
          </>
        ) : (
          <>
            {/* Error state */}
            <div className="w-[80px] h-[80px] mx-auto mb-[24px] bg-red-50 rounded-full flex items-center justify-center">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>

            <h2
              className="text-[#002239] font-semibold mb-[8px]"
              style={{ fontSize: '20px' }}
            >
              Código inválido
            </h2>
            <p className="text-gray-500" style={{ fontSize: '15px' }}>
              Redirigiendo al inicio...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CouponPage;
