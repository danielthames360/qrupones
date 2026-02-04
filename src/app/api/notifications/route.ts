import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { errorResponse, successResponse, generateCode, validatePhoneInput } from '@/lib/api-utils';
import { sendWhatsAppMessage } from '@/lib/whatsapp';
import { rateLimit, formatTimeRemaining } from '@/lib/rate-limit';

// Rate limit: 3 attempts per 15 minutes
const RATE_LIMIT_MAX_ATTEMPTS = 3;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

// Public endpoint - no authentication required (for login flow)
export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = rateLimit(request, {
    maxAttempts: RATE_LIMIT_MAX_ATTEMPTS,
    windowMs: RATE_LIMIT_WINDOW_MS,
  });

  if (!rateLimitResult.success) {
    const timeRemaining = formatTimeRemaining(rateLimitResult.resetInMs);
    return errorResponse(
      `Demasiados intentos. Por favor espera ${timeRemaining} antes de intentar de nuevo.`,
      429
    );
  }

  try {
    const body = await request.json();

    // Validate input with Zod
    const validation = validatePhoneInput(body);
    if (!validation.success) {
      return errorResponse(validation.error);
    }

    const { number, countryCode } = validation.data;

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

    if (!customer) {
      return errorResponse('No se pudo encontrar el número de WhatsApp', 404);
    }

    const customerName = customer.ClienteNombre || 'Cliente';

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
  } catch {
    return errorResponse('Error al enviar la notificación', 500);
  }
}
