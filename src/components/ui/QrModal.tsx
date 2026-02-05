'use client';

import QRCode from 'react-qr-code';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';

interface QrModalProps {
  onClose: () => void;
  qrCode: string;
  businessName?: string;
}

export const QrModal = ({ onClose, qrCode, businessName }: QrModalProps) => {
  const [imageStatus, setImageStatus] = useState<'loading' | 'found' | 'not-found'>('loading');
  const [isSaving, setIsSaving] = useState(false);
  const cloudinaryUrl = `https://res.cloudinary.com/dl7f4dxdp/image/upload/QRupon/${qrCode}.jpg`;

  const [viewportHeight, setViewportHeight] = useState<number | null>(null);

  // Track real viewport height (handles iOS Safari toolbar show/hide)
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

  // Probe Cloudinary image existence
  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setImageStatus('found');
    img.onerror = () => setImageStatus('not-found');
    img.src = cloudinaryUrl;
  }, [cloudinaryUrl]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const isMobile = typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      const response = await fetch(cloudinaryUrl);
      const blob = await response.blob();

      // Mobile: use native share sheet (save to gallery, share, etc.)
      if (isMobile && navigator.share) {
        const file = new File([blob], `QRupon-${qrCode}.jpg`, { type: 'image/jpeg' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file] });
        } else {
          await navigator.share({
            title: businessName || 'Mi QRupon',
            text: `Mi cupón de ${businessName || 'QRupones'}: ${qrCode}`,
          });
        }
      } else {
        // Desktop: direct download
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `QRupon-${qrCode}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      // Ignore user cancellation of share sheet
      if (err instanceof Error && err.name !== 'AbortError') {
        window.open(cloudinaryUrl, '_blank');
      }
    } finally {
      setIsSaving(false);
    }
  }, [cloudinaryUrl, qrCode, businessName, isMobile]);

  return (
    <div
      className="fixed inset-x-0 top-0 z-[9999] flex items-center justify-center p-[16px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-modal-title"
      style={{
        fontSize: '16px',
        height: viewportHeight ? `${viewportHeight}px` : '100vh',
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-[360px] overflow-hidden animate-scaleIn"
        style={{
          maxHeight: viewportHeight ? `${viewportHeight - 32}px` : 'calc(100vh - 32px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header gradient bar */}
        <div className="h-[4px] bg-gradient-to-r from-[#a780b7] to-[#64cad8]" />

        {/* Close button */}
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

        {/* Content */}
        <div className="px-[24px] pt-[20px] pb-[24px] flex flex-col items-center overflow-y-auto flex-1">
          {/* Title */}
          <h2
            id="qr-modal-title"
            className="text-[#002239] font-semibold mb-[4px]"
            style={{ fontSize: '18px', textAlign: 'center' }}
          >
            {businessName || 'Tu QRupon'}
          </h2>
          <p
            className="text-gray-400 mb-[16px]"
            style={{ fontSize: '13px', textAlign: 'center' }}
          >
            Presenta este cupón en el local
          </p>

          {/* QR Code / Cloudinary Image Container */}
          <div className={`w-full ${imageStatus === 'found' ? 'mb-[20px]' : 'mb-[12px]'}`}>
            {imageStatus === 'loading' && (
              <div className="flex justify-center">
                <div
                  className="animate-pulse bg-gray-100 rounded-[12px]"
                  style={{ width: '220px', height: '220px' }}
                />
              </div>
            )}
            {imageStatus === 'found' && (
              <img
                src={cloudinaryUrl}
                alt={`Cupón ${businessName || qrCode}`}
                className="w-full rounded-[12px]"
                style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
              />
            )}
            {imageStatus === 'not-found' && (
              <div className="bg-white p-[16px] rounded-[12px] border border-gray-100 flex justify-center">
                <QRCode
                  value={qrCode}
                  size={200}
                  style={{
                    height: 'auto',
                    maxWidth: '100%',
                    width: '100%',
                  }}
                  viewBox="0 0 256 256"
                  level="M"
                />
              </div>
            )}
          </div>

          {/* Code reference - only for QR fallback */}
          {imageStatus === 'not-found' && (
            <p
              className="text-[#002239] mb-[20px] font-mono font-bold tracking-widest"
              style={{ fontSize: '18px', textAlign: 'center', letterSpacing: '3px' }}
            >
              {qrCode}
            </p>
          )}

          {/* Actions */}
          {imageStatus === 'found' ? (
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center justify-center gap-[8px] w-full bg-gradient-to-r from-[#a780b7] to-[#64cad8] text-white font-medium py-[13px] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-60"
              style={{ fontSize: '15px' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {isSaving ? 'Guardando...' : 'Guardar imagen'}
            </button>
          ) : imageStatus === 'not-found' ? (
            <button
              onClick={onClose}
              className="flex items-center justify-center gap-[8px] w-full bg-gradient-to-r from-[#a780b7] to-[#64cad8] text-white font-medium py-[13px] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              style={{ fontSize: '15px' }}
            >
              Listo
            </button>
          ) : null}
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
