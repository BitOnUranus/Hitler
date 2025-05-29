export type UserRole = 'admin' | 'customer' | 'guest';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  organization?: string;
  createdAt: string;
  updatedAt: string;
}

export type PlanTier = 'free' | 'basic' | 'pro' | 'enterprise';

export type BillingCycle = 'monthly' | 'annual' | 'quarterly' | 'biannual';

export interface PlanFeature {
  id: string;
  name: string;
  description: string;
  included: boolean;
  limit?: number;
  unitOfMeasure?: string;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  tier: PlanTier;
  price: {
    monthly: number;
    annual: number;
    quarterly?: number;
    biannual?: number;
  };
  features: PlanFeature[];
  isPopular?: boolean;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  billingCycle: BillingCycle;
  trialEnd?: string;
  cancelAtPeriodEnd: boolean;
  stripeSubscriptionId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  subscriptionId: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'draft' | 'open' | 'paid' | 'uncollectible' | 'void';
  dueDate: string;
  paidAt?: string;
  stripeInvoiceId?: string;
  createdAt: string;
}

export interface PaymentMethod {
  id: string;
  userId: string;
  type: 'card' | 'bank_account' | 'paypal';
  last4: string;
  expMonth?: number;
  expYear?: number;
  brand?: string;
  isDefault: boolean;
  stripePaymentMethodId?: string;
  createdAt: string;
}

export interface CustomerStats {
  totalCustomers: number;
  activeSubscriptions: number;
  mrr: number;
  arr: number;
  churnRate: number;
}

export interface RevenueData {
  date: string;
  mrr: number;
}