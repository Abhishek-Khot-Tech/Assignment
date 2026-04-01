"import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Loader2 } from 'lucide-react';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  const location = useLocation();
  
  if (isLoading) {
    return (
      <div className=\"min-h-screen flex items-center justify-center bg-background\">
        <Loader2 className=\"h-8 w-8 animate-spin text-primary\" />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to=\"/login\" state={{ from: location }} replace />;
  }
  
  return children;
};
"