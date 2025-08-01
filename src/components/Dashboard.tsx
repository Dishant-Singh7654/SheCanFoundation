import React, { useState, useEffect } from 'react';
import { getUserStats, updateUserDonation } from '../firebase';
import DonateForm from './DonateForm';
import Toast from './Toast';
import { Heart, Award, TrendingUp, Users, Copy, Check, Gift, Star, ChevronRight, Sparkles } from 'lucide-react';

interface UserStats {
  totalRaised: number;
  currentRank: string;
  monthlyGrowth: number;
  communityRank: number;
  referralCode: string;
}

interface DashboardProps {
  currentUser: any;
}

const Dashboard: React.FC<DashboardProps> = ({ currentUser }) => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDonateForm, setShowDonateForm] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [animateStats, setAnimateStats] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (currentUser && currentUser.id) {
          const userStats = await getUserStats(currentUser.id);
          setStats(userStats);
          setLoading(false);
          
          // Trigger animation after stats are loaded
          setTimeout(() => {
            setAnimateStats(true);
          }, 300);
        }
      } catch (error) {
        console.error('Error fetching user stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, [currentUser]);

  const handleDonationSuccess = async (amount: number) => {
    try {
      if (currentUser && currentUser.id) {
        await updateUserDonation(currentUser.id, amount);
        const updatedStats = await getUserStats(currentUser.id);
        setStats(updatedStats);
        setShowDonateForm(false);
        setToastMessage(`Thank you for your donation of $${amount.toLocaleString()}!`);
        setShowToast(true);
      }
    } catch (error) {
      console.error('Error updating donation:', error);
    }
  };

  const copyReferralCode = () => {
    if (stats?.referralCode) {
      navigator.clipboard.writeText(stats.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const rankColors = {
    'Bronze': 'from-amber-500 to-amber-700',
    'Silver': 'from-gray-400 to-gray-600',
    'Gold': 'from-yellow-400 to-yellow-600',
    'Platinum': 'from-indigo-400 to-purple-600',
    'Diamond': 'from-cyan-400 to-blue-600'
  };

  const getRankColor = (rank: string) => {
    return rankColors[rank as keyof typeof rankColors] || 'from-primary-500 to-accent-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-accent-50 to-secondary-50">
        <div className="text-center">
          <div className="inline-block relative">
            <div className="w-16 h-16 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin"></div>
            <Heart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary-600" />
          </div>
          <p className="mt-4 text-primary-700 font-medium">Loading your impact dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-accent-50 to-secondary-50 pb-12 relative overflow-hidden">
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        type="success"
      />
      {/* Decorative elements */}
      <div className="absolute top-40 right-0 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '3s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
        {/* Welcome Header with Donate Button */}
        <div className={`flex flex-col md:flex-row items-center justify-between mb-12 ${animateStats ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="text-center md:text-left mb-6 md:mb-0">
            <div className="inline-block bg-primary-100 text-primary-800 px-4 py-1 rounded-full font-medium text-sm mb-4">
              <Sparkles className="inline-block h-4 w-4 mr-1" />
              Your Impact Dashboard
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to Your Impact Journey</h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Track your contributions, earn rewards, and see your impact grow
            </p>
          </div>
          
          <div className="flex-shrink-0">
            <button
              onClick={() => setShowDonateForm(true)}
              className="btn-primary group inline-flex items-center px-8 py-4 text-lg shadow-glow bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 transform hover:scale-105 transition-all duration-300"
            >
              <Heart className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Make a Donation
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Total Raised */}
          <div 
            className={`card card-hover transform transition-all duration-500 ${animateStats ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 font-medium mb-1">Total Raised</p>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  ${stats?.totalRaised.toLocaleString()}
                </h3>
              </div>
              <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-3 rounded-xl shadow-glow">
                <Heart className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-primary-600 font-medium flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                Making a difference
              </p>
            </div>
          </div>

          {/* Current Rank */}
          <div 
            className={`card card-hover transform transition-all duration-500 ${animateStats ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 font-medium mb-1">Current Rank</p>
                <h3 className={`text-3xl font-bold bg-gradient-to-r ${getRankColor(stats?.currentRank || 'Bronze')} bg-clip-text text-transparent`}>
                  {stats?.currentRank}
                </h3>
              </div>
              <div className={`bg-gradient-to-r ${getRankColor(stats?.currentRank || 'Bronze')} p-3 rounded-xl shadow-glow`}>
                <Award className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-primary-600 font-medium flex items-center">
                <Star className="h-4 w-4 mr-1 fill-current" />
                Keep growing your impact
              </p>
            </div>
          </div>

          {/* Monthly Growth */}
          <div 
            className={`card card-hover transform transition-all duration-500 ${animateStats ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 font-medium mb-1">Monthly Growth</p>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
                  {stats?.monthlyGrowth}%
                </h3>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-teal-500 p-3 rounded-xl shadow-glow">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-green-600 font-medium flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                Growing steadily
              </p>
            </div>
          </div>

          {/* Community Rank */}
          <div 
            className={`card card-hover transform transition-all duration-500 ${animateStats ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 font-medium mb-1">Community Rank</p>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-accent-500 to-secondary-500 bg-clip-text text-transparent">
                  #{stats?.communityRank}
                </h3>
              </div>
              <div className="bg-gradient-to-r from-accent-500 to-secondary-500 p-3 rounded-xl shadow-glow">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-accent-600 font-medium flex items-center">
                <Users className="h-4 w-4 mr-1" />
                Among top contributors
              </p>
            </div>
          </div>
        </div>

        {/* Referral Code Card */}
        <div 
          className={`card card-hover mb-10 transform transition-all duration-500 ${animateStats ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          style={{ transitionDelay: '500ms' }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-2 rounded-lg shadow-glow mr-3">
                  <Gift className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Your Referral Code</h3>
              </div>
              <p className="text-gray-600 mt-2">
                Share this code with friends to earn bonus rewards when they join
              </p>
            </div>
            <div className="flex items-center">
              <div className="bg-gray-100 px-4 py-2 rounded-l-lg border border-gray-200 font-mono font-medium text-gray-800">
                {stats?.referralCode}
              </div>
              <button
                onClick={copyReferralCode}
                className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-3 py-2 rounded-r-lg hover:from-primary-600 hover:to-accent-600 transition-all duration-300 flex items-center"
              >
                {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Rewards & Recognition */}
        <div 
          className={`card card-hover mb-10 transform transition-all duration-500 ${animateStats ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-2 rounded-lg shadow-glow mr-3">
              <Award className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Rewards & Recognition</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl border border-primary-100 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-2 rounded-full mr-3 shadow-glow">
                  <Star className="h-4 w-4 text-white fill-current" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Impact Certificate</h4>
                  <p className="text-sm text-gray-600">Awarded for raising over $1,000</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl border border-primary-100 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-2 rounded-full mr-3 shadow-glow">
                  <Gift className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Exclusive Merchandise</h4>
                  <p className="text-sm text-gray-600">Unlocked at $2,500 raised</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl border border-primary-100 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-2 rounded-full mr-3 shadow-glow">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Leadership Summit Invitation</h4>
                  <p className="text-sm text-gray-600">Exclusive event for top contributors</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div 
          className={`card card-hover mb-10 transform transition-all duration-500 ${animateStats ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          style={{ transitionDelay: '700ms' }}
        >
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-2 rounded-lg shadow-glow mr-3">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Your Progress</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 font-medium">Next Rank: Diamond</span>
                <span className="text-primary-600 font-medium">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-primary-500 to-accent-500 h-2.5 rounded-full w-3/4 animate-shimmer"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 font-medium">Monthly Goal</span>
                <span className="text-primary-600 font-medium">40%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-green-500 to-teal-500 h-2.5 rounded-full w-2/5 animate-shimmer"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 font-medium">Referral Bonus</span>
                <span className="text-primary-600 font-medium">20%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-accent-500 to-secondary-500 h-2.5 rounded-full w-1/5 animate-shimmer"></div>
              </div>
            </div>
          </div>
        </div>


      </div>

      {/* Donate Form Modal */}
      {showDonateForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-slide-up">
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 py-4 px-6 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold flex items-center">
                  <Heart className="mr-2 h-5 w-5 fill-current" /> Make a Donation
                </h3>
                <button
                  onClick={() => setShowDonateForm(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <DonateForm onSuccess={handleDonationSuccess} onClose={() => setShowDonateForm(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;