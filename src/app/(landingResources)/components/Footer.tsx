'use client';

import Image from 'next/image';
import Link from 'next/link';
import { facebookIcon, instagramIcon, logoFooter, waveBlack } from '../assets/images';
import { startWhatsAppChat } from '../utils/generateWhatsappMessage';

export const Footer = () => {
  return (
    <>
      <footer className='footer'>
        <Image className='footer__wave' src={waveBlack} alt='wave' />
        <div className='footer__container contain'>
          <Image className='footer__container-logo' src={logoFooter} alt='logo' />

          <button className='footer__container-btn button' onClick={startWhatsAppChat}>
            Contáctanos
          </button>

          <div>
            <a href='https://www.facebook.com/qrupones' target='_blank' rel='noreferrer'>
              <Image className='footer__container-icon' src={facebookIcon} alt='facebook' />
            </a>
            <a href='https://www.instagram.com/qrupones' target='_blank' rel='noreferrer'>
              <Image className='footer__container-icon' src={instagramIcon} alt='instagram' />
            </a>
            <p className='footer__container-copyright mb-2'>Copyright © {new Date().getFullYear()} - All rights reserved</p>
            <Link className='mb-10 block text-3xl text-inherit ' href={'/privacy'}>
              <span className='border-b-slate-200 border-b-2'> Privacy Policy </span>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};
