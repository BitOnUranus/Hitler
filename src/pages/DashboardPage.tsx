import React, { useEffect } from 'react';
import { Users, DollarSign, CreditCard, Activity } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import RevenueChart from '../components/dashboard/RevenueChart';
import CustomerTable from '../components/dashboard/CustomerTable';
import InvoicesList from '../components/dashboard/InvoicesList';
import { useAuthStore } from '../store/authStore';
import { formatCurrency } from '../lib/utils';
import { mockCustomerStats } from '../data/mockData';

const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  
  // In a real app, you'd fetch this data from an API
  const stats = mockCustomerStats;
  
  useEffect(() => {
    // Fetch initial data
    // This would be an API call in a real application
  }, []);
  
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        
        {user?.role === 'admin' ? (
          <>
            <div className="mt-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard 
                  title="Total Customers" 
                  value={stats.totalCustomers.toString()} 
                  icon={<Users className="h-6 w-6" />}
                  change={12}
                  changeTimeframe="from last month"
                />
                <StatCard 
                  title="Monthly Recurring Revenue" 
                  value={formatCurrency(stats.mrr)} 
                  icon={<DollarSign className="h-6 w-6" />}
                  change={8.2}
                  changeTimeframe="from last month"
                />
                <StatCard 
                  title="Annual Recurring Revenue" 
                  value={formatCurrency(stats.arr)} 
                  icon={<DollarSign className="h-6 w-6" />}
                  change={5.1}
                  changeTimeframe="from last month"
                />
                <StatCard 
                  title="Churn Rate" 
                  value={`${stats.churnRate}%`} 
                  icon={<Activity className="h-6 w-6" />}
                  change={-0.5}
                  changeTimeframe="from last month"
                />
              </div>
            </div>
            
            <div className="mt-8">
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <RevenueChart />
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  {/* This could be another chart, e.g., Churn or LTV */}
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <CustomerTable />
            </div>
            
            <div className="mt-8">
              <InvoicesList />
            </div>
          </>
        ) : (
          <div className="mt-6">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Welcome to your dashboard!</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>This is your customer dashboard where you can manage your subscription and view your billing information.</p>
                </div>
                <div className="mt-5">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View subscription
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;