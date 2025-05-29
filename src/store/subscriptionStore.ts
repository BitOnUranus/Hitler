import { create } from 'zustand';
import { Plan, Subscription } from '../types';
import { plans } from '../data/plans';
import { mockSubscriptions } from '../data/mockData';

interface SubscriptionState {
  plans: Plan[];
  userSubscription: Subscription | null;
  isLoading: boolean;
  error: string | null;
  
  // Subscription actions
  fetchPlans: () => Promise<void>;
  fetchUserSubscription: (userId: string) => Promise<void>;
  createSubscription: (userId: string, planId: string, billingCycle: 'monthly' | 'annual' | 'quarterly' | 'biannual') => Promise<void>;
  updateSubscription: (subscriptionId: string, updates: Partial<Subscription>) => Promise<void>;
  cancelSubscription: (subscriptionId: string) => Promise<void>;
}

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  plans: plans,
  userSubscription: null,
  isLoading: false,
  error: null,
  
  fetchPlans: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // In a real application, this would be an API call
      // For demo purposes, we'll use mock data
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      set({ plans, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch plans' 
      });
    }
  },
  
  fetchUserSubscription: async (userId: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // In a real application, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      const userSubscription = mockSubscriptions.find(sub => sub.userId === userId) || null;
      set({ userSubscription, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch subscription' 
      });
    }
  },
  
  createSubscription: async (userId: string, planId: string, billingCycle) => {
    set({ isLoading: true, error: null });
    
    try {
      // In a real application, this would be an API call to Stripe and then your backend
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      const currentDate = new Date();
      let endDate = new Date(currentDate);
      
      // Set end date based on billing cycle
      switch(billingCycle) {
        case 'monthly':
          endDate.setMonth(endDate.getMonth() + 1);
          break;
        case 'annual':
          endDate.setFullYear(endDate.getFullYear() + 1);
          break;
        case 'quarterly':
          endDate.setMonth(endDate.getMonth() + 3);
          break;
        case 'biannual':
          endDate.setMonth(endDate.getMonth() + 6);
          break;
      }
      
      const newSubscription: Subscription = {
        id: `${Date.now()}`,
        userId,
        planId,
        status: 'active',
        currentPeriodStart: currentDate.toISOString(),
        currentPeriodEnd: endDate.toISOString(),
        billingCycle,
        cancelAtPeriodEnd: false,
        stripeSubscriptionId: `sub_${Date.now()}`,
        createdAt: currentDate.toISOString(),
        updatedAt: currentDate.toISOString(),
      };
      
      set({ userSubscription: newSubscription, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to create subscription' 
      });
    }
  },
  
  updateSubscription: async (subscriptionId: string, updates: Partial<Subscription>) => {
    set({ isLoading: true, error: null });
    
    try {
      // In a real application, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      set((state) => {
        if (state.userSubscription && state.userSubscription.id === subscriptionId) {
          return {
            userSubscription: { 
              ...state.userSubscription, 
              ...updates, 
              updatedAt: new Date().toISOString() 
            },
            isLoading: false
          };
        }
        return { isLoading: false };
      });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to update subscription' 
      });
    }
  },
  
  cancelSubscription: async (subscriptionId: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // In a real application, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      set((state) => {
        if (state.userSubscription && state.userSubscription.id === subscriptionId) {
          return {
            userSubscription: { 
              ...state.userSubscription, 
              cancelAtPeriodEnd: true, 
              updatedAt: new Date().toISOString() 
            },
            isLoading: false
          };
        }
        return { isLoading: false };
      });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to cancel subscription' 
      });
    }
  },
}));