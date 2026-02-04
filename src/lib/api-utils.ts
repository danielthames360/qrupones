import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

const API_KEY = process.env.QRUPONES_API_KEY;

/**
 * Validates Bearer token authentication (for internal/server calls)
 */
export function validateApiKey(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !API_KEY) return false;
  return authHeader === `Bearer ${API_KEY}`;
}

/**
 * Validates NextAuth JWT session and returns the session code
 * @returns The session code if valid, null otherwise
 */
export async function validateSession(request: NextRequest): Promise<string | null> {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.code) return null;
  return token.code as string;
}

/**
 * Returns unauthorized response
 */
export function unauthorizedResponse() {
  return NextResponse.json(
    { success: false, message: 'No autorizado' },
    { status: 401 }
  );
}

/**
 * Returns error response
 */
export function errorResponse(message: string, status: number = 400) {
  return NextResponse.json(
    { success: false, message },
    { status }
  );
}

/**
 * Returns success response
 */
export function successResponse<T>(data?: T, message: string = 'OK') {
  return NextResponse.json({
    success: true,
    message,
    data,
  });
}

/**
 * Generates a unique UUID code
 */
export function generateCode(): string {
  return uuidv4();
}

/**
 * Zod schema for UUID validation
 */
export const uuidSchema = z.string().uuid();

/**
 * Validates a UUID code
 */
export function isValidUUID(code: string): boolean {
  return uuidSchema.safeParse(code).success;
}

/**
 * Zod schema for phone number validation
 */
export const phoneSchema = z.object({
  number: z.string().min(6).max(15).regex(/^\d+$/, 'Número inválido'),
  countryCode: z.string().min(1).max(4).regex(/^\d+$/, 'Código de país inválido'),
});

/**
 * Validates phone input
 */
export function validatePhoneInput(data: unknown): { success: true; data: { number: string; countryCode: string } } | { success: false; error: string } {
  const result = phoneSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: 'Datos de teléfono inválidos' };
  }
  return { success: true, data: result.data };
}
