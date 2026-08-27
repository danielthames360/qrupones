'use client';

import Image from 'next/image';
import { EmpresaCategoria } from '@/interfaces';
import { noLogo } from '@/app/(landingResources)/assets/images';

interface BusinessHeaderProps {
  nombre: string;
  logoUrl: string;
  categoria: EmpresaCategoria;
}

/**
 * Logo + nombre del negocio + chip de categoria.
 * Compartido por CouponCard y StampCard: cada uno lo envuelve con su propio
 * contenedor (padding/margin distintos), este componente solo aporta el
 * bloque interno para que ambos rendericen exactamente lo mismo.
 */
export const BusinessHeader = ({ nombre, logoUrl, categoria }: BusinessHeaderProps) => {
  return (
    <>
      {/* Logo */}
      <div className="flex-shrink-0 w-[72px] h-[72px] rounded-[12px] bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={nombre}
            width={72}
            height={72}
            className="w-full h-full object-contain p-[8px]"
          />
        ) : (
          <Image
            src={noLogo}
            alt="Sin logo"
            width={48}
            height={48}
            className="w-[48px] h-[48px] opacity-40"
          />
        )}
      </div>

      {/* Business info */}
      <div className="flex-1 min-w-0">
        <h3
          className="font-semibold text-[#002239] truncate mb-[4px]"
          style={{ fontSize: '18px', textAlign: 'left' }}
        >
          {nombre}
        </h3>
        <span
          className={`inline-flex items-center px-[10px] py-[3px] rounded-full ${
            categoria === 'Gastronomia'
              ? 'bg-orange-50 text-orange-600'
              : categoria === 'Eventos'
              ? 'bg-purple-50 text-purple-600'
              : 'bg-blue-50 text-blue-600'
          }`}
          style={{ fontSize: '12px', fontWeight: 500 }}
        >
          {categoria === 'Gastronomia' ? '🍽️' : categoria === 'Eventos' ? '🎟️' : '🛍️'} {categoria}
        </span>
      </div>
    </>
  );
};
