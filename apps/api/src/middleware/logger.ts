import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import { logger } from '@utils/logger';
import { config } from '@config/env';

// Extend Express Request type to include id
declare global {
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}

// Custom morgan stream to integrate with winston
const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

// Morgan format for development
const devFormat = morgan('dev', { stream });

// Morgan format for production
const prodFormat = morgan('combined', { stream });

export const requestLogger = config.isDevelopment ? devFormat : prodFormat;

// Request ID middleware
export const requestId = (req: Request, _res: Response, next: NextFunction): void => {
  req.id = (req.headers['x-request-id'] as string) || crypto.randomUUID();
  next();
};
