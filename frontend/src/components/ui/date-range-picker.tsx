import { Input } from './input';
import { Label } from './label';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartChange: (val: string) => void;
  onEndChange: (val: string) => void;
  className?: string;
}

export const DateRangePicker = ({ startDate, endDate, onStartChange, onEndChange, className }: DateRangePickerProps) => (
  <div className={`flex flex-wrap items-end gap-4 ${className || ''}`}>
    <div className="space-y-1">
      <Label className="text-xs uppercase tracking-[0.15em] font-medium text-muted-foreground">
        Start Date
      </Label>
      <Input
        type="date"
        value={startDate}
        onChange={(e) => onStartChange(e.target.value)}
        className="w-40"
      />
    </div>
    <div className="space-y-1">
      <Label className="text-xs uppercase tracking-[0.15em] font-medium text-muted-foreground">
        End Date
      </Label>
      <Input
        type="date"
        value={endDate}
        onChange={(e) => onEndChange(e.target.value)}
        className="w-40"
      />
    </div>
  </div>
);
