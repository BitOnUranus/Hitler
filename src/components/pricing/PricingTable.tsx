import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Plan } from '../../types';
import { calculateDiscountPercentage, formatCurrency } from '../../lib/utils';
import Button from '../ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { useAuthStore } from '../../store/authStore';
import { useSubscriptionStore } from '../../store/subscriptionStore';

interface PricingTableProps {
  onSelectPlan: (plan: Plan, billingCycle: 'monthly' | 'annual') => void;
}

const PricingTable: React.FC<PricingTableProps> = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const { plans } = useSubscriptionStore();
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:align-center sm:flex sm:flex-col">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-center">Pricing Plans</h1>
        <p className="mt-5 text-xl text-gray-500 sm:text-center">
          Start with our generous free tier. Upgrade as you grow.
        </p>
        
        {/* Billing toggle */}
        <div className="relative mt-6 bg-gray-100 rounded-lg p-0.5 flex sm:mt-8 max-w-md mx-auto">
          <button
            type="button"
            className={`relative w-1/2 py-2 text-sm font-medium rounded-md focus:outline-none transition-colors duration-200 ease-in-out ${
              billingCycle === 'monthly'
                ? 'bg-white border-gray-200 shadow-sm text-gray-900'
                : 'border border-transparent text-gray-700'
            }`}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly billing
          </button>
          <button
            type="button"
            className={`relative w-1/2 py-2 text-sm font-medium rounded-md focus:outline-none transition-colors duration-200 ease-in-out ${
              billingCycle === 'annual'
                ? 'bg-white border-gray-200 shadow-sm text-gray-900'
                : 'border border-transparent text-gray-700'
            }`}
            onClick={() => setBillingCycle('annual')}
          >
            Annual billing
            <span className="absolute -top-2 -right-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-600">
              Save {calculateDiscountPercentage(plans[1].price.monthly, plans[1].price.annual)}%
            </span>
          </button>
        </div>
      </div>
      
      <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 lg:max-w-6xl lg:mx-auto">
        {plans.map((plan) => (
          <Card 
            key={plan.id}
            className={`flex flex-col ${plan.isPopular ? 'border-indigo-500 ring-2 ring-indigo-500' : ''}`}
          >
            {plan.isPopular && (
              <div className="bg-indigo-500 text-white py-1 px-4 text-sm font-semibold text-center">
                MOST POPULAR
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-extrabold text-gray-900">
                  {formatCurrency(billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual)}
                </span>
                <span className="text-base font-medium text-gray-500">
                  /{billingCycle === 'monthly' ? 'month' : 'year'}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature.id} className="flex items-start">
                    <div className="flex-shrink-0">
                      {feature.included ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-gray-300" />
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{feature.name}</p>
                      <p className="text-xs text-gray-500">{feature.description}</p>
                      {feature.included && feature.limit && (
                        <p className="text-xs font-medium text-gray-500">
                          {feature.limit.toLocaleString()}{feature.unitOfMeasure ? ` ${feature.unitOfMeasure}` : ''}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                variant={plan.isPopular ? 'primary' : 'outline'} 
                fullWidth
                onClick={() => onSelectPlan(plan, billingCycle)}
              >
                {plan.tier === 'free' ? 'Get started' : isAuthenticated ? 'Select Plan' : 'Sign up'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-10 text-center">
        <p className="text-base text-gray-500">
          Enterprise customers may contact us for custom pricing and features.
        </p>
      </div>
    </div>
  );
};

export default PricingTable;