"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_model_1 = require("./user.model");
const ApiError_1 = require("../../utils/ApiError");
const pagination_1 = require("../../utils/pagination");
class UserService {
    async findAll(pagination) {
        const { page, limit, sortBy, sortOrder } = pagination;
        const skip = (0, pagination_1.getSkip)(page, limit);
        const [users, total] = await Promise.all([
            user_model_1.User.find()
                .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
                .skip(skip)
                .limit(limit)
                .select('-password'),
            user_model_1.User.countDocuments(),
        ]);
        return { users, total };
    }
    async findById(id) {
        const user = await user_model_1.User.findById(id).select('-password');
        if (!user) {
            throw ApiError_1.ApiError.notFound('User not found');
        }
        return user;
    }
    async update(id, data) {
        const user = await user_model_1.User.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true }).select('-password');
        if (!user) {
            throw ApiError_1.ApiError.notFound('User not found');
        }
        return user;
    }
    async softDelete(id) {
        const user = await user_model_1.User.findByIdAndUpdate(id, { $set: { deletedAt: new Date() } }, { new: true }).select('-password');
        if (!user) {
            throw ApiError_1.ApiError.notFound('User not found');
        }
        return user;
    }
}
exports.userService = new UserService();
//# sourceMappingURL=user.service.js.map