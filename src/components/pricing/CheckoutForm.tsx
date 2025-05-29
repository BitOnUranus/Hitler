import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { Plan } from '../../types';
import { formatCurrency } from '../../lib/utils';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { useAuthStore } from '../../store/authStore';
import { useSubscriptionStore } from '../../store/subscriptionStore';

interface CheckoutFormProps {
  selectedPlan: Plan;
  billingCycle: 'monthly' | 'annual';
  onBack: () => void;
  onSuccess: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ 
  selectedPlan, 
  billingCycle, 
  onBack,
  onSuccess
}) => {
  const { user } = useAuthStore();
  const { createSubscription, isLoading } = useSubscriptionStore();
  
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardName, setCardName] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      await createSubscription(user.id, selectedPlan.id, billingCycle);
      onSuccess();
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };
  
  // Format functions
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return value;
  };
  
  // Calculate the total amount
  const amount = billingCycle === 'monthly' ? selectedPlan.price.monthly : selectedPlan.price.annual;
  
  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="font-medium">{selectedPlan.name} Plan</span>
              <span>{formatCurrency(amount)}</span>
            </div>
            <div className="text-sm text-gray-500">
              Billed {billingCycle === 'monthly' ? 'monthly' : 'annually'}
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input 
                label="Name on card"
                placeholder="John Smith"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                required
              />
              
              <div className="relative">
                <Input 
                  label="Card number"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19}
                  required
                />
                <CreditCard className="absolute right-3 top-9 h-5 w-5 text-gray-400" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="Expiry date"
                  placeholder="MM/YY"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                  maxLength={5}
                  required
                />
                
                <Input 
                  label="CVC"
                  placeholder="123"
                  value={cardCvc}
                  onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ''))}
                  maxLength={3}
                  required
                />
              </div>
              
              <div className="flex items-start mt-4">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mt-1"
                  checked={agreeToTerms}
                  onChange={() => setAgreeToTerms(!agreeToTerms)}
                  required
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I agree to the terms of service and privacy policy
                </label>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button 
            variant="primary" 
            fullWidth 
            isLoading={isLoading}
            disabled={!agreeToTerms || isLoading}
            onClick={handleSubmit}
          >
            Subscribe {formatCurrency(amount)}/{billingCycle === 'monthly' ? 'mo' : 'yr'}
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={onBack}
            disabled={isLoading}
          >
            Back to plans
          </Button>
          
          <div className="text-xs text-center text-gray-500 mt-4">
            Your subscription will start immediately. You can cancel anytime.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CheckoutForm;