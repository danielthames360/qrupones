import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { validateSession, unauthorizedResponse, errorResponse, successResponse } from '@/lib/api-utils';

export async function GET(request: NextRequest) {
  // Validate session and get the code
  const code = await validateSession(request);
  if (!code) {
    return unauthorizedResponse();
  }

  try {
    // Validate session exists in database
    const session = await prisma.sesionesClientes.findFirst({
      where: { Codigo: code },
    });

    if (!session || !session.Celular || !session.CodigoPais) {
      return errorResponse('Sesión no válida', 401);
    }

    // Get active coupons for customer
    const coupons = await prisma.cupones.findMany({
      where: {
        EstadoQR: 0, // Active coupons only
        FechaExpiracion: {
          gte: new Date(), // Not expired
        },
        Ventas: {
          Celular: session.Celular,
          CodigoPais: parseInt(session.CodigoPais),
        },
      },
      select: {
        CodigoQR: true,
        FechaExpiracion: true,
        Campanas: {
          select: {
            MensajeCanje: true,
            Empresas: {
              select: {
                Nombre: true,
                LogoUrl: true,
                Categoria: true,
              },
            },
          },
        },
      },
      orderBy: {
        FechaExpiracion: 'asc',
      },
    });

    // Transform data to match expected interface
    const transformedCoupons = coupons.map((coupon) => ({
      CodigoQR: coupon.CodigoQR,
      FechaExpiracion: coupon.FechaExpiracion,
      MensajeCanje: coupon.Campanas?.MensajeCanje || '',
      Nombre: coupon.Campanas?.Empresas?.Nombre || '',
      LogoUrl: coupon.Campanas?.Empresas?.LogoUrl || '',
      Categoria: coupon.Campanas?.Empresas?.Categoria || 'Tiendas',
    }));

    return successResponse(transformedCoupons);
  } catch {
    return errorResponse('Error al obtener los cupones', 500);
  }
}
