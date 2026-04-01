"import { useMutation } from '@tanstack/react-query';
import { authApi } from '../../api/auth.api';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

export const useLogin = () => {
  const { setAuth } = useAuthStore();
  
  return useMutation({
    mutationFn: ({ email, password }) => authApi.login(email, password),
    onSuccess: (data) => {
      setAuth(data.data.user, data.data.accessToken);
      toast.success(data.message || 'Login successful');
    },
    onError: (error) => {
      toast.error(error.response?.data?.detail || 'Login failed');
    }
  });
};

export const useLogout = () => {
  const { clearAuth } = useAuthStore();
  
  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      clearAuth();
      toast.success('Logged out successfully');
    },
    onError: () => {
      clearAuth();
    }
  });
};
"