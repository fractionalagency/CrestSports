import { Router, Request, Response } from 'express';
import categoryService from '@services/category.service';
import { sendSuccess } from '@utils/response';
import { validateRequest } from '@middleware/validate';
import { createCategorySchema } from '../types/schemas';

const router: Router = Router();

// GET /api/v1/categories - List all categories
router.get(
  '/',
  async (_req: Request, res: Response): Promise<Response> => {
    const categories = await categoryService.findAll();
    return sendSuccess(res, categories);
  }
);

// POST /api/v1/categories - Create a new category
router.post(
  '/',
  validateRequest({ body: createCategorySchema }),
  async (req: Request, res: Response): Promise<Response> => {
    const category = await categoryService.create(req.body);
    return sendSuccess(res, category, 201);
  }
);

export default router;
