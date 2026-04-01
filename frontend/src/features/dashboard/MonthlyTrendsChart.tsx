"import { 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { formatCurrency } from '../../utils/formatCurrency';
import { getMonthName } from '../../utils/formatDate';
import { Skeleton } from '../../components/ui/skeleton';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className=\"bg-card border border-border p-3 rounded shadow-lg\">
        <p className=\"text-sm font-semibold text-foreground mb-2\">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className=\"text-sm\" style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const MonthlyTrendsChart = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className=\"bg-card border border-border p-6 rounded h-[350px]\">
        <Skeleton className=\"h-5 w-40 mb-6\" />
        <Skeleton className=\"h-[280px] w-full\" />
      </div>
    );
  }
  
  const chartData = (data || []).map(item => ({
    ...item,
    monthLabel: getMonthName(item.month)
  }));
  
  return (
    <div className=\"bg-card border border-border p-6 rounded\" data-testid=\"monthly-trends-chart\">
      <h3 className=\"text-xs uppercase tracking-overline font-medium text-muted-foreground mb-6\">
        Monthly Trends
      </h3>
      <ResponsiveContainer width=\"100%\" height={280}>
        <ComposedChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray=\"3 3\" className=\"stroke-border\" />
          <XAxis 
            dataKey=\"monthLabel\" 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
          />
          <YAxis 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => <span className=\"text-foreground text-sm\">{value}</span>}
          />
          <Bar dataKey=\"income\" name=\"Income\" fill=\"#10B981\" radius={[2, 2, 0, 0]} />
          <Bar dataKey=\"expenses\" name=\"Expenses\" fill=\"#EF4444\" radius={[2, 2, 0, 0]} />
          <Line 
            type=\"monotone\" 
            dataKey=\"net\" 
            name=\"Net Balance\" 
            stroke=\"#3B82F6\" 
            strokeWidth={2}
            dot={{ fill: '#3B82F6', strokeWidth: 2 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
"