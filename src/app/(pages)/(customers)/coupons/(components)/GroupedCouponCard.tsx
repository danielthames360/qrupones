'use client';

import { CouponsInterface } from '@/interfaces';
import Image from 'next/image';
import { useState } from 'react';
import { noLogo } from '@/app/(landingResources)/assets/images';
import { MultiQrModal } from './MultiQrModal';
import { DownloadAllModal } from '@/components/ui/DownloadAllModal';

interface GroupedCouponCardProps {
  coupons: CouponsInterface[];
}

export const GroupedCouponCard = ({ coupons }: GroupedCouponCardProps) => {
  const [multiModalOpen, setMultiModalOpen] = useState(false);
  const [downloadAllOpen, setDownloadAllOpen] = useState(false);

  const first = coupons[0];
  const count = coupons.length;

  const earliestExpiration = coupons.reduce(
    (earliest, c) =>
      new Date(c.FechaExpiracion) < earliest ? new Date(c.FechaExpiracion) : earliest,
    new Date(first.FechaExpiracion)
  );

  const daysUntilExpiration = Math.ceil(
    (earliestExpiration.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  const isExpiringSoon = daysUntilExpiration <= 7;

  return (
    <>
      <div
        className="group bg-white rounded-[20px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-[2px]"
        style={{ fontSize: '16px' }}
      >
        <div
          className={`h-[3px] ${
            isExpiringSoon
              ? 'bg-gradient-to-r from-orange-400 to-red-400'
              : 'bg-gradient-to-r from-[#a780b7] to-[#64cad8]'
          }`}
        />

        <div className="p-[20px]">
          {/* Header */}
          <div className="flex items-start gap-[16px] mb-[16px]">
            <div className="flex-shrink-0 w-[72px] h-[72px] rounded-[12px] bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100">
              {first.LogoUrl ? (
                <Image
                  src={first.LogoUrl}
                  alt={first.Nombre}
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

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-[8px] mb-[4px]">
                <h3
                  className="font-semibold text-[#002239] truncate"
                  style={{ fontSize: '18px', textAlign: 'left' }}
                >
                  {first.Nombre}
                </h3>
                <span
                  className="flex-shrink-0 inline-flex items-center justify-center bg-[#a780b7]/10 text-[#a780b7] rounded-full font-semibold"
                  style={{ fontSize: '11px', padding: '2px 8px' }}
                >
                  {count} cupones
                </span>
              </div>
              <span
                className={`inline-flex items-center px-[10px] py-[3px] rounded-full ${
                  first.Categoria === 'Gastronomia'
                    ? 'bg-orange-50 text-orange-600'
                    : first.Categoria === 'Eventos'
                    ? 'bg-purple-50 text-purple-600'
                    : 'bg-blue-50 text-blue-600'
                }`}
                style={{ fontSize: '12px', fontWeight: 500 }}
              >
                {first.Categoria === 'Gastronomia' ? '🍽️' : first.Categoria === 'Eventos' ? '🎟️' : '🛍️'} {first.Categoria}
              </span>
            </div>
          </div>

          {/* Campaign message */}
          <p
            className="text-gray-600 mb-[16px] line-clamp-2"
            style={{ fontSize: '15px', lineHeight: '1.5', textAlign: 'left' }}
          >
            {first.MensajeCanje}
          </p>

          {/* Expiration — shows the nearest expiry */}
          <div
            className={`flex items-center gap-[8px] mb-[16px] px-[12px] py-[8px] rounded-[10px] ${
              isExpiringSoon ? 'bg-red-50' : 'bg-gray-50'
            }`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={isExpiringSoon ? '#ef4444' : '#6b7280'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span
              className={isExpiringSoon ? 'text-red-600' : 'text-gray-600'}
              style={{ fontSize: '13px', fontWeight: 500 }}
            >
              {isExpiringSoon
                ? `¡El más cercano expira en ${daysUntilExpiration} día${daysUntilExpiration === 1 ? '' : 's'}!`
                : `Válido hasta ${earliestExpiration.toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}`}
            </span>
          </div>

          {/* Action button */}
          <button
            onClick={() => setMultiModalOpen(true)}
            className="w-full bg-gradient-to-r from-[#a780b7] to-[#64cad8] text-white font-medium py-[14px] rounded-[12px] shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-[8px] group-hover:scale-[1.02]"
            style={{ fontSize: '15px' }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            Mostrar todos ({count})
          </button>
        </div>
      </div>

      {multiModalOpen && (
        <MultiQrModal
          coupons={coupons}
          onClose={() => setMultiModalOpen(false)}
          onDownloadAll={() => {
            setMultiModalOpen(false);
            setDownloadAllOpen(true);
          }}
        />
      )}

      {downloadAllOpen && (
        <DownloadAllModal
          onClose={() => setDownloadAllOpen(false)}
          coupons={coupons.map((c) => ({ CodigoQR: c.CodigoQR, Nombre: c.Nombre }))}
        />
      )}
    </>
  );
};
