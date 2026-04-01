import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '../../api/users.api';
import { usePermissions } from '../../hooks/usePermissions';
import { UserTable } from './UserTable';
import { UserRoleModal } from './UserRoleModal';
import { Button } from '../../components/ui/button';
import { ShieldX, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const ForbiddenPage = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center" data-testid="forbidden-page">
    <div className="text-center">
      <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <ShieldX className="h-8 w-8 text-destructive" />
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">Access Denied</h1>
      <p className="text-muted-foreground mb-6">You don't have permission to view this page</p>
      <Link to="/dashboard">
        <Button variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </Link>
    </div>
  </div>
);

export const UsersPage = () => {
  const queryClient = useQueryClient();
  const { canManageUsers } = usePermissions();
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [editingUser, setEditingUser] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['users', pagination],
    queryFn: () => usersApi.getAll(pagination),
    enabled: canManageUsers
  });

  const updateMutation = useMutation<any, any, { id: string; data: any }>({
    mutationFn: ({ id, data }: { id: string; data: any }) => usersApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User updated');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to update');
    }
  });

  const handleStatusToggle = (user) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    updateMutation.mutate({ id: user._id, data: { status: newStatus } });
  };

  const handleRoleChange = (userId, role) => {
    updateMutation.mutate({ id: userId, data: { role } });
    setEditingUser(null);
  };

  if (!canManageUsers) {
    return <ForbiddenPage />;
  }

  return (
    <div className="space-y-6" data-testid="users-page">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">User Management</h2>
        <p className="text-sm text-muted-foreground">
          Manage user roles and permissions
        </p>
      </div>

      <UserTable
        data={data?.data || []}
        meta={data?.meta}
        isLoading={isLoading}
        pagination={pagination}
        setPagination={setPagination}
        onStatusToggle={handleStatusToggle}
        onEditRole={setEditingUser}
      />

      <UserRoleModal
        user={editingUser}
        onClose={() => setEditingUser(null)}
        onSave={handleRoleChange}
        isLoading={updateMutation.isPending}
      />
    </div>
  );
};

export default UsersPage;
