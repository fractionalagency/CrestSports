import prisma from '@config/database';
import { BadRequestError, NotFoundError } from '@utils/errors';
import { nanoid } from 'nanoid';
import type { Order, OrderStatus, Prisma } from '@prisma/client';
import type { CreateOrderDto } from '../types/schemas';
import emailService from './email.service';

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
        // Bypass payment for now as requested
        status: 'PAID',
        paymentStatus: 'COMPLETED',
        statusHistory: [
          {
            status: 'PENDING',
            timestamp: new Date().toISOString(),
            note: 'Order created',
          },
          {
            status: 'PAID',
            timestamp: new Date().toISOString(),
            note: 'Payment skipped (Dev Mode)',
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

    // Send confirmation email
    // We don't await this to avoid blocking the response
    emailService.sendOrderConfirmation(order as any).catch((err) => {
      console.error('Failed to send order confirmation email:', err);
    });

    return order;
  }

  async getDashboardStats() {
    const [revenueResult, totalOrders, activeOrders, paidOrdersCount] = await Promise.all([
      prisma.order.aggregate({
        _sum: { total: true },
        where: { status: { in: ['PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED'] } },
      }),
      prisma.order.count(),
      prisma.order.count({
        where: { status: { in: ['PENDING', 'PAID', 'PROCESSING', 'SHIPPED'] } },
      }),
      prisma.order.count({
        where: { status: { in: ['PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED'] } },
      }),
    ]);

    const totalRevenue = revenueResult._sum.total || 0;
    const avgOrderValue = paidOrdersCount > 0 ? totalRevenue / paidOrdersCount : 0;

    return {
      totalRevenue,
      totalOrders,
      activeOrders,
      avgOrderValue,
    };
  }

  async getAnalytics(days = 90) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startDate,
        },
        status: {
          in: ['PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED'],
        },
      },
      select: {
        createdAt: true,
        total: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const dailyStats = new Map<string, { revenue: number; orders: number }>();

    orders.forEach((order) => {
      const date = order.createdAt.toISOString().split('T')[0];
      const stats = dailyStats.get(date) || { revenue: 0, orders: 0 };
      stats.revenue += order.total;
      stats.orders += 1;
      dailyStats.set(date, stats);
    });

    const result = [];
    for (let i = 0; i <= days; i++) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const stats = dailyStats.get(dateStr) || { revenue: 0, orders: 0 };
      result.push({
        date: dateStr,
        revenue: stats.revenue,
        orders: stats.orders,
      });
    }

    return result;
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
