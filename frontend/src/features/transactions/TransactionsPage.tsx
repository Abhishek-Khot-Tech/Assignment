import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsApi } from '../../api/transactions.api';
import { TransactionTable } from './TransactionTable';
import { TransactionFilters } from './TransactionFilters';
import { TransactionForm } from './TransactionForm';
import { usePermissions } from '../../hooks/usePermissions';
import { useDebounce } from '../../hooks/useDebounce';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Plus, Download } from 'lucide-react';
import toast from 'react-hot-toast';

export const TransactionsPage = () => {
  const queryClient = useQueryClient();
  const { canCreate, canEdit, canDelete } = usePermissions();

  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    category: 'all',
    startDate: '',
    endDate: '',
    minAmount: '',
    maxAmount: ''
  });
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [sort, setSort] = useState({ sortBy: 'date', sortOrder: 'desc' });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const debouncedSearch = useDebounce(filters.search, 400);

  const params = {
    ...filters,
    search: debouncedSearch,
    ...pagination,
    ...sort,
    type: filters.type === 'all' ? undefined : filters.type,
    category: filters.category === 'all' ? undefined : filters.category,
    minAmount: filters.minAmount || undefined,
    maxAmount: filters.maxAmount || undefined,
    startDate: filters.startDate || undefined,
    endDate: filters.endDate || undefined
  };

  const { data, isLoading } = useQuery({
    queryKey: ['transactions', params],
    queryFn: () => transactionsApi.getAll(params)
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => transactionsApi.getCategories()
  });

  const deleteMutation = useMutation({
    mutationFn: transactionsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success('Transaction deleted');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to delete');
    }
  });

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTransaction(null);
  };

  const handleSort = (column) => {
    setSort(prev => ({
      sortBy: column,
      sortOrder: prev.sortBy === column && prev.sortOrder === 'desc' ? 'asc' : 'desc'
    }));
  };

  const handleExportCSV = () => {
    const transactions = data?.data || [];
    if (transactions.length === 0) {
      toast.error('No data to export');
      return;
    }

    const headers = ['Date', 'Category', 'Type', 'Amount', 'Description', 'Notes', 'Created By'];
    const rows = transactions.map(tx => [
      tx.date,
      tx.category,
      tx.type,
      tx.amount,
      tx.description,
      tx.notes,
      tx.createdBy?.name || ''
    ]);

    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('CSV exported');
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      type: 'all',
      category: 'all',
      startDate: '',
      endDate: '',
      minAmount: '',
      maxAmount: ''
    });
  };

  return (
    <div className="space-y-6" data-testid="transactions-page">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">All Transactions</h2>
          <p className="text-sm text-muted-foreground">
            {data?.meta?.total || 0} total transactions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleExportCSV}
            data-testid="export-csv-button"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          {canCreate && (
            <Button onClick={() => setIsFormOpen(true)} data-testid="add-transaction-button">
              <Plus className="h-4 w-4 mr-2" />
              Add Transaction
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <TransactionFilters
        filters={filters}
        setFilters={setFilters}
        categories={categoriesData?.data || []}
        onClear={clearFilters}
      />

      {/* Table */}
      <TransactionTable
        data={data?.data || []}
        meta={data?.meta}
        isLoading={isLoading}
        pagination={pagination}
        setPagination={setPagination}
        sort={sort}
        onSort={handleSort}
        onEdit={canEdit ? handleEdit : undefined}
        onDelete={canDelete ? handleDelete : undefined}
      />

      {/* Transaction Form Modal */}
      <Dialog open={isFormOpen} onOpenChange={handleFormClose}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
            </DialogTitle>
          </DialogHeader>
          <TransactionForm
            transaction={editingTransaction}
            categories={categoriesData?.data || []}
            onClose={handleFormClose}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransactionsPage;
