import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaFutbol,
  FaBasketballBall,
  FaTableTennis,
  FaVolleyballBall,
  FaHockeyPuck,
  FaTrophy,
  FaStar,
  FaCheck
} from 'react-icons/fa';
import { GiTennisRacket, GiCricketBat } from 'react-icons/gi';
import toast from 'react-hot-toast';

const UserPreferences = () => {
  const navigate = useNavigate();
  const [selectedSports, setSelectedSports] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sports = [
    { id: 'football', name: 'Football', icon: FaFutbol, color: 'text-green-600' },
    { id: 'cricket', name: 'Cricket', icon: GiCricketBat, color: 'text-red-600' },
    { id: 'tennis', name: 'Tennis', icon: GiTennisRacket, color: 'text-yellow-600' },
    { id: 'basketball', name: 'Basketball', icon: FaBasketballBall, color: 'text-orange-600' },
    { id: 'badminton', name: 'Badminton', icon: FaTableTennis, color: 'text-purple-600' },
    { id: 'volleyball', name: 'Volleyball', icon: FaVolleyballBall, color: 'text-blue-600' },
    { id: 'hockey', name: 'Hockey', icon: FaHockeyPuck, color: 'text-gray-600' }
  ];

  const skillLevels = [
    { id: 'beginner', name: 'Beginner', description: 'Just starting out' },
    { id: 'intermediate', name: 'Intermediate', description: 'Some experience' },
    { id: 'advanced', name: 'Advanced', description: 'Experienced player' },
    { id: 'professional', name: 'Professional', description: 'Competitive level' }
  ];

  const locations = [
    { id: 'local', name: 'Local', description: 'Same city' },
    { id: 'regional', name: 'Regional', description: 'Same state/province' },
    { id: 'national', name: 'National', description: 'Same country' },
    { id: 'international', name: 'International', description: 'Worldwide' }
  ];

  const toggleSport = (sportId) => {
    setSelectedSports(prev => 
      prev.includes(sportId) 
        ? prev.filter(id => id !== sportId)
        : [...prev, sportId]
    );
  };

  const handleSubmit = async () => {
    if (selectedSports.length === 0) {
      toast.error('Please select at least one sport');
      return;
    }
    if (!selectedLevel) {
      toast.error('Please select your skill level');
      return;
    }
    if (!selectedLocation) {
      toast.error('Please select your preferred location');
      return;
    }

    setIsLoading(true);
    try {
      // Save user preferences to localStorage or user profile
      const preferences = {
        sports: selectedSports,
        skillLevel: selectedLevel,
        location: selectedLocation,
        completed: true
      };
      
      localStorage.setItem('userPreferences', JSON.stringify(preferences));
      
      toast.success('Preferences saved successfully!');
      navigate('/home');
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast.error('Failed to save preferences');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col">
      {/* Dark Content Area */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        <div className="max-w-md w-full mx-auto">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-blue-600 font-bold text-2xl">S</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">SportSphere</h1>
            <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-2">
              Let's Personalize Your SportSphere Experience
            </h2>
            <p className="text-blue-100 text-sm">
              Choose your interests and preferences
            </p>
          </div>

          {/* Sports Selection */}
          <div className="mb-8">
            <h3 className="text-white font-semibold mb-4">Select Your Sports</h3>
            <div className="grid grid-cols-3 gap-3">
              {sports.map((sport) => {
                const Icon = sport.icon;
                const isSelected = selectedSports.includes(sport.id);
                return (
                  <button
                    key={sport.id}
                    onClick={() => toggleSport(sport.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      isSelected
                        ? 'bg-white border-white shadow-lg'
                        : 'bg-transparent border-white/30 hover:border-white/60'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isSelected ? 'bg-blue-100' : 'bg-white/20'
                      }`}>
                        <Icon className={`text-xl ${isSelected ? sport.color : 'text-white'}`} />
                      </div>
                      <span className={`text-xs font-medium ${
                        isSelected ? 'text-gray-900' : 'text-white'
                      }`}>
                        {sport.name}
                      </span>
                      {isSelected && (
                        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                          <FaCheck className="text-white text-xs" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Skill Level Selection */}
          <div className="mb-8">
            <h3 className="text-white font-semibold mb-4">Your Skill Level</h3>
            <div className="space-y-3">
              {skillLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    selectedLevel === level.id
                      ? 'bg-white border-white shadow-lg'
                      : 'bg-transparent border-white/30 hover:border-white/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`font-semibold ${
                        selectedLevel === level.id ? 'text-gray-900' : 'text-white'
                      }`}>
                        {level.name}
                      </h4>
                      <p className={`text-sm ${
                        selectedLevel === level.id ? 'text-gray-600' : 'text-blue-100'
                      }`}>
                        {level.description}
                      </p>
                    </div>
                    {selectedLevel === level.id && (
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <FaCheck className="text-white text-sm" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Location Preference */}
          <div className="mb-8">
            <h3 className="text-white font-semibold mb-4">Preferred Location</h3>
            <div className="space-y-3">
              {locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => setSelectedLocation(location.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    selectedLocation === location.id
                      ? 'bg-white border-white shadow-lg'
                      : 'bg-transparent border-white/30 hover:border-white/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`font-semibold ${
                        selectedLocation === location.id ? 'text-gray-900' : 'text-white'
                      }`}>
                        {location.name}
                      </h4>
                      <p className={`text-sm ${
                        selectedLocation === location.id ? 'text-gray-600' : 'text-blue-100'
                      }`}>
                        {location.description}
                      </p>
                    </div>
                    {selectedLocation === location.id && (
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <FaCheck className="text-white text-sm" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Get Started Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading || selectedSports.length === 0 || !selectedLevel || !selectedLocation}
            className="w-full bg-gray-900 text-white py-4 px-6 rounded-xl font-semibold text-center hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {isLoading ? 'Setting Up...' : 'Get Started'}
          </button>

          {/* Skip Option */}
          <div className="text-center mt-4">
            <button
              onClick={() => navigate('/home')}
              className="text-blue-100 hover:text-white text-sm transition-colors"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPreferences;
