import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { validateSession, unauthorizedResponse, errorResponse, successResponse, isValidUUID } from '@/lib/api-utils';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  // Validate session
  const sessionCode = await validateSession(request);
  if (!sessionCode) {
    return unauthorizedResponse();
  }

  try {
    const { code } = await params;

    // Validate code format
    if (!code || !isValidUUID(code)) {
      return errorResponse('Código inválido');
    }

    // Verify user can only logout their own session
    if (sessionCode !== code) {
      return unauthorizedResponse();
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
  } catch {
    return errorResponse('Error al eliminar la sesión', 500);
  }
}
