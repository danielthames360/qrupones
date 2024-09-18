'use client';

import {
  acaiLabLogo,
  boliviaFitnessLogo,
  bretoLogo,
  circleFigure,
  complementoLogo,
  fergusLogo,
  lineFigure,
  plusFigure,
  plusSmallFigure,
  raphaellaLogo,
  rollFigure,
  rosarioLogo,
  sergiosLogo,
  starFigure,
} from '@/app/(landingResources)/assets/images';
import { FadeIn } from '@/components';
import { motion } from 'framer-motion';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import { Autoplay, Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export const Clients = () => {
  const logos = [
    { src: rosarioLogo, alt: 'Rosario Logo' },
    { src: raphaellaLogo, alt: 'Raphaella Booz Logo' },
    { src: fergusLogo, alt: 'Fergus Logo' },
    { src: sergiosLogo, alt: 'Sergios Logo' },
    { src: bretoLogo, alt: 'Breto Logo' },
    { src: acaiLabLogo, alt: 'Acai Lab Logo' },
    { src: boliviaFitnessLogo, alt: 'Bolivia Fitness Logo' },
    { src: complementoLogo, alt: 'Complemento Logo' },
  ];

  const slideSize = 6; // Cantidad de imágenes por slide

  const slideLogos = [];
  for (let i = 0; i < logos.length; i += slideSize) {
    slideLogos.push(logos.slice(i, i + slideSize));
  }

  return (
    <>
      <div className='clients'>
        <motion.img
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
          className='clients__figure clients__figure-plus'
          src={plusFigure.src}
          alt='Plus Figure'
        />

        <Image className='clients__figure clients__figure-star' src={starFigure} alt='Star Figure' />

        <motion.img
          initial={{ translateY: -50 }}
          animate={{ translateY: 50 }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: 'easeInOut',
            repeatType: 'mirror',
          }}
          className='clients__figure clients__figure-roll'
          src={rollFigure.src}
          alt='Roll Figure'
        />

        <motion.img
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
          className='clients__figure clients__figure-plus2'
          src={plusSmallFigure.src}
          alt='Plus2 Figure'
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
          className='clients__figure clients__figure-line'
          src={lineFigure.src}
          alt='Line Figure'
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
          className='clients__figure clients__figure-circle'
          src={circleFigure.src}
          alt='Circle Figure'
        />

        <div className='clients__container contain'>
          <FadeIn as='h2' origin={'bottom'} className='clients__title'>
            Nuestros Clientes
          </FadeIn>

          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            autoplay
            loop
            modules={[Autoplay, Pagination, Thumbs]}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 1 },
              1024: { slidesPerView: 1 },
            }}>
            {slideLogos.map((logoSlide, index) => (
              <SwiperSlide key={index}>
                <div className='clients__grid'>
                  {logoSlide.map((logo, index) => (
                    <div key={index} className='clients__grid-box'>
                      <FadeIn duration={500} delay={100} as='img' src={logo.src} alt={logo.alt} />
                    </div>
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};
