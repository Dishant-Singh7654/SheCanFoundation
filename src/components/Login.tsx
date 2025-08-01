import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, Users, Award, Heart } from 'lucide-react';
import { loginUser, registerUser } from '../firebase';
import logoImage from '../assests/logo.jpg';

interface LoginProps {
  onLogin: (userData: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    // Validate form fields
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }
    
    if (isSignUp && !formData.name) {
      setError('Please enter your name');
      setLoading(false);
      return;
    }
    
    try {
      if (isSignUp) {
        // Register new user
        const user = await registerUser(formData.email, formData.password, formData.name);
        const userData = {
          id: user.uid,
          name: formData.name,
          email: formData.email
        };
        onLogin(userData);
      } else {
        // Login existing user
        const user = await loginUser(formData.email, formData.password);
        const userData = {
          id: user.uid,
          email: formData.email
        };
        onLogin(userData);
      }
    } catch (err: any) {
      // Provide user-friendly error messages
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please sign in instead.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address');
      } else if (err.code === 'auth/network-request-failed') {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError(err.message || 'Authentication failed');
      }
      console.error('Authentication error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-1 rounded-full overflow-hidden">
              <img src={logoImage} alt="She Can Foundation Logo" className="h-12 w-auto" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">She Can Foundation</h1>
          <p className="text-gray-600">Empowering women, building communities</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              {isSignUp ? 'Join Our Mission' : 'Welcome Back'}
            </h2>
            <p className="text-gray-600 mt-2">
              {isSignUp ? 'Start making a difference today' : 'Continue your impact journey'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="Enter your password"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white py-3 px-4 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              {isSignUp ? 'Already have an account? Sign in' : 'New here? Create an account'}
            </button>
            <div className="mt-4">
              <Link 
                to="/landing" 
                className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
            <Users className="h-6 w-6 text-primary-500 mx-auto mb-2" />
            <p className="text-sm text-gray-700 font-medium">Community</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
            <Award className="h-6 w-6 text-secondary-500 mx-auto mb-2" />
            <p className="text-sm text-gray-700 font-medium">Recognition</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
            <Heart className="h-6 w-6 text-accent-500 mx-auto mb-2 fill-current" />
            <p className="text-sm text-gray-700 font-medium">Impact</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;