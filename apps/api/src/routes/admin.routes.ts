import { Router, Request, Response } from 'express';
import { adminService } from '@services/admin.service';
import { validateRequest } from '@middleware/validate';
import { authenticateAdmin, requireRole } from '@middleware/auth';
import {
  adminLoginSchema,
  adminRegisterSchema,
  updateAdminSchema,
} from '../types/schemas';
import { sendSuccess, sendCreated } from '@utils/response';

const router = Router();

router.post(
  '/login',
  validateRequest({ body: adminLoginSchema }),
  async (req: Request, res: Response): Promise<Response> => {
    const result = await adminService.login(req.body);
    return sendSuccess(res, result);
  }
);

router.post(
  '/register',
  authenticateAdmin,
  requireRole('ADMIN'),
  validateRequest({ body: adminRegisterSchema }),
  async (req: Request, res: Response): Promise<Response> => {
    const result = await adminService.register(req.body);
    return sendCreated(res, result);
  }
);

router.get(
  '/me',
  authenticateAdmin,
  async (req: Request, res: Response): Promise<Response> => {
    const admin = await adminService.getById(req.admin!.id);
    return sendSuccess(res, admin);
  }
);

router.get(
  '/',
  authenticateAdmin,
  requireRole('ADMIN'),
  async (_req: Request, res: Response): Promise<Response> => {
    const admins = await adminService.getAll();
    return sendSuccess(res, admins);
  }
);

router.get(
  '/:id',
  authenticateAdmin,
  requireRole('ADMIN'),
  async (req: Request, res: Response): Promise<Response> => {
    const admin = await adminService.getById(req.params.id);
    return sendSuccess(res, admin);
  }
);

router.patch(
  '/:id',
  authenticateAdmin,
  requireRole('ADMIN'),
  validateRequest({ body: updateAdminSchema }),
  async (req: Request, res: Response): Promise<Response> => {
    const admin = await adminService.update(req.params.id, req.body);
    return sendSuccess(res, admin);
  }
);

router.delete(
  '/:id',
  authenticateAdmin,
  requireRole('ADMIN'),
  async (req: Request, res: Response): Promise<Response> => {
    const result = await adminService.delete(req.params.id);
    return sendSuccess(res, result);
  }
);

router.post(
  '/change-password',
  authenticateAdmin,
  async (req: Request, res: Response): Promise<Response> => {
    const { currentPassword, newPassword } = req.body;
    const result = await adminService.changePassword(
      req.admin!.id,
      currentPassword,
      newPassword
    );
    return sendSuccess(res, result);
  }
);

export default router;
