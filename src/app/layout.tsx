import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './styles/style.scss';

const inter = Montserrat({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'QRupones - Potencia la ReCompra y Fidelización de Clientes',
  description:
    'Escanea, ahorra, disfruta. Impulsando lealtad, generando ahorro. Incentiva a tus clientes a volver a tu negocio, beneficiándolos con cupones de descuentos para premiar su fidelidad e incentivar las recompras!',
  keywords: [
    'Qrupones',
    'Recompra',
    'Fidelización',
    'Cupones de descuento',
    'Ofertas y promociones',
    'Programas de fidelización',
    'Cupones digitales',
    'Descuentos para clientes',
    'Incentivos de recompra',
    'Promociones para negocios',
    'Ahorro y ofertas',
    'Programas de lealtad',
    'Cupones para tiendas',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://qrupones.com',
    siteName: 'Qrupones',
    images: [
      {
        url: 'https://qrupones.com/_next/static/media/phone-tablet.7716fae3.png',
        width: 962,
        height: 256,
        alt: 'Qrupones',
        href: 'qrupones.com',
      },
      {
        url: 'https://qrupones.com/_next/static/media/phone-tablet.7716fae3.png',
        width: 962,
        height: 256,
        alt: 'Qrupones',
        href: 'https://qrupones.com',
      },
      {
        url: 'https://qrupones.com/_next/static/media/phone-tablet.7716fae3.png',
        width: 962,
        height: 256,
        alt: 'Qrupones',
        href: 'https://qrupones.com/',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QRupones - Potencia la ReCompra y Fidelización de Clientes',
    description:
      'Escanea, ahorra, disfruta. Impulsando lealtad, generando ahorro. Incentiva a tus clientes a volver a tu negocio, beneficiándolos con cupones de descuentos para premiar su fidelidad e incentivar las recompras!',
    creator: '@danielthames',
    images: ['https://qrupones.com/_next/static/media/phone-tablet.7716fae3.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
