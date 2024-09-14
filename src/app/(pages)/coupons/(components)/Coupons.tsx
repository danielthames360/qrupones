'use client';

import { FadeIn } from '@/components';
import { ApiResponseInterface, CouponsInterface } from '@/interfaces';
import { useGlobalStore } from '@/store/store';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { bretoLogo } from '../assets/images';
import { CouponCard } from './CouponCard';

const backendUrl = process.env.NEXT_PUBLIC_QRUPONES_NOTIFICATION_API;
const backendKey = process.env.NEXT_PUBLIC_QRUPONES_NOTIFICATION_API_KEY;

const fetchCoupons = async (code: string): Promise<CouponsInterface[] | undefined> => {
  try {
    const { data } = await axios.post<ApiResponseInterface<CouponsInterface[]>>(
      `${backendUrl}/coupons/getCoupons`,
      {
        code,
      },
      {
        headers: {
          Authorization: `Bearer ${backendKey}`,
        },
      }
    );

    if (data.success) {
      return data.data;
    } else {
      throw new Error('No se pudieron obtener los cupones.');
    }
  } catch (error: any) {
    console.error('Error al obtener los cupones:', error.message);
    return [];
  }
};

export const Coupons = () => {
  const { verificationCode, hasHydrated } = useGlobalStore((state) => state);
  const [coupons, setCoupons] = useState<CouponsInterface[] | undefined>(undefined);

  const router = useRouter();

  useEffect(() => {
    if (!hasHydrated) return;
    if (!verificationCode) return router.push('/customers');

    const getCoupons = async () => {
      const coupons = await fetchCoupons(verificationCode);
      setCoupons(coupons);
    };

    getCoupons();
  }, [hasHydrated, router, verificationCode]);

  return (
    <>
      <div className='h-[calc(100dvh)] max-h-[-webkit-fill-available] overflow-y-hidden w-11/12 lg:w-10/12 2xl:w-4/6 mx-auto relative'>
        <div className='h-[15%] flex flex-col gap-5 md:h-[20%] justify-center items-center '>
          <FadeIn as={'h2'} delay={300} origin={'bottom'}>
            Mis Cupones
          </FadeIn>
          <FadeIn as={'div'} delay={500} origin={'bottom'} className='flex gap-2'>
            <p className='category'>
              <span className='category-select'>Todos</span>
            </p>
            <p className='category'>
              | <span>Comida</span>
            </p>
            <p className='category'>
              | <span>Tiendas</span>
            </p>
          </FadeIn>
        </div>

        <div className='max-h-[70%] md:max-h-[60%] flex flex-col items-center gap-10 overflow-y-auto overflow-x-hidden scroll pr-5 pb-8 md:flex-row md:justify-center md:flex-wrap'>
          {coupons &&
            coupons.map((coupon, index) => (
              <FadeIn as='div' delay={500} origin={'left'} className='md:w-[48%]' key={index}>
                <CouponCard
                  img={bretoLogo}
                  name={coupon.Nombre}
                  description={coupon.MensajeCanje}
                  date={`Válido hasta el ${new Date(coupon.FechaExpiracion).toLocaleDateString()}`}
                  button='Mostrar QR'
                />
              </FadeIn>
            ))}
        </div>

        <div className='h-[15%] md:h-[20%] flex flex-col justify-center items-center text-center z-10 overflow-hidden'>
          <Link
            className='button bg-gradient-to-r from-[#616161] to-[#272727] py-4 px-20 rounded-xl button-coupons'
            href='/history'
            prefetch={true}>
            Historial
          </Link>
        </div>
      </div>
    </>
  );
};
