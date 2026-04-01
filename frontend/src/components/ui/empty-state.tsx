import { FileX, LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface EmptyStateProps {
    title?: string;
    description?: string;
    icon?: LucideIcon;
    className?: string;
}

export const EmptyState = ({ title = 'No data found', description = '', icon: Icon = FileX, className }: EmptyStateProps) => (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Icon className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-1">{title}</h3>
        {description && <p className="text-sm text-muted-foreground max-w-sm">{description}</p>}
    </div>
);
