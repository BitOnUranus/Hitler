import { Plan } from '../types';

export const plans: Plan[] = [
  {
    id: 'free',
    name: 'Freemium',
    description: 'Perfect for individuals and small projects',
    tier: 'free',
    price: {
      monthly: 0,
      annual: 0,
    },
    features: [
      { 
        id: 'users-free', 
        name: 'Users', 
        description: 'Number of team members',
        included: true, 
        limit: 1
      },
      { 
        id: 'storage-free', 
        name: 'Storage', 
        description: 'Total storage capacity',
        included: true, 
        limit: 5, 
        unitOfMeasure: 'GB'
      },
      { 
        id: 'api-calls-free', 
        name: 'API Calls', 
        description: 'Monthly API request limit',
        included: true, 
        limit: 1000
      },
      { 
        id: 'support-free', 
        name: 'Support', 
        description: 'Email support response time',
        included: true
      },
      { 
        id: 'analytics-free', 
        name: 'Analytics', 
        description: 'Data insights and reporting',
        included: false
      },
    ],
    isPopular: false,
  },
  {
    id: 'basic',
    name: 'Basic',
    description: 'Great for startups and growing teams',
    tier: 'basic',
    price: {
      monthly: 29,
      annual: 290,
    },
    features: [
      { 
        id: 'users-basic', 
        name: 'Users', 
        description: 'Number of team members',
        included: true, 
        limit: 5
      },
      { 
        id: 'storage-basic', 
        name: 'Storage', 
        description: 'Total storage capacity',
        included: true, 
        limit: 50, 
        unitOfMeasure: 'GB'
      },
      { 
        id: 'api-calls-basic', 
        name: 'API Calls', 
        description: 'Monthly API request limit',
        included: true, 
        limit: 10000
      },
      { 
        id: 'support-basic', 
        name: 'Support', 
        description: 'Email support response time',
        included: true
      },
      { 
        id: 'analytics-basic', 
        name: 'Analytics', 
        description: 'Data insights and reporting',
        included: true
      },
    ],
    isPopular: true,
  },
  {
    id: 'pro',
    name: 'Professional',
    description: 'For businesses with advanced needs',
    tier: 'pro',
    price: {
      monthly: 79,
      annual: 790,
      quarterly: 225,
      biannual: 435,
    },
    features: [
      { 
        id: 'users-pro', 
        name: 'Users', 
        description: 'Number of team members',
        included: true, 
        limit: 20
      },
      { 
        id: 'storage-pro', 
        name: 'Storage', 
        description: 'Total storage capacity',
        included: true, 
        limit: 200, 
        unitOfMeasure: 'GB'
      },
      { 
        id: 'api-calls-pro', 
        name: 'API Calls', 
        description: 'Monthly API request limit',
        included: true, 
        limit: 50000
      },
      { 
        id: 'support-pro', 
        name: 'Support', 
        description: 'Priority email and chat support',
        included: true
      },
      { 
        id: 'analytics-pro', 
        name: 'Analytics', 
        description: 'Advanced data insights and reporting',
        included: true
      },
    ],
    isPopular: false,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Custom solutions for large organizations',
    tier: 'enterprise',
    price: {
      monthly: 299,
      annual: 2990,
      quarterly: 850,
      biannual: 1650,
    },
    features: [
      { 
        id: 'users-enterprise', 
        name: 'Users', 
        description: 'Unlimited team members',
        included: true
      },
      { 
        id: 'storage-enterprise', 
        name: 'Storage', 
        description: 'Total storage capacity',
        included: true, 
        limit: 1000, 
        unitOfMeasure: 'GB'
      },
      { 
        id: 'api-calls-enterprise', 
        name: 'API Calls', 
        description: 'Monthly API request limit',
        included: true, 
        limit: 1000000
      },
      { 
        id: 'support-enterprise', 
        name: 'Support', 
        description: 'Dedicated account manager',
        included: true
      },
      { 
        id: 'analytics-enterprise', 
        name: 'Analytics', 
        description: 'Custom reports and data integration',
        included: true
      },
    ],
    isPopular: false,
  },
];