'use client';

import { chevronUp, logoHeader, phoneDesk, phoneMob, phoneTablet } from '@/app/(landingResources)/assets/images';
import { FadeIn } from '@/components';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { startWhatsAppChat } from '../utils/generateWhatsappMessage';

export const Hero = () => {
  return (
    <>
      <div className='hero'>
        <div className='header contain'>
          <a href='/'>
            <Image src={logoHeader} className='header__img' alt='QRupones logo' priority />
          </a>
          <div className='header__buttons'>
            <FadeIn as={'div'} origin='right' delay={1300} hoverScale={1.15} className='text-center'>
              <Link className='header__link' href='/customers'>
                Ver mis Qrupones
              </Link>
            </FadeIn>

            <a href='https://app.qrupones.com/' target='_blank' rel='noreferrer' className='header__button button'>
              Iniciar sesión
            </a>
          </div>
        </div>

        <div className='hero__content content contain'>
          <div className='content__info'>
            <FadeIn as='h1' duration={3000} className='content__info-title'>
              Potencia la reCompra y fidelización de tus clientes
            </FadeIn>

            <FadeIn as='p' duration={3000} delay={400} className='content__info-slogan'>
              Tu negocio crece, tus clientes ahorran.
            </FadeIn>

            <FadeIn as={'div'} duration={3000} delay={800} className='w-full lg:text-left'>
              <button className='content__info-btn' onClick={startWhatsAppChat}>
                Empezar
              </button>
            </FadeIn>

            <FadeIn as={'div'} duration={3000} delay={800} className='flex justify-center items-center gap-1 sm:hidden'>
              <a href='https://app.qrupones.com/' rel='noreferrer' target='_blank' className='content__info-cta button'>
                Iniciar sesión
              </a>
              <Image src={chevronUp} alt='icon' width={14} height={14} className='pt-1 w-5 h-5' />
            </FadeIn>
          </div>

          <picture>
            <source media='(min-width: 1024px)' srcSet={phoneDesk.src} type='image/webp' />
            <source media='(min-width: 768px)' srcSet={phoneTablet.src} type='image/webp' />
            <source srcSet={phoneMob.src} type='image/webp' />
            <motion.img
              initial={{ translateY: -25 }}
              animate={{ translateY: 10 }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: 'easeInOut',
                repeatType: 'mirror',
              }}
              className='content__img'
              alt='Iphone'
              loading='eager'
            />
          </picture>
        </div>
      </div>
    </>
  );
};
