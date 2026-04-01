"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
const redis_1 = require("../../config/redis");
const user_model_1 = require("../users/user.model");
const ApiError_1 = require("../../utils/ApiError");
const REFRESH_TOKEN_TTL = 7 * 24 * 60 * 60; // 7 days in seconds
class AuthService {
    generateAccessToken(user) {
        // @ts-ignore
        return jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, env_1.env.JWT_SECRET, { expiresIn: env_1.env.JWT_ACCESS_EXPIRY });
    }
    generateRefreshToken(user) {
        // @ts-ignore
        return jsonwebtoken_1.default.sign({ userId: user._id, type: 'refresh' }, env_1.env.JWT_SECRET, { expiresIn: env_1.env.JWT_REFRESH_EXPIRY });
    }
    async register(data) {
        const existingUser = await user_model_1.User.findOne({ email: data.email });
        if (existingUser) {
            throw ApiError_1.ApiError.conflict('Email already registered');
        }
        const user = await user_model_1.User.create({
            name: data.name,
            email: data.email,
            password: data.password,
            role: 'viewer',
        });
        const accessToken = this.generateAccessToken(user);
        const refreshToken = this.generateRefreshToken(user);
        await redis_1.tokenStore.set(`refresh:${user._id}`, refreshToken, REFRESH_TOKEN_TTL);
        return {
            user: user.toJSON(),
            accessToken,
            refreshToken,
        };
    }
    async login(data) {
        const user = await user_model_1.User.findOne({ email: data.email }).select('+password');
        if (!user) {
            throw ApiError_1.ApiError.unauthorized('Invalid email or password');
        }
        if (user.status !== 'active') {
            throw ApiError_1.ApiError.unauthorized('Account is deactivated. Contact administrator.');
        }
        const isPasswordValid = await user.comparePassword(data.password);
        if (!isPasswordValid) {
            throw ApiError_1.ApiError.unauthorized('Invalid email or password');
        }
        const accessToken = this.generateAccessToken(user);
        const refreshToken = this.generateRefreshToken(user);
        await redis_1.tokenStore.set(`refresh:${user._id}`, refreshToken, REFRESH_TOKEN_TTL);
        return {
            user: user.toJSON(),
            accessToken,
            refreshToken,
        };
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError_1.ApiError.unauthorized('Refresh token is required');
        }
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(refreshToken, env_1.env.JWT_SECRET);
        }
        catch {
            throw ApiError_1.ApiError.unauthorized('Invalid or expired refresh token');
        }
        if (decoded.type !== 'refresh') {
            throw ApiError_1.ApiError.unauthorized('Invalid token type');
        }
        const storedToken = await redis_1.tokenStore.get(`refresh:${decoded.userId}`);
        if (!storedToken || storedToken !== refreshToken) {
            throw ApiError_1.ApiError.unauthorized('Refresh token has been revoked');
        }
        const user = await user_model_1.User.findById(decoded.userId);
        if (!user || user.status !== 'active') {
            throw ApiError_1.ApiError.unauthorized('User not found or inactive');
        }
        const newAccessToken = this.generateAccessToken(user);
        const newRefreshToken = this.generateRefreshToken(user);
        await redis_1.tokenStore.set(`refresh:${user._id}`, newRefreshToken, REFRESH_TOKEN_TTL);
        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };
    }
    async logout(userId) {
        await redis_1.tokenStore.del(`refresh:${userId}`);
    }
    async getMe(userId) {
        const user = await user_model_1.User.findById(userId);
        if (!user) {
            throw ApiError_1.ApiError.notFound('User not found');
        }
        return user.toJSON();
    }
}
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map