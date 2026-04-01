"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.logout = exports.refresh = exports.login = exports.register = void 0;
const auth_service_1 = require("./auth.service");
const ApiResponse_1 = require("../../utils/ApiResponse");
const asyncHandler_1 = require("../../utils/asyncHandler");
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
};
/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name: { type: string, example: "John Doe" }
 *               email: { type: string, example: "john@example.com" }
 *               password: { type: string, example: "password123" }
 *     responses:
 *       201:
 *         description: User registered successfully
 *       409:
 *         description: Email already exists
 */
exports.register = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const result = await auth_service_1.authService.register(req.body);
    res.cookie('refreshToken', result.refreshToken, COOKIE_OPTIONS);
    ApiResponse_1.ApiResponse.created(res, {
        user: result.user,
        accessToken: result.accessToken,
    }, 'User registered successfully');
});
/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, example: "admin@jpmorgan.com" }
 *               password: { type: string, example: "admin123" }
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
exports.login = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const result = await auth_service_1.authService.login(req.body);
    res.cookie('refreshToken', result.refreshToken, COOKIE_OPTIONS);
    ApiResponse_1.ApiResponse.success(res, {
        user: result.user,
        accessToken: result.accessToken,
    }, 'Login successful');
});
/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     tags: [Auth]
 *     summary: Refresh access token
 *     responses:
 *       200:
 *         description: Token refreshed
 *       401:
 *         description: Invalid refresh token
 */
exports.refresh = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
    const result = await auth_service_1.authService.refresh(refreshToken);
    res.cookie('refreshToken', result.refreshToken, COOKIE_OPTIONS);
    ApiResponse_1.ApiResponse.success(res, { accessToken: result.accessToken }, 'Token refreshed');
});
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Logout and invalidate refresh token
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
exports.logout = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (req.user) {
        await auth_service_1.authService.logout(req.user._id);
    }
    res.clearCookie('refreshToken', { path: '/' });
    ApiResponse_1.ApiResponse.success(res, null, 'Logged out successfully');
});
/**
 * @swagger
 * /auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: Get current user profile
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Current user data
 */
exports.getMe = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const user = await auth_service_1.authService.getMe(req.user._id);
    ApiResponse_1.ApiResponse.success(res, user, 'User profile fetched');
});
//# sourceMappingURL=auth.controller.js.map