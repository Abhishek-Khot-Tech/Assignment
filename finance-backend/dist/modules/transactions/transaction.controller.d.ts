import { Response } from 'express';
/**
 * @swagger
 * /transactions:
 *   post:
 *     tags: [Transactions]
 *     summary: Create a transaction (analyst, admin)
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount, type, category, date]
 *             properties:
 *               amount: { type: number, example: 5000 }
 *               type: { type: string, enum: [income, expense], example: income }
 *               category: { type: string, example: Salary }
 *               date: { type: string, example: "2025-01-15" }
 *               description: { type: string, example: "Monthly salary" }
 *               notes: { type: string, example: "January paycheck" }
 *     responses:
 *       201:
 *         description: Transaction created
 */
export declare const createTransaction: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
/**
 * @swagger
 * /transactions:
 *   get:
 *     tags: [Transactions]
 *     summary: List transactions with filtering and pagination
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema: { type: string, enum: [income, expense] }
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *       - in: query
 *         name: startDate
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: endDate
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: minAmount
 *         schema: { type: number }
 *       - in: query
 *         name: maxAmount
 *         schema: { type: number }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: sortBy
 *         schema: { type: string, enum: [date, amount, createdAt] }
 *       - in: query
 *         name: sortOrder
 *         schema: { type: string, enum: [asc, desc] }
 *     responses:
 *       200:
 *         description: Paginated list of transactions
 */
export declare const getTransactions: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     tags: [Transactions]
 *     summary: Get transaction by ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Transaction details
 */
export declare const getTransactionById: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
/**
 * @swagger
 * /transactions/{id}:
 *   patch:
 *     tags: [Transactions]
 *     summary: Update transaction (analyst, admin)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount: { type: number }
 *               type: { type: string, enum: [income, expense] }
 *               category: { type: string }
 *               date: { type: string }
 *               description: { type: string }
 *               notes: { type: string }
 *     responses:
 *       200:
 *         description: Transaction updated
 */
export declare const updateTransaction: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     tags: [Transactions]
 *     summary: Soft delete transaction (admin only)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Transaction soft deleted
 */
export declare const softDeleteTransaction: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
/**
 * @swagger
 * /transactions/categories/list:
 *   get:
 *     tags: [Transactions]
 *     summary: Get unique category list
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: List of categories
 */
export declare const getCategories: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
//# sourceMappingURL=transaction.controller.d.ts.map