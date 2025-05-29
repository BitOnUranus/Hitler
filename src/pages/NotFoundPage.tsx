import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          <h2 className="text-6xl font-extrabold text-gray-900">404</h2>
          <p className="mt-4 text-xl text-gray-600">Page not found</p>
          <p className="mt-2 text-sm text-gray-500">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <div className="mt-6">
            <Button
              variant="primary"
              onClick={() => navigate('/')}
              fullWidth
            >
              Return Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;