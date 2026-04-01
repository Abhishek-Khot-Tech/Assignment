"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeeklySummary = exports.getRecentActivity = exports.getMonthlyTrends = exports.getCategoryBreakdown = exports.getSummary = void 0;
const dashboard_service_1 = require("./dashboard.service");
const ApiResponse_1 = require("../../utils/ApiResponse");
const asyncHandler_1 = require("../../utils/asyncHandler");
/**
 * @swagger
 * /dashboard/summary:
 *   get:
 *     tags: [Dashboard]
 *     summary: Get financial summary (totalIncome, totalExpenses, netBalance, transactionCount)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: endDate
 *         schema: { type: string, format: date }
 *     responses:
 *       200:
 *         description: Financial summary
 */
exports.getSummary = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = await dashboard_service_1.dashboardService.getSummary(req.query);
    ApiResponse_1.ApiResponse.success(res, data, 'Summary fetched successfully');
});
/**
 * @swagger
 * /dashboard/category-breakdown:
 *   get:
 *     tags: [Dashboard]
 *     summary: Get expense breakdown by category
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: endDate
 *         schema: { type: string, format: date }
 *     responses:
 *       200:
 *         description: Category breakdown with percentages
 */
exports.getCategoryBreakdown = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = await dashboard_service_1.dashboardService.getCategoryBreakdown(req.query);
    ApiResponse_1.ApiResponse.success(res, data, 'Category breakdown fetched successfully');
});
/**
 * @swagger
 * /dashboard/monthly-trends:
 *   get:
 *     tags: [Dashboard]
 *     summary: Get monthly income vs expenses trends
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: endDate
 *         schema: { type: string, format: date }
 *     responses:
 *       200:
 *         description: Monthly trends data
 */
exports.getMonthlyTrends = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = await dashboard_service_1.dashboardService.getMonthlyTrends(req.query);
    ApiResponse_1.ApiResponse.success(res, data, 'Monthly trends fetched successfully');
});
/**
 * @swagger
 * /dashboard/recent-activity:
 *   get:
 *     tags: [Dashboard]
 *     summary: Get last 10 transactions
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Recent transactions
 */
exports.getRecentActivity = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = await dashboard_service_1.dashboardService.getRecentActivity();
    ApiResponse_1.ApiResponse.success(res, data, 'Recent activity fetched successfully');
});
/**
 * @swagger
 * /dashboard/weekly-summary:
 *   get:
 *     tags: [Dashboard]
 *     summary: Get current week summary by day
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: endDate
 *         schema: { type: string, format: date }
 *     responses:
 *       200:
 *         description: Weekly summary
 */
exports.getWeeklySummary = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = await dashboard_service_1.dashboardService.getWeeklySummary(req.query);
    ApiResponse_1.ApiResponse.success(res, data, 'Weekly summary fetched successfully');
});
//# sourceMappingURL=dashboard.controller.js.map