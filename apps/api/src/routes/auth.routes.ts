import { Router, Request, Response } from 'express';
import { adminService } from '@services/admin.service';
import { sendSuccess } from '@utils/response';
import { validateRequest } from '@middleware/validate';
import { loginSchema } from '../types/schemas';

const router: Router = Router();

// POST /api/v1/auth/login - Admin login
router.post(
  '/login',
  validateRequest({ body: loginSchema }),
  async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const result = adminService.login(email, password);
    return sendSuccess(res, result);
  }
);

export default router;
