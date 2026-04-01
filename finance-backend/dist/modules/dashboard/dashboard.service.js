"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardService = void 0;
const transaction_model_1 = require("../transactions/transaction.model");
class DashboardService {
    buildDateFilter(range) {
        const match = { deletedAt: null };
        if (range.startDate || range.endDate) {
            match.date = {};
            if (range.startDate)
                match.date.$gte = new Date(range.startDate);
            if (range.endDate)
                match.date.$lte = new Date(range.endDate + 'T23:59:59.999Z');
        }
        return match;
    }
    async getSummary(range) {
        const match = this.buildDateFilter(range);
        const [result] = await transaction_model_1.Transaction.aggregate([
            { $match: match },
            {
                $group: {
                    _id: null,
                    totalIncome: {
                        $sum: { $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0] },
                    },
                    totalExpenses: {
                        $sum: { $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0] },
                    },
                    transactionCount: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    totalIncome: 1,
                    totalExpenses: 1,
                    netBalance: { $subtract: ['$totalIncome', '$totalExpenses'] },
                    transactionCount: 1,
                },
            },
        ]);
        return result || { totalIncome: 0, totalExpenses: 0, netBalance: 0, transactionCount: 0 };
    }
    async getCategoryBreakdown(range) {
        const match = this.buildDateFilter(range);
        const result = await transaction_model_1.Transaction.aggregate([
            { $match: match },
            {
                $group: {
                    _id: '$category',
                    total: { $sum: '$amount' },
                    count: { $sum: 1 },
                },
            },
            { $sort: { total: -1 } },
        ]);
        const grandTotal = result.reduce((sum, item) => sum + item.total, 0);
        return result.map((item) => ({
            category: item._id,
            total: item.total,
            count: item.count,
            percentage: grandTotal > 0 ? Math.round((item.total / grandTotal) * 1000) / 10 : 0,
        }));
    }
    async getMonthlyTrends(range) {
        const match = this.buildDateFilter(range);
        // Default to last 12 months if no range specified
        if (!range.startDate && !range.endDate) {
            const twelveMonthsAgo = new Date();
            twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
            match.date = { $gte: twelveMonthsAgo };
        }
        const result = await transaction_model_1.Transaction.aggregate([
            { $match: match },
            {
                $group: {
                    _id: {
                        year: { $year: '$date' },
                        month: { $month: '$date' },
                    },
                    income: {
                        $sum: { $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0] },
                    },
                    expenses: {
                        $sum: { $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0] },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    month: {
                        $concat: [
                            { $toString: '$_id.year' },
                            '-',
                            {
                                $cond: [
                                    { $lt: ['$_id.month', 10] },
                                    { $concat: ['0', { $toString: '$_id.month' }] },
                                    { $toString: '$_id.month' },
                                ],
                            },
                        ],
                    },
                    income: 1,
                    expenses: 1,
                    net: { $subtract: ['$income', '$expenses'] },
                },
            },
            { $sort: { month: 1 } },
        ]);
        return result;
    }
    async getRecentActivity() {
        const transactions = await transaction_model_1.Transaction.find({ deletedAt: null })
            .populate('createdBy', 'name email')
            .sort({ date: -1 })
            .limit(10);
        return transactions;
    }
    async getWeeklySummary(range) {
        // Default to current week
        const now = new Date();
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        weekStart.setHours(0, 0, 0, 0);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);
        const match = {
            deletedAt: null,
            date: {
                $gte: range.startDate ? new Date(range.startDate) : weekStart,
                $lte: range.endDate ? new Date(range.endDate + 'T23:59:59.999Z') : weekEnd,
            },
        };
        const result = await transaction_model_1.Transaction.aggregate([
            { $match: match },
            {
                $group: {
                    _id: { $dayOfWeek: '$date' },
                    income: {
                        $sum: { $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0] },
                    },
                    expenses: {
                        $sum: { $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0] },
                    },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return result.map((item) => ({
            day: dayNames[item._id - 1],
            income: item.income,
            expenses: item.expenses,
        }));
    }
}
exports.dashboardService = new DashboardService();
//# sourceMappingURL=dashboard.service.js.map