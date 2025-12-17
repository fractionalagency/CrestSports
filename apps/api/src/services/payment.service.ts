import Razorpay from 'razorpay';
import crypto from 'crypto';
import { config } from '@config/env';
import orderService from '@services/order.service';
import { BadRequestError } from '@utils/errors';

export class PaymentService {
  private razorpay: Razorpay;

  constructor() {
    this.razorpay = new Razorpay({
      key_id: config.razorpay.keyId,
      key_secret: config.razorpay.keySecret,
    });
  }

  async createRazorpayOrder(orderId: string) {
    const order = await orderService.findById(orderId);

    const razorpayOrder = await this.razorpay.orders.create({
      amount: Math.round(order.total * 100), // Amount in paise
      currency: 'INR',
      receipt: order.trackingId,
      notes: {
        orderId: order.id,
        customerEmail: order.customerEmail,
      },
    });

    return {
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      order,
    };
  }

  async verifyPayment(
    orderId: string,
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
  ) {
    // Verify signature
    const text = `${razorpayOrderId}|${razorpayPaymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', config.razorpay.keySecret)
      .update(text)
      .digest('hex');

    if (expectedSignature !== razorpaySignature) {
      throw new BadRequestError('Invalid payment signature');
    }

    // Update order with payment details
    const order = await orderService.updatePayment(
      orderId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    );

    return order;
  }
}

export default new PaymentService();
