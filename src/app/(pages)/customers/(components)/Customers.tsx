'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { access, circleFigure, lineFigure, plusFigure, plusSmallFigure, rollFigure, starFigure } from '../assets/images';
import { InputPhone } from './InputPhone';

export const Customers = () => {
  const [inputPhone, setInputPhone] = useState<string>('');

  return (
    <>
      <div className='h-[calc(100dvh)] max-h-[-webkit-fill-available] relative overflow-hidden flex items-center justify-center'>
        <motion.img
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
          className='clients__figure -left-5 top-20 sm:left-[5rem] lg:left-28 2xl:w-[12rem] 2xl:left-[30rem]'
          src={plusFigure.src}
          alt='Plus Figure'
        />

        <Image
          className='clients__figure clients__figure-star lg:right-[15rem] 2xl:w-[15rem] 2xl:right-[30rem]'
          src={starFigure}
          alt='Star Figure'
        />

        <motion.img
          initial={{ translateY: 100 }}
          animate={{ translateY: -10 }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: 'easeInOut',
            repeatType: 'mirror',
          }}
          className='clients__figure clients__figure-circle top-[29rem] -left-5 md:-left-8 lg:w-[7rem] lg:-left-10 2xl:w-[11rem] 2xl:-left-[5rem]'
          src={circleFigure.src}
          alt='Circle Figure'
        />

        <motion.img
          initial={{ translateY: -50 }}
          animate={{ translateY: 50 }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: 'easeInOut',
            repeatType: 'mirror',
          }}
          className='clients__figure clients__figure-roll sm:top-[20rem] md:w-[7rem] 2xl:w-[11rem] 2xl:top-[30rem]'
          src={rollFigure.src}
          alt='Roll Figure'
        />

        <motion.img
          initial={{ translateX: 0 }}
          animate={{ rotate: 360, translateX: 100 }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: 'linear',
            repeatType: 'mirror',
          }}
          className='clients__figure w-[7rem] md:w-[11rem] bottom-0 left-10 lg:left-[20rem] 2xl:w-[15rem] 2xl:left-[35rem]'
          src={lineFigure.src}
          alt='Line Figure'
        />

        <motion.img
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
          className='clients__figure clients__figure-plus2 bottom-20 sm:right-36 md:w-[7rem] md:right-[15rem] lg:w-[9rem] lg:right-[25rem] 2xl:w-[12rem] 2xl:bottom-[10rem] 2xl:right-[50rem]'
          src={plusSmallFigure.src}
          alt='Plus2 Figure'
        />

        <div className='w-[70vw] h-[80vh] flex flex-col justify-center items-center'>
          <Image src={access} alt='Access Image' />

          <p className='text-center sm:w-[50vh] md:w-[60vh] 2xl:w-[40vh]'>
            Te enviaremos un <b>acceso único</b> a este número por whatsapp
          </p>

          <form className='flex flex-col mt-10 gap-5 text-center'>
            <p className='text-2xl'>Ingresa tu número</p>
            <InputPhone input={inputPhone} setInput={setInputPhone} />
          </form>

          <Link className='button button-page mt-10 2xl:mt-20' href='/coupons'>
            Enviar
          </Link>
        </div>
      </div>
    </>
  );
};
