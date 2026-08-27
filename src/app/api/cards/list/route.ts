import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { validateSession, unauthorizedResponse, errorResponse, successResponse } from '@/lib/api-utils';

// Estados de TarjetasSellos (spec 5.2): 0 activa, 1 completa, 2 vencida.
const ESTADO_ACTIVA = 0;
const ESTADO_COMPLETA = 1;
// EstadoQR del cupon premio (spec 5.3): 0 = activo/canjeable.
const CUPON_ACTIVO = 0;
// Color de marca por defecto cuando la campana no tiene LetrasNegras.
const COLOR_POR_DEFECTO = '#002239';

export async function GET(request: NextRequest) {
  // Validate session and get the code
  const code = await validateSession(request);
  if (!code) {
    return unauthorizedResponse();
  }

  try {
    const session = await prisma.sesionesClientes.findFirst({
      where: { Codigo: code },
    });

    if (!session || !session.Celular || !session.CodigoPais) {
      return errorResponse('Sesión no válida', 401);
    }

    // TarjetasSellos guarda el telefono normalizado (solo digitos, pais numerico);
    // SesionesClientes lo guarda tal como se cargo. Se normaliza antes de comparar,
    // igual que normalizePhone del backend (CodigoPais 0/vacio cae a 591).
    const celular = session.Celular.replace(/\D/g, '');
    const parsed = parseInt(session.CodigoPais.replace(/\D/g, ''), 10);
    const codigoPais = Number.isNaN(parsed) || parsed <= 0 ? 591 : parsed;

    if (celular.length < 6) {
      return errorResponse('Sesión no válida', 401);
    }

    const ahora = new Date();

    // Visibles: activas, y completas con el premio pendiente de emitir o vigente.
    // Las vencidas (Estado 2) y las que ya tienen el premio usado o expirado no se listan.
    const tarjetas = await prisma.tarjetasSellos.findMany({
      where: {
        CodigoPais: codigoPais,
        Celular: celular,
        OR: [
          { Estado: ESTADO_ACTIVA },
          { Estado: ESTADO_COMPLETA, CuponPremioID: null },
          {
            Estado: ESTADO_COMPLETA,
            Cupones: { is: { EstadoQR: CUPON_ACTIVO, FechaExpiracion: { gte: ahora } } },
          },
        ],
      },
      select: {
        TarjetaID: true,
        Sellos: true,
        Meta: true,
        Estado: true,
        FechaUltimoSello: true,
        ClienteNombre: true,
        Campanas: {
          select: {
            Nombre: true,
            MensajeCanje: true,
            Fondo: true,
            SelloImagen: true,
            LetrasNegras: true,
            Empresas: {
              select: {
                Nombre: true,
                LogoUrl: true,
                Categoria: true,
              },
            },
          },
        },
        SellosDetalle: {
          select: {
            Numero: true,
            createdAt: true,
            Sucursales: { select: { Nombre: true } },
          },
          orderBy: { Numero: 'asc' },
        },
        Cupones: {
          select: {
            CodigoQR: true,
            FechaExpiracion: true,
            EstadoQR: true,
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    // Transform data to match expected interface
    const transformed = tarjetas.map((tarjeta) => ({
      TarjetaID: tarjeta.TarjetaID,
      Sellos: tarjeta.Sellos,
      Meta: tarjeta.Meta,
      Estado: tarjeta.Estado,
      FechaUltimoSello: tarjeta.FechaUltimoSello,
      ClienteNombre: tarjeta.ClienteNombre,
      Empresa: {
        Nombre: tarjeta.Campanas.Empresas.Nombre,
        LogoUrl: tarjeta.Campanas.Empresas.LogoUrl || '',
        Categoria: tarjeta.Campanas.Empresas.Categoria || 'Tiendas',
      },
      Campana: {
        Nombre: tarjeta.Campanas.Nombre,
        MensajeCanje: tarjeta.Campanas.MensajeCanje || '',
        Fondo: tarjeta.Campanas.Fondo || '',
        SelloImagen: tarjeta.Campanas.SelloImagen || '',
        LetrasNegras: tarjeta.Campanas.LetrasNegras || COLOR_POR_DEFECTO,
      },
      sellos: tarjeta.SellosDetalle.map((sello) => ({
        Numero: sello.Numero,
        Fecha: sello.createdAt,
        Sucursal: sello.Sucursales.Nombre,
      })),
      premio:
        tarjeta.Cupones && tarjeta.Cupones.EstadoQR === CUPON_ACTIVO
          ? {
              CodigoQR: tarjeta.Cupones.CodigoQR,
              FechaExpiracion: tarjeta.Cupones.FechaExpiracion,
            }
          : null,
    }));

    return successResponse(transformed);
  } catch {
    return errorResponse('Error al obtener las tarjetas', 500);
  }
}
