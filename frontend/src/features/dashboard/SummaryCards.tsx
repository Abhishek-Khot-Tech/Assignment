import { ArrowUpRight, ArrowDownRight, TrendingUp, Receipt } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import { cn } from '../../utils/cn';
import { Skeleton } from '../../components/ui/skeleton';

const KPICard = ({ title, value, icon: Icon, trend, variant = 'default', isLoading }: any) => {
  const variants = {
    income: 'border-l-emerald-500 text-emerald-600 dark:text-emerald-400',
    expense: 'border-l-red-500 text-red-600 dark:text-red-400',
    balance: 'border-l-blue-500 text-blue-600 dark:text-blue-400',
    default: 'border-l-primary text-foreground'
  };
  
  if (isLoading) {
    return (
      <div className="bg-card border border-border border-l-4 border-l-muted p-6 rounded">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-4 w-20" />
      </div>
    );
  }
  
  const isPositive = trend > 0;
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;
  
  return (
    <div 
      className={cn(
        "bg-card border border-border border-l-4 p-6 rounded",
        variants[variant]
      )}
      data-testid={`kpi-card-${variant}`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs uppercase tracking-overline font-medium text-muted-foreground">
          {title}
        </span>
        <div className="h-8 w-8 bg-secondary rounded flex items-center justify-center">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      <p className={cn("text-2xl font-bold tracking-tight", variants[variant])}>
        {typeof value === 'number' ? formatCurrency(value) : value}
      </p>
      {trend !== undefined && (
        <div className={cn(
          "flex items-center gap-1 mt-2 text-sm",
          isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
        )}>
          <TrendIcon className="h-4 w-4" />
          <span>{Math.abs(trend).toFixed(1)}% from last period</span>
        </div>
      )}
    </div>
  );
};

export const SummaryCards = ({ data, isLoading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="summary-cards">
      <KPICard
        title="Total Income"
        value={data?.totalIncome || 0}
        icon={TrendingUp}
        trend={12.5}
        variant="income"
        isLoading={isLoading}
      />
      <KPICard
        title="Total Expenses"
        value={data?.totalExpenses || 0}
        icon={ArrowDownRight}
        trend={-8.3}
        variant="expense"
        isLoading={isLoading}
      />
      <KPICard
        title="Net Balance"
        value={data?.netBalance || 0}
        icon={TrendingUp}
        trend={(data?.netBalance || 0) > 0 ? 15.2 : -5.1}
        variant="balance"
        isLoading={isLoading}
      />
      <KPICard
        title="Transactions"
        value={data?.transactionCount || 0}
        icon={Receipt}
        variant="default"
        isLoading={isLoading}
      />
    </div>
  );
};
