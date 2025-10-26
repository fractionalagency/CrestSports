import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '@utils/errors';
import { config } from '@config/env';

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
