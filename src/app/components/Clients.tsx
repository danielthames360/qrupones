'use client';

import {
  acaiLabLogo,
  bretoLogo,
  circleFigure,
  empacarLogo,
  fergusLogo,
  lineFigure,
  plusFigure,
  plusSmallFigure,
  raphaellaLogo,
  rollFigure,
  sergiosLogo,
  starFigure,
} from '@/app/assets/images';
import { FadeIn } from '@/components';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const Clients = () => {
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

          <div className='clients__grid'>
            <div className='clients__grid-box'>
              <FadeIn duration={500} delay={100} as='img' src={bretoLogo} alt='Breto Logo' />
            </div>

            <div className='clients__grid-box'>
              <FadeIn duration={500} delay={100} as='img' src={fergusLogo} alt='Fergus Logo' />
            </div>

            <div className='clients__grid-box'>
              <FadeIn duration={500} delay={100} as='img' src={sergiosLogo} alt='Sergios Logo' />
            </div>

            <div className='clients__grid-box'>
              <FadeIn duration={500} delay={100} as='img' src={empacarLogo} alt='Empacar Express Logo' />
            </div>

            <div className='clients__grid-box'>
              <FadeIn duration={500} delay={100} as='img' src={raphaellaLogo} alt='Raphaella Booz Logo' />
            </div>

            <div className='clients__grid-box'>
              <FadeIn duration={500} delay={100} as='img' src={acaiLabLogo} alt='Acai Lab Logo' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
