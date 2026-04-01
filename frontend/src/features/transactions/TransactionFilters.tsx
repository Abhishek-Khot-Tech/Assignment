"import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Search, X } from 'lucide-react';

export const TransactionFilters = ({ filters, setFilters, categories, onClear }) => {
  const hasFilters = filters.search || 
    filters.type !== 'all' || 
    filters.category !== 'all' || 
    filters.startDate || 
    filters.endDate || 
    filters.minAmount || 
    filters.maxAmount;
  
  return (
    <div className=\"bg-card border border-border p-4 rounded space-y-4\" data-testid=\"transaction-filters\">
      <div className=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4\">
        {/* Search */}
        <div className=\"space-y-1 sm:col-span-2 lg:col-span-1\">
          <Label className=\"text-xs uppercase tracking-overline font-medium text-muted-foreground\">
            Search
          </Label>
          <div className=\"relative\">
            <Search className=\"absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground\" />
            <Input
              placeholder=\"Search notes, description...\"
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className=\"pl-9\"
              data-testid=\"filter-search\"
            />
          </div>
        </div>
        
        {/* Type */}
        <div className=\"space-y-1\">
          <Label className=\"text-xs uppercase tracking-overline font-medium text-muted-foreground\">
            Type
          </Label>
          <Select
            value={filters.type}
            onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}
          >
            <SelectTrigger data-testid=\"filter-type\">
              <SelectValue placeholder=\"All types\" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=\"all\">All</SelectItem>
              <SelectItem value=\"income\">Income</SelectItem>
              <SelectItem value=\"expense\">Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Category */}
        <div className=\"space-y-1\">
          <Label className=\"text-xs uppercase tracking-overline font-medium text-muted-foreground\">
            Category
          </Label>
          <Select
            value={filters.category}
            onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
          >
            <SelectTrigger data-testid=\"filter-category\">
              <SelectValue placeholder=\"All categories\" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=\"all\">All</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Clear */}
        <div className=\"flex items-end\">
          {hasFilters && (
            <Button variant=\"ghost\" onClick={onClear} className=\"w-full\" data-testid=\"clear-filters\">
              <X className=\"h-4 w-4 mr-2\" />
              Clear filters
            </Button>
          )}
        </div>
      </div>
      
      <div className=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4\">
        {/* Start Date */}
        <div className=\"space-y-1\">
          <Label className=\"text-xs uppercase tracking-overline font-medium text-muted-foreground\">
            Start Date
          </Label>
          <Input
            type=\"date\"
            value={filters.startDate}
            onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
            data-testid=\"filter-start-date\"
          />
        </div>
        
        {/* End Date */}
        <div className=\"space-y-1\">
          <Label className=\"text-xs uppercase tracking-overline font-medium text-muted-foreground\">
            End Date
          </Label>
          <Input
            type=\"date\"
            value={filters.endDate}
            onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
            data-testid=\"filter-end-date\"
          />
        </div>
        
        {/* Min Amount */}
        <div className=\"space-y-1\">
          <Label className=\"text-xs uppercase tracking-overline font-medium text-muted-foreground\">
            Min Amount
          </Label>
          <Input
            type=\"number\"
            placeholder=\"0\"
            value={filters.minAmount}
            onChange={(e) => setFilters(prev => ({ ...prev, minAmount: e.target.value }))}
            data-testid=\"filter-min-amount\"
          />
        </div>
        
        {/* Max Amount */}
        <div className=\"space-y-1\">
          <Label className=\"text-xs uppercase tracking-overline font-medium text-muted-foreground\">
            Max Amount
          </Label>
          <Input
            type=\"number\"
            placeholder=\"999999\"
            value={filters.maxAmount}
            onChange={(e) => setFilters(prev => ({ ...prev, maxAmount: e.target.value }))}
            data-testid=\"filter-max-amount\"
          />
        </div>
      </div>
    </div>
  );
};
"