"import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
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
"