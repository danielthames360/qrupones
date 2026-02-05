'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

interface CouponDownloadItem {
  code: string;
  businessName: string;
  status: 'pending' | 'checking' | 'downloading' | 'done' | 'no-image';
}

interface DownloadAllModalProps {
  onClose: () => void;
  coupons: { CodigoQR: string; Nombre: string }[];
}

const CLOUDINARY_BASE = 'https://res.cloudinary.com/dl7f4dxdp/image/upload/QRupon';

function probeImage(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export const DownloadAllModal = ({ onClose, coupons }: DownloadAllModalProps) => {
  const [items, setItems] = useState<CouponDownloadItem[]>(
    coupons.map((c) => ({ code: c.CodigoQR, businessName: c.Nombre, status: 'pending' }))
  );
  const [phase, setPhase] = useState<'idle' | 'running' | 'sharing' | 'done'>('idle');
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);
  const abortRef = useRef(false);
  const isMobile = typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

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
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && phase !== 'running') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose, phase]);

  const updateItem = useCallback((code: string, status: CouponDownloadItem['status']) => {
    setItems((prev) => prev.map((item) => item.code === code ? { ...item, status } : item));
  }, []);

  const startDownload = useCallback(async () => {
    setPhase('running');
    abortRef.current = false;

    const collectedFiles: File[] = [];

    // Phase 1: Probe and fetch all images
    for (const coupon of coupons) {
      if (abortRef.current) break;

      const url = `${CLOUDINARY_BASE}/${coupon.CodigoQR}.jpg`;

      updateItem(coupon.CodigoQR, 'checking');
      const exists = await probeImage(url);

      if (!exists) {
        updateItem(coupon.CodigoQR, 'no-image');
        continue;
      }

      if (abortRef.current) break;

      updateItem(coupon.CodigoQR, 'downloading');
      try {
        const response = await fetch(url);
        const blob = await response.blob();

        if (isMobile) {
          // Collect files for batch share on mobile
          collectedFiles.push(new File([blob], `QRupon-${coupon.CodigoQR}.jpg`, { type: 'image/jpeg' }));
          updateItem(coupon.CodigoQR, 'done');
        } else {
          // Desktop: download one by one
          downloadBlob(blob, `QRupon-${coupon.CodigoQR}.jpg`);
          updateItem(coupon.CodigoQR, 'done');
          // Delay between downloads so browser doesn't block
          if (!abortRef.current) {
            await new Promise((r) => setTimeout(r, 600));
          }
        }
      } catch {
        updateItem(coupon.CodigoQR, 'no-image');
      }
    }

    // Phase 2 (mobile only): Share all collected files at once
    if (isMobile && collectedFiles.length > 0 && !abortRef.current) {
      setPhase('sharing');
      try {
        if (navigator.canShare && navigator.canShare({ files: collectedFiles })) {
          await navigator.share({ files: collectedFiles });
        } else {
          // Fallback: try sharing one by one
          for (const file of collectedFiles) {
            try {
              await navigator.share({ files: [file] });
            } catch (err) {
              if (err instanceof Error && err.name === 'AbortError') break;
            }
          }
        }
      } catch {
        // User cancelled or error — that's ok
      }
    }

    setPhase('done');
  }, [coupons, updateItem, isMobile]);

  const handleCancel = useCallback(() => {
    abortRef.current = true;
    onClose();
  }, [onClose]);

  const doneCount = items.filter((i) => i.status === 'done').length;
  const noImageCount = items.filter((i) => i.status === 'no-image').length;
  const processedCount = doneCount + noImageCount;
  const totalCount = items.length;

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
        onClick={phase === 'running' || phase === 'sharing' ? undefined : onClose}
        aria-hidden="true"
      />

      <div
        className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-[360px] overflow-hidden animate-scaleIn"
        style={{
          maxHeight: viewportHeight ? `${viewportHeight - 32}px` : 'calc(100vh - 32px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="h-[4px] bg-gradient-to-r from-[#a780b7] to-[#64cad8]" />

        <button
          onClick={handleCancel}
          className="absolute top-[12px] right-[12px] w-[36px] h-[36px] flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
          aria-label="Cerrar"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="px-[24px] pt-[20px] pb-[24px] flex flex-col overflow-hidden flex-1">
          <h2
            className="text-[#002239] font-semibold mb-[4px]"
            style={{ fontSize: '18px', textAlign: 'center' }}
          >
            {phase === 'idle' && 'Guardar cupones'}
            {phase === 'running' && 'Preparando...'}
            {phase === 'sharing' && 'Guardando...'}
            {phase === 'done' && 'Completado'}
          </h2>
          <p
            className="text-gray-400 mb-[16px]"
            style={{ fontSize: '13px', textAlign: 'center' }}
          >
            {phase === 'idle'
              ? `${totalCount} cupón${totalCount === 1 ? '' : 'es'} disponible${totalCount === 1 ? '' : 's'}`
              : phase === 'running'
              ? `${processedCount} de ${totalCount}`
              : phase === 'sharing'
              ? `Guardando ${doneCount} imagen${doneCount === 1 ? '' : 'es'}...`
              : `${doneCount} imagen${doneCount === 1 ? '' : 'es'} guardada${doneCount === 1 ? '' : 's'}`
            }
          </p>

          {/* Progress bar */}
          {phase !== 'idle' && (
            <div className="w-full bg-gray-100 rounded-full overflow-hidden mb-[16px]" style={{ height: '6px' }}>
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: phase === 'sharing' ? '100%' : `${totalCount > 0 ? (processedCount / totalCount) * 100 : 0}%`,
                  background: 'linear-gradient(to right, #a780b7, #64cad8)',
                }}
              />
            </div>
          )}

          {/* Coupon list */}
          <div className="overflow-y-auto flex-1 -mx-[4px] px-[4px]" style={{ maxHeight: '280px' }}>
            <div className="flex flex-col" style={{ gap: '8px' }}>
              {items.map((item) => (
                <div
                  key={item.code}
                  className="flex items-center rounded-[10px] transition-colors"
                  style={{
                    gap: '12px',
                    padding: '10px 12px',
                    backgroundColor:
                      item.status === 'done' ? '#f0fdf4' :
                      item.status === 'no-image' ? '#f9fafb' :
                      item.status === 'downloading' || item.status === 'checking' ? '#eff6ff' :
                      '#ffffff',
                    border: item.status === 'pending' ? '1px solid #f3f4f6' : '1px solid transparent',
                  }}
                >
                  {/* Status icon */}
                  <div className="flex-shrink-0" style={{ width: '20px', height: '20px' }}>
                    {item.status === 'pending' && (
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #e5e7eb' }} />
                    )}
                    {(item.status === 'checking' || item.status === 'downloading') && (
                      <div className="animate-spin" style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #64cad8', borderTopColor: 'transparent' }} />
                    )}
                    {item.status === 'done' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                    {item.status === 'no-image' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-mono font-bold text-[#002239] truncate"
                      style={{ fontSize: '14px' }}
                    >
                      {item.code}
                    </p>
                    <p
                      className="text-gray-400 truncate"
                      style={{ fontSize: '12px' }}
                    >
                      {item.businessName}
                    </p>
                  </div>

                  {/* Status label */}
                  <div className="flex-shrink-0">
                    <span
                      className="font-medium"
                      style={{
                        fontSize: '11px',
                        color:
                          item.status === 'done' ? '#22c55e' :
                          item.status === 'no-image' ? '#9ca3af' :
                          item.status === 'downloading' ? '#64cad8' :
                          item.status === 'checking' ? '#a780b7' :
                          '#d1d5db',
                      }}
                    >
                      {item.status === 'pending' && 'Pendiente'}
                      {item.status === 'checking' && 'Verificando'}
                      {item.status === 'downloading' && 'Obteniendo'}
                      {item.status === 'done' && 'Listo'}
                      {item.status === 'no-image' && 'Sin imagen'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action button */}
          <div style={{ marginTop: '16px' }}>
            {phase === 'idle' && (
              <button
                onClick={startDownload}
                className="flex items-center justify-center w-full bg-gradient-to-r from-[#a780b7] to-[#64cad8] text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                style={{ fontSize: '15px', gap: '8px', padding: '13px 0' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Guardar todos
              </button>
            )}
            {(phase === 'running' || phase === 'sharing') && (
              <button
                onClick={handleCancel}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-500 font-medium rounded-full transition-colors"
                style={{ fontSize: '15px', padding: '13px 0' }}
              >
                Cancelar
              </button>
            )}
            {phase === 'done' && (
              <button
                onClick={onClose}
                className="flex items-center justify-center w-full bg-gradient-to-r from-[#a780b7] to-[#64cad8] text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                style={{ fontSize: '15px', gap: '8px', padding: '13px 0' }}
              >
                Listo
              </button>
            )}
          </div>
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
