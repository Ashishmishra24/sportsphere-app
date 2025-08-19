import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockAuth } from '../utils/mockAuth';
import { FaGoogle, FaApple, FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return false;
    }
    if (!formData.password.trim()) {
      toast.error('Password is required');
      return false;
    }
    return true;
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await mockAuth.signInWithEmailAndPassword(formData.email, formData.password);
      toast.success('Welcome back!');
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    try {
      // This would integrate with Firebase Auth providers
      toast.error(`${provider} sign in not implemented yet`);
    } catch (error) {
      console.error('Social login error:', error);
      toast.error('Failed to sign in with social account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        <div className="max-w-md w-full mx-auto">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-blue-600 font-bold text-3xl">S</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">SportSphere</h1>
            <p className="text-blue-100 text-lg">Sign up or log in to get started</p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-4 mb-8">
            <button
              onClick={() => handleSocialLogin('Google')}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-6 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 shadow-lg"
            >
              <FaGoogle className="text-red-500 mr-3 text-lg" />
              Continue with Google
            </button>
            <button
              onClick={() => handleSocialLogin('Apple')}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-6 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 shadow-lg"
            >
              <FaApple className="text-gray-900 mr-3 text-lg" />
              Continue with Apple
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/30" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white">OR</span>
            </div>
          </div>

          {/* Manual Entry Buttons */}
          <div className="space-y-4 mb-8">
            <Link
              to="/signup"
              className="w-full flex items-center justify-center px-6 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-lg"
            >
              Sign up with email / Phone number
            </Link>
            <button
              onClick={() => document.getElementById('login-form').style.display = 'block'}
              className="w-full flex items-center justify-center px-6 py-4 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-400 transition-colors shadow-lg"
            >
              Log in
            </button>
          </div>

          {/* Login Form (Hidden by default) */}
          <form id="login-form" onSubmit={handleEmailLogin} className="space-y-4 hidden">
            {/* Email Field */}
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                placeholder="Email address"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                {showPassword ? <FaEyeSlash className="text-white/70" /> : <FaEye className="text-white/70" />}
              </button>
            </div>

            {/* Forgot Password Link */}
            <div className="text-center">
              <Link
                to="/forgot-password"
                className="text-white/80 hover:text-white text-sm transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-blue-600 py-4 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Account Info */}
          <div className="mt-8 p-4 bg-white/10 rounded-xl border border-white/20">
            <h3 className="text-sm font-medium text-white mb-2">Demo Account</h3>
            <p className="text-xs text-white/80">
              For testing purposes, you can use:<br />
              Email: demo@sportsphere.com<br />
              Password: demo123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
