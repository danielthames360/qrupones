'use client';

import { bretoLogo } from '@/app/(landingResources)/assets/images';
import { ApiResponseInterface, CouponsHistoryInterface } from '@/interfaces';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const backendUrl = process.env.NEXT_PUBLIC_QRUPONES_NOTIFICATION_API;
const backendKey = process.env.NEXT_PUBLIC_QRUPONES_NOTIFICATION_API_KEY;

const fetchCoupons = async (): Promise<CouponsHistoryInterface[] | undefined> => {
  try {
    const { data } = await axios.post<ApiResponseInterface<CouponsHistoryInterface[]>>(
      `${backendUrl}/coupons/getCouponsHistory`,
      {
        number: '77655430', // Debe ser dinámico según el usuario
        countryCode: '591', // Debe ser dinámico también
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
export const TableHistory = () => {
  const [coupons, setCoupons] = useState<CouponsHistoryInterface[]>([]);
  const [filteredCoupons, setFilteredCoupons] = useState<CouponsHistoryInterface[]>([]);
  const [filter, setFilter] = useState<string>('Todos');

  useEffect(() => {
    const loadCoupons = async () => {
      const data = await fetchCoupons();
      if (data) {
        setCoupons(data);
        setFilteredCoupons(data);
      }
    };

    loadCoupons();
  }, []);

  useEffect(() => {
    let filtered = coupons;

    if (filter === 'Utilizados') {
      filtered = coupons.filter((coupon) => coupon.FechaUso);
    } else if (filter === 'Expirados') {
      filtered = coupons.filter((coupon) => !coupon.FechaUso);
    }

    setFilteredCoupons(filtered);
  }, [filter, coupons]);

  return (
    <>
      <div className='flex gap-2 justify-center mt-3'>
        <button onClick={() => setFilter('Todos')} className='category bg-transparent'>
          <span className={`${filter === 'Todos' ? 'category-select' : ''}`}>Todos</span>
        </button>
        <button onClick={() => setFilter('Utilizados')} className='category bg-transparent'>
          | <span className={`${filter === 'Utilizados' ? 'category-select' : ''}`}>Utilizados</span>
        </button>
        <button onClick={() => setFilter('Expirados')} className='category bg-transparent'>
          | <span className={`${filter === 'Expirados' ? 'category-select' : ''}`}>Expirados</span>
        </button>
      </div>
      <div className='flex justify-center mt-3'>
        <Link
          href={'/coupons'}
          className='button bg-gradient-to-r from-[#616161] to-[#272727] py-4 px-5 rounded-xl button-coupons text-[1.6rem]'>
          Volver
        </Link>
      </div>

      <div className='mx-auto divide-y divide-[#e9e9e9] border-[2px] border-[#a3a3a930] shadow-md flex flex-col rounded-xl my-[3rem]'>
        {filteredCoupons &&
          filteredCoupons.map((coupon) => (
            <div key={coupon.CodigoQR} className='flex p-5 relative gap-5 sm:gap-8 md:gap-10 xl:gap-14 sm:ml-5 xl:ml-12 '>
              <div className='self-center basis-[10%]'>
                <Image
                  src={bretoLogo}
                  alt='icon-business'
                  className='h-auto max-w-[5rem] sm:max-w-[8rem] md:max-w-[9rem] lg:max-w-[10rem]'
                />
              </div>
              <div className='self-center basis-[50%] md:basis-[55%] xl:basis-[50%] flex flex-col gap-2 2xl:gap-4'>
                <h3 className='text-[1.3rem] sm:text-[1.7rem] lg:text-[1.8rem] 2xl:text-[2rem] font-bold text-start'>
                  {coupon.Empresa}
                </h3>
                <p className='text-[1.1rem] sm:text-[1.3rem] 2xl:text-[1.8rem] leading-8 font-light'>{coupon.MensajeCanje}</p>
                <p className='text-[1rem] sm:text-[1.1rem] 2xl:text-[1.5rem] text-[#002239] font-semibold '>
                  Expira: {new Date(coupon.FechaExpiracion).toLocaleDateString()}
                </p>
                <span className='text-[1rem] 2xl:text-[1.4rem] border-dashed border border-[#002239a1] p-1 rounded w-max text-[#002239] font-sans'>
                  <small>Código:</small> {coupon.CodigoQR}
                </span>
              </div>

              <div className='flex gap-5 basis-[40%] md:basis-[35%] xl:basis-[40%]'>
                <div
                  className={`flex flex-col gap-2 xl:gap-5 ${
                    coupon.FechaUso ? 'border-r-[.5px] border-[#e9e9e9] pr-[2.5rem]' : ''
                  }`}>
                  <span className='text-[1rem] sm:text-[1.2rem] 2xl:text-[1.5rem] font-light'>
                    Fecha <br className='2xl:hidden' />
                    Generado:
                  </span>
                  <span className='text-[1.2rem] sm:text-[1.4rem] 2xl:text-[1.8rem] font-semibold'>
                    {new Date(coupon.FechaGenerado).toLocaleDateString()}
                  </span>
                  <span className='text-[1rem] sm:text-[1.2rem] 2xl:text-[1.5rem] font-light'>Por el monto de:</span>
                  <span className='text-[1rem] sm:text-[1.2rem] 2xl:text-[1.5rem] text-white bg-[#a780b7] rounded-full px-2 py-1 w-max xl:px-5 xl:py-3 self-center'>
                    {coupon.Moneda}. {coupon.MontoOrigen}
                  </span>
                </div>

                {coupon.FechaUso ? (
                  <div className='flex flex-col gap-2 xl:gap-5 pl-[1rem]'>
                    <span className='text-[1rem] sm:text-[1.2rem] 2xl:text-[1.5rem] font-light'>
                      Fecha <br className='2xl:hidden' />
                      Utilizado:
                    </span>
                    <span className='text-[1.2rem] sm:text-[1.4rem] 2xl:text-[1.8rem] font-semibold'>
                      {new Date(coupon.FechaUso).toLocaleDateString()}
                    </span>
                    <span className='text-[1rem] sm:text-[1.2rem] 2xl:text-[1.5rem] font-light'>Monto con QRupon:</span>
                    <span className='text-[1rem] sm:text-[1.1rem] 2xl:text-[1.5rem] text-white bg-[#a7cf3a] rounded-full px-2 py-1 w-max xl:px-5 xl:py-3 self-center'>
                      Bs. {coupon.MontoQrupon}
                    </span>
                  </div>
                ) : (
                  <>
                    <div className='[clip-path:polygon(20%_0,70%_0,100%_30%,100%_80%)] absolute top-0 -right-[2px] bg-[#8e2828be] w-[6rem] sm:w-[12rem] h-[8rem] sm:h-[10rem]'></div>

                    <span className='absolute top-[15px] sm:top-[22px] -right-[6px] sm:right-[2px] text-white rotate-[52deg] sm:rotate-[41deg] font-medium text-[1rem] sm:text-[1.2rem]'>
                      Expirado
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
