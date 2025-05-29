import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockRevenueData } from '../../data/mockData';

const RevenueChart: React.FC = () => {
  // Format dates for display
  const formattedData = mockRevenueData.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
  }));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Monthly Recurring Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={formattedData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis
                tickFormatter={(value) => `$${value}`}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value) => [`$${value}`, 'MRR']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="mrr"
                stroke="#4F46E5"
                fillOpacity={1}
                fill="url(#colorMrr)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;