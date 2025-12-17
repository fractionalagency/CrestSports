import { Request, Response, NextFunction } from 'express';
import { AppError } from '@utils/errors';
import { sendError } from '@utils/response';
import { logger } from '@utils/logger';
import { config } from '@config/env';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  logger.error('Error:', {
    message: err.message,
    stack: err.stack,
    name: err.name,
  });

  // Operational errors (expected errors)
  if (err instanceof AppError) {
    return sendError(res, err.message, err.statusCode);
  }

  // Validation errors (Zod)
  if (err instanceof ZodError) {
    const errors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return sendError(res, 'Validation failed', 422, 'VALIDATION_ERROR', errors);
  }

  // Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        return sendError(res, 'A record with this value already exists', 409, 'DUPLICATE_ERROR');
      case 'P2025':
        return sendError(res, 'Record not found', 404, 'NOT_FOUND');
      case 'P2003':
        return sendError(res, 'Foreign key constraint failed', 400, 'CONSTRAINT_ERROR');
      default:
        return sendError(res, 'Database error occurred', 500, err.code);
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return sendError(res, 'Invalid data provided', 400, 'VALIDATION_ERROR');
  }

  // Default to 500 server error
  const message = config.isDevelopment
    ? err.message
    : 'An unexpected error occurred. Please try again later.';

  return sendError(res, message, 500, 'INTERNAL_ERROR');
};

// 404 handler
export const notFoundHandler = (_req: Request, res: Response): Response => {
  return sendError(res, 'Route not found', 404, 'NOT_FOUND');
};
