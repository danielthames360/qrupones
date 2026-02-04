'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const CouponPage = ({ params }: { params: { code: string } }) => {
  const router = useRouter();

  useEffect(() => {
    const login = async () => {
      const res = await signIn('credentials', {
        code: params.code,
        redirect: false,
      });
      if (res?.error) {
        return router.push('/customers');
      } else {
        return router.push('/coupons');
      }
    };

    login();
  }, [params.code, router]);

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
};

export default CouponPage;
