'use client';

import { FadeIn } from '@/components';
import Image from 'next/image';
import { wave } from '../assets/images';
import { Collapse } from './Collapse';
export const Questions = () => {
  return (
    <>
      <div className='questions'>
        <Image className='questions__wave' src={wave} alt='wave' />
        <div className='questions__container contain'>
          <div className='questions__text'>
            <FadeIn as={'h2'} delay={300} origin={'bottom'}>
              Preguntas Frecuentes
            </FadeIn>

            <FadeIn as='p' delay={500} origin={'bottom'}>
              Si tienes dudas acerca de si Qrupones es la opción adecuada para ti, no te preocupes. Estamos a tu disposición para
              proporcionarte toda la información que necesites y responder a todas tus preguntas.
            </FadeIn>
          </div>

          <div className='questions__list'>
            <FadeIn as='div' delay={600} origin={'bottom'}>
              <Collapse title={'¿Por qué usar QRupones?'}>
                <p>
                  QRupones crea una fidelización a largo plazo con tu negocio y tus clientes. Se convierte en una herramienta
                  eficaz para que las empresas aumenten la base de sus clientes, impulsen las ventas y generen lealtad.
                </p>
              </Collapse>
            </FadeIn>

            <FadeIn as='div' delay={600} origin={'bottom'}>
              <Collapse title={'¿Cómo se beneficia mi negocio con QRupones?'}>
                <p>
                  <b>✅Base de datos</b>: al preguntar solamente el nombre y número de celular de tu cliente, QRupones crea una
                  base de datos de tu negocio ayudando a comprender a tus consumidores, reduciendo el costo de mercadeo,
                  comunicaciones y desarrollando una ventaja competitiva para personalizar la experiencia que brindas a tus
                  clientes.
                  <br />
                  <b>✅Creación de campañas específicas:</b> Logrando segmentar tu público en función de sus intereses, historial
                  de compras u otros factores relevantes, puedes adaptar tus campañas de QRupones a grupos de clientes
                  específicos.
                  <br />
                  <b>✅Toma de decisiones:</b> Al momento de tomar desiciones, los datos recoletados de Qrupones ayudan a que tu
                  negocio este informado sobre dónde asignar su presupuesto, el historial de compras y qué recursos de marketing
                  necesitan para crear campañas exitosas.
                  <br />
                  <b>✅Aumentar las ventas:</b> los QRupones están diseñados para impulsar las ventas creando una sensación de
                  urgencia y animando a los clientes a realizar una compra debido a que es automatizado, personalizado y el envió
                  es vía whatsapp.
                  <br />
                  <b>✅Limpiar el inventario:</b> si tienes un exceso de inventario o productos que no se venden tan bien como
                  esperabas, QRupones ayuda a incentivar a los clientes a comprarlos, lo que le permite liberar espacio para
                  nuevos productos y minimizar las pérdidas.
                </p>
              </Collapse>
            </FadeIn>

            <FadeIn as='div' delay={600} origin={'bottom'}>
              <Collapse title={'¿Como puedo supervisar mi negocio con QRupones?'}>
                <p>
                  Tu negocio está bajo control con QRupones. Contamos con un Dashboard en tiempo real donde logras ver tus ventas
                  y recompras con Qrupones, supervisar la eficiencia de tus sucursales y conocer otros indicadores que te ayudarán
                  a tomar mejores decisiones.
                </p>
              </Collapse>
            </FadeIn>

            <FadeIn as='div' delay={600} origin={'bottom'}>
              <Collapse title={'¿Qué pasa si ya tengo un sistema de ventas?'}>
                <p>
                  QRupones te permite realizar la integración de manera fácil y rápida para que tu sistema actual sea compatible
                  con el nuevo sistema de ventas QRupones. Es decir, tú vendes y QRupones registra todo automáticamente.
                </p>
              </Collapse>
            </FadeIn>

            <FadeIn as='div' delay={600} origin={'bottom'}>
              <Collapse title={'¿QRupones ofrece ayuda para mi personal?'}>
                <p>
                  ¡Sí! QRupones tiene un equipo designado para hacer capacitaciones gratuitas a tu personal de ventas. Podemos
                  programar una visita en el horario que más te convenga para enseñar y quitar dudas del manejo de QRupones.
                </p>
              </Collapse>
            </FadeIn>
          </div>
        </div>
      </div>
    </>
  );
};
