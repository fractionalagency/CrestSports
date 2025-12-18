import { Router, Request, Response } from 'express';
import productService from '@services/product.service';
import { sendSuccess } from '@utils/response';
import { validateRequest } from '@middleware/validate';
import { productListSchema, productIdSchema, createProductSchema } from '../types/schemas';

const router: Router = Router();

// POST /api/v1/products - Create a new product
router.post(
  '/',
  validateRequest({ body: createProductSchema }),
  async (req: Request, res: Response): Promise<Response> => {
    const product = await productService.create(req.body);
    return sendSuccess(res, product, 201);
  }
);

// DELETE /api/v1/products/:id - Delete a product
router.delete(
  '/:id',
  validateRequest({ params: productIdSchema }),
  async (req: Request, res: Response): Promise<Response> => {
    await productService.delete(req.params.id!);
    return sendSuccess(res, { message: 'Product deleted successfully' });
  }
);

// GET /api/v1/products - List all products with filtering
router.get(
  '/',
  validateRequest({ query: productListSchema }),
  async (req: Request, res: Response): Promise<Response> => {
    const result = await productService.findAll(req.query as any);
    return sendSuccess(res, result.products, 200, result.pagination);
  }
);

// GET /api/v1/products/featured - Get featured products
router.get('/featured', async (_req: Request, res: Response): Promise<Response> => {
  const products = await productService.getFeatured();
  return sendSuccess(res, products);
});

// GET /api/v1/products/:id - Get product by ID
router.get(
  '/:id',
  validateRequest({ params: productIdSchema }),
  async (req: Request, res: Response): Promise<Response> => {
    const product = await productService.findById(req.params.id!);
    return sendSuccess(res, product);
  }
);

export default router;
