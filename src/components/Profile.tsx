import React, { useState, useEffect } from 'react';
import { User, Lock, Mail, Calendar, Key, AlertCircle } from 'lucide-react';
import { auth, getUserData, updateUserPassword } from '../firebase';
import { updatePassword } from 'firebase/auth';

interface ProfileProps {
  currentUser: any;
  onClose: () => void;
}

const Profile: React.FC<ProfileProps> = ({ currentUser, onClose }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    // Validate passwords
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // Get current user
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Update password
      await updatePassword(user, password);
      
      setSuccess('Password updated successfully');
      setPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      console.error('Error updating password:', error);
      setError(error.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Profile</h2>

        {/* User Info */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-white text-2xl font-bold">
              {currentUser?.name?.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{currentUser?.name}</h3>
              <p className="text-gray-600">Intern</p>
            </div>
          </div>

          <div className="space-y-3 mt-4">
            <div className="flex items-center space-x-3 text-gray-700">
              <Mail className="h-5 w-5 text-gray-500" />
              <span>{currentUser?.email}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span>Joined: {currentUser?.joinDate}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <User className="h-5 w-5 text-gray-500" />
              <span>Referral Code: {currentUser?.referralCode}</span>
            </div>
          </div>
        </div>

        {/* Change Password Form */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Lock className="h-5 w-5 mr-2 text-primary-600" />
            Change Password
          </h3>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter new password"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-70"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;