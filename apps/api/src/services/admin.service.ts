import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from '@config/env';
import { UnauthorizedError } from '@utils/errors';

interface AdminPayload {
  id: string;
  email: string;
  role: string;
}

export class AdminService {
  login(email: string, password: string) {
    if (
      email !== config.security.adminEmail ||
      password !== config.security.adminPassword
    ) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const payload: AdminPayload = {
      id: 'admin-1',
      email,
      role: 'admin',
    };

    const token = jwt.sign(payload, config.security.jwtSecret, {
      expiresIn: config.security.jwtExpiresIn,
    } as SignOptions);

    return {
      token,
      admin: payload,
    };
  }

  verifyToken(token: string): AdminPayload {
    try {
      return jwt.verify(token, config.security.jwtSecret) as AdminPayload;
    } catch (error) {
      throw new UnauthorizedError('Invalid or expired token');
    }
  }
}

export const adminService = new AdminService();
