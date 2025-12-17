import { Router, Request, Response } from 'express';
import paymentService from '@services/payment.service';
import { sendSuccess } from '@utils/response';
import { validateRequest } from '@middleware/validate';
import { orderIdSchema, verifyPaymentSchema } from '../types/schemas';

const router: Router = Router();

// POST /api/v1/payments/create/:id - Create Razorpay order
router.post(
  '/create/:id',
  validateRequest({ params: orderIdSchema }),
  async (req: Request, res: Response): Promise<Response> => {
    const paymentData = await paymentService.createRazorpayOrder(req.params.id!);
    return sendSuccess(res, paymentData);
  }
);

// POST /api/v1/payments/verify - Verify payment
router.post(
  '/verify',
  validateRequest({ body: verifyPaymentSchema }),
  async (req: Request, res: Response): Promise<Response> => {
    const order = await paymentService.verifyPayment(
      req.body.orderId,
      req.body.razorpayOrderId,
      req.body.razorpayPaymentId,
      req.body.razorpaySignature
    );
    return sendSuccess(res, order);
  }
);

export default router;
