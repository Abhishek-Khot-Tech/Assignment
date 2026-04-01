"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const ApiError_1 = require("../utils/ApiError");
const user_model_1 = require("../modules/users/user.model");
const authenticate = async (req, _res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw ApiError_1.ApiError.unauthorized('Access token is required');
        }
        const token = authHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
        const user = await user_model_1.User.findById(decoded.userId).select('-password');
        if (!user) {
            throw ApiError_1.ApiError.unauthorized('User not found');
        }
        if (user.status !== 'active') {
            throw ApiError_1.ApiError.unauthorized('Account is deactivated');
        }
        if (user.deletedAt) {
            throw ApiError_1.ApiError.unauthorized('Account has been deleted');
        }
        req.user = user;
        next();
    }
    catch (error) {
        if (error instanceof ApiError_1.ApiError) {
            next(error);
        }
        else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            next(ApiError_1.ApiError.unauthorized('Invalid access token'));
        }
        else if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            next(ApiError_1.ApiError.unauthorized('Access token expired'));
        }
        else {
            next(ApiError_1.ApiError.unauthorized('Authentication failed'));
        }
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.js.map