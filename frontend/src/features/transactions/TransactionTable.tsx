import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { cn } from '../../utils/cn';
import { Skeleton } from '../../components/ui/skeleton';
import { Button } from '../../components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Pencil, Trash2, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

export const TransactionTable = ({
  data,
  meta,
  isLoading,
  pagination,
  setPagination,
  sort,
  onSort,
  onEdit,
  onDelete
}) => {
  const { page, limit } = pagination;
  const totalPages = meta?.totalPages || 1;
  const total = meta?.total || 0;

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded">
        <div className="p-4 space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded" data-testid="transaction-table">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="text-xs uppercase tracking-overline cursor-pointer"
                onClick={() => onSort('date')}
              >
                <span className="flex items-center gap-1">
                  Date
                  {sort.sortBy === 'date' && (
                    <ArrowUpDown className={cn("h-3 w-3", sort.sortOrder === 'asc' && 'rotate-180')} />
                  )}
                </span>
              </TableHead>
              <TableHead className="text-xs uppercase tracking-overline">Category</TableHead>
              <TableHead className="text-xs uppercase tracking-overline">Type</TableHead>
              <TableHead
                className="text-xs uppercase tracking-overline text-right cursor-pointer"
                onClick={() => onSort('amount')}
              >
                <span className="flex items-center justify-end gap-1">
                  Amount
                  {sort.sortBy === 'amount' && (
                    <ArrowUpDown className={cn("h-3 w-3", sort.sortOrder === 'asc' && 'rotate-180')} />
                  )}
                </span>
              </TableHead>
              <TableHead className="text-xs uppercase tracking-overline">Description</TableHead>
              <TableHead className="text-xs uppercase tracking-overline">Created By</TableHead>
              {(onEdit || onDelete) && (
                <TableHead className="text-xs uppercase tracking-overline text-right">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12">
                  <div className="text-muted-foreground">
                    <p className="text-lg font-medium">No transactions found</p>
                    <p className="text-sm">Try adjusting your filters</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((tx) => (
                <TableRow key={tx._id} className="hover:bg-secondary/50">
                  <TableCell className="text-sm">{formatDate(tx.date)}</TableCell>
                  <TableCell className="text-sm">{tx.category}</TableCell>
                  <TableCell>
                    <span className={cn(
                      "text-sm font-medium capitalize",
                      tx.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                    )}>
                      {tx.type}
                    </span>
                  </TableCell>
                  <TableCell className={cn(
                    "text-sm font-medium text-right tabular-nums",
                    tx.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                  )}>
                    {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                    {tx.description || '-'}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {tx.createdBy?.name || '-'}
                  </TableCell>
                  {(onEdit || onDelete) && (
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {onEdit && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onEdit(tx)}
                            data-testid={`edit-transaction-${tx._id}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => onDelete(tx._id)}
                            data-testid={`delete-transaction-${tx._id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-t border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Showing {start}–{end} of {total} results</span>
          <Select
            value={String(limit)}
            onValueChange={(value) => setPagination({ page: 1, limit: Number(value) })}
          >
            <SelectTrigger className="w-20 h-8" data-testid="page-size-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span>per page</span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={page === 1}
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
            data-testid="pagination-prev"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {[...Array(Math.min(5, totalPages))].map((_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (page <= 3) {
              pageNum = i + 1;
            } else if (page >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = page - 2 + i;
            }

            return (
              <Button
                key={pageNum}
                variant={page === pageNum ? 'default' : 'outline'}
                size="icon"
                className="h-8 w-8"
                onClick={() => setPagination(prev => ({ ...prev, page: pageNum }))}
                data-testid={`pagination-page-${pageNum}`}
              >
                {pageNum}
              </Button>
            );
          })}

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={page === totalPages}
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
            data-testid="pagination-next"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
