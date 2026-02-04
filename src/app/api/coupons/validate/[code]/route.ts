import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { validateAuth, unauthorizedResponse, errorResponse, successResponse } from '@/lib/api-utils';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  // Validate authentication
  if (!validateAuth(request)) {
    return unauthorizedResponse();
  }

  try {
    const { code } = await params;

    if (!code) {
      return errorResponse('Código requerido');
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
  } catch (error) {
    console.error('Error validating code:', error);
    return errorResponse('Error al validar el código', 500);
  }
}
