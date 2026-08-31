'use client';

import { BusinessHeader, QrModal } from '@/components';
import { StampCardInterface } from '@/interfaces';
import { useState } from 'react';

interface StampCardProps {
  card: StampCardInterface;
}

const GRIS_CONTORNO = '#9CA3AF';
const ESTADO_COMPLETA = 1;
// Circulos por fila (spec seccion 6.3): 5 por fila, la ultima fila incompleta se centra.
const CIRCULOS_POR_FILA = 5;
const GAP_CIRCULOS_PX = 12;

const formatDate = (value: string | null) => {
  if (!value) return '';
  return new Date(value).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const StampCard = ({ card }: StampCardProps) => {
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [selloFallo, setSelloFallo] = useState(false);

  const color = card.Campana.LetrasNegras;
  const meta = card.Meta > 0 ? card.Meta : 1;
  const sellados = Math.min(card.Sellos, meta);
  const faltan = Math.max(meta - sellados, 0);
  const completa = card.Estado === ESTADO_COMPLETA;
  const nombre = (card.ClienteNombre || '').trim();
  const titulo = nombre ? `Tarjeta de ${nombre}` : 'Tu tarjeta de sellos';
  const ultimoSello = card.sellos.length > 0 ? card.sellos[card.sellos.length - 1] : null;
  const usaSelloImagen = card.Campana.SelloImagen !== '' && !selloFallo;
  const premio = card.Campana.MensajeCanje.trim() !== '' ? card.Campana.MensajeCanje : 'tu premio';

  return (
    <>
      <div
        className="bg-white rounded-[20px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
        style={{ fontSize: '16px' }}
      >
        {/* Top gradient bar */}
        <div className="h-[3px] bg-gradient-to-r from-[#a780b7] to-[#64cad8]" />

        {/* Header con logo y nombre de la empresa, igual que CouponCard */}
        <div className="p-[20px] pb-[12px] flex items-start gap-[16px]">
          <BusinessHeader
            nombre={card.Empresa.Nombre}
            logoUrl={card.Empresa.LogoUrl}
            categoria={card.Empresa.Categoria}
          />
        </div>

        {/* Plantilla de la tarjeta (spec seccion 6). Tocarla despliega la lista de sellos. */}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="w-full block text-left"
          aria-expanded={expanded}
        >
          <div className="px-[20px] pt-[16px] pb-[8px]">
            {/* 2. Nombre, en mayusculas (spec seccion 6) */}
            <p
              className="font-bold mb-[16px]"
              style={{ fontSize: '18px', textAlign: 'center', color, textTransform: 'uppercase' }}
            >
              {titulo}
            </p>

            {/* 3. Grilla de sellos. flex-wrap + justify-center para que la ultima fila incompleta quede centrada (spec 6.3, ruling del controller). */}
            <div
              className="mb-[16px]"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: `${GAP_CIRCULOS_PX}px`,
              }}
            >
              {Array.from({ length: meta }, (_, i) => i + 1).map((numero) => {
                const sellado = numero <= sellados;
                return (
                  <div
                    key={numero}
                    className="rounded-full flex items-center justify-center overflow-hidden"
                    style={{
                      width: `calc((100% - ${(CIRCULOS_POR_FILA - 1) * GAP_CIRCULOS_PX}px) / ${CIRCULOS_POR_FILA})`,
                      aspectRatio: '1',
                      border: sellado ? 'none' : `2px solid ${GRIS_CONTORNO}`,
                      backgroundColor: sellado && !usaSelloImagen ? color : 'transparent',
                    }}
                  >
                    {sellado ? (
                      usaSelloImagen ? (
                        // SelloImagen puede ser una ruta local del escritorio o un host fuera de la allow-list de next/image, que fallaria en runtime.
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={card.Campana.SelloImagen}
                          alt=""
                          onError={() => setSelloFallo(true)}
                          className="w-full h-full"
                          style={{ objectFit: 'contain' }}
                        />
                      ) : (
                        <svg
                          width="60%"
                          height="60%"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )
                    ) : (
                      <span style={{ fontSize: '14px', color: GRIS_CONTORNO }}>
                        {String(numero).padStart(2, '0')}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 4. Pie */}
            <p className="font-bold" style={{ fontSize: '15px', textAlign: 'center', color }}>
              ¡Sellá todos y ganá {premio}!
            </p>
            <p className="text-gray-500 mt-[4px]" style={{ fontSize: '13px', textAlign: 'center' }}>
              {sellados} de {meta}
            </p>
          </div>
        </button>

        <div className="px-[20px] pb-[20px] pt-[8px]">
          {/* Estado */}
          {completa ? (
            <div className="px-[12px] py-[8px] rounded-[10px] bg-gray-50 mb-[12px]">
              <p className="font-semibold text-[#002239]" style={{ fontSize: '14px', textAlign: 'left' }}>
                {card.premio ? '¡Completa! Tu premio está listo' : 'Tu premio está en camino'}
              </p>
              <p className="text-gray-500 mt-[2px]" style={{ fontSize: '13px', textAlign: 'left' }}>
                {card.premio
                  ? card.premio.FechaExpiracion
                    ? `Válido hasta ${formatDate(card.premio.FechaExpiracion)}`
                    : premio
                  : 'Te lo enviamos por WhatsApp en unos minutos.'}
              </p>
            </div>
          ) : (
            <p className="text-gray-600 mb-[12px]" style={{ fontSize: '14px', textAlign: 'left' }}>
              Te {faltan === 1 ? 'falta' : 'faltan'} {faltan} para: {premio}
            </p>
          )}

          {/* Ultimo sello */}
          {ultimoSello && (
            <p className="text-gray-500 mb-[12px]" style={{ fontSize: '13px', textAlign: 'left' }}>
              Último sello: {formatDate(card.FechaUltimoSello ?? ultimoSello.Fecha)}, {ultimoSello.Sucursal}
            </p>
          )}

          {/* Lista de sellos desplegable */}
          {expanded && card.sellos.length > 0 && (
            <ul className="mb-[12px] border-t border-gray-100 pt-[12px]">
              {card.sellos.map((sello) => (
                <li
                  key={sello.Numero}
                  className="flex items-center justify-between py-[4px] text-gray-600"
                  style={{ fontSize: '13px' }}
                >
                  <span>Sello {sello.Numero}</span>
                  <span className="text-gray-400">
                    {formatDate(sello.Fecha)} · {sello.Sucursal}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {!expanded && card.sellos.length > 0 && (
            <p className="text-gray-400 mb-[12px]" style={{ fontSize: '12px', textAlign: 'left' }}>
              Toca la tarjeta para ver tus sellos
            </p>
          )}

          {/* Premio */}
          {completa && card.premio && (
            <button
              onClick={() => setQrModalOpen(true)}
              className="w-full bg-gradient-to-r from-[#a780b7] to-[#64cad8] text-white font-medium py-[14px] rounded-[12px] shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-[8px]"
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
          )}
        </div>
      </div>

      {qrModalOpen && card.premio && (
        <QrModal
          onClose={() => setQrModalOpen(false)}
          qrCode={card.premio.CodigoQR}
          businessName={card.Empresa.Nombre}
        />
      )}
    </>
  );
};
