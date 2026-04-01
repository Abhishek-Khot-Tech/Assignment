"import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { cn } from '../../utils/cn';
import { Skeleton } from '../../components/ui/skeleton';
import { ArrowRight } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';

export const RecentActivityTable = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className=\"bg-card border border-border p-6 rounded\">
        <div className=\"flex items-center justify-between mb-6\">
          <Skeleton className=\"h-5 w-40\" />
          <Skeleton className=\"h-4 w-20\" />
        </div>
        <div className=\"space-y-3\">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className=\"h-12 w-full\" />
          ))}
        </div>
      </div>
    );
  }
  
  const transactions = data || [];
  
  return (
    <div className=\"bg-card border border-border p-6 rounded\" data-testid=\"recent-activity-table\">
      <div className=\"flex items-center justify-between mb-6\">
        <h3 className=\"text-xs uppercase tracking-overline font-medium text-muted-foreground\">
          Recent Activity
        </h3>
        <Link 
          to=\"/transactions\" 
          className=\"flex items-center gap-1 text-sm text-primary hover:underline\"
          data-testid=\"view-all-transactions\"
        >
          View all <ArrowRight className=\"h-4 w-4\" />
        </Link>
      </div>
      
      <div className=\"overflow-x-auto\">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className=\"text-xs uppercase tracking-overline\">Date</TableHead>
              <TableHead className=\"text-xs uppercase tracking-overline\">Category</TableHead>
              <TableHead className=\"text-xs uppercase tracking-overline\">Type</TableHead>
              <TableHead className=\"text-xs uppercase tracking-overline text-right\">Amount</TableHead>
              <TableHead className=\"text-xs uppercase tracking-overline\">Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className=\"text-center py-8 text-muted-foreground\">
                  No recent transactions
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((tx) => (
                <TableRow key={tx._id}>
                  <TableCell className=\"text-sm\">{formatDate(tx.date)}</TableCell>
                  <TableCell className=\"text-sm\">{tx.category}</TableCell>
                  <TableCell>
                    <span className={cn(
                      \"text-sm font-medium\",
                      tx.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                    )}>
                      {tx.type}
                    </span>
                  </TableCell>
                  <TableCell className={cn(
                    \"text-sm font-medium text-right\",
                    tx.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                  )}>
                    {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </TableCell>
                  <TableCell className=\"text-sm text-muted-foreground max-w-[200px] truncate\">
                    {tx.notes || '-'}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
"