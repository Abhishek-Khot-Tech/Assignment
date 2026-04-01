import { Response } from 'express';
import { AuthRequest } from '../../middleware/authenticate';
import { transactionService } from './transaction.service';
import { ApiResponse } from '../../utils/ApiResponse';
import { asyncHandler } from '../../utils/asyncHandler';
import { parsePagination } from '../../utils/pagination';

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
export const createTransaction = asyncHandler(async (req: AuthRequest, res: Response) => {
  const transaction = await transactionService.create(req.body, req.user._id);
  ApiResponse.created(res, transaction, 'Transaction created successfully');
});

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
export const getTransactions = asyncHandler(async (req: AuthRequest, res: Response) => {
  const pagination = parsePagination(req.query);
  const { transactions, total } = await transactionService.findAll(req.query, pagination);
  ApiResponse.paginated(res, transactions, total, pagination.page, pagination.limit, 'Transactions fetched successfully');
});

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
export const getTransactionById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const transaction = await transactionService.findById(req.params.id as string);
  ApiResponse.success(res, transaction, 'Transaction fetched successfully');
});

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
export const updateTransaction = asyncHandler(async (req: AuthRequest, res: Response) => {
  const transaction = await transactionService.update(req.params.id as string, req.body);
  ApiResponse.success(res, transaction, 'Transaction updated successfully');
});

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
export const softDeleteTransaction = asyncHandler(async (req: AuthRequest, res: Response) => {
  await transactionService.softDelete(req.params.id as string);
  ApiResponse.success(res, null, 'Transaction deleted successfully');
});

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
export const getCategories = asyncHandler(async (req: AuthRequest, res: Response) => {
  const categories = await transactionService.getCategories();
  ApiResponse.success(res, categories, 'Categories fetched successfully');
});
