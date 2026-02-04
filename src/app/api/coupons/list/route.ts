import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { validateAuth, unauthorizedResponse, errorResponse, successResponse } from '@/lib/api-utils';

export async function POST(request: NextRequest) {
  // Validate authentication
  if (!validateAuth(request)) {
    return unauthorizedResponse();
  }

  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return errorResponse('Código requerido');
    }

    // Validate session exists
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
  } catch (error) {
    console.error('Error getting coupons:', error);
    return errorResponse('Error al obtener los cupones', 500);
  }
}
