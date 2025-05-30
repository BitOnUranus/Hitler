import { create } from 'zustand';
import { User } from '../types';
import api from '../lib/api';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem('token'),
  user: null,
  isLoading: false,
  error: null,
  
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await api.post('/auth/signin', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      set({ isAuthenticated: true, user, isLoading: false });
    } catch (error: any) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || 'An error occurred during login'
      });
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    set({ isAuthenticated: false, user: null });
  },
  
  signup: async (email: string, password: string, firstName: string, lastName: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await api.post('/auth/signup', {
        email,
        password,
        firstName,
        lastName
      });
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      
      set({ isAuthenticated: true, user, isLoading: false });
    } catch (error: any) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || 'An error occurred during signup'
      });
      throw error;
    }
  },
  
  updateUser: async (userData: Partial<User>) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await api.put('/auth/user', userData);
      set((state) => ({
        user: state.user ? { ...state.user, ...response.data } : null,
        isLoading: false
      }));
    } catch (error: any) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || 'Failed to update user'
      });
      throw error;
    }
  },
}));