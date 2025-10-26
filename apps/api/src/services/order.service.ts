import prisma from '@config/database';
import { BadRequestError, NotFoundError } from '@utils/errors';
import { nanoid } from 'nanoid';
import type { Order, OrderStatus, Prisma } from '@prisma/client';
import type { CreateOrderDto } from '../types/schemas';

export class OrderService {
  async create(data: CreateOrderDto): Promise<Order> {
    // Verify all products exist and calculate totals
    const productIds = data.items.map((item) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds }, isActive: true },
    });

    if (products.length !== productIds.length) {
      throw new BadRequestError('One or more products not found or inactive');
    }

    // Check stock availability
    for (const item of data.items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        throw new BadRequestError(`Product ${item.productId} not found`);
      }
      if (product.stock < item.quantity) {
        throw new BadRequestError(`Insufficient stock for product: ${product.name}`);
      }
    }

    // Calculate totals
    let subtotal = 0;
    const orderItems = data.items.map((item) => {
      const product = products.find((p) => p.id === item.productId)!;
      const price = product.salePrice ?? product.price;
      const itemTotal = price * item.quantity;
      subtotal += itemTotal;

      return {
        productId: product.id,
        name: product.name,
        sku: product.sku,
        price,
        quantity: item.quantity,
        total: itemTotal,
      };
    });

    const shippingCost = 50; // Fixed shipping for now
    const tax = 0;
    const discount = 0;
    const total = subtotal + shippingCost + tax - discount;

    // Generate tracking ID
    const trackingId = `TRK-${nanoid(12).toUpperCase()}`;

    // Create order
    const order = await prisma.order.create({
      data: {
        trackingId,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        shippingAddress: data.shippingAddress,
        items: {
          create: orderItems,
        },
        subtotal,
        shippingCost,
        tax,
        discount,
        total,
        notes: data.notes,
        statusHistory: [
          {
            status: 'PENDING',
            timestamp: new Date().toISOString(),
            note: 'Order created',
          },
        ],
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return order;
  }

  async findById(id: string): Promise<Order> {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    return order;
  }

  async findByTrackingId(trackingId: string): Promise<Order> {
    const order = await prisma.order.findUnique({
      where: { trackingId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    return order;
  }

  async updateStatus(
    orderId: string,
    status: OrderStatus,
    note?: string,
    trackingNumber?: string
  ): Promise<Order> {
    const order = await this.findById(orderId);

    const statusHistory = order.statusHistory as Array<{
      status: string;
      timestamp: string;
      note?: string;
    }>;

    statusHistory.push({
      status,
      timestamp: new Date().toISOString(),
      note: note || `Status updated to ${status}`,
    });

    const updateData: Prisma.OrderUpdateInput = {
      status,
      statusHistory,
      ...(trackingNumber && { trackingNumber }),
      ...(status === 'SHIPPED' && { shippedAt: new Date() }),
      ...(status === 'DELIVERED' && { deliveredAt: new Date() }),
    };

    return prisma.order.update({
      where: { id: orderId },
      data: updateData,
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async updatePayment(
    orderId: string,
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
  ): Promise<Order> {
    return prisma.order.update({
      where: { id: orderId },
      data: {
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
        paymentStatus: 'COMPLETED',
        status: 'PAID',
        paidAt: new Date(),
        statusHistory: {
          push: {
            status: 'PAID',
            timestamp: new Date().toISOString(),
            note: 'Payment completed successfully',
          },
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }
}

export default new OrderService();
