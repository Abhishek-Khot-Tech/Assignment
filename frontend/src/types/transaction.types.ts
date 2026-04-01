export type TransactionType = 'income' | 'expense';

export interface Transaction {
  _id: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  notes: string;
  description: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface CreateTransactionRequest {
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  description?: string;
  notes?: string;
}

export interface UpdateTransactionRequest {
  amount?: number;
  type?: TransactionType;
  category?: string;
  date?: string;
  description?: string;
  notes?: string;
}

export interface TransactionFilters {
  search?: string;
  type?: TransactionType | 'all';
  category?: string;
  startDate?: string;
  endDate?: string;
  minAmount?: string;
  maxAmount?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface DashboardSummary {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  transactionCount: number;
}

export interface MonthlyTrend {
  month: string;
  income: number;
  expenses: number;
  net: number;
}

export interface CategoryBreakdown {
  category: string;
  total: number;
  count: number;
  percentage: number;
}

export interface WeeklySummary {
  day: string;
  income: number;
  expenses: number;
}
