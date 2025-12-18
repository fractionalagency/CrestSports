import prisma from '@config/database';
import type { Category } from '@prisma/client';
import type { CreateCategoryDto } from '../types/schemas';

export class CategoryService {
  async findAll(): Promise<Category[]> {
    return prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async create(data: CreateCategoryDto): Promise<Category> {
    return prisma.category.create({
      data,
    });
  }
}

export default new CategoryService();
