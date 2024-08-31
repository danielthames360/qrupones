'use client';

import { FadeIn } from '@/components';
import { acaiLabLogo, bretoLogo, empacarLogo, fergusLogo, raphaellaLogo, rosarioLogo, sergiosLogo } from '../assets/images';
import { CouponCard } from './CouponCard';

export const Coupons = () => {
  return (
    <>
      <div className='h-[calc(100dvh)] max-h-[-webkit-fill-available] overflow-y-hidden w-11/12 lg:w-10/12 2xl:w-4/6 mx-auto relative'>
        <div className='h-[15%] flex flex-col gap-5 md:h-[20%] justify-center items-center '>
          <FadeIn as={'h2'} delay={300} origin={'bottom'}>
            Mis Cupones
          </FadeIn>
          <FadeIn as={'div'} delay={500} origin={'bottom'} className='flex gap-2'>
            <p className='category'>
              <span className='category-select'>Todos</span>
            </p>
            <p className='category'>
              | <span>Comida</span>
            </p>
            <p className='category'>
              | <span>Tiendas</span>
            </p>
          </FadeIn>
        </div>

        <div className='max-h-[70%] md:max-h-[60%] flex flex-col items-center gap-10 overflow-y-auto overflow-x-hidden scroll pr-5 pb-8 md:flex-row md:justify-center md:flex-wrap'>
          <FadeIn as='div' delay={500} origin={'left'} className='md:w-[48%]'>
            <CouponCard
              img={bretoLogo}
              name={'Breto'}
              description={'Raphaella Booz BLACK FRIDAY HASTA 70% - 40% en el sector 20% y 30% y 55% en el sector 50%'}
              date='Valido hasta el 31 de Octubre 2024'
              button='Mostrar QR'
            />
          </FadeIn>

          <FadeIn as='div' delay={500} origin={'left'} className='md:w-[48%]'>
            <CouponCard
              img={fergusLogo}
              name={'Fergus'}
              description={'Raphaella Booz BLACK FRIDAY HASTA 70% - 40% en el sector 20% y 30% y 55% en el sector 50%'}
              date='Valido hasta el 31 de Octubre 2024'
              button='Mostrar QR'
            />
          </FadeIn>

          <FadeIn as='div' delay={500} origin={'left'} className='md:w-[48%]'>
            <CouponCard
              img={rosarioLogo}
              name={'Rosario'}
              description={'Raphaella Booz BLACK FRIDAY HASTA 70% - 40% en el sector 20% y 30% y 55% en el sector 50%'}
              date='Valido hasta el 31 de Octubre 2024'
              button='Mostrar QR'
            />
          </FadeIn>

          <FadeIn as='div' delay={500} origin={'left'} className='md:w-[48%]'>
            <CouponCard
              img={raphaellaLogo}
              name={'RaphaellaBooz'}
              description={'Raphaella Booz BLACK FRIDAY HASTA 70% - 40% en el sector 20% y 30% y 55% en el sector 50%'}
              date='Valido hasta el 31 de Octubre 2024'
              button='Mostrar QR'
            />
          </FadeIn>

          <FadeIn as='div' delay={500} origin={'left'} className='md:w-[48%]'>
            <CouponCard
              img={acaiLabLogo}
              name={'AcaiLab'}
              description={'Raphaella Booz BLACK FRIDAY HASTA 70% - 40% en el sector 20% y 30% y 55% en el sector 50%'}
              date='Valido hasta el 31 de Octubre 2024'
              button='Mostrar QR'
            />
          </FadeIn>

          <FadeIn as='div' delay={500} origin={'left'} className='md:w-[48%]'>
            <CouponCard
              img={sergiosLogo}
              name={'Sergios'}
              description={'Raphaella Booz BLACK FRIDAY HASTA 70% - 40% en el sector 20% y 30% y 55% en el sector 50%'}
              date='Valido hasta el 31 de Octubre 2024'
              button='Mostrar QR'
            />
          </FadeIn>

          <FadeIn as='div' delay={500} origin={'left'} className='md:w-[48%]'>
            <CouponCard
              img={empacarLogo}
              name={'Empacar'}
              description={'Raphaella Booz BLACK FRIDAY HASTA 70% - 40% en el sector 20% y 30% y 55% en el sector 50%'}
              date='Valido hasta el 31 de Octubre 2024'
              button='Mostrar QR'
            />
          </FadeIn>
        </div>

        <div className='h-[15%] md:h-[20%] flex flex-col justify-center items-center text-center z-10 overflow-hidden'>
          <button className='button bg-gradient-to-r from-[#616161] to-[#272727] py-4 px-20 rounded-xl button-coupons'>
            Historial de canjes
          </button>
        </div>
      </div>
    </>
  );
};
