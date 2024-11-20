'use client';

import { ApiResponseInterface } from '@/interfaces';
import axios from 'axios';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { access, circleFigure, lineFigure, plusFigure, plusSmallFigure, rollFigure, starFigure } from '../assets/images';
import { InputPhone } from './InputPhone';

const backendUrl = process.env.NEXT_PUBLIC_QRUPONES_NOTIFICATION_API;
const backendKey = process.env.NEXT_PUBLIC_QRUPONES_NOTIFICATION_API_KEY;

export const Customers = () => {
  const [inputPhone, setInputPhone] = useState<string>('');
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [countryCode, setCountryCode] = useState<string>('591');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [codeSent, setCodeSent] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPhone || !isValidPhone) return;

    setIsSubmitting(true);
    const phoneNumberWithoutCountryCode = inputPhone.startsWith(countryCode) ? inputPhone.slice(countryCode.length) : inputPhone;

    try {
      setTimeout(() => {
        setCodeSent(true);
      }, 2000);

      await axios.post<ApiResponseInterface>(
        `${backendUrl}/notifications`,
        {
          number: phoneNumberWithoutCountryCode,
          countryCode: countryCode,
        },
        {
          headers: {
            Authorization: `Bearer ${backendKey}`,
          },
        }
      );
    
    } catch (error: any) {
      setShowErrorMessage(true);
      console.error('Error al enviar la notificación:', error.response ? error.response.data : error.message);
    }

    setIsSubmitting(false);
  };

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

        {!codeSent ? (
          <div className='w-[70vw] h-[80vh] flex flex-col justify-center items-center'>
            <Image src={access} alt='Access Image' />

            <p className='text-center sm:w-[50vh] md:w-[60vh] 2xl:w-[40vh]'>
              Te enviaremos un <b>acceso único</b> a este número por whatsapp
            </p>

            {showErrorMessage && (
              <p className='my-5 text-2xl text-red-500 font-medium'>No se pudo encontrar el número de WhatsApp</p>
            )}

            <form className='flex flex-col mt-10 gap-5 text-center' onSubmit={handleSubmit}>
              <p className='text-2xl'>Ingresa tu número</p>
              <InputPhone
                input={inputPhone}
                setInput={setInputPhone}
                setIsValidPhone={setIsValidPhone}
                setCountryCode={setCountryCode}
              />
              <button
                type='submit'
                className={`button button-page mt-9 2xl:mt-16 ${isSubmitting && 'cursor-not-allowed'}`}
                disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </button>
            </form>
          </div>
        ) : (
          <div className='w-[70vw] h-[80vh] flex flex-col justify-center items-center'>
            <p className='text-center sm:w-[50vh] md:w-[60vh] 2xl:w-[40vh]'>
              Te enviamos un <b>acceso único</b> al <b>+{inputPhone}</b> por WhatsApp, por favor revisa tus mensajes. 📲 Si no lo recibes en un momento, vuelve a intentarlo.
            </p>
          </div>
        )}
      </div>
    </>
  );
};
