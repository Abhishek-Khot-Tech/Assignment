"import { formatDate } from '../../utils/formatDate';
import { cn } from '../../utils/cn';
import { Skeleton } from '../../components/ui/skeleton';
import { Button } from '../../components/ui/button';
import { Switch } from '../../components/ui/switch';
import { Badge } from '../../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Pencil, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

const roleBadgeVariants = {
  admin: 'bg-primary text-primary-foreground',
  analyst: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  viewer: 'bg-secondary text-secondary-foreground'
};

export const UserTable = ({
  data,
  meta,
  isLoading,
  pagination,
  setPagination,
  onStatusToggle,
  onEditRole
}) => {
  const { page, limit } = pagination;
  const totalPages = meta?.totalPages || 1;
  const total = meta?.total || 0;
  
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);
  
  if (isLoading) {
    return (
      <div className=\"bg-card border border-border rounded\">
        <div className=\"p-4 space-y-3\">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className=\"h-12 w-full\" />
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className=\"bg-card border border-border rounded\" data-testid=\"users-table\">
      <div className=\"overflow-x-auto\">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className=\"text-xs uppercase tracking-overline\">Name</TableHead>
              <TableHead className=\"text-xs uppercase tracking-overline\">Email</TableHead>
              <TableHead className=\"text-xs uppercase tracking-overline\">Role</TableHead>
              <TableHead className=\"text-xs uppercase tracking-overline\">Status</TableHead>
              <TableHead className=\"text-xs uppercase tracking-overline\">Joined</TableHead>
              <TableHead className=\"text-xs uppercase tracking-overline text-right\">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className=\"text-center py-12\">
                  <div className=\"text-muted-foreground\">
                    <p className=\"text-lg font-medium\">No users found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((user) => (
                <TableRow key={user._id} className=\"hover:bg-secondary/50\">
                  <TableCell className=\"text-sm font-medium\">{user.name}</TableCell>
                  <TableCell className=\"text-sm text-muted-foreground\">{user.email}</TableCell>
                  <TableCell>
                    <Badge className={cn(\"capitalize\", roleBadgeVariants[user.role])}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className=\"flex items-center gap-2\">
                      <Switch
                        checked={user.status === 'active'}
                        onCheckedChange={() => onStatusToggle(user)}
                        data-testid={`user-status-toggle-${user._id}`}
                      />
                      <span className={cn(
                        \"text-sm\",
                        user.status === 'active' ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'
                      )}>
                        {user.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className=\"text-sm text-muted-foreground\">
                    {formatDate(user.createdAt)}
                  </TableCell>
                  <TableCell className=\"text-right\">
                    <Button
                      variant=\"ghost\"
                      size=\"icon\"
                      className=\"h-8 w-8\"
                      onClick={() => onEditRole(user)}
                      data-testid={`edit-user-role-${user._id}`}
                    >
                      <Pencil className=\"h-4 w-4\" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      <div className=\"flex flex-wrap items-center justify-between gap-4 p-4 border-t border-border\">
        <div className=\"flex items-center gap-2 text-sm text-muted-foreground\">
          <span>Showing {start}–{end} of {total} users</span>
          <Select
            value={String(limit)}
            onValueChange={(value) => setPagination({ page: 1, limit: Number(value) })}
          >
            <SelectTrigger className=\"w-20 h-8\">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=\"10\">10</SelectItem>
              <SelectItem value=\"25\">25</SelectItem>
              <SelectItem value=\"50\">50</SelectItem>
            </SelectContent>
          </Select>
          <span>per page</span>
        </div>
        
        <div className=\"flex items-center gap-1\">
          <Button
            variant=\"outline\"
            size=\"icon\"
            className=\"h-8 w-8\"
            disabled={page === 1}
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
          >
            <ChevronLeft className=\"h-4 w-4\" />
          </Button>
          
          {[...Array(Math.min(5, totalPages))].map((_, i) => {
            const pageNum = i + 1;
            return (
              <Button
                key={pageNum}
                variant={page === pageNum ? 'default' : 'outline'}
                size=\"icon\"
                className=\"h-8 w-8\"
                onClick={() => setPagination(prev => ({ ...prev, page: pageNum }))}
              >
                {pageNum}
              </Button>
            );
          })}
          
          <Button
            variant=\"outline\"
            size=\"icon\"
            className=\"h-8 w-8\"
            disabled={page === totalPages}
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
          >
            <ChevronRight className=\"h-4 w-4\" />
          </Button>
        </div>
      </div>
    </div>
  );
};
"