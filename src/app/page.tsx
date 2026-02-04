import dynamic from 'next/dynamic';
import { Hero } from './(landingResources)/components/Hero';
import { Clients } from './(landingResources)/components/Clients';
import { Questions } from './(landingResources)/components/Questions';
import { Footer } from './(landingResources)/components/Footer';

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
