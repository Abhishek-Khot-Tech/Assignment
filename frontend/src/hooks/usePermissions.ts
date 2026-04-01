import { useAuthStore } from '../store/authStore';

export const usePermissions = () => {
  const user = useAuthStore((state) => state.user);
  const role = user?.role || 'viewer';
  
  return {
    isAdmin: role === 'admin',
    isAnalyst: role === 'analyst',
    isViewer: role === 'viewer',
    canCreate: role === 'analyst' || role === 'admin',
    canEdit: role === 'analyst' || role === 'admin',
    canDelete: role === 'admin',
    canManageUsers: role === 'admin',
    role
  };
};
