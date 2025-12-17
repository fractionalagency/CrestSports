import { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../../src/index';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Cast the Vercel request/response to Express types
  app(req as any, res as any);
}
