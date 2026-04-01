"import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Loader2 } from 'lucide-react';

export const UserRoleModal = ({ user, onClose, onSave, isLoading }) => {
  const [role, setRole] = useState(user?.role || 'viewer');
  
  useEffect(() => {
    if (user) {
      setRole(user.role);
    }
  }, [user]);
  
  const handleSave = () => {
    if (user) {
      onSave(user._id, role);
    }
  };
  
  return (
    <Dialog open={!!user} onOpenChange={onClose}>
      <DialogContent className=\"max-w-sm\" data-testid=\"user-role-modal\">
        <DialogHeader>
          <DialogTitle>Edit User Role</DialogTitle>
        </DialogHeader>
        
        <div className=\"py-4 space-y-4\">
          <div className=\"space-y-1\">
            <Label className=\"text-xs uppercase tracking-overline font-medium text-muted-foreground\">
              User
            </Label>
            <p className=\"text-sm font-medium\">{user?.name}</p>
            <p className=\"text-sm text-muted-foreground\">{user?.email}</p>
          </div>
          
          <div className=\"space-y-2\">
            <Label className=\"text-xs uppercase tracking-overline font-medium text-muted-foreground\">
              Role
            </Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger data-testid=\"user-role-select\">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=\"viewer\">Viewer</SelectItem>
                <SelectItem value=\"analyst\">Analyst</SelectItem>
                <SelectItem value=\"admin\">Admin</SelectItem>
              </SelectContent>
            </Select>
            <p className=\"text-xs text-muted-foreground\">
              {role === 'admin' && 'Full access: can manage users, create, edit, and delete transactions'}
              {role === 'analyst' && 'Can create and edit transactions, view all data'}
              {role === 'viewer' && 'Read-only access to dashboard and transactions'}
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant=\"outline\" onClick={onClose} data-testid=\"cancel-role-change\">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading} data-testid=\"confirm-role-change\">
            {isLoading ? (
              <>
                <Loader2 className=\"mr-2 h-4 w-4 animate-spin\" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
"