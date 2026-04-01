"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
const http_status_codes_1 = require("http-status-codes");
class ApiError extends Error {
    constructor(statusCode, message, errors) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        Object.setPrototypeOf(this, ApiError.prototype);
    }
    static badRequest(message, errors) {
        return new ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, message, errors);
    }
    static unauthorized(message = 'Unauthorized') {
        return new ApiError(http_status_codes_1.StatusCodes.UNAUTHORIZED, message);
    }
    static forbidden(message = 'Forbidden') {
        return new ApiError(http_status_codes_1.StatusCodes.FORBIDDEN, message);
    }
    static notFound(message = 'Resource not found') {
        return new ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, message);
    }
    static conflict(message) {
        return new ApiError(http_status_codes_1.StatusCodes.CONFLICT, message);
    }
    static internal(message = 'Internal server error') {
        return new ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, message);
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=ApiError.js.map