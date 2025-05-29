import { CustomerStats, Invoice, PaymentMethod, RevenueData, Subscription, User } from '../types';
import { plans } from './plans';

// Mock users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'john@company.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'customer',
    organization: 'Acme Corp',
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2023-01-15T00:00:00Z',
  },
  {
    id: '3',
    email: 'sarah@business.com',
    firstName: 'Sarah',
    lastName: 'Smith',
    role: 'customer',
    organization: 'Business Inc',
    createdAt: '2023-02-01T00:00:00Z',
    updatedAt: '2023-02-01T00:00:00Z',
  },
  {
    id: '4',
    email: 'mike@enterprise.com',
    firstName: 'Mike',
    lastName: 'Johnson',
    role: 'customer',
    organization: 'Enterprise Ltd',
    createdAt: '2023-02-15T00:00:00Z',
    updatedAt: '2023-02-15T00:00:00Z',
  },
  {
    id: '5',
    email: 'lisa@startup.co',
    firstName: 'Lisa',
    lastName: 'Brown',
    role: 'customer',
    organization: 'Startup Co',
    createdAt: '2023-03-01T00:00:00Z',
    updatedAt: '2023-03-01T00:00:00Z',
  },
];

// Mock subscriptions
export const mockSubscriptions: Subscription[] = [
  {
    id: '1',
    userId: '2',
    planId: 'basic',
    status: 'active',
    currentPeriodStart: '2023-05-01T00:00:00Z',
    currentPeriodEnd: '2023-06-01T00:00:00Z',
    billingCycle: 'monthly',
    cancelAtPeriodEnd: false,
    stripeSubscriptionId: 'sub_123456',
    createdAt: '2023-05-01T00:00:00Z',
    updatedAt: '2023-05-01T00:00:00Z',
  },
  {
    id: '2',
    userId: '3',
    planId: 'pro',
    status: 'active',
    currentPeriodStart: '2023-04-15T00:00:00Z',
    currentPeriodEnd: '2024-04-15T00:00:00Z',
    billingCycle: 'annual',
    cancelAtPeriodEnd: false,
    stripeSubscriptionId: 'sub_234567',
    createdAt: '2023-04-15T00:00:00Z',
    updatedAt: '2023-04-15T00:00:00Z',
  },
  {
    id: '3',
    userId: '4',
    planId: 'enterprise',
    status: 'active',
    currentPeriodStart: '2023-03-10T00:00:00Z',
    currentPeriodEnd: '2023-09-10T00:00:00Z',
    billingCycle: 'biannual',
    cancelAtPeriodEnd: false,
    stripeSubscriptionId: 'sub_345678',
    createdAt: '2023-03-10T00:00:00Z',
    updatedAt: '2023-03-10T00:00:00Z',
  },
  {
    id: '4',
    userId: '5',
    planId: 'free',
    status: 'active',
    currentPeriodStart: '2023-06-01T00:00:00Z',
    currentPeriodEnd: '2053-06-01T00:00:00Z', // "Forever" free
    billingCycle: 'monthly',
    cancelAtPeriodEnd: false,
    createdAt: '2023-06-01T00:00:00Z',
    updatedAt: '2023-06-01T00:00:00Z',
  },
];

// Mock invoices
export const mockInvoices: Invoice[] = [
  {
    id: '1',
    subscriptionId: '1',
    userId: '2',
    amount: 29,
    currency: 'USD',
    status: 'paid',
    dueDate: '2023-05-01T00:00:00Z',
    paidAt: '2023-05-01T00:00:00Z',
    stripeInvoiceId: 'in_123456',
    createdAt: '2023-04-25T00:00:00Z',
  },
  {
    id: '2',
    subscriptionId: '1',
    userId: '2',
    amount: 29,
    currency: 'USD',
    status: 'open',
    dueDate: '2023-06-01T00:00:00Z',
    stripeInvoiceId: 'in_234567',
    createdAt: '2023-05-25T00:00:00Z',
  },
  {
    id: '3',
    subscriptionId: '2',
    userId: '3',
    amount: 790,
    currency: 'USD',
    status: 'paid',
    dueDate: '2023-04-15T00:00:00Z',
    paidAt: '2023-04-15T00:00:00Z',
    stripeInvoiceId: 'in_345678',
    createdAt: '2023-04-10T00:00:00Z',
  },
  {
    id: '4',
    subscriptionId: '3',
    userId: '4',
    amount: 1650,
    currency: 'USD',
    status: 'paid',
    dueDate: '2023-03-10T00:00:00Z',
    paidAt: '2023-03-10T00:00:00Z',
    stripeInvoiceId: 'in_456789',
    createdAt: '2023-03-05T00:00:00Z',
  },
];

// Mock payment methods
export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    userId: '2',
    type: 'card',
    last4: '4242',
    expMonth: 12,
    expYear: 2025,
    brand: 'visa',
    isDefault: true,
    stripePaymentMethodId: 'pm_123456',
    createdAt: '2023-05-01T00:00:00Z',
  },
  {
    id: '2',
    userId: '3',
    type: 'card',
    last4: '1234',
    expMonth: 10,
    expYear: 2024,
    brand: 'mastercard',
    isDefault: true,
    stripePaymentMethodId: 'pm_234567',
    createdAt: '2023-04-15T00:00:00Z',
  },
  {
    id: '3',
    userId: '4',
    type: 'card',
    last4: '9876',
    expMonth: 6,
    expYear: 2026,
    brand: 'amex',
    isDefault: true,
    stripePaymentMethodId: 'pm_345678',
    createdAt: '2023-03-10T00:00:00Z',
  },
];

// Mock customer stats for admin dashboard
export const mockCustomerStats: CustomerStats = {
  totalCustomers: 4,
  activeSubscriptions: 4,
  mrr: 427.50, // (29 + (790/12) + (1650/6))
  arr: 5130, // 427.50 * 12
  churnRate: 2.5,
};

// Mock revenue data for charts
export const mockRevenueData: RevenueData[] = [
  { date: '2023-01', mrr: 0 },
  { date: '2023-02', mrr: 0 },
  { date: '2023-03', mrr: 275 },
  { date: '2023-04', mrr: 340.83 },
  { date: '2023-05', mrr: 427.50 },
  { date: '2023-06', mrr: 427.50 },
];

// Helper function to get a plan by ID
export const getPlanById = (planId: string): Plan | undefined => {
  return plans.find(plan => plan.id === planId);
};

// Helper function to get a user by ID
export const getUserById = (userId: string): User | undefined => {
  return mockUsers.find(user => user.id === userId);
};

// Helper function to get subscriptions by user ID
export const getSubscriptionsByUserId = (userId: string): Subscription[] => {
  return mockSubscriptions.filter(subscription => subscription.userId === userId);
};

// Helper function to get invoices by user ID
export const getInvoicesByUserId = (userId: string): Invoice[] => {
  return mockInvoices.filter(invoice => invoice.userId === userId);
};

// Helper function to get payment methods by user ID
export const getPaymentMethodsByUserId = (userId: string): PaymentMethod[] => {
  return mockPaymentMethods.filter(method => method.userId === userId);
};