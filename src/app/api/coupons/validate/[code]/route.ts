import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { errorResponse, successResponse, isValidUUID } from '@/lib/api-utils';

// Public endpoint - no authentication required (for login flow)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;

    // Validate code format with Zod
    if (!code || !isValidUUID(code)) {
      return errorResponse('Código inválido', 400);
    }

    // Find session by code
    const session = await prisma.sesionesClientes.findFirst({
      where: { Codigo: code },
    });

    if (!session) {
      return errorResponse('El código no es válido', 404);
    }

    return successResponse({
      Codigo: session.Codigo,
      ClienteNombre: session.ClienteNombre,
      Celular: session.Celular,
      CodigoPais: session.CodigoPais,
      SesionClienteID: session.SesionClienteID,
    });
  } catch {
    return errorResponse('Error al validar el código', 500);
  }
}
