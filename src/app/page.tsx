import dynamic from 'next/dynamic';
import { Clients, Footer, Hero, Questions } from './components';
const Info = dynamic(() => import('./components/Info'), { ssr: false });

export default function Home() {
  return (
    <>
      <Hero />
      <Info />
      <Clients />
      <Questions />
      <Footer />
    </>
  );
}
