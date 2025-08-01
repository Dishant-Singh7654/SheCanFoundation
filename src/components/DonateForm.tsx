import React, { useState } from 'react';
import { Heart, DollarSign, X } from 'lucide-react';
import Toast from './Toast';

interface DonateFormProps {
  onClose?: () => void;
  onSuccess?: (amount: number) => void;
}

const DonateForm: React.FC<DonateFormProps> = ({ onClose, onSuccess }) => {
  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const predefinedAmounts = [10, 25, 50, 100, 250, 500];

  const handleAmountClick = (value: number) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setCustomAmount(value);
      if (value) {
        setAmount(parseFloat(value));
      } else {
        setAmount(null);
      }
    }
  };

  const validateAmount = () => {
    if (!amount || amount <= 0) {
      setError('Please select or enter a valid donation amount');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAmount()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Call the onSuccess callback with the amount
      if (onSuccess && amount) {
        onSuccess(amount);
        setToastMessage(`Thank you for your donation of $${amount.toLocaleString()}!`);
        setShowToast(true);
      }
      if (onClose) onClose();
    } catch (err) {
      setError('An error occurred while processing your donation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Toast 
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        type="success"
      />
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="animate-fade-in">
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Select Donation Amount</label>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {predefinedAmounts.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleAmountClick(value)}
                  className={`py-3 rounded-xl font-medium transition-all duration-300 ${amount === value
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-glow'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  ${value}
                </button>
              ))}
            </div>
            
            <div className="relative mt-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Custom Amount"
                value={customAmount}
                onChange={handleCustomAmountChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
              />
            </div>
          </div>
          
          <div className="text-center">
            <button
              type="submit"
              disabled={loading || !amount}
              className="btn-primary w-full group"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Donate Now
                  <Heart className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </span>
              )}
            </button>
          </div>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          Your donation helps empower women and build stronger communities. Thank you for your support!
        </p>
      </div>
    </div>
  );
};

export default DonateForm;