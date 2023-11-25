'use client';

import { business, dashboard, marketing, qr, sales, store, whatsApp } from '@/app/(landingResources)/assets/images';
import { FadeIn } from '@/components';
import Image from 'next/image';
import { isMobileOnly } from 'react-device-detect';
import { InfoCard } from './InfoCard';

const Info = () => {
  return (
    <>
      <div className='info contain'>
        <div className='info__text'>
          <FadeIn as={'h2'} delay={300} origin={'bottom'}>
            Escanea, ahorra, disfruta!
          </FadeIn>
          <FadeIn as='p' delay={500} origin={'bottom'}>
            Impulsando lealtad, generando ahorro. Incentiva a tus clientes a volver a tu negocio, beneficiándolos con cupones de
            descuentos para premiar su fidelidad e incentivar las recompras!
          </FadeIn>
        </div>

        <div className='info__grid'>
          <div className='info__grid-col'>
            <FadeIn as='div' delay={500} origin={'left'}>
              <InfoCard
                img={business}
                title={'Controla tu negocio'}
                text={'Ofrecemos reportes en tiempo real de todas tus ventas.'}
              />
            </FadeIn>

            <FadeIn as='div' delay={500} origin={isMobileOnly ? 'right' : 'left'}>
              <InfoCard
                img={marketing}
                title={'Marketing y Publicidad'}
                text={`Puedes medir el éxito de tus campañas publicitarias mediante el
              control de las compras por QR.`}
              />
            </FadeIn>

            <FadeIn as='div' delay={500} origin={'left'}>
              <InfoCard
                img={store}
                title={'Tu negocio crece'}
                text={` Potenciamos la retención de clientes para que vuelvan una y otra
              vez, ¡haciendo crecer tu negocio!`}
              />
            </FadeIn>
          </div>

          <Image className='info__grid-img' src={dashboard} alt='dashboard' />

          <div className='info__grid-col'>
            <FadeIn as='div' delay={500} origin={'right'}>
              <InfoCard
                img={qr}
                title={'Cupones digitales'}
                text={`Fomentamos la recompra de tus clientes mediante cupones
              generados en tiempo real.`}
              />
            </FadeIn>

            <FadeIn as='div' delay={500} origin={isMobileOnly ? 'left' : 'right'}>
              <InfoCard
                img={whatsApp}
                title={'Envíos sin límites'}
                text={`Los clientes recibirán los cupones QR en sus dispositivos
              móviles mediante WhatsApp.`}
              />
            </FadeIn>

            <FadeIn as='div' delay={500} origin={'right'}>
              <InfoCard
                img={sales}
                title={'Impulsa tus ventas'}
                text={`El objetivo es aumentar la recompra de los clientes y generar
              mayores ventas`}
              />
            </FadeIn>
          </div>
        </div>
      </div>
    </>
  );
};
export default Info;
