import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@config/database';
import { config } from '@config/env';
import { BadRequestError, NotFoundError, UnauthorizedError } from '@utils/errors';
import type { AdminLoginDto, AdminRegisterDto, UpdateAdminDto } from '../types/schemas';

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export class AdminService {
  /**
   * Register a new admin user
   */
  async register(data: AdminRegisterDto) {
    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: data.email },
    });

    if (existingAdmin) {
      throw new BadRequestError('Admin with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create admin
    const admin = await prisma.admin.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
        role: data.role || 'STAFF',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return admin;
  }

  /**
   * Login admin user
   */
  async login(data: AdminLoginDto) {
    // Find admin by email
    const admin = await prisma.admin.findUnique({
      where: { email: data.email },
    });

    if (!admin) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Check if admin is active
    if (!admin.isActive) {
      throw new UnauthorizedError('Account is deactivated');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(data.password, admin.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Update last login
    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLogin: new Date() },
    });

    // Generate JWT token
    const token = this.generateToken({
      id: admin.id,
      email: admin.email,
      role: admin.role,
    });

    return {
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        isActive: admin.isActive,
      },
    };
  }

  /**
   * Get admin by ID
   */
  async getById(id: string) {
    const admin = await prisma.admin.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!admin) {
      throw new NotFoundError('Admin not found');
    }

    return admin;
  }

  /**
   * Get all admins
   */
  async getAll() {
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return admins;
  }

  /**
   * Update admin
   */
  async update(id: string, data: UpdateAdminDto) {
    const admin = await prisma.admin.findUnique({
      where: { id },
    });

    if (!admin) {
      throw new NotFoundError('Admin not found');
    }

    const updatedAdmin = await prisma.admin.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedAdmin;
  }

  /**
   * Delete admin
   */
  async delete(id: string) {
    const admin = await prisma.admin.findUnique({
      where: { id },
    });

    if (!admin) {
      throw new NotFoundError('Admin not found');
    }

    await prisma.admin.delete({
      where: { id },
    });

    return { message: 'Admin deleted successfully' };
  }

  /**
   * Change password
   */
  async changePassword(id: string, currentPassword: string, newPassword: string) {
    const admin = await prisma.admin.findUnique({
      where: { id },
    });

    if (!admin) {
      throw new NotFoundError('Admin not found');
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, admin.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Current password is incorrect');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.admin.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return { message: 'Password changed successfully' };
  }

  /**
   * Verify JWT token
   */
  verifyToken(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, config.security.jwtSecret) as JwtPayload;
      return decoded;
    } catch (error) {
      throw new UnauthorizedError('Invalid or expired token');
    }
  }

  /**
   * Generate JWT token
   */
  private generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, config.security.jwtSecret, {
      expiresIn: config.security.jwtExpiresIn,
    });
  }
}

export const adminService = new AdminService();
