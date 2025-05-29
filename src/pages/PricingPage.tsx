import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plan } from '../types';
import PricingTable from '../components/pricing/PricingTable';
import CheckoutForm from '../components/pricing/CheckoutForm';
import { useAuthStore } from '../store/authStore';

const PricingPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedBillingCycle, setSelectedBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleSelectPlan = (plan: Plan, billingCycle: 'monthly' | 'annual') => {
    setSelectedPlan(plan);
    setSelectedBillingCycle(billingCycle);
    
    if (!isAuthenticated && plan.tier !== 'free') {
      // Redirect to signup for paid plans if not authenticated
      navigate('/signup');
    }
  };

  const handleBackToPricing = () => {
    setSelectedPlan(null);
  };

  const handleCheckoutSuccess = () => {
    setCheckoutComplete(true);
    
    // Redirect to dashboard after successful subscription
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!selectedPlan && !checkoutComplete && (
          <PricingTable onSelectPlan={handleSelectPlan} />
        )}
        
        {selectedPlan && !checkoutComplete && isAuthenticated && (
          <div className="py-8">
            <div className="max-w-3xl mx-auto">
              <button
                onClick={handleBackToPricing}
                className="mb-6 text-indigo-600 hover:text-indigo-500 font-medium flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to pricing
              </button>
              
              <CheckoutForm 
                selectedPlan={selectedPlan}
                billingCycle={selectedBillingCycle}
                onBack={handleBackToPricing}
                onSuccess={handleCheckoutSuccess}
              />
            </div>
          </div>
        )}
        
        {checkoutComplete && (
          <div className="py-16 text-center">
            <div className="rounded-full bg-green-100 p-3 mx-auto w-16 h-16 flex items-center justify-center">
              <svg className="h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Subscription Successful!</h2>
            <p className="mt-2 text-gray-600">
              Thank you for subscribing to the {selectedPlan?.name} plan.
            </p>
            <p className="mt-4 text-gray-600">
              Redirecting you to your dashboard...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingPage;