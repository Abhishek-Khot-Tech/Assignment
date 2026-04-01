"import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import { useUIStore } from './store/uiStore';
import { authApi } from './api/auth.api';
import { AppLayout } from './components/layout/AppLayout';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { LoginPage } from './features/auth/LoginPage';
import { DashboardPage } from './features/dashboard/DashboardPage';
import { TransactionsPage } from './features/transactions/TransactionsPage';
import { UsersPage } from './features/users/UsersPage';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
});

const AuthInitializer = ({ children }) => {
  const { setAuth, clearAuth, setLoading, isAuthenticated } = useAuthStore();
  const { theme } = useUIStore();
  
  useEffect(() => {
    // Initialize theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  
  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }
      
      try {
        const response = await authApi.getMe();
        setAuth(response.data, null);
      } catch (error) {
        clearAuth();
      }
    };
    
    checkAuth();
  }, []);
  
  return children;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthInitializer>
          <Routes>
            <Route path=\"/login\" element={<LoginPage />} />
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path=\"/dashboard\" element={<DashboardPage />} />
              <Route path=\"/transactions\" element={<TransactionsPage />} />
              <Route path=\"/users\" element={<UsersPage />} />
            </Route>
            <Route path=\"/\" element={<Navigate to=\"/dashboard\" replace />} />
            <Route path=\"*\" element={<Navigate to=\"/dashboard\" replace />} />
          </Routes>
        </AuthInitializer>
      </BrowserRouter>
      <Toaster
        position=\"top-right\"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border))'
          },
          success: {
            iconTheme: {
              primary: 'hsl(var(--success))',
              secondary: 'white'
            }
          },
          error: {
            iconTheme: {
              primary: 'hsl(var(--destructive))',
              secondary: 'white'
            }
          }
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
"