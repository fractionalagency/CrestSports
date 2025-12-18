import prisma from '@config/database';
import type { Category } from '@prisma/client';

export class CategoryService {
  async findAll(): Promise<Category[]> {
    return prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
  }
}

export default new CategoryService();
