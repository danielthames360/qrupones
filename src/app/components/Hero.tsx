'use client';

import { logoHeader, phoneDesk, phoneMob, phoneTablet } from '@/app/assets/images';
import { FadeIn } from '@/components';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { startWhatsAppChat } from '../utils/generateWhatsappMessage';

export const Hero = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  return (
    <>
      <div className='hero'>
        <div className='header contain'>
          <a href='/'>
            <Image src={logoHeader} className='header__img' alt='QRupones logo' priority />
          </a>
          <button
            className='header__button'
            onClick={() => {
              setIsMenuVisible(!isMenuVisible);
            }}
            onMouseEnter={() => {
              setIsMenuVisible(true);
            }}>
            Ingresar
          </button>
          <div
            className={`header__menu ${isMenuVisible ? 'is-visible' : ''}`}
            onMouseLeave={() => {
              setIsMenuVisible(false);
            }}>
            <button>Ver mis Qrupones</button>
            <button>Ingresar al sistema</button>
          </div>
        </div>

        <div className='hero__content content contain'>
          <div className='content__info'>
            <FadeIn as='h1' duration={3000} className='content__info-title'>
              Potencia la reCompra y fidelización de tus clientes
            </FadeIn>

            <FadeIn as='p' duration={3000} delay={300} className='content__info-slogan'>
              Tu negocio crece, tus clientes ahorran.
            </FadeIn>

            <button className='content__info-btn' onClick={startWhatsAppChat}>
              Empezar
            </button>
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
