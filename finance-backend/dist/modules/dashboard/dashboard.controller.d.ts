import { Response } from 'express';
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
export declare const getSummary: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
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
export declare const getCategoryBreakdown: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
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
export declare const getMonthlyTrends: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
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
export declare const getRecentActivity: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
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
export declare const getWeeklySummary: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
//# sourceMappingURL=dashboard.controller.d.ts.map