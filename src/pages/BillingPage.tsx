import React, { useEffect } from 'react';
import { CreditCard, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import { useSubscriptionStore } from '../store/subscriptionStore';
import { formatCurrency, formatDateRange } from '../lib/utils';

const BillingPage: React.FC = () => {
  const { user } = useAuthStore();
  const { userSubscription, plans, fetchUserSubscription } = useSubscriptionStore();
  
  useEffect(() => {
    if (user) {
      fetchUserSubscription(user.id);
    }
  }, [user, fetchUserSubscription]);
  
  const currentPlan = userSubscription 
    ? plans.find(plan => plan.id === userSubscription.planId) 
    : null;
  
  const billingPeriod = userSubscription 
    ? formatDateRange(userSubscription.currentPeriodStart, userSubscription.currentPeriodEnd)
    : '';
  
  const handleCancelSubscription = () => {
    // In a real application, this would open a confirmation modal
    // and then call the cancelSubscription action
    alert('Subscription cancellation would be triggered here');
  };
  
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Billing & Subscription</h1>
        
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* Current Plan */}
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
            </CardHeader>
            <CardContent>
              {currentPlan ? (
                <div>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">{currentPlan.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      userSubscription?.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {userSubscription?.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{currentPlan.description}</p>
                  
                  <div className="mt-4 bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Price</span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(
                          userSubscription?.billingCycle === 'annual'
                            ? currentPlan.price.annual
                            : currentPlan.price.monthly
                        )}
                        /{userSubscription?.billingCycle}
                      </span>
                    </div>
                    
                    <div className="flex justify-between mt-2">
                      <span className="text-sm text-gray-500">Billing period</span>
                      <span className="text-sm font-medium text-gray-900">{billingPeriod}</span>
                    </div>
                    
                    <div className="flex justify-between mt-2">
                      <span className="text-sm text-gray-500">Renews on</span>
                      <span className="text-sm font-medium text-gray-900">
                        {userSubscription?.currentPeriodEnd ? new Date(userSubscription.currentPeriodEnd).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">No active subscription</p>
                  <Button
                    variant="primary"
                    className="mt-4"
                    onClick={() => window.location.href = '/pricing'}
                  >
                    View Plans
                  </Button>
                </div>
              )}
            </CardContent>
            {currentPlan && currentPlan.tier !== 'free' && (
              <CardFooter>
                <div className="flex space-x-3">
                  <Button variant="outline" onClick={() => window.location.href = '/pricing'}>
                    Change Plan
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleCancelSubscription}
                  >
                    Cancel
                  </Button>
                </div>
              </CardFooter>
            )}
          </Card>
          
          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard className="h-8 w-8 text-gray-400" />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Visa ending in 4242</div>
                      <div className="text-sm text-gray-500">Expires 12/25</div>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Default
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Update Payment Method
              </Button>
            </CardFooter>
          </Card>
          
          {/* Billing History */}
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">Invoice #1234</div>
                      <div className="text-sm text-gray-500">May 1, 2023</div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Paid
                    </span>
                  </div>
                  <div className="mt-2 text-sm font-medium text-gray-900">
                    {formatCurrency(29)}
                  </div>
                </div>
                
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">Invoice #1235</div>
                      <div className="text-sm text-gray-500">Jun 1, 2023</div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Upcoming
                    </span>
                  </div>
                  <div className="mt-2 text-sm font-medium text-gray-900">
                    {formatCurrency(29)}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Invoices
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Cancel Warning Card */}
        {userSubscription?.cancelAtPeriodEnd && (
          <div className="mt-6">
            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Subscription Cancellation</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      Your subscription is set to cancel at the end of the current billing period on{' '}
                      <strong>{new Date(userSubscription.currentPeriodEnd).toLocaleDateString()}</strong>.
                      You'll continue to have access until this date.
                    </p>
                  </div>
                  <div className="mt-4">
                    <div className="-mx-2 -my-1.5 flex">
                      <Button variant="outline" className="bg-yellow-50 border-yellow-400 text-yellow-700">
                        Reactivate Subscription
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillingPage;