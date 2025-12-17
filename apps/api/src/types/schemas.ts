import { z } from 'zod';

// Pagination schema
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

// Product list query schema
export const productListSchema = z.object({
  ...paginationSchema.shape,
  categoryId: z.string().optional(),
  search: z.string().optional(),
  isFeatured: z.coerce.boolean().optional(),
  isActive: z.coerce.boolean().default(true),
  sortBy: z.enum(['price', 'name', 'createdAt']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// Product ID param schema
export const productIdSchema = z.object({
  id: z.string().cuid(),
});

// Create/Update product schema
export const createProductSchema = z.object({
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  description: z.string().optional(),
  price: z.number().positive(),
  salePrice: z.number().positive().optional(),
  sku: z.string().min(1).max(100),
  stock: z.number().int().min(0).default(0),
  categoryId: z.string().cuid(),
  imageUrl: z.string().url().optional(),
  images: z.array(z.string().url()).optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});

export const updateProductSchema = createProductSchema.partial();

// Order schemas
export const shippingAddressSchema = z.object({
  fullName: z.string().min(1),
  phone: z.string().min(10),
  addressLine1: z.string().min(1),
  addressLine2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(1),
  pincode: z.string().min(6),
  country: z.string().default('India'),
});

export const orderItemSchema = z.object({
  productId: z.string().cuid(),
  quantity: z.number().int().positive(),
});

export const createOrderSchema = z.object({
  customerName: z.string().min(1).max(100),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(10).max(15),
  shippingAddress: shippingAddressSchema,
  items: z.array(orderItemSchema).min(1),
  notes: z.string().optional(),
});

export const orderIdSchema = z.object({
  id: z.string().cuid(),
});

export const trackingIdSchema = z.object({
  trackingId: z.string(),
});

// Payment verification schema
export const verifyPaymentSchema = z.object({
  orderId: z.string().cuid(),
  razorpayOrderId: z.string(),
  razorpayPaymentId: z.string(),
  razorpaySignature: z.string(),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(['PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED']),
  trackingNumber: z.string().optional(),
  notes: z.string().optional(),
});

// Admin analytics schemas

export type PaginationQuery = z.infer<typeof paginationSchema>;
export type ProductListQuery = z.infer<typeof productListSchema>;
export type CreateProductDto = z.infer<typeof createProductSchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;
export type CreateOrderDto = z.infer<typeof createOrderSchema>;
export type VerifyPaymentDto = z.infer<typeof verifyPaymentSchema>;
export type UpdateOrderStatusDto = z.infer<typeof updateOrderStatusSchema>;
