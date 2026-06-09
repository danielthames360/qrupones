'use client';

import { CouponsInterface } from '@/interfaces';
import QRCode from 'react-qr-code';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';

interface QrItem {
  coupon: CouponsInterface;
  imageStatus: 'loading' | 'found' | 'not-found';
  isSaving: boolean;
}

interface MultiQrModalProps {
  coupons: CouponsInterface[];
  onClose: () => void;
  onDownloadAll: () => void;
}

const CLOUDINARY_BASE = process.env.NEXT_PUBLIC_CLOUDINARY_COUPON_BASE_URL?.replace(/\/$/, '');

export const MultiQrModal = ({ coupons, onClose, onDownloadAll }: MultiQrModalProps) => {
  const [items, setItems] = useState<QrItem[]>(
    coupons.map((coupon) => ({ coupon, imageStatus: 'loading', isSaving: false }))
  );
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);

  const isMobile =
    typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  useLayoutEffect(() => {
    function update() {
      const h = window.visualViewport?.height ?? window.innerHeight;
      setViewportHeight(h);
    }
    update();
    window.visualViewport?.addEventListener('resize', update);
    window.addEventListener('resize', update);
    return () => {
      window.visualViewport?.removeEventListener('resize', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    coupons.forEach((coupon) => {
      const url = `${CLOUDINARY_BASE}/${coupon.CodigoQR}.jpg`;
      const img = new window.Image();
      img.onload = () =>
        setItems((prev) =>
          prev.map((item) =>
            item.coupon.CodigoQR === coupon.CodigoQR ? { ...item, imageStatus: 'found' } : item
          )
        );
      img.onerror = () =>
        setItems((prev) =>
          prev.map((item) =>
            item.coupon.CodigoQR === coupon.CodigoQR ? { ...item, imageStatus: 'not-found' } : item
          )
        );
      img.src = url;
    });
  }, [coupons]);

  const handleSave = useCallback(
    async (coupon: CouponsInterface) => {
      const url = `${CLOUDINARY_BASE}/${coupon.CodigoQR}.jpg`;
      setItems((prev) =>
        prev.map((item) =>
          item.coupon.CodigoQR === coupon.CodigoQR ? { ...item, isSaving: true } : item
        )
      );
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        if (isMobile && navigator.share) {
          const file = new File([blob], `QRupon-${coupon.CodigoQR}.jpg`, { type: 'image/jpeg' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({ files: [file] });
          } else {
            await navigator.share({
              title: coupon.Nombre || 'Mi QRupon',
              text: `Mi cupón de ${coupon.Nombre}: ${coupon.CodigoQR}`,
            });
          }
        } else {
          const blobUrl = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = blobUrl;
          a.download = `QRupon-${coupon.CodigoQR}.jpg`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(blobUrl);
        }
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          window.open(url, '_blank');
        }
      } finally {
        setItems((prev) =>
          prev.map((item) =>
            item.coupon.CodigoQR === coupon.CodigoQR ? { ...item, isSaving: false } : item
          )
        );
      }
    },
    [isMobile]
  );

  const businessName = coupons[0]?.Nombre;
  const hasAnyImage = items.some((i) => i.imageStatus === 'found');
  const allLoaded = items.every((i) => i.imageStatus !== 'loading');

  return (
    <div
      className="fixed inset-x-0 top-0 z-[9999] flex items-center justify-center p-[16px]"
      role="dialog"
      aria-modal="true"
      style={{
        fontSize: '16px',
        height: viewportHeight ? `${viewportHeight}px` : '100vh',
      }}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-[380px] overflow-hidden animate-scaleIn"
        style={{
          maxHeight: viewportHeight ? `${viewportHeight - 32}px` : 'calc(100vh - 32px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="h-[4px] bg-gradient-to-r from-[#a780b7] to-[#64cad8]" />

        <button
          onClick={onClose}
          className="absolute top-[12px] right-[12px] w-[36px] h-[36px] flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
          aria-label="Cerrar"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#666"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Fixed header */}
        <div className="px-[24px] pt-[20px] pb-[16px] flex-shrink-0">
          <h2
            className="text-[#002239] font-semibold mb-[4px]"
            style={{ fontSize: '18px', textAlign: 'center' }}
          >
            {businessName || 'Tus QRupones'}
          </h2>
          <p
            className="text-gray-400"
            style={{ fontSize: '13px', textAlign: 'center' }}
          >
            {coupons.length} cupones disponibles
          </p>
        </div>

        {/* Scrollable QR list */}
        <div className="overflow-y-auto flex-1 px-[24px]" style={{ paddingBottom: '8px' }}>
          <div className="flex flex-col" style={{ gap: '16px' }}>
            {items.map((item) => {
              const url = `${CLOUDINARY_BASE}/${item.coupon.CodigoQR}.jpg`;
              return (
                <div
                  key={item.coupon.CodigoQR}
                  className="border border-gray-100 rounded-[16px] overflow-hidden"
                >
                  <div className="p-[12px]">
                    {item.imageStatus === 'loading' && (
                      <div
                        className="animate-pulse bg-gray-100 rounded-[10px]"
                        style={{ height: '180px' }}
                      />
                    )}
                    {item.imageStatus === 'found' && (
                      <img
                        src={url}
                        alt={`Cupón ${item.coupon.CodigoQR}`}
                        className="w-full rounded-[10px]"
                        style={{ height: 'auto', objectFit: 'contain' }}
                      />
                    )}
                    {item.imageStatus === 'not-found' && (
                      <div className="bg-gray-50 rounded-[10px] p-[16px] flex flex-col items-center gap-[8px]">
                        <QRCode
                          value={item.coupon.CodigoQR}
                          size={160}
                          style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                          viewBox="0 0 256 256"
                          level="M"
                        />
                        <p
                          className="text-[#002239] font-mono font-bold"
                          style={{ fontSize: '14px', letterSpacing: '2px' }}
                        >
                          {item.coupon.CodigoQR}
                        </p>
                      </div>
                    )}
                  </div>

                  {item.imageStatus === 'found' && (
                    <div className="px-[12px] pb-[12px]">
                      <button
                        onClick={() => handleSave(item.coupon)}
                        disabled={item.isSaving}
                        className="flex items-center justify-center gap-[8px] w-full bg-gradient-to-r from-[#a780b7] to-[#64cad8] text-white font-medium py-[10px] rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-60"
                        style={{ fontSize: '14px' }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        {item.isSaving ? 'Guardando...' : 'Guardar imagen'}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Fixed footer */}
        <div className="px-[24px] py-[16px] flex-shrink-0 border-t border-gray-100">
          {allLoaded && hasAnyImage ? (
            <button
              onClick={onDownloadAll}
              className="flex items-center justify-center gap-[8px] w-full bg-gradient-to-r from-[#a780b7] to-[#64cad8] text-white font-medium py-[13px] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              style={{ fontSize: '15px' }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Descargar todos
            </button>
          ) : allLoaded ? (
            <button
              onClick={onClose}
              className="flex items-center justify-center gap-[8px] w-full bg-gradient-to-r from-[#a780b7] to-[#64cad8] text-white font-medium py-[13px] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              style={{ fontSize: '15px' }}
            >
              Listo
            </button>
          ) : (
            <div
              className="w-full flex items-center justify-center text-gray-400"
              style={{ fontSize: '14px', padding: '13px 0' }}
            >
              Cargando imágenes...
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};
