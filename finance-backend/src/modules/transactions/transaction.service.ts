import { Transaction } from './transaction.model';
import { ApiError } from '../../utils/ApiError';
import { getSkip, PaginationOptions } from '../../utils/pagination';
import { CreateTransactionInput, UpdateTransactionInput } from './transaction.schema';

class TransactionService {
  async create(data: CreateTransactionInput, userId: string) {
    const transaction = await Transaction.create({
      ...data,
      date: new Date(data.date),
      createdBy: userId,
    });

    return transaction.populate('createdBy', 'name email');
  }

  async findAll(query: any, pagination: PaginationOptions) {
    const { page, limit, sortBy, sortOrder } = pagination;
    const skip = getSkip(page, limit);

    const filter: any = { deletedAt: null };

    if (query.type) filter.type = query.type;
    if (query.category) filter.category = query.category;

    if (query.startDate || query.endDate) {
      filter.date = {};
      if (query.startDate) filter.date.$gte = new Date(query.startDate);
      if (query.endDate) filter.date.$lte = new Date(query.endDate + 'T23:59:59.999Z');
    }

    if (query.minAmount || query.maxAmount) {
      filter.amount = {};
      if (query.minAmount) filter.amount.$gte = parseFloat(query.minAmount);
      if (query.maxAmount) filter.amount.$lte = parseFloat(query.maxAmount);
    }

    if (query.search) {
      filter.$text = { $search: query.search };
    }

    const [transactions, total] = await Promise.all([
      Transaction.find(filter)
        .populate('createdBy', 'name email')
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(limit),
      Transaction.countDocuments(filter),
    ]);

    return { transactions, total };
  }

  async findById(id: string) {
    const transaction = await Transaction.findById(id).populate('createdBy', 'name email');
    if (!transaction) {
      throw ApiError.notFound('Transaction not found');
    }
    return transaction;
  }

  async update(id: string, data: UpdateTransactionInput) {
    const updateData: any = { ...data };
    if (data.date) updateData.date = new Date(data.date);

    const transaction = await Transaction.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email');

    if (!transaction) {
      throw ApiError.notFound('Transaction not found');
    }

    return transaction;
  }

  async softDelete(id: string) {
    const transaction = await Transaction.findByIdAndUpdate(
      id,
      { $set: { deletedAt: new Date() } },
      { new: true }
    );

    if (!transaction) {
      throw ApiError.notFound('Transaction not found');
    }

    return transaction;
  }

  async getCategories() {
    const categories = await Transaction.distinct('category', { deletedAt: null });
    return categories.sort();
  }
}

export const transactionService = new TransactionService();
