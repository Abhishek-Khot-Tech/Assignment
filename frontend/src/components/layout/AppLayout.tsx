"import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useUIStore } from '../../store/uiStore';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { cn } from '../../utils/cn';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/transactions': 'Transactions',
  '/users': 'User Management'
};

export const AppLayout = () => {
  const location = useLocation();
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);
  
  const title = pageTitles[location.pathname] || 'Dashboard';
  
  useEffect(() => {
    document.title = `${title} | JP Morgan Finance`;
  }, [title]);
  
  return (
    <div className=\"min-h-screen bg-background\">
      <Sidebar />
      <div 
        className={cn(
          \"transition-all duration-300\",
          sidebarOpen ? \"ml-64\" : \"ml-16\"
        )}
      >
        <Header title={title} />
        <main className=\"p-6\" data-testid=\"main-content\">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
"