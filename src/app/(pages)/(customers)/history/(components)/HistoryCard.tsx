'use client';

import { CouponsHistoryInterface } from '@/interfaces';
import Image from 'next/image';
import { noLogo } from '@/app/(landingResources)/assets/images';

interface HistoryCardProps {
  coupon: CouponsHistoryInterface;
}

export const HistoryCard = ({ coupon }: HistoryCardProps) => {
  const isUsed = !!coupon.FechaUso;
  const isExpired = !isUsed;

  // Format currency
  const formatAmount = (amount: number | null, currency: string | null) => {
    if (amount === null) return '-';
    const value = currency === 'USD' ? amount * 6.96 : amount;
    return `Bs. ${value.toFixed(2)}`;
  };

  return (
    <div
      className={`bg-white rounded-[16px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border-l-[4px] ${
        isUsed ? 'border-l-[#a7cf3a]' : 'border-l-gray-300'
      }`}
      style={{ fontSize: '16px' }}
    >
      <div className="p-[16px] md:p-[20px]">
        <div className="flex items-start gap-[16px]">
          {/* Logo */}
          <div className="flex-shrink-0 w-[56px] h-[56px] md:w-[64px] md:h-[64px] rounded-[10px] bg-gray-50 flex items-center justify-center overflow-hidden">
            {coupon.LogoUrl ? (
              <Image
                src={coupon.LogoUrl}
                alt={coupon.Empresa}
                width={64}
                height={64}
                className="w-full h-full object-contain p-[6px]"
              />
            ) : (
              <Image
                src={noLogo}
                alt="Sin logo"
                width={36}
                height={36}
                className="opacity-30"
              />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header row */}
            <div className="flex items-start justify-between gap-[12px] mb-[8px]">
              <div className="min-w-0">
                <h3
                  className="font-semibold text-[#002239] truncate"
                  style={{ fontSize: '16px', textAlign: 'left' }}
                >
                  {coupon.Empresa}
                </h3>
                <p
                  className="text-gray-400 truncate"
                  style={{ fontSize: '12px', textAlign: 'left' }}
                >
                  {new Date(coupon.FechaGenerado).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>

              {/* Status badge */}
              <span
                className={`flex-shrink-0 inline-flex items-center gap-[4px] px-[10px] py-[4px] rounded-full ${
                  isUsed
                    ? 'bg-green-50 text-green-600'
                    : 'bg-gray-100 text-gray-500'
                }`}
                style={{ fontSize: '12px', fontWeight: 500 }}
              >
                {isUsed ? (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Utilizado
                  </>
                ) : (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    Expirado
                  </>
                )}
              </span>
            </div>

            {/* Message */}
            <p
              className="text-gray-500 line-clamp-1 mb-[12px]"
              style={{ fontSize: '13px', textAlign: 'left', lineHeight: '1.4' }}
            >
              {coupon.MensajeCanje}
            </p>

            {/* Amount section */}
            <div className="flex items-center gap-[12px] flex-wrap">
              {/* Original amount */}
              <div className="flex items-center gap-[6px]">
                <span className="text-gray-400" style={{ fontSize: '12px' }}>
                  Compra:
                </span>
                <span
                  className="bg-[#a780b7]/10 text-[#a780b7] px-[10px] py-[4px] rounded-full font-medium"
                  style={{ fontSize: '13px' }}
                >
                  {formatAmount(coupon.MontoOrigen, coupon.Moneda)}
                </span>
              </div>

              {/* Used amount (if applicable) */}
              {isUsed && coupon.MontoQrupon && (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                  <div className="flex items-center gap-[6px]">
                    <span className="text-gray-400" style={{ fontSize: '12px' }}>
                      Con descuento:
                    </span>
                    <span
                      className="bg-[#a7cf3a]/10 text-[#a7cf3a] px-[10px] py-[4px] rounded-full font-medium"
                      style={{ fontSize: '13px' }}
                    >
                      {formatAmount(coupon.MontoQrupon, coupon.Moneda)}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Used date */}
            {isUsed && coupon.FechaUso && (
              <p
                className="text-gray-400 mt-[8px]"
                style={{ fontSize: '11px', textAlign: 'left' }}
              >
                Utilizado el {new Date(coupon.FechaUso).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
