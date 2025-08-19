import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFutbol, 
  FaBasketballBall, 
  FaTableTennis, 
  FaVolleyballBall, 
  FaHockeyPuck, 
  FaTrophy, 
  FaPlay,
  FaUsers,
  FaStar,
  FaArrowRight
} from 'react-icons/fa';
import { GiTennisRacket, GiCricketBat } from 'react-icons/gi';

const Welcome = () => {
  const features = [
    {
      icon: FaPlay,
      title: 'Live Scores',
      description: 'Real-time updates from matches around the world'
    },
    {
      icon: FaUsers,
      title: 'Connect',
      description: 'Find players and join local communities'
    },
    {
      icon: FaTrophy,
      title: 'Compete',
      description: 'Participate in tournaments and track your progress'
    }
  ];

  const sports = [
    { icon: FaFutbol, name: 'Football', color: 'text-green-600' },
    { icon: GiCricketBat, name: 'Cricket', color: 'text-red-600' },
    { icon: GiTennisRacket, name: 'Tennis', color: 'text-yellow-600' },
    { icon: FaBasketballBall, name: 'Basketball', color: 'text-orange-600' },
    { icon: FaTableTennis, name: 'Badminton', color: 'text-purple-600' },
    { icon: FaVolleyballBall, name: 'Volleyball', color: 'text-blue-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="px-6 pt-12 pb-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-white font-bold text-3xl">S</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">SportSphere</h1>
          <p className="text-lg text-gray-600 mb-8">Your ultimate sports companion</p>
        </div>
      </div>

      {/* Features */}
      <div className="px-6 mb-8">
        <div className="space-y-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="text-blue-600 text-xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sports Grid */}
      <div className="px-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">Popular Sports</h2>
        <div className="grid grid-cols-3 gap-4">
          {sports.map((sport, index) => {
            const Icon = sport.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon className={`text-xl ${sport.color}`} />
                </div>
                <span className="text-sm font-medium text-gray-700">{sport.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="px-6 pb-8">
        <div className="space-y-3">
          <Link 
            to="/signup"
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-center block hover:bg-blue-700 transition-colors shadow-lg"
          >
            Get Started
          </Link>
          <Link 
            to="/login"
            className="w-full bg-white text-blue-600 py-4 px-6 rounded-xl font-semibold text-center block hover:bg-gray-50 transition-colors border border-gray-200"
          >
            I already have an account
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-8">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
          <div className="flex items-center justify-center space-x-6">
            <span className="text-xs text-gray-400">© 2024 SportSphere</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-400">Made with ❤️</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
