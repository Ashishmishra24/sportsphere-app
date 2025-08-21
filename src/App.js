import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { mockAuth } from './utils/mockAuth';
import { Toaster } from 'react-hot-toast';

// Authentication Screens
import Welcome from './screens/Welcome';
import Onboarding from './screens/Onboarding';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import ForgotPassword from './screens/ForgotPassword';

// Main App Screens
import Home from './screens/Home';
import UserProfile from './screens/UserProfile';
import FriendsAndRivals from './screens/FriendsAndRivals';
import MatchCreation from './screens/MatchCreation';
import TournamentCreation from './screens/TournamentCreation';
import MatchOverview from './screens/MatchOverview';
import ScoringAndStats from './screens/ScoringAndStats';
import LiveMatch from './screens/LiveMatch';
import LiveScores from './screens/LiveScores';
import Matches from './screens/Matches';
import QRCodeScanner from './screens/QRCodeScanner';
import UserPreferences from './screens/UserPreferences';
import Highlights from './screens/Highlights';
import HistoricalMatches from './screens/HistoricalMatches';
import PerformanceAnalytics from './screens/PerformanceAnalytics';
import ChatAndMessaging from './screens/ChatAndMessaging';
import VenueDirectory from './screens/VenueDirectory';
import VenueBooking from './screens/VenueBooking';
import Settings from './screens/Settings';
import SupportAndHelp from './screens/SupportAndHelp';
import Search from './screens/Search';
import TournamentPage from './screens/TournamentPage';
import MatchDetail from './screens/MatchDetail';

// Layout Components
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import Breadcrumbs from './components/Breadcrumbs';

import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener (similar to Firebase's onAuthStateChanged)
    const unsubscribe = mockAuth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    // Check initial auth state
    const currentUser = mockAuth.getCurrentUser();
    setUser(currentUser);
    setLoading(false);

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="App">
        <LoadingSpinner 
          size="xl" 
          text="Loading SportSphere..." 
          fullScreen={true}
        />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
                borderRadius: '8px',
                fontSize: '14px',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
          
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={!user ? <Welcome /> : <Navigate to="/home" />} />
            <Route path="/onboarding" element={!user ? <Onboarding /> : <Navigate to="/home" />} />
            <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/home" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" />} />
            <Route path="/forgot-password" element={!user ? <ForgotPassword /> : <Navigate to="/home" />} />
            <Route path="/user-preferences" element={<UserPreferences />} />

            {/* Protected Routes */}
            <Route path="/home" element={<ProtectedRoute user={user}><Home /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute user={user}><UserProfile /></ProtectedRoute>} />
            <Route path="/friends-rivals" element={<ProtectedRoute user={user}><FriendsAndRivals /></ProtectedRoute>} />
            <Route path="/create-match" element={<ProtectedRoute user={user}><MatchCreation /></ProtectedRoute>} />
            <Route path="/create-tournament" element={<ProtectedRoute user={user}><TournamentCreation /></ProtectedRoute>} />
            <Route path="/match/:id" element={<ProtectedRoute user={user}><MatchOverview /></ProtectedRoute>} />
            <Route path="/match/:id/detail" element={<ProtectedRoute user={user}><MatchDetail /></ProtectedRoute>} />

            <Route path="/match/:id/scoring" element={<ProtectedRoute user={user}><ScoringAndStats /></ProtectedRoute>} />
            <Route path="/live-match/:id" element={<ProtectedRoute user={user}><LiveMatch /></ProtectedRoute>} />
            <Route path="/live-scores" element={<ProtectedRoute user={user}><LiveScores /></ProtectedRoute>} />
            <Route path="/matches" element={<ProtectedRoute user={user}><Matches /></ProtectedRoute>} />
            <Route path="/qr-scanner" element={<ProtectedRoute user={user}><QRCodeScanner /></ProtectedRoute>} />
            <Route path="/highlights" element={<ProtectedRoute user={user}><Highlights /></ProtectedRoute>} />
            <Route path="/historical-matches" element={<ProtectedRoute user={user}><HistoricalMatches /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute user={user}><PerformanceAnalytics /></ProtectedRoute>} />
            <Route path="/profile/:userId" element={<ProtectedRoute user={user}><UserProfile /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute user={user}><ChatAndMessaging /></ProtectedRoute>} />
            <Route path="/venues" element={<ProtectedRoute user={user}><VenueDirectory /></ProtectedRoute>} />
            <Route path="/venue/:id/booking" element={<ProtectedRoute user={user}><VenueBooking /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute user={user}><Settings /></ProtectedRoute>} />
            <Route path="/support" element={<ProtectedRoute user={user}><SupportAndHelp /></ProtectedRoute>} />
            <Route path="/search" element={<ProtectedRoute user={user}><Search /></ProtectedRoute>} />
            <Route path="/tournament/:tournamentId" element={<ProtectedRoute user={user}><TournamentPage /></ProtectedRoute>} />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to={user ? "/home" : "/"} />} />
          </Routes>
          
          {/* Navigation for authenticated users */}
          {user && <Navigation />}
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App; 