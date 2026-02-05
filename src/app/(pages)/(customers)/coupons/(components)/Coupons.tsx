'use client';

import { CouponsInterface } from '@/interfaces';
import { endpoints } from '@/constants/endpoints';
import { useFetchApi } from '@/hooks/useFetchApi';
import { useSession } from 'next-auth/react';
import { useMemo, useState } from 'react';
import { CouponCard } from './CouponCard';
import { FilterTabs } from '@/components/ui/FilterTabs';
import { CouponsLoadingSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import Link from 'next/link';

type FilterType = 'Todos' | 'Tiendas' | 'Gastronomia';

export const Coupons = () => {
  const { data: session } = useSession();
  const [filter, setFilter] = useState<FilterType>('Todos');

  const { data: coupons, isLoading } = useFetchApi<CouponsInterface>({
    endpoint: endpoints.coupons.list,
    enabled: !!session,
  });

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

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
      style={{ fontSize: '16px' }}
    >
      <div className="max-w-[1200px] mx-auto px-[16px] md:px-[24px] py-[24px]">
        {/* Header */}
        <div className="mb-[24px]">
          <h1
            className="text-[#002239] font-bold mb-[8px]"
            style={{ fontSize: '28px', textAlign: 'left' }}
          >
            Mis QRupones
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
    </div>
  );
};
