'use client';

import { emptyTag } from '@/app/(landingResources)/assets/images';
import { CouponsInterface } from '@/interfaces';
import { endpoints } from '@/constants/endpoints';
import { useFetchApi } from '@/hooks/useFetchApi';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { CouponCard } from './CouponCard';

type FilterType = 'Todos' | 'Tiendas' | 'Gastronomia';

const FILTER_OPTIONS: { label: string; value: FilterType }[] = [
  { label: 'Todos', value: 'Todos' },
  { label: 'Tiendas', value: 'Tiendas' },
  { label: 'Gastronomía', value: 'Gastronomia' },
];

export const Coupons = () => {
  const { data: session } = useSession();
  const [filter, setFilter] = useState<FilterType>('Todos');

  const { data: coupons, isLoading } = useFetchApi<CouponsInterface>({
    endpoint: endpoints.coupons.list,
    enabled: !!session,
  });

  const filteredCoupons = useMemo(() => {
    if (filter === 'Todos') return coupons;
    return coupons.filter((coupon) => coupon.Categoria === filter);
  }, [filter, coupons]);

  if (isLoading) {
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
        <p className='font-semibold text-4xl'>Obteniendo QRupones...</p>
      </div>
    );
  }

  return (
    <>
      <div className='h-[calc(100dvh)] max-h-[-webkit-fill-available] overflow-y-hidden w-11/12 lg:w-10/12 2xl:w-4/6 mx-auto relative'>
        <div className='h-[15%] flex flex-col gap-5 md:h-[20%] justify-center items-center '>
          <h2>Mis QRupones</h2>
          <div className='flex gap-2 justify-center mt-4'>
            {FILTER_OPTIONS.map((option, index) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className='category bg-transparent'
              >
                {index > 0 && '| '}
                <span className={filter === option.value ? 'category-select' : ''}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className='max-h-[70%] md:max-h-[60%] flex flex-col items-center gap-10 overflow-y-auto overflow-x-hidden scroll pr-5 pb-8 md:flex-row md:justify-center md:flex-wrap'>
          {filteredCoupons.length > 0 ? (
            filteredCoupons.map((coupon) => (
              <div className='md:w-[48%]' key={coupon.CodigoQR}>
                <CouponCard coupon={coupon} />
              </div>
            ))
          ) : (
            <div className='flex flex-col items-center'>
              <Image src={emptyTag} alt='Empty tag' width={100} height={100} className='mt-20' />
              <p>No tienes QRupones vigentes...</p>
            </div>
          )}
        </div>

        <div className='h-[15%] md:h-[20%] flex flex-col justify-center items-center text-center z-10 overflow-hidden'>
          <Link
            className='button bg-gradient-to-r from-[#616161] to-[#272727] py-4 px-20 rounded-xl button-coupons'
            href='/history'
            prefetch={false}>
            Historial
          </Link>
        </div>
      </div>
    </>
  );
};
