'use client';
import { logout } from '@/app/(landingResources)/assets/images';
import { endpoints } from '@/constants/endpoints';
import { ApiResponseInterface } from '@/interfaces';
import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const backendKey = process.env.NEXT_PUBLIC_QRUPONES_NOTIFICATION_API_KEY;

export const Navbar = () => {
  const { data: session } = useSession();

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleLogout = async () => {
    if (session) {
      try {
        const { data } = await axios.delete<ApiResponseInterface>(`${endpoints.auth.logout}${session!.user.name}`, {
          headers: {
            Authorization: `Bearer ${backendKey}`,
          },
        });

        await signOut();
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    } else {
      // Si no hay sesión, simplemente llama a signOut
      await signOut();
    }
  };

  if (!session) {
    return null;
  }

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
            onClick={handleLogout}>
            <Image src={logout} alt='logout' width={25} height={25} />
            Cerrar sesión
          </button>
        </nav>
      </div>
    </>
  );
};
