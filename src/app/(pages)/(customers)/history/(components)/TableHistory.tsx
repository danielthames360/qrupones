'use client';

import { CouponsHistoryInterface } from '@/interfaces';
import { endpoints } from '@/constants/endpoints';
import { useFetchApi } from '@/hooks/useFetchApi';
import { useSession } from 'next-auth/react';
import { useMemo, useState } from 'react';
import { HistoryCard } from './HistoryCard';
import { FilterTabs } from '@/components/ui/FilterTabs';
import { HistoryLoadingSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import Link from 'next/link';

type HistoryFilterType = 'Todos' | 'Utilizados' | 'Expirados';

export const TableHistory = () => {
  const { data: session } = useSession();
  const [filter, setFilter] = useState<HistoryFilterType>('Todos');

  const { data: coupons, isLoading } = useFetchApi<CouponsHistoryInterface>({
    endpoint: endpoints.coupons.history,
    enabled: !!session,
  });

  const filteredCoupons = useMemo(() => {
    if (filter === 'Todos') return coupons;
    if (filter === 'Utilizados') return coupons.filter((coupon) => coupon.FechaUso);
    return coupons.filter((coupon) => !coupon.FechaUso);
  }, [filter, coupons]);

  // Count by status
  const counts = useMemo(() => ({
    all: coupons.length,
    used: coupons.filter((c) => c.FechaUso).length,
    expired: coupons.filter((c) => !c.FechaUso).length,
  }), [coupons]);

  const filterOptions = [
    { label: 'Todos', value: 'Todos' as HistoryFilterType, count: counts.all },
    { label: 'Utilizados', value: 'Utilizados' as HistoryFilterType, count: counts.used },
    { label: 'Expirados', value: 'Expirados' as HistoryFilterType, count: counts.expired },
  ];

  // Calculate savings
  const totalSavings = useMemo(() => {
    return coupons
      .filter((c) => c.FechaUso && c.MontoOrigen && c.MontoQrupon)
      .reduce((acc, c) => {
        const original = c.Moneda === 'USD' ? (c.MontoOrigen || 0) * 6.96 : (c.MontoOrigen || 0);
        const final = c.Moneda === 'USD' ? (c.MontoQrupon || 0) * 6.96 : (c.MontoQrupon || 0);
        return acc + (original - final);
      }, 0);
  }, [coupons]);

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
      style={{ fontSize: '16px' }}
    >
      <div className="max-w-[800px] mx-auto px-[16px] md:px-[24px] py-[24px]">
        {/* Header */}
        <div className="mb-[24px]">
          <div className="flex items-center gap-[12px] mb-[8px]">
            <Link
              href="/coupons"
              className="flex items-center justify-center w-[36px] h-[36px] rounded-full bg-white shadow-sm hover:shadow-md transition-all"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#002239"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1
              className="text-[#002239] font-bold"
              style={{ fontSize: '28px', textAlign: 'left' }}
            >
              Historial
            </h1>
          </div>
          <p
            className="text-gray-500"
            style={{ fontSize: '15px', textAlign: 'left' }}
          >
            {isLoading
              ? 'Cargando tu historial...'
              : coupons.length > 0
              ? `${coupons.length} cupón${coupons.length === 1 ? '' : 'es'} en tu historial`
              : 'Sin movimientos en tu historial'}
          </p>
        </div>

        {/* Savings card (if any) */}
        {!isLoading && totalSavings > 0 && (
          <div className="bg-gradient-to-r from-[#a780b7] to-[#64cad8] rounded-[16px] p-[20px] mb-[24px] text-white">
            <p style={{ fontSize: '14px', opacity: 0.9 }}>Total ahorrado con QRupones</p>
            <p className="font-bold" style={{ fontSize: '32px' }}>
              Bs. {totalSavings.toFixed(2)}
            </p>
          </div>
        )}

        {/* Filter Tabs */}
        {!isLoading && coupons.length > 0 && (
          <div className="mb-[20px] overflow-x-auto pb-[8px] -mx-[16px] px-[16px]">
            <FilterTabs
              options={filterOptions}
              value={filter}
              onChange={setFilter}
            />
          </div>
        )}

        {/* Content */}
        {isLoading ? (
          <HistoryLoadingSkeleton />
        ) : coupons.length === 0 ? (
          <EmptyState
            icon="history"
            title="Sin historial"
            description="Aquí aparecerán los cupones que hayas utilizado o que hayan expirado."
            actionLabel="Ver mis cupones"
            actionHref="/coupons"
          />
        ) : filteredCoupons.length === 0 ? (
          <EmptyState
            icon="history"
            title={`Sin cupones ${filter === 'Utilizados' ? 'utilizados' : 'expirados'}`}
            description="No tienes cupones en esta categoría."
          />
        ) : (
          <div className="space-y-[12px]">
            {filteredCoupons.map((coupon) => (
              <HistoryCard key={coupon.CodigoQR} coupon={coupon} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
