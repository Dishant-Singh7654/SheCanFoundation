import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, TrendingUp, Crown, DollarSign, Users, Target, Calendar } from 'lucide-react';
import { getLeaderboard } from '../firebase';
import { Link } from 'react-router-dom';
import logoImage from '../assests/logo.jpg';

interface LeaderboardProps {
  currentUser: any;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ currentUser }) => {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard();
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        // Fallback empty leaderboard if Firebase fetch fails
        setLeaderboard([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-primary-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-secondary-500" />;
      case 3:
        return <Award className="h-6 w-6 text-accent-500" />;
      default:
        return <Trophy className="h-6 w-6 text-gray-300" />;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-primary-400 to-primary-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-secondary-400 to-secondary-600 text-white';
      case 3:
        return 'bg-gradient-to-r from-accent-400 to-accent-600 text-white';
      default:
        return 'bg-white border border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const topThree = leaderboard.slice(0, 3);
  const others = leaderboard.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-accent-50 to-secondary-50 pb-12 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-40 right-0 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '3s' }}></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block bg-primary-100 text-primary-800 px-4 py-1 rounded-full font-medium text-sm mb-4">
          <Trophy className="inline-block h-4 w-4 mr-1" />
          Community Impact
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Leaderboard</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Celebrating our incredible interns who are making the biggest impact in our communities
        </p>
      </div>

      {/* Top 3 Podium */}
      <div className="mb-12">
        <div className="flex justify-center items-end space-x-4 mb-8">
          {/* 2nd Place */}
          {topThree[1] && (
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-r from-secondary-400 to-secondary-600 rounded-xl p-6 text-white text-center shadow-lg transform hover:scale-105 transition-transform">
                <div className="relative mb-4">
                  <img
                    src={topThree[1].avatar}
                    alt={topThree[1].name}
                    className="w-16 h-16 rounded-full mx-auto border-4 border-white shadow-lg"
                  />
                  <div className="absolute -top-2 -right-2 bg-white rounded-full p-1">
                    <Medal className="h-6 w-6 text-secondary-500" />
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-1">{topThree[1].name}</h3>
                <p className="text-2xl font-bold">${topThree[1].donationsRaised.toLocaleString()}</p>
                <div className="bg-white/20 rounded-full px-3 py-1 mt-2">
                  <span className="text-sm font-medium">#2</span>
                </div>
              </div>
            </div>
          )}

          {/* 1st Place */}
          {topThree[0] && (
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-r from-primary-400 to-primary-600 rounded-xl p-8 text-white text-center shadow-lg transform hover:scale-105 transition-transform relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Crown className="h-8 w-8 text-primary-200" />
                </div>
                <div className="relative mb-4 mt-2">
                  <img
                    src={topThree[0].avatar}
                    alt={topThree[0].name}
                    className="w-20 h-20 rounded-full mx-auto border-4 border-white shadow-lg"
                  />
                </div>
                <h3 className="font-bold text-xl mb-1">{topThree[0].name}</h3>
                <p className="text-3xl font-bold">${topThree[0].donationsRaised.toLocaleString()}</p>
                <div className="bg-white/20 rounded-full px-4 py-2 mt-3">
                  <span className="text-lg font-bold">#1</span>
                </div>
              </div>
            </div>
          )}

          {/* 3rd Place */}
          {topThree[2] && (
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-r from-accent-400 to-accent-600 rounded-xl p-6 text-white text-center shadow-lg transform hover:scale-105 transition-transform">
                <div className="relative mb-4">
                  <img
                    src={topThree[2].avatar}
                    alt={topThree[2].name}
                    className="w-16 h-16 rounded-full mx-auto border-4 border-white shadow-lg"
                  />
                  <div className="absolute -top-2 -right-2 bg-white rounded-full p-1">
                    <Award className="h-6 w-6 text-accent-500" />
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-1">{topThree[2].name}</h3>
                <p className="text-2xl font-bold">${topThree[2].donationsRaised.toLocaleString()}</p>
                <div className="bg-white/20 rounded-full px-3 py-1 mt-2">
                  <span className="text-sm font-medium">#3</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white">
          <h2 className="text-xl font-bold flex items-center">
            <Trophy className="h-6 w-6 mr-2" />
            Complete Rankings
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {leaderboard.map((intern, index) => (
            <div
              key={intern.id}
              className={`p-6 hover:bg-gray-50 transition-colors ${
                intern.id === currentUser?.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      intern.rank <= 3 ? getRankStyle(intern.rank) : 'bg-gray-100 text-gray-600'
                    }`}>
                      {intern.rank <= 3 ? getRankIcon(intern.rank) : `#${intern.rank}`}
                    </div>
                    <img
                      src={intern.avatar}
                      alt={intern.name}
                      className="w-12 h-12 rounded-full border-2 border-gray-200"
                    />
                  </div>
                  
                  <div>
                    <h3 className={`font-semibold text-lg ${
                      intern.id === currentUser?.id ? 'text-blue-700' : 'text-gray-900'
                    }`}>
                      {intern.name}
                      {intern.id === currentUser?.id && (
                        <span className="ml-2 text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          You
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Joined {new Date(intern.joinDate).toLocaleDateString('en-US', { 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">
                    ${intern.donationsRaised.toLocaleString()}
                  </p>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>Rank #{intern.rank}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSign className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">
            ${leaderboard.reduce((sum, intern) => sum + intern.donationsRaised, 0).toLocaleString()}
          </h3>
          <p className="text-gray-600 font-medium">Total Community Impact</p>
          <p className="text-sm text-gray-500 mt-1">Funds raised this year</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{leaderboard.length}</h3>
          <p className="text-gray-600 font-medium">Active Champions</p>
          <p className="text-sm text-gray-500 mt-1">Making a difference daily</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">
            ${Math.round(leaderboard.reduce((sum, intern) => sum + intern.donationsRaised, 0) / leaderboard.length).toLocaleString()}
          </h3>
          <p className="text-gray-600 font-medium">Average Impact</p>
          <p className="text-sm text-gray-500 mt-1">Per active intern</p>
        </div>
      </div>

      {/* Monthly Challenge Section */}
      <div className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="text-center">
          <Calendar className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">January Challenge</h3>
          <p className="text-lg mb-6 opacity-90">
            Help us reach our goal of $100,000 this month to fund education programs for 500 women!
          </p>
          <div className="bg-white/20 rounded-full h-4 mb-4">
            <div 
              className="bg-white h-4 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((leaderboard.reduce((sum, intern) => sum + intern.donationsRaised, 0) / 100000) * 100, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm opacity-80">
            <span>${leaderboard.reduce((sum, intern) => sum + intern.donationsRaised, 0).toLocaleString()} raised</span>
            <span>Goal: $100,000</span>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Leaderboard;