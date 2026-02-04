import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { validateAuth, unauthorizedResponse, errorResponse, successResponse, generateCode } from '@/lib/api-utils';
import { sendWhatsAppMessage } from '@/lib/whatsapp';

export async function POST(request: NextRequest) {
  // Validate authentication
  if (!validateAuth(request)) {
    return unauthorizedResponse();
  }

  try {
    const body = await request.json();
    const { number, countryCode } = body;

    if (!number || !countryCode) {
      return errorResponse('Número y código de país requeridos');
    }

    // Find customer by phone number
    const customer = await prisma.ventas.findFirst({
      where: {
        Celular: number,
        CodigoPais: parseInt(countryCode),
      },
      orderBy: {
        VentaID: 'desc', // Get most recent
      },
      select: {
        ClienteNombre: true,
        Celular: true,
      },
    });

    const customerName = customer?.ClienteNombre || 'Cliente';

    // Generate unique code
    const code = generateCode();

    // Create session in database
    await prisma.sesionesClientes.create({
      data: {
        Codigo: code,
        ClienteNombre: customerName,
        Celular: number,
        CodigoPais: countryCode,
      },
    });

    // Send WhatsApp message (only send the code, Bird template has the base URL)
    const whatsappResult = await sendWhatsAppMessage({
      phone: `${countryCode}${number}`,
      nombre: customerName,
      codigo: code,
    });

    if (!whatsappResult.success) {
      // Delete session if WhatsApp fails
      await prisma.sesionesClientes.deleteMany({
        where: { Codigo: code },
      });

      return errorResponse(whatsappResult.error || 'Error enviando mensaje de WhatsApp', 500);
    }

    return successResponse(
      { messageId: whatsappResult.messageId },
      'Mensaje enviado con éxito'
    );
  } catch (error) {
    console.error('Error sending notification:', error);
    return errorResponse('Error al enviar la notificación', 500);
  }
}
