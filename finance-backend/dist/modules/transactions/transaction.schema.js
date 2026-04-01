"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionQuerySchema = exports.updateTransactionSchema = exports.createTransactionSchema = void 0;
const zod_1 = require("zod");
exports.createTransactionSchema = zod_1.z.object({
    amount: zod_1.z.number().positive('Amount must be positive'),
    type: zod_1.z.enum(['income', 'expense'], { required_error: 'Type is required' }),
    category: zod_1.z.string().min(1, 'Category is required'),
    date: zod_1.z.string().min(1, 'Date is required'),
    notes: zod_1.z.string().optional().default(''),
    description: zod_1.z.string().optional().default(''),
});
exports.updateTransactionSchema = zod_1.z.object({
    amount: zod_1.z.number().positive('Amount must be positive').optional(),
    type: zod_1.z.enum(['income', 'expense']).optional(),
    category: zod_1.z.string().min(1).optional(),
    date: zod_1.z.string().optional(),
    notes: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
});
exports.transactionQuerySchema = zod_1.z.object({
    type: zod_1.z.enum(['income', 'expense']).optional(),
    category: zod_1.z.string().optional(),
    startDate: zod_1.z.string().optional(),
    endDate: zod_1.z.string().optional(),
    minAmount: zod_1.z.string().optional(),
    maxAmount: zod_1.z.string().optional(),
    search: zod_1.z.string().optional(),
    page: zod_1.z.string().optional(),
    limit: zod_1.z.string().optional(),
    sortBy: zod_1.z.string().optional(),
    sortOrder: zod_1.z.enum(['asc', 'desc']).optional(),
});
//# sourceMappingURL=transaction.schema.js.map