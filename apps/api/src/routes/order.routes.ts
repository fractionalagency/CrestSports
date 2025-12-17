import { Router, Request, Response } from 'express';
import orderService from '@services/order.service';
import { sendSuccess, sendCreated } from '@utils/response';
import { validateRequest } from '@middleware/validate';
import { createOrderSchema, orderIdSchema, trackingIdSchema } from '../types/schemas';

const router: Router = Router();

// POST /api/v1/orders - Create new order
router.post(
  '/',
  validateRequest({ body: createOrderSchema }),
  async (req: Request, res: Response): Promise<Response> => {
    const order = await orderService.create(req.body);
    return sendCreated(res, order);
  }
);

// GET /api/v1/orders/:id - Get order by ID
router.get(
  '/:id',
  validateRequest({ params: orderIdSchema }),
  async (req: Request, res: Response): Promise<Response> => {
    const order = await orderService.findById(req.params.id!);
    return sendSuccess(res, order);
  }
);

// GET /api/v1/orders/track/:trackingId - Track order
router.get(
  '/track/:trackingId',
  validateRequest({ params: trackingIdSchema }),
  async (req: Request, res: Response): Promise<Response> => {
    const order = await orderService.findByTrackingId(req.params.trackingId!);
    return sendSuccess(res, order);
  }
);

export default router;
