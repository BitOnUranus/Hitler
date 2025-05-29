import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  change?: number;
  changeTimeframe?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  description,
  change,
  changeTimeframe = 'from last period',
}) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;
  const isNeutral = change === 0 || change === undefined;

  return (
    <Card className="h-full">
      <CardContent className="pt-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
            
            {change !== undefined && (
              <div className="mt-2 flex items-center text-sm">
                <span
                  className={`mr-1 flex items-center ${
                    isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-500'
                  }`}
                >
                  {isPositive ? (
                    <ArrowUp className="h-4 w-4 mr-1" />
                  ) : isNegative ? (
                    <ArrowDown className="h-4 w-4 mr-1" />
                  ) : null}
                  {Math.abs(change)}%
                </span>
                <span className="text-gray-500">{changeTimeframe}</span>
              </div>
            )}
            
            {description && (
              <p className="mt-1 text-sm text-gray-500">{description}</p>
            )}
          </div>
          
          <div className="rounded-md bg-gray-50 p-2 text-indigo-600">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;