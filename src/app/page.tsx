import { Hero } from './(landingResources)/components/Hero';
import Info from './(landingResources)/components/Info';
import { Clients } from './(landingResources)/components/Clients';
import { Questions } from './(landingResources)/components/Questions';
import { Footer } from './(landingResources)/components/Footer';

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
