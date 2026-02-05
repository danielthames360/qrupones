'use client';

import { CouponsInterface } from '@/interfaces';
import { endpoints } from '@/constants/endpoints';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CouponCard } from './CouponCard';
import { FilterTabs } from '@/components/ui/FilterTabs';
import { CouponsLoadingSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import Link from 'next/link';
import { DownloadAllModal } from '@/components/ui/DownloadAllModal';

type FilterType = 'Todos' | 'Tiendas' | 'Gastronomia';

export const Coupons = () => {
  const { data: session } = useSession();
  const [filter, setFilter] = useState<FilterType>('Todos');
  const [coupons, setCoupons] = useState<CouponsInterface[]>([]);
  const [clienteNombre, setClienteNombre] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDownloadAll, setShowDownloadAll] = useState(false);

  const fetchData = useCallback(async () => {
    if (!session) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(endpoints.coupons.list, {
        method: 'GET',
        credentials: 'include',
      });
      const result = await response.json();

      if (result.success && result.data) {
        setCoupons(result.data.coupons || []);
        setClienteNombre(result.data.clienteNombre || null);
      } else {
        setCoupons([]);
      }
    } catch {
      setCoupons([]);
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredCoupons = useMemo(() => {
    if (filter === 'Todos') return coupons;
    return coupons.filter((coupon) => coupon.Categoria === filter);
  }, [filter, coupons]);

  // Count by category
  const counts = useMemo(() => ({
    all: coupons.length,
    tiendas: coupons.filter((c) => c.Categoria === 'Tiendas').length,
    gastronomia: coupons.filter((c) => c.Categoria === 'Gastronomia').length,
  }), [coupons]);

  const filterOptions = [
    { label: 'Todos', value: 'Todos' as FilterType, count: counts.all },
    { label: 'Tiendas', value: 'Tiendas' as FilterType, count: counts.tiendas },
    { label: 'Gastronomía', value: 'Gastronomia' as FilterType, count: counts.gastronomia },
  ];

  // Extract first name for greeting
  const firstName = clienteNombre?.split(' ')[0] || null;

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
      style={{ fontSize: '16px' }}
    >
      <div className="max-w-[1200px] mx-auto px-[16px] md:px-[24px] py-[24px]">
        {/* Header */}
        <div className="mb-[24px] flex items-start justify-between gap-[16px]">
          <div>
            <h1
              className="text-[#002239] font-bold mb-[8px]"
              style={{ fontSize: '28px', textAlign: 'left' }}
            >
              {firstName ? `Hola, ${firstName}` : 'Mis QRupones'}
            </h1>
            <p
              className="text-gray-500"
              style={{ fontSize: '15px', textAlign: 'left' }}
            >
              {isLoading
                ? 'Cargando tus cupones...'
                : coupons.length > 0
                ? `Tienes ${coupons.length} cupón${coupons.length === 1 ? '' : 'es'} disponible${coupons.length === 1 ? '' : 's'}`
                : 'No tienes cupones disponibles'}
            </p>
          </div>
          {!isLoading && coupons.length > 1 && (
            <div
              className="flex-shrink-0 relative rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
              style={{ padding: '2px' }}
              onClick={() => setShowDownloadAll(true)}
            >
              {/* Rotating border light */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div
                  className="animate-border-glow absolute"
                  style={{
                    top: '-100%',
                    left: '-100%',
                    width: '300%',
                    height: '300%',
                    background: 'conic-gradient(from 0deg, transparent 0%, transparent 65%, rgba(255,255,255,0.8) 73%, #64cad8 78%, #a780b7 83%, rgba(255,255,255,0.8) 88%, transparent 93%)',
                  }}
                />
              </div>
              <button
                className="relative flex items-center bg-gradient-to-r from-[#a780b7] to-[#64cad8] text-white rounded-full"
                style={{ fontSize: '14px', fontWeight: 500, gap: '6px', padding: '10px 18px' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Guardar todos
              </button>
            </div>
          )}
        </div>

        {/* Filter Tabs */}
        {!isLoading && coupons.length > 0 && (
          <div className="mb-[24px] overflow-x-auto pb-[8px] -mx-[16px] px-[16px]">
            <FilterTabs
              options={filterOptions}
              value={filter}
              onChange={setFilter}
            />
          </div>
        )}

        {/* Content */}
        {isLoading ? (
          <CouponsLoadingSkeleton />
        ) : coupons.length === 0 ? (
          <EmptyState
            icon="coupons"
            title="No tienes QRupones"
            description="Cuando realices compras en negocios asociados, tus cupones aparecerán aquí."
            actionLabel="Ver historial"
            actionHref="/history"
          />
        ) : filteredCoupons.length === 0 ? (
          <EmptyState
            icon="coupons"
            title={`Sin cupones de ${filter === 'Tiendas' ? 'tiendas' : 'gastronomía'}`}
            description="No tienes cupones en esta categoría. Prueba con otra."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[20px]">
            {filteredCoupons.map((coupon) => (
              <CouponCard key={coupon.CodigoQR} coupon={coupon} />
            ))}
          </div>
        )}

        {/* Footer link to history */}
        {!isLoading && coupons.length > 0 && (
          <div className="mt-[40px] text-center">
            <Link
              href="/history"
              className="inline-flex items-center gap-[8px] text-gray-500 hover:text-[#a780b7] transition-colors"
              style={{ fontSize: '15px', fontWeight: 500 }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              Ver historial de cupones
            </Link>
          </div>
        )}
      </div>

      {/* Download All Modal */}
      {showDownloadAll && (
        <DownloadAllModal
          onClose={() => setShowDownloadAll(false)}
          coupons={coupons.map((c) => ({ CodigoQR: c.CodigoQR, Nombre: c.Nombre }))}
        />
      )}

      <style jsx global>{`
        @keyframes border-glow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-border-glow {
          animation: border-glow 3.5s linear infinite;
        }
      `}</style>
    </div>
  );
};
