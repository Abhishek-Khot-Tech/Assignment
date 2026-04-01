import { Response } from 'express';
import { AuthRequest } from '../../middleware/authenticate';
import { dashboardService } from './dashboard.service';
import { ApiResponse } from '../../utils/ApiResponse';
import { asyncHandler } from '../../utils/asyncHandler';

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
export const getSummary = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await dashboardService.getSummary(req.query as any);
  ApiResponse.success(res, data, 'Summary fetched successfully');
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
export const getCategoryBreakdown = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await dashboardService.getCategoryBreakdown(req.query as any);
  ApiResponse.success(res, data, 'Category breakdown fetched successfully');
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
export const getMonthlyTrends = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await dashboardService.getMonthlyTrends(req.query as any);
  ApiResponse.success(res, data, 'Monthly trends fetched successfully');
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
export const getRecentActivity = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await dashboardService.getRecentActivity();
  ApiResponse.success(res, data, 'Recent activity fetched successfully');
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
export const getWeeklySummary = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await dashboardService.getWeeklySummary(req.query as any);
  ApiResponse.success(res, data, 'Weekly summary fetched successfully');
});
