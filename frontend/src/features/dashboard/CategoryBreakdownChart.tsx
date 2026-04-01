import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { formatCurrency } from '../../utils/formatCurrency';
import { Skeleton } from '../../components/ui/skeleton';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card border border-border p-3 rounded shadow-lg">
        <p className="text-sm font-semibold text-foreground">{data.category}</p>
        <p className="text-sm text-muted-foreground">{formatCurrency(data.total)}</p>
        <p className="text-sm text-muted-foreground">{data.percentage}%</p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => {
  return (
    <ul className="space-y-2">
      {payload.map((entry, index) => (
        <li key={index} className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2">
            <span 
              className="w-3 h-3 rounded-sm" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-foreground">{entry.payload.category}</span>
          </span>
          <span className="text-muted-foreground">{entry.payload.percentage}%</span>
        </li>
      ))}
    </ul>
  );
};

export const CategoryBreakdownChart = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-card border border-border p-6 rounded h-[350px]">
        <Skeleton className="h-5 w-40 mb-6" />
        <Skeleton className="h-[280px] w-full" />
      </div>
    );
  }
  
  const chartData = data || [];
  const total = chartData.reduce((sum, item) => sum + item.total, 0);
  
  return (
    <div className="bg-card border border-border p-6 rounded h-full" data-testid="category-breakdown-chart">
      <h3 className="text-xs uppercase tracking-overline font-medium text-muted-foreground mb-6">
        Expense Breakdown
      </h3>
      <div className="flex flex-col lg:flex-row items-center gap-4">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="total"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-foreground font-semibold text-lg"
            >
              {formatCurrency(total)}
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4">
        <CustomLegend 
          payload={chartData.map((item, index) => ({
            color: COLORS[index % COLORS.length],
            payload: item
          }))} 
        />
      </div>
    </div>
  );
};
