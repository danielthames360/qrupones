'use client';

import { endpoints } from '@/constants/endpoints';
import { useFetchApi } from '@/hooks/useFetchApi';
import { StampCardInterface } from '@/interfaces';
import { useSession } from 'next-auth/react';
import { StampCard } from './StampCard';

export const StampCards = () => {
  const { data: session } = useSession();
  const { data: cards, isLoading } = useFetchApi<StampCardInterface>({
    endpoint: endpoints.cards.list,
    enabled: !!session,
  });

  // Mientras carga, la grilla de cupones ya muestra su propio skeleton; no duplicar.
  if (isLoading) return null;

  // Sin tarjetas el bloque no existe (spec 11.3).
  if (cards.length === 0) return null;

  return (
    <div className="mb-[32px]">
      <h2
        className="text-[#002239] font-bold mb-[4px]"
        style={{ fontSize: '20px', textAlign: 'left' }}
      >
        Mis tarjetas
      </h2>
      <p className="text-gray-500 mb-[16px]" style={{ fontSize: '14px', textAlign: 'left' }}>
        {cards.length === 1 ? 'Tienes 1 tarjeta activa' : `Tienes ${cards.length} tarjetas activas`}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[20px]">
        {cards.map((card) => (
          <StampCard key={card.TarjetaID} card={card} />
        ))}
      </div>
    </div>
  );
};
