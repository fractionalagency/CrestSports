import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '@utils/errors';
import { config } from '@config/env';
import { adminService } from '@services/admin.service';

// Extend Express Request type to include admin
declare global {
  namespace Express {
    interface Request {
      admin?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

export const authenticateApiKey = (req: Request, _res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key'] as string;

  if (!config.security.apiKey) {
    // If no API key is configured, skip authentication
    return next();
  }

  if (!apiKey || apiKey !== config.security.apiKey) {
    throw new UnauthorizedError('Invalid or missing API key');
  }

  next();
};

/**
 * Middleware to authenticate admin JWT token
 */
export const authenticateAdmin = (req: Request, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('No token provided');
  }

  const token = authHeader.substring(7);

  try {
    const decoded = adminService.verifyToken(token);
    req.admin = decoded;
    next();
  } catch (error) {
    throw new UnauthorizedError('Invalid or expired token');
  }
};

/**
 * Middleware to check if admin has required role
 */
export const requireRole = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.admin) {
      throw new UnauthorizedError('Authentication required');
    }

    if (!roles.includes(req.admin.role)) {
      throw new UnauthorizedError('Insufficient permissions');
    }

    next();
  };
};
