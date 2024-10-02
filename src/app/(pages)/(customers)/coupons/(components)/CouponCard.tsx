'use client';
import { noLogo } from '@/app/(landingResources)/assets/images';
import { QrModal } from '@/components';
import { CouponsInterface } from '@/interfaces';
import Image from 'next/image';
import { useState } from 'react';

interface CouponCardProps {
  coupon: CouponsInterface;
}

export const CouponCard = ({ coupon }: CouponCardProps) => {
  const [qrModalOpen, setQrModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className='flex items-center coupon justify-between gap-16 sm:px-[3rem] sm:py[2rem] xl:px-[4rem]'>
        {coupon.LogoUrl ? (
          <Image
            src={coupon.LogoUrl}
            alt='icon-business'
            width={112}
            height={112}
            className='max-w-[7rem] self-center h-auto sm:max-w-[10rem] md:max-w-[8rem] xl:max-w-[10rem]'
          />
        ) : (
          <Image
            src={noLogo}
            alt='no-logo'
            width={112}
            height={112}
            className='h-auto max-w-[5rem] sm:max-w-[8rem] md:max-w-[9rem] lg:max-w-[10rem]'
          />
        )}

        <div className='flex flex-col items-start border-dashed border-t-0 border-r-0 border-b-0 border-[#66666678] py-3 gap-4 md:gap-5 w-full'>
          <h3 className='text-[1.6rem] sm:text-[1.8rem] xl:text-[2rem]'>{coupon.Nombre}</h3>
          <p className='text-start text-[1.1rem] leading-8 font-extralight sm:text-[1.3rem] xl:text-[1.4rem]'>
            {coupon.MensajeCanje}
          </p>
          <p className='text-[1rem] font-semibold sm:text-[1.1rem] leading-6 xl:text-[1.2rem]'>{`Válido hasta el ${new Date(
            coupon.FechaExpiracion
          ).toLocaleDateString()}`}</p>
          <span className='text-[1rem] 2xl:text-[1.4rem] border-dashed border border-[#002239a1] px-2 py-1 rounded w-max text-[#002239] font-sans'>
            <small>Código:</small> {coupon.CodigoQR}
          </span>
          <button
            onClick={() => setQrModalOpen(true)}
            className='button button-page py-2 px-4 text-[1.1rem] sm:text-[1.2rem] xl:text-[1.3rem]'>
            Mostrar QR
          </button>
        </div>
      </div>
      {qrModalOpen && <QrModal onClose={() => setQrModalOpen(false)} qrCode={coupon.CodigoQR} />}
    </>
  );
};
