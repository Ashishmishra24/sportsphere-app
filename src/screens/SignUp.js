import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockAuth } from '../utils/mockAuth';
import { FaGoogle, FaApple, FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      toast.error('First name is required');
      return false;
    }
    if (!formData.lastName.trim()) {
      toast.error('Last name is required');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email');
      return false;
    }
    if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone)) {
      toast.error('Please enter a valid phone number');
      return false;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    if (!formData.agreeToTerms) {
      toast.error('Please agree to the terms and conditions');
      return false;
    }
    return true;
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const userCredential = await mockAuth.createUserWithEmailAndPassword(
        formData.email,
        formData.password
      );

      // Update user profile with display name
      userCredential.user.displayName = `${formData.firstName} ${formData.lastName}`;

      toast.success('Account created successfully!');
      // Navigate to preferences setup instead of home
      navigate('/user-preferences');
    } catch (error) {
      console.error('Sign up error:', error);
      toast.error('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = async (provider) => {
    setIsLoading(true);
    try {
      // This would integrate with Firebase Auth providers
      toast.error(`${provider} sign up not implemented yet`);
    } catch (error) {
      console.error('Social sign up error:', error);
      toast.error('Failed to sign up with social account');
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
            <p className="text-blue-100 text-lg">Create your account</p>
          </div>

          {/* Social Sign Up Buttons */}
          <div className="space-y-4 mb-8">
            <button
              onClick={() => handleSocialSignUp('Google')}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-6 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 shadow-lg"
            >
              <FaGoogle className="text-red-500 mr-3 text-lg" />
              Continue with Google
            </button>
            <button
              onClick={() => handleSocialSignUp('Apple')}
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

          {/* Sign Up Form */}
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  placeholder="First Name"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>

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

            {/* Phone Field */}
            <div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                placeholder="Phone number (optional)"
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

            {/* Confirm Password Field */}
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                placeholder="Confirm password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                {showConfirmPassword ? <FaEyeSlash className="text-white/70" /> : <FaEye className="text-white/70" />}
              </button>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-white/30 rounded bg-transparent"
                required
              />
              <label htmlFor="agreeToTerms" className="ml-2 text-sm text-white/80">
                I agree to the{' '}
                <Link to="/terms" className="text-white hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-white hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-blue-600 py-4 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="text-center mt-6">
            <p className="text-white/80">
              Already have an account?{' '}
              <Link to="/login" className="text-white hover:underline font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
