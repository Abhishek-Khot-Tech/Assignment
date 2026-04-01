"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.softDeleteUser = exports.updateUser = exports.getUserById = exports.getUsers = void 0;
const user_service_1 = require("./user.service");
const ApiResponse_1 = require("../../utils/ApiResponse");
const asyncHandler_1 = require("../../utils/asyncHandler");
const pagination_1 = require("../../utils/pagination");
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
exports.getUsers = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const pagination = (0, pagination_1.parsePagination)(req.query);
    const { users, total } = await user_service_1.userService.findAll(pagination);
    ApiResponse_1.ApiResponse.paginated(res, users, total, pagination.page, pagination.limit, 'Users fetched successfully');
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
exports.getUserById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const user = await user_service_1.userService.findById(req.params.id);
    ApiResponse_1.ApiResponse.success(res, user, 'User fetched successfully');
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
exports.updateUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const user = await user_service_1.userService.update(req.params.id, req.body);
    ApiResponse_1.ApiResponse.success(res, user, 'User updated successfully');
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
exports.softDeleteUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    await user_service_1.userService.softDelete(req.params.id);
    ApiResponse_1.ApiResponse.success(res, null, 'User deleted successfully');
});
//# sourceMappingURL=user.controller.js.map