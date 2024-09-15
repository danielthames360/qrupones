'use client';
import { logout } from '@/app/(landingResources)/assets/images';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  return (
    <>
      <div className='navigation'>
        <label onClick={() => setMenuOpen(!menuOpen)} className={`navigation__button ${menuOpen ? 'toggle' : ''}`}>
          <span className='navigation__icon navigation__icon-1'></span>
          <span className='navigation__icon navigation__icon-2'></span>
          <span className='navigation__icon navigation__icon-3'></span>
        </label>
        <div className={`navigation__background ${menuOpen ? ' background-open' : ''}`}>&nbsp;</div>
        <nav className={`navigation__nav ${menuOpen ? 'nav-open' : ''}`}>
          <ul className='navigation__list'>
            <li className='navigation__item'>
              <Link className='navigation__link' href='/' onClick={() => setMenuOpen(false)}>
                Inicio
              </Link>
            </li>
            <li className='navigation__item'>
              <Link className='navigation__link' href='/coupons' onClick={() => setMenuOpen(false)}>
                Mis Qrupones
              </Link>
            </li>
            <li className='navigation__item'>
              <Link className='navigation__link' href='/history' onClick={() => setMenuOpen(false)}>
                historial
              </Link>
            </li>
          </ul>
          <button
            className='cursor-pointer bg-transparent font-montserrat  hover:scale-105 flex gap-3 items-center'
            onClick={() => signOut()}>
            <Image src={logout} alt='logout' width={25} height={25} />
            Cerrar sesión
          </button>
        </nav>
      </div>
    </>
  );
};
