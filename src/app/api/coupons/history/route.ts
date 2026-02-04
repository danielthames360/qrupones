import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { validateAuth, unauthorizedResponse, errorResponse, successResponse } from '@/lib/api-utils';
import { Prisma } from '@prisma/client';

interface CouponHistoryResult {
  CodigoQR: string;
  ClienteNombre: string | null;
  Celular: string | null;
  FechaExpiracion: Date | null;
  MensajeCanje: string | null;
  Empresa: string;
  MontoOrigen: number | null;
  FechaGenerado: Date;
  EstadoQR: number | null;
  MontoQrupon: number | null;
  FechaUso: Date | null;
  Moneda: string | null;
  LogoUrl: string | null;
  Categoria: string | null;
}

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

    const celular = session.Celular;
    const codigoPais = parseInt(session.CodigoPais);

    // Query for coupon history (used or expired)
    const results = await prisma.$queryRaw<CouponHistoryResult[]>`
      SELECT
        c.CodigoQR,
        v.ClienteNombre,
        v.Celular,
        c.FechaExpiracion,
        cam.MensajeCanje,
        e.Nombre AS Empresa,
        v.Monto AS MontoOrigen,
        c.createdAt AS FechaGenerado,
        c.EstadoQR,
        vu.Monto AS MontoQrupon,
        vu.Fecha AS FechaUso,
        e.Moneda,
        e.LogoUrl,
        e.Categoria
      FROM Cupones c
      INNER JOIN Ventas v ON c.VentaID = v.VentaID
      INNER JOIN Campanas cam ON c.CampanaID = cam.CampanaID
      INNER JOIN Empresas e ON cam.EmpresaID = e.EmpresaID
      LEFT JOIN Ventas vu ON c.CuponID = vu.CuponOrigenID
      WHERE v.Celular = ${celular}
        AND v.CodigoPais = ${codigoPais}
        AND (c.EstadoQR > 0 OR c.FechaExpiracion <= CURDATE())
      ORDER BY c.CuponID DESC
    `;

    return successResponse(results);
  } catch (error) {
    console.error('Error getting coupon history:', error);
    return errorResponse('Error al obtener el historial', 500);
  }
}
