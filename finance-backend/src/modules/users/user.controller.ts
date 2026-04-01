import { Response } from 'express';
import { AuthRequest } from '../../middleware/authenticate';
import { userService } from './user.service';
import { ApiResponse } from '../../utils/ApiResponse';
import { asyncHandler } from '../../utils/asyncHandler';
import { parsePagination } from '../../utils/pagination';

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: List all users (admin only)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: Paginated list of users
 */
export const getUsers = asyncHandler(async (req: AuthRequest, res: Response) => {
  const pagination = parsePagination(req.query);
  const { users, total } = await userService.findAll(pagination);
  ApiResponse.paginated(res, users, total, pagination.page, pagination.limit, 'Users fetched successfully');
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by ID (admin only)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: User details
 */
export const getUserById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await userService.findById(req.params.id as string);
  ApiResponse.success(res, user, 'User fetched successfully');
});

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     tags: [Users]
 *     summary: Update user (admin only)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               role: { type: string, enum: [viewer, analyst, admin] }
 *               status: { type: string, enum: [active, inactive] }
 *     responses:
 *       200:
 *         description: User updated
 */
export const updateUser = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await userService.update(req.params.id as string, req.body);
  ApiResponse.success(res, user, 'User updated successfully');
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Soft delete user (admin only)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: User soft deleted
 */
export const softDeleteUser = asyncHandler(async (req: AuthRequest, res: Response) => {
  await userService.softDelete(req.params.id as string);
  ApiResponse.success(res, null, 'User deleted successfully');
});
