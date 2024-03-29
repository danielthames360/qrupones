import { bg, chevronUp, facebookIcon, instagramIcon } from '@/app/(landingResources)/assets/images';
import { FadeIn } from '@/components';
import Image from 'next/image';
import Link from 'next/link';
import { Wave } from './Wave';
import { building } from './assets/images';
const page = () => {
  return (
    <>
      <div className='hero'>
        <Image
          alt='Background Image'
          src={bg}
          placeholder='blur'
          quality={100}
          objectFit='cover'
          objectPosition='right'
          fill
          priority
          style={{ zIndex: -1 }}
        />
        <FadeIn
          as={'div'}
          origin='right'
          delay={1000}
          className='flex justify-end items-end w-10/12 md:w-8/12 m-auto mt-32 gap-1 '>
          <Image src={chevronUp} alt='icon' width={14} height={14} className='pt-[.45rem] w-5 rotate-180 h-auto' />

          <Link className='button font-bold text-slate-300' href='/'>
            Volver
          </Link>
        </FadeIn>

        <div className='contain mt-32 md:mt-12 flex justify-center items-center flex-col text-center'>
          <Wave />

          <FadeIn as={'div'} className='w-full h-auto mb-16 z-20' delay={400}>
            <Image className='w-full h-auto m-auto sm:w-5/12' src={building} alt='building' />
          </FadeIn>
          <FadeIn as='h1' duration={3000} delay={500} className='text-7xl text-center md:w-10/12  z-20'>
            Esta página está en construcción
          </FadeIn>
          <FadeIn
            as='p'
            duration={3000}
            delay={1000}
            className='text-center mt-3 w-10/12 md:w-6/12 font-bold mx-auto  text-slate-300  z-20'>
            Mantente conectado a nuestras redes sociales para recibir actualizaciones.
          </FadeIn>

          <FadeIn as='div' duration={3000} delay={1500} className='text-center mt-3 w-10/12 md:w-6/12 font-bold mx-auto'>
            <a href='https://www.facebook.com/qrupones' target='_blank' rel='noreferrer'>
              <Image
                className='footer__container-icon'
                style={{ filter: 'hue-rotate(60deg) brightness(500%)' }}
                src={facebookIcon}
                alt='facebook'
              />
            </a>
            <a href='https://www.instagram.com/qrupones' target='_blank' rel='noreferrer'>
              <Image
                className='footer__container-icon'
                src={instagramIcon}
                style={{ filter: 'hue-rotate(60deg) brightness(500%)' }}
                alt='instagram'
              />
            </a>
          </FadeIn>
        </div>
      </div>
    </>
  );
};

export default page;
