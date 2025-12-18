import { Router, Request, Response } from 'express';
import categoryService from '@services/category.service';
import { sendSuccess } from '@utils/response';

const router: Router = Router();

// GET /api/v1/categories - List all categories
router.get(
  '/',
  async (_req: Request, res: Response): Promise<Response> => {
    const categories = await categoryService.findAll();
    return sendSuccess(res, categories);
  }
);

export default router;
