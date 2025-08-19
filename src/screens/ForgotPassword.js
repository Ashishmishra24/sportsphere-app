import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockAuth } from '../utils/mockAuth';
import { FaArrowLeft, FaEnvelope } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      await mockAuth.sendPasswordResetEmail(email);
      setIsEmailSent(true);
      toast.success('Password reset email sent!');
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <Link to="/login" className="mr-4">
              <FaArrowLeft className="text-gray-600 text-xl" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
          </div>
        </div>

        {/* Success Content */}
        <div className="flex-1 flex flex-col justify-center px-6 py-8">
          <div className="max-w-md w-full mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaEnvelope className="text-2xl text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Check Your Email
            </h2>
            
            <p className="text-gray-600 mb-6">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-blue-900 mb-2">What's next?</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Check your email inbox</li>
                <li>• Click the reset link in the email</li>
                <li>• Create a new password</li>
                <li>• Sign in with your new password</li>
              </ul>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setIsEmailSent(false);
                  setEmail('');
                }}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Send Another Email
              </button>
              
              <Link
                to="/login"
                className="block w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Back to Sign In
              </Link>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              <p>Didn't receive the email? Check your spam folder or</p>
              <button
                onClick={() => {
                  setIsEmailSent(false);
                  setEmail('');
                }}
                className="text-blue-600 hover:underline"
              >
                try a different email address
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <Link to="/login" className="mr-4">
            <FaArrowLeft className="text-gray-600 text-xl" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        <div className="max-w-md w-full mx-auto">
          {/* Header Content */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaEnvelope className="text-2xl text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Forgot Your Password?
            </h2>
            <p className="text-gray-600">
              No worries! Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {/* Reset Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email address"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          {/* Back to Login */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Remember your password?{' '}
              <Link to="/login" className="text-blue-600 hover:underline font-medium">
                Sign In
              </Link>
            </p>
          </div>

          {/* Help Section */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-3">
              If you're still having trouble, you can:
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Check your email spam folder</li>
              <li>• Make sure you're using the correct email address</li>
              <li>• Contact our support team</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
