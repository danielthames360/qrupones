'use client';

import Image from 'next/image';
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
            <p className='footer__container-copyright'>Copyright © {new Date().getFullYear()} - All rights reserved</p>
          </div>
        </div>
      </footer>
    </>
  );
};
