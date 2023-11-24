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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
