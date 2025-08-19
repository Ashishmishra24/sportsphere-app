import React, { useState } from 'react';
import { signInWithGoogle } from '../utils/auth';
import { handleError } from '../utils/errorHandler';
import LoadingSpinner from './LoadingSpinner';
import './Login.css';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    
    try {
      await signInWithGoogle();
      // Success - user will be redirected or state will be updated
    } catch (error) {
      handleError(error, 'Login - Google Sign In');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome to SportSphere</h2>
        <p>Sign in to access your sports dashboard</p>
        
        <button 
          className="google-signin-btn"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner size="sm" text="" />
              <span className="ml-2">Signing in...</span>
            </div>
          ) : (
            'Sign in with Google'
          )}
        </button>
      </div>
    </div>
  );
};

export default Login; 