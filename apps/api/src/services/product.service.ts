import prisma from '@config/database';
import { NotFoundError } from '@utils/errors';
import type { Product, Prisma } from '@prisma/client';
import type { ProductListQuery } from '../types/schemas';

export class ProductService {
  async findAll(query: ProductListQuery) {
    const { page, limit, categoryId, search, isFeatured, isActive, sortBy, sortOrder } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {
      isActive,
      ...(categoryId && { categoryId }),
      ...(isFeatured !== undefined && { isFeatured }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { sku: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      }),
      prisma.product.count({ where }),
    ]);

    // Force price to 1 for testing
    const testProducts = products.map((p) => ({
      ...p,
      price: 1,
      salePrice: null,
    }));

    return {
      products: testProducts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string): Promise<Product> {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    // Force price to 1 for testing
    return {
      ...product,
      price: 1,
      salePrice: null,
    };
  }

  async findBySlug(slug: string): Promise<Product> {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    // Force price to 1 for testing
    return {
      ...product,
      price: 1,
      salePrice: null,
    };
  }

  async getFeatured(limit = 10) {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        isFeatured: true,
      },
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    // Force price to 1 for testing
    return products.map((p) => ({
      ...p,
      price: 1,
      salePrice: null,
    }));
  }

  async create(data: any): Promise<Product> {
    // Check if slug or sku already exists
    const existingProduct = await prisma.product.findFirst({
      where: {
        OR: [{ slug: data.slug }, { sku: data.sku }],
      },
    });

    if (existingProduct) {
      throw new Error('Product with this slug or SKU already exists');
    }

    return prisma.product.create({
      data,
      include: {
        category: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    await prisma.product.delete({
      where: { id },
    });
  }
}

export default new ProductService();
