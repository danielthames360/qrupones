import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { validateAuth, unauthorizedResponse, errorResponse, successResponse } from '@/lib/api-utils';

export async function DELETE(
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

    // Find and delete session
    const session = await prisma.sesionesClientes.findFirst({
      where: { Codigo: code },
    });

    if (!session) {
      return errorResponse('Sesión no encontrada', 404);
    }

    await prisma.sesionesClientes.delete({
      where: { SesionClienteID: session.SesionClienteID },
    });

    return successResponse(undefined, 'Sesión eliminada con éxito');
  } catch (error) {
    console.error('Error deleting session:', error);
    return errorResponse('Error al eliminar la sesión', 500);
  }
}
