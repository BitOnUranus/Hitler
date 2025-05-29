import { create } from 'zustand';
import { User } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  
  // Auth actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
  
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // In a real application, this would be an API call
      // For demo purposes, we'll use mock data
      const user = mockUsers.find((u) => u.email === email);
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In production: handle JWT token storage
      localStorage.setItem('token', 'mock-jwt-token');
      
      set({ isAuthenticated: true, user, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'An unknown error occurred' 
      });
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    set({ isAuthenticated: false, user: null });
  },
  
  signup: async (email: string, password: string, firstName: string, lastName: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // In a real application, this would be an API call
      // For demo purposes, we'll just simulate a successful signup
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const newUser: User = {
        id: `${mockUsers.length + 1}`,
        email,
        firstName,
        lastName,
        role: 'customer',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // In production: handle JWT token storage
      localStorage.setItem('token', 'mock-jwt-token');
      
      set({ isAuthenticated: true, user: newUser, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'An unknown error occurred' 
      });
    }
  },
  
  updateUser: async (userData: Partial<User>) => {
    set({ isLoading: true, error: null });
    
    try {
      // In a real application, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      set((state) => ({
        user: state.user ? { ...state.user, ...userData } : null,
        isLoading: false,
      }));
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'An unknown error occurred' 
      });
    }
  },
}));