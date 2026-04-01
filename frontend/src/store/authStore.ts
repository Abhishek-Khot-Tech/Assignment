import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserRole } from '../types/user.types';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (user: User, accessToken: string) => void;
  setAccessToken: (accessToken: string) => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: true,
      
      setAuth: (user, accessToken) => set({
        user,
        accessToken,
        isAuthenticated: true,
        isLoading: false
      }),
      
      setAccessToken: (accessToken) => set({ accessToken }),
      
      setUser: (user) => set({ user }),
      
      clearAuth: () => set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: false
      }),
      
      setLoading: (isLoading) => set({ isLoading })
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
);
