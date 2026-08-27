'use client';

import { BusinessHeader, QrModal } from '@/components';
import { CouponsInterface } from '@/interfaces';
import { useState } from 'react';

interface CouponCardProps {
  coupon: CouponsInterface;
}

export const CouponCard = ({ coupon }: CouponCardProps) => {
  const [qrModalOpen, setQrModalOpen] = useState(false);

  // Calculate days until expiration
  const daysUntilExpiration = Math.ceil(
    (new Date(coupon.FechaExpiracion).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  const isExpiringSoon = daysUntilExpiration <= 7;

  return (
    <>
      <div
        className="group bg-white rounded-[20px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-[2px]"
        style={{ fontSize: '16px' }}
      >
        {/* Top gradient bar */}
        <div
          className={`h-[3px] ${
            isExpiringSoon
              ? 'bg-gradient-to-r from-orange-400 to-red-400'
              : 'bg-gradient-to-r from-[#a780b7] to-[#64cad8]'
          }`}
        />

        <div className="p-[20px]">
          {/* Header with logo and business name */}
          <div className="flex items-start gap-[16px] mb-[16px]">
            <BusinessHeader nombre={coupon.Nombre} logoUrl={coupon.LogoUrl} categoria={coupon.Categoria} />
          </div>

          {/* Coupon message */}
          <p
            className="text-gray-600 mb-[16px] line-clamp-2"
            style={{ fontSize: '15px', lineHeight: '1.5', textAlign: 'left' }}
          >
            {coupon.MensajeCanje}
          </p>

          {/* Expiration info */}
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
                ? `¡Expira en ${daysUntilExpiration} día${daysUntilExpiration === 1 ? '' : 's'}!`
                : `Válido hasta ${new Date(coupon.FechaExpiracion).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}`}
            </span>
          </div>

          {/* Action button */}
          <button
            onClick={() => setQrModalOpen(true)}
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
            Mostrar QR
          </button>
        </div>
      </div>

      {qrModalOpen && (
        <QrModal
          onClose={() => setQrModalOpen(false)}
          qrCode={coupon.CodigoQR}
          businessName={coupon.Nombre}
        />
      )}
    </>
  );
};
