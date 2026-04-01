"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionService = void 0;
const transaction_model_1 = require("./transaction.model");
const ApiError_1 = require("../../utils/ApiError");
const pagination_1 = require("../../utils/pagination");
class TransactionService {
    async create(data, userId) {
        const transaction = await transaction_model_1.Transaction.create({
            ...data,
            date: new Date(data.date),
            createdBy: userId,
        });
        return transaction.populate('createdBy', 'name email');
    }
    async findAll(query, pagination) {
        const { page, limit, sortBy, sortOrder } = pagination;
        const skip = (0, pagination_1.getSkip)(page, limit);
        const filter = { deletedAt: null };
        if (query.type)
            filter.type = query.type;
        if (query.category)
            filter.category = query.category;
        if (query.startDate || query.endDate) {
            filter.date = {};
            if (query.startDate)
                filter.date.$gte = new Date(query.startDate);
            if (query.endDate)
                filter.date.$lte = new Date(query.endDate + 'T23:59:59.999Z');
        }
        if (query.minAmount || query.maxAmount) {
            filter.amount = {};
            if (query.minAmount)
                filter.amount.$gte = parseFloat(query.minAmount);
            if (query.maxAmount)
                filter.amount.$lte = parseFloat(query.maxAmount);
        }
        if (query.search) {
            filter.$text = { $search: query.search };
        }
        const [transactions, total] = await Promise.all([
            transaction_model_1.Transaction.find(filter)
                .populate('createdBy', 'name email')
                .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
                .skip(skip)
                .limit(limit),
            transaction_model_1.Transaction.countDocuments(filter),
        ]);
        return { transactions, total };
    }
    async findById(id) {
        const transaction = await transaction_model_1.Transaction.findById(id).populate('createdBy', 'name email');
        if (!transaction) {
            throw ApiError_1.ApiError.notFound('Transaction not found');
        }
        return transaction;
    }
    async update(id, data) {
        const updateData = { ...data };
        if (data.date)
            updateData.date = new Date(data.date);
        const transaction = await transaction_model_1.Transaction.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true }).populate('createdBy', 'name email');
        if (!transaction) {
            throw ApiError_1.ApiError.notFound('Transaction not found');
        }
        return transaction;
    }
    async softDelete(id) {
        const transaction = await transaction_model_1.Transaction.findByIdAndUpdate(id, { $set: { deletedAt: new Date() } }, { new: true });
        if (!transaction) {
            throw ApiError_1.ApiError.notFound('Transaction not found');
        }
        return transaction;
    }
    async getCategories() {
        const categories = await transaction_model_1.Transaction.distinct('category', { deletedAt: null });
        return categories.sort();
    }
}
exports.transactionService = new TransactionService();
//# sourceMappingURL=transaction.service.js.map