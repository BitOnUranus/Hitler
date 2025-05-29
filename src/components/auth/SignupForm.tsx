import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../ui/Card';

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [formError, setFormError] = useState('');
  
  const navigate = useNavigate();
  const { signup, isLoading, error } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    
    setFormError('');
    
    try {
      await signup(email, password, firstName, lastName);
      navigate('/dashboard');
    } catch (error) {
      // Error handling is done in the auth store
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Get started with your subscription management account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {(error || formError) && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error || formError}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                autoComplete="given-name"
              />
              <Input
                label="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                autoComplete="family-name"
              />
            </div>

            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              helperText="At least 8 characters with letters and numbers"
            />

            <Input
              label="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Privacy Policy
                </a>
              </label>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
              disabled={isLoading}
            >
              Create account
            </Button>
            
            <div className="text-center">
              <span className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
                  Sign in
                </Link>
              </span>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignupForm;