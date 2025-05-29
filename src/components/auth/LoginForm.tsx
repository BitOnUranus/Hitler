import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../ui/Card';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      // Error handling is done in the auth store
      console.error('Login error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>
          <CardDescription>
            Enter your email and password to access your subscription dashboard
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            <div>
              <div className="flex items-center justify-between">
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
              <div className="text-right mt-1">
                <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
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
              Sign in
            </Button>
            
            <div className="text-center">
              <span className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-indigo-600 hover:text-indigo-500">
                  Sign up
                </Link>
              </span>
            </div>
          </CardFooter>
        </form>
      </Card>
      
      {/* Demo credentials hint */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
        <div className="text-sm text-blue-700">
          <p className="font-medium mb-1">Demo Credentials</p>
          <p>Email: admin@example.com</p>
          <p>Password: any password will work</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;