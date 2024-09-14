'use client';

import { useSession } from '@/hooks/useSession';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const CouponPage = ({ params }: { params: { code: string } }) => {
  const { validateSession, session } = useSession();
  const router = useRouter();
  const [isSessionValid, setIsSessionValid] = useState<boolean | null>(null);

  useEffect(() => {
    const validate = async () => {
      if (!session) {
        const isValid = await validateSession(params.code);
        setIsSessionValid(isValid);
      } else {
        setIsSessionValid(true);
      }
    };

    validate();
  }, [params.code, session, validateSession, router]);

  if (isSessionValid === null) {
    return (
      <div className='flex flex-col items-center justify-center w-screen h-screen gap-20'>
        <div className='sk-chase'>
          <div className='sk-chase-dot'></div>
          <div className='sk-chase-dot'></div>
          <div className='sk-chase-dot'></div>
          <div className='sk-chase-dot'></div>
          <div className='sk-chase-dot'></div>
          <div className='sk-chase-dot'></div>
        </div>
        <p className='font-semibold text-4xl'>Validando el código...</p>
      </div>
    );
  }
  return isSessionValid ? router.push('/coupons') : router.push('/customers');
};

export default CouponPage;
