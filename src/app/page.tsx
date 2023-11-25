import dynamic from 'next/dynamic';
import { Clients, Footer, Hero, Questions } from './(landingResources)/components';
const Info = dynamic(() => import('./(landingResources)/components/Info'), { ssr: false });

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
