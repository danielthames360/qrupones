'use client';

import { emptyTag } from '@/app/(landingResources)/assets/images';
import { ApiResponseInterface, CouponsInterface } from '@/interfaces';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
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
  const { data: session } = useSession();
  const [coupons, setCoupons] = useState<CouponsInterface[]>([]);
  const [filteredCoupons, setFilteredCoupons] = useState<CouponsInterface[]>([]);
  const [filter, setFilter] = useState<string>('Todos');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCoupons = async () => {
      if (!session || !session.user.name) {
        return null;
      }

      setIsLoading(true);
      const data = await fetchCoupons(session.user.name);
      setIsLoading(false);
      if (data) {
        setCoupons(data);
      }
    };

    loadCoupons();
  }, [session]);

  useEffect(() => {
    let filtered = coupons;

    if (filter === 'Tiendas') {
      filtered = coupons.filter((coupon) => coupon.Categoria === 'Tiendas');
    } else if (filter === 'Gastronomia') {
      filtered = coupons.filter((coupon) => coupon.Categoria === 'Gastronomia');
    }

    setFilteredCoupons(filtered);
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
            <button onClick={() => setFilter('Todos')} className='category bg-transparent'>
              <span className={`${filter === 'Todos' ? 'category-select' : ''}`}>Todos</span>
            </button>

            <button onClick={() => setFilter('Tiendas')} className='category bg-transparent'>
              | <span className={`${filter === 'Tiendas' ? 'category-select' : ''}`}>Tiendas</span>
            </button>
            <button onClick={() => setFilter('Gastronomia')} className='category bg-transparent'>
              | <span className={`${filter === 'Gastronomia' ? 'category-select' : ''}`}>Gastronomía </span>
            </button>
          </div>
        </div>

        <div className='max-h-[70%] md:max-h-[60%] flex flex-col items-center gap-10 overflow-y-auto overflow-x-hidden scroll pr-5 pb-8 md:flex-row md:justify-center md:flex-wrap'>
          {filteredCoupons.length > 0 ? (
            filteredCoupons.map((coupon, index) => (
              <div className='md:w-[48%]' key={index}>
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
