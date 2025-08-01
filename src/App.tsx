import React, { useState, useEffect } from 'react';
import { auth, getUserData } from './firebase';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';
import Navigation from './components/Navigation';
import About from './components/About';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up a timeout to ensure loading state is resolved even if Firebase fails
    const timeoutId = setTimeout(() => {
      if (loading) {
        console.warn('Firebase authentication timed out, proceeding as unauthenticated');
        setLoading(false);
        setIsAuthenticated(false);
      }
    }, 5000); // 5 second timeout
    
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      clearTimeout(timeoutId); // Clear the timeout since auth responded
      
      if (user) {
        setIsAuthenticated(true);
        try {
          const userData = await getUserData(user.uid);
          setCurrentUser({
            id: user.uid,
            ...userData
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Still set basic user info even if Firestore data fails
          setCurrentUser({
            id: user.uid,
            email: user.email,
            name: user.displayName || user.email?.split('@')[0] || 'User'
          });
        }
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
      setLoading(false);
    }, (error) => {
      // Handle auth observer error
      console.error("Firebase auth observer error:", error);
      setLoading(false);
      setIsAuthenticated(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = (userData: any) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsAuthenticated(false);
      setCurrentUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-accent-50 to-secondary-50">
        <div className="text-center p-8 max-w-md mx-auto">
          <div className="animate-pulse mb-4">
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-3 rounded-full inline-block">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading She Can Foundation</h2>
          <p className="text-gray-600">Please wait while we prepare your experience...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {isAuthenticated && (
          <Navigation currentUser={currentUser} onLogout={handleLogout} />
        )}
        
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route 
            path="/login" 
            element={
              !isAuthenticated ? (
                <Login onLogin={handleLogin} />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? (
                <Dashboard currentUser={currentUser} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/leaderboard" 
            element={
              isAuthenticated ? (
                <Leaderboard currentUser={currentUser} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/" 
            element={<Navigate to={isAuthenticated ? "/dashboard" : "/landing"} replace />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;