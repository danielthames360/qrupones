'use client';

import { endpoints } from '@/constants/endpoints';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { logoDarkHeader } from '@/app/(landingResources)/assets/images';

export const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    if (session?.user?.code) {
      try {
        await fetch(`${endpoints.auth.logout}${session.user.code}`, {
          method: 'DELETE',
          credentials: 'include',
        });
      } catch {
        // Silent fail - logout will proceed anyway
      }
    }
    await signOut({ callbackUrl: '/' });
  };

  if (!session) {
    return null;
  }

  const navLinks = [
    { href: '/coupons', label: 'Mis QRupones', icon: TicketIcon },
    { href: '/history', label: 'Historial', icon: ClockIcon },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm"
        style={{ fontSize: '16px' }}
      >
        <div className="w-full max-w-[1200px] mx-auto px-[24px] py-[12px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-[8px]">
            <Image
              src={logoDarkHeader}
              alt="QRupones"
              width={140}
              height={40}
              className="h-[36px] w-auto"
            />
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-[8px]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-[8px] px-[16px] py-[10px] rounded-full transition-all duration-200 ${
                  isActive(link.href)
                    ? 'bg-gradient-to-r from-[#a780b7] to-[#64cad8] text-white shadow-md'
                    : 'text-[#002239] hover:bg-gray-100'
                }`}
                style={{ fontSize: '15px', fontWeight: 500 }}
              >
                <link.icon className="w-[18px] h-[18px]" />
                {link.label}
              </Link>
            ))}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-[8px] px-[16px] py-[10px] rounded-full text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all duration-200 ml-[8px]"
              style={{ fontSize: '15px', fontWeight: 500 }}
            >
              <LogoutIcon className="w-[18px] h-[18px]" />
              Salir
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm" style={{ fontSize: '16px' }}>
        <div className="px-[16px] py-[12px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={logoDarkHeader}
              alt="QRupones"
              width={120}
              height={35}
              className="h-[32px] w-auto"
            />
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative w-[44px] h-[44px] flex items-center justify-center rounded-full bg-gradient-to-r from-[#a780b7] to-[#64cad8] shadow-lg"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col justify-center items-center gap-[5px]">
              <span
                className={`block w-[20px] h-[2px] bg-white rounded-full transition-all duration-300 ${
                  menuOpen ? 'rotate-45 translate-y-[7px]' : ''
                }`}
              />
              <span
                className={`block w-[20px] h-[2px] bg-white rounded-full transition-all duration-300 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-[20px] h-[2px] bg-white rounded-full transition-all duration-300 ${
                  menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          menuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-[68px] right-[16px] w-[calc(100%-32px)] max-w-[320px] bg-white rounded-[20px] shadow-2xl transition-all duration-300 overflow-hidden ${
            menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-[20px]'
          }`}
          style={{ fontSize: '16px' }}
        >
          <div className="p-[16px] space-y-[8px]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-[12px] px-[16px] py-[14px] rounded-[12px] transition-all duration-200 ${
                  isActive(link.href)
                    ? 'bg-gradient-to-r from-[#a780b7] to-[#64cad8] text-white'
                    : 'text-[#002239] hover:bg-gray-50'
                }`}
                style={{ fontSize: '16px', fontWeight: 500 }}
              >
                <link.icon className="w-[22px] h-[22px]" />
                {link.label}
              </Link>
            ))}

            <div className="border-t border-gray-100 my-[8px]" />

            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className="w-full flex items-center gap-[12px] px-[16px] py-[14px] rounded-[12px] text-red-500 hover:bg-red-50 transition-all duration-200"
              style={{ fontSize: '16px', fontWeight: 500 }}
            >
              <LogoutIcon className="w-[22px] h-[22px]" />
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-[68px] md:h-[60px]" />
    </>
  );
};

// Icons
const TicketIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    <path d="M13 5v2" />
    <path d="M13 17v2" />
    <path d="M13 11v2" />
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const LogoutIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);
