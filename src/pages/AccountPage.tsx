import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuthStore } from '../store/authStore';

const AccountPage: React.FC = () => {
  const { user, updateUser, isLoading } = useAuthStore();
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    organization: user?.organization || '',
  });
  
  const [success, setSuccess] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await updateUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        organization: formData.organization,
      });
      
      setSuccess(true);
      
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };
  
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Account Settings</h1>
        
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent>
                  {success && (
                    <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
                      Your profile has been updated successfully.
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                    
                    <Input
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="mt-4">
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled
                      helperText="Contact support to change your email address."
                    />
                  </div>
                  
                  <div className="mt-4">
                    <Input
                      label="Organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      helperText="The name of your company or organization."
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isLoading}
                    disabled={isLoading}
                  >
                    Save Changes
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
          
          {/* Account Security */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Password</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Update your password to ensure account security.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-2"
                    >
                      Change Password
                    </Button>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900">Two-factor Authentication</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Add an extra layer of security to your account.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-2"
                    >
                      Enable 2FA
                    </Button>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900">Sessions</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Manage your active sessions and sign out from other devices.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-2"
                    >
                      Manage Sessions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-5">
              <CardHeader>
                <CardTitle>Danger Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Permanently delete your account and all associated data.
                </p>
                <Button
                  variant="destructive"
                  className="mt-4"
                >
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;