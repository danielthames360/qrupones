'use client';

import QRCode from 'react-qr-code';
import { useEffect } from 'react';

interface QrModalProps {
  onClose: () => void;
  qrCode: string;
  businessName?: string;
}

export const QrModal = ({ onClose, qrCode, businessName }: QrModalProps) => {
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

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-[16px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-modal-title"
      style={{ fontSize: '16px' }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-[360px] overflow-hidden animate-scaleIn">
        {/* Header gradient bar */}
        <div className="h-[4px] bg-gradient-to-r from-[#a780b7] to-[#64cad8]" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-[12px] right-[12px] w-[36px] h-[36px] flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
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
        <div className="p-[32px] pt-[24px] flex flex-col items-center">
          {/* Title */}
          <h2
            id="qr-modal-title"
            className="text-[#002239] font-semibold mb-[8px]"
            style={{ fontSize: '20px', textAlign: 'center' }}
          >
            {businessName || 'Tu QRupon'}
          </h2>
          <p
            className="text-gray-500 mb-[24px]"
            style={{ fontSize: '14px', textAlign: 'center' }}
          >
            Muestra este código en el local
          </p>

          {/* QR Code Container */}
          <div className="bg-white p-[16px] rounded-[16px] shadow-inner border border-gray-100 mb-[20px]">
            <QRCode
              value={qrCode}
              size={220}
              style={{
                height: 'auto',
                maxWidth: '100%',
                width: '100%',
              }}
              viewBox="0 0 256 256"
              level="M"
            />
          </div>

          {/* Code text */}
          <div className="bg-gray-50 rounded-[12px] px-[16px] py-[10px] mb-[24px] w-full">
            <p
              className="text-center text-gray-500 mb-[4px]"
              style={{ fontSize: '12px' }}
            >
              Código
            </p>
            <p
              className="text-center text-[#002239] font-mono font-medium break-all"
              style={{ fontSize: '13px' }}
            >
              {qrCode}
            </p>
          </div>

          {/* Action button */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-[#a780b7] to-[#64cad8] text-white font-medium py-[14px] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            style={{ fontSize: '16px' }}
          >
            Listo
          </button>
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
