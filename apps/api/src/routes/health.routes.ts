import { Router, Request, Response } from 'express';
import { sendSuccess } from '@utils/response';
import { config } from '@config/env';
import prisma from '@config/database';

const router: Router = Router();

router.get('/', async (_req: Request, res: Response): Promise<Response> => {
  const healthcheck = {
    uptime: process.uptime(),
    timestamp: Date.now(),
    environment: config.env,
    version: config.apiVersion,
  };

  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    return sendSuccess(res, { ...healthcheck, database: 'connected' });
  } catch (error) {
    return sendSuccess(res, { ...healthcheck, database: 'disconnected' }, 503);
  }
});

export default router;
