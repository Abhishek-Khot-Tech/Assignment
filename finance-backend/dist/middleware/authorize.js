"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const ApiError_1 = require("../utils/ApiError");
const authorize = (...roles) => {
    return (req, _res, next) => {
        if (!req.user) {
            return next(ApiError_1.ApiError.unauthorized('Authentication required'));
        }
        if (!roles.includes(req.user.role)) {
            return next(ApiError_1.ApiError.forbidden(`Access denied. Required role(s): ${roles.join(', ')}. Your role: ${req.user.role}`));
        }
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=authorize.js.map