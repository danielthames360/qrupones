'use client';

import { bg, chevronUp, logoHeader, phoneDesk, phoneMob, phoneTablet } from '@/app/(landingResources)/assets/images';
import { FadeIn } from '@/components';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { startWhatsAppChat } from '../utils/generateWhatsappMessage';

export const Hero = () => {
  return (
    <>
      <div className='hero'>
        <Image
          alt='Background Image'
          src={bg}
          quality={100}
          style={{ objectFit: 'cover', objectPosition: 'right' }}
          fill
          priority
        />
        <div className='header contain'>
          <a href='/'>
            <Image src={logoHeader} className='header__img' alt='QRupones logo' />
          </a>
          <div className='header__buttons'>
            <FadeIn as={'div'} origin='right' hoverScale={1.15} className='text-center'>
              <Link className='header__link' href='/customers' prefetch={false}>
                Ver mis Qrupones
              </Link>
            </FadeIn>

            <a href='https://app.qrupones.com/' rel='noreferrer' className='header__button button'>
              Iniciar sesión
            </a>
          </div>
        </div>

        <div className='hero__content content contain'>
          <div className='content__info'>
            <FadeIn as='h1' duration={3000} delay={400} className='content__info-title'>
              Potencia la reCompra y fidelización de tus clientes
            </FadeIn>

            <FadeIn as='p' duration={3000} delay={900} className='content__info-slogan'>
              Tu negocio crece, tus clientes ahorran.
            </FadeIn>

            <FadeIn as={'div'} duration={3000} delay={1400} className='w-full lg:text-left'>
              <button className='content__info-btn' onClick={startWhatsAppChat}>
                Quiero empezar
              </button>
            </FadeIn>

            <FadeIn as={'div'} duration={3000} delay={1400} className='flex justify-center items-center gap-1 sm:hidden'>
              <a href='https://app.qrupones.com/' rel='noreferrer' target='_blank' className='content__info-cta button'>
                Iniciar sesión
              </a>
              <Image src={chevronUp} alt='icon' width={14} height={14} className='pt-1 w-5 h-5' />
            </FadeIn>
          </div>

          <picture>
            <source
              media='(min-width: 1024px)'
              srcSet={phoneDesk.src}
              width={phoneDesk.width}
              height={phoneDesk.height}
              type='image/webp'
            />
            <source
              media='(min-width: 768px)'
              srcSet={phoneTablet.src}
              width={phoneTablet.width}
              height={phoneTablet.height}
              type='image/webp'
            />
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
              width={phoneMob.width}
              height={phoneMob.height}
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
