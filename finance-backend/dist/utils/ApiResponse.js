"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
const http_status_codes_1 = require("http-status-codes");
class ApiResponse {
    static success(res, data, message = 'Success', statusCode = http_status_codes_1.StatusCodes.OK, meta) {
        const response = {
            success: true,
            message,
            data,
        };
        if (meta) {
            response.meta = meta;
        }
        return res.status(statusCode).json(response);
    }
    static created(res, data, message = 'Created successfully') {
        return ApiResponse.success(res, data, message, http_status_codes_1.StatusCodes.CREATED);
    }
    static paginated(res, data, total, page, limit, message = 'Fetched successfully') {
        return ApiResponse.success(res, data, message, http_status_codes_1.StatusCodes.OK, {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        });
    }
}
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=ApiResponse.js.map