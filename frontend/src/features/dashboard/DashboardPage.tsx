import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../../api/dashboard.api';
import { SummaryCards } from './SummaryCards';
import { MonthlyTrendsChart } from './MonthlyTrendsChart';
import { CategoryBreakdownChart } from './CategoryBreakdownChart';
import { RecentActivityTable } from './RecentActivityTable';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { format, subDays } from 'date-fns';

export const DashboardPage = () => {
  const [dateRange, setDateRange] = useState({
    startDate: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
    endDate: format(new Date(), 'yyyy-MM-dd')
  });

  const params = {
    startDate: dateRange.startDate,
    endDate: dateRange.endDate
  };

  const { data: summaryData, isLoading: summaryLoading } = useQuery({
    queryKey: ['dashboard-summary', params],
    queryFn: () => dashboardApi.getSummary(params)
  });

  const { data: trendsData, isLoading: trendsLoading } = useQuery({
    queryKey: ['dashboard-trends', params],
    queryFn: () => dashboardApi.getMonthlyTrends(params)
  });

  const { data: categoryData, isLoading: categoryLoading } = useQuery({
    queryKey: ['dashboard-categories', params],
    queryFn: () => dashboardApi.getCategoryBreakdown(params)
  });

  const { data: activityData, isLoading: activityLoading } = useQuery({
    queryKey: ['dashboard-activity'],
    queryFn: () => dashboardApi.getRecentActivity()
  });

  return (
    <div className="space-y-6" data-testid="dashboard-page">
      {/* Date Range Filter */}
      <div className="flex flex-wrap items-end gap-4 p-4 bg-card border border-border rounded">
        <div className="space-y-1">
          <Label className="text-xs uppercase tracking-overline font-medium text-muted-foreground">
            Start Date
          </Label>
          <Input
            type="date"
            value={dateRange.startDate}
            onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
            className="w-40"
            data-testid="date-range-start"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs uppercase tracking-overline font-medium text-muted-foreground">
            End Date
          </Label>
          <Input
            type="date"
            value={dateRange.endDate}
            onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
            className="w-40"
            data-testid="date-range-end"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <SummaryCards data={summaryData?.data} isLoading={summaryLoading} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <MonthlyTrendsChart data={trendsData?.data} isLoading={trendsLoading} />
        </div>
        <div>
          <CategoryBreakdownChart data={categoryData?.data} isLoading={categoryLoading} />
        </div>
      </div>

      {/* Recent Activity */}
      <RecentActivityTable data={activityData?.data} isLoading={activityLoading} />
    </div>
  );
};

export default DashboardPage;
