import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

const PRIVATE_KEY = process.env.NEXT_PUBLIC_QRUPONES_NOTIFICATION_API_KEY;

/**
 * Validates Bearer token authentication
 */
export function validateAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !PRIVATE_KEY) return false;
  return authHeader === `Bearer ${PRIVATE_KEY}`;
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
