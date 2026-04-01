"import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Moon, Sun, User, LogOut } from 'lucide-react';
import { authApi } from '../../api/auth.api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const Header = ({ title }) => {
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();
  const { theme, toggleTheme } = useUIStore();
  
  const handleLogout = async () => {
    try {
      await authApi.logout();
      clearAuth();
      navigate('/login');
      toast.success('Logged out successfully');
    } catch (error) {
      clearAuth();
      navigate('/login');
    }
  };
  
  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';
  
  return (
    <header className=\"h-16 bg-card border-b border-border flex items-center justify-between px-6\" data-testid=\"header\">
      <h1 className=\"text-2xl font-semibold tracking-tight text-foreground\">{title}</h1>
      
      <div className=\"flex items-center gap-3\">
        <Button
          variant=\"ghost\"
          size=\"icon\"
          onClick={toggleTheme}
          className=\"h-9 w-9\"
          data-testid=\"theme-toggle\"
        >
          {theme === 'dark' ? (
            <Sun className=\"h-5 w-5\" />
          ) : (
            <Moon className=\"h-5 w-5\" />
          )}
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant=\"ghost\" className=\"h-9 gap-2 px-2\" data-testid=\"user-menu-trigger\">
              <Avatar className=\"h-8 w-8\">
                <AvatarFallback className=\"bg-primary text-primary-foreground text-sm\">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className=\"text-sm font-medium hidden sm:inline\">{user?.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align=\"end\" className=\"w-56\">
            <DropdownMenuLabel>
              <div className=\"flex flex-col\">
                <span>{user?.name}</span>
                <span className=\"text-xs text-muted-foreground font-normal\">{user?.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className=\"text-muted-foreground\">
              <User className=\"mr-2 h-4 w-4\" />
              <span>Role: <span className=\"capitalize\">{user?.role}</span></span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className=\"text-destructive\" data-testid=\"user-menu-logout\">
              <LogOut className=\"mr-2 h-4 w-4\" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
"