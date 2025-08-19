import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockAuth } from '../utils/mockAuth';
import { 
  FaEdit, 
  FaTrophy, 
  FaChartLine, 
  FaCalendar, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope,
  FaArrowLeft,
  FaCamera,
  FaSave,
  FaTimes,
  FaCog
} from 'react-icons/fa';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: '',
    bio: '',
    location: '',
    phone: '',
    sports: [],
    achievements: []
  });
  const [stats, setStats] = useState({
    matchesPlayed: 0,
    matchesWon: 0,
    tournamentsWon: 0,
    winRate: 0,
    totalPoints: 0
  });

  useEffect(() => {
    const currentUser = mockAuth.getCurrentUser();
    setUser(currentUser);
    if (currentUser) {
      // Load user preferences from localStorage
      const savedPreferences = localStorage.getItem('userPreferences');
      const preferences = savedPreferences ? JSON.parse(savedPreferences) : null;
      
      setProfileData({
        displayName: currentUser.displayName || '',
        bio: 'Passionate athlete who loves competing and improving skills.',
        location: 'New York, NY',
        phone: '+1 (555) 123-4567',
        sports: preferences?.sports || ['Basketball', 'Soccer', 'Tennis'],
        achievements: [
          { id: 1, title: 'Championship Winner', sport: 'Basketball', date: '2024', icon: '🏆' },
          { id: 2, title: 'Perfect Game', sport: 'Tennis', date: '2023', icon: '🎯' },
          { id: 3, title: 'MVP Award', sport: 'Soccer', date: '2023', icon: '⭐' }
        ]
      });

      setStats({
        matchesPlayed: 45,
        matchesWon: 32,
        tournamentsWon: 3,
        winRate: 71,
        totalPoints: 1250
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      // In a real app, this would update the user profile in Firebase
      setIsEditing(false);
      // Show success message
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/home" className="mr-4">
              <FaArrowLeft className="text-gray-600 text-xl" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaEdit className="mr-2" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-white px-6 py-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.displayName?.charAt(0) || 'U'}
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700">
                <FaCamera className="text-sm" />
              </button>
            )}
          </div>
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                name="displayName"
                value={profileData.displayName}
                onChange={handleInputChange}
                className="text-2xl font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded border-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <h2 className="text-2xl font-bold text-gray-900">{profileData.displayName}</h2>
            )}
            <p className="text-gray-600">Member since {new Date(user.metadata.creationTime).getFullYear()}</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="px-6 py-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.matchesPlayed}</div>
              <div className="text-sm text-gray-600">Matches Played</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.matchesWon}</div>
              <div className="text-sm text-gray-600">Matches Won</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.tournamentsWon}</div>
              <div className="text-sm text-gray-600">Tournaments Won</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.winRate}%</div>
              <div className="text-sm text-gray-600">Win Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="px-6 py-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Information</h3>
          
          {/* Bio */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-600">{profileData.bio}</p>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-gray-400 mr-3" />
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={profileData.location}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <span className="text-gray-600">{profileData.location}</span>
              )}
            </div>
            
            <div className="flex items-center">
              <FaPhone className="text-gray-400 mr-3" />
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <span className="text-gray-600">{profileData.phone}</span>
              )}
            </div>
            
            <div className="flex items-center">
              <FaEnvelope className="text-gray-400 mr-3" />
              <span className="text-gray-600">{user.email}</span>
            </div>
          </div>

          {/* Sports */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sports</label>
            <div className="flex flex-wrap gap-2">
              {profileData.sports.map((sport, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {sport}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="px-6 py-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
          <div className="space-y-3">
            {profileData.achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl mr-3">{achievement.icon}</span>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                  <p className="text-sm text-gray-600">{achievement.sport} • {achievement.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {isEditing && (
        <div className="px-6 py-4">
          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <FaSave className="mr-2" />
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 flex items-center justify-center px-4 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
            >
              <FaTimes className="mr-2" />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Preferences Management */}
      <div className="px-6 py-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences & Settings</h3>
          <div className="space-y-2">
            <Link to="/user-preferences" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <FaCog className="text-blue-600 mr-3" />
              <span className="text-gray-900">Manage Preferences</span>
            </Link>
            <Link to="/friends-rivals" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <FaTrophy className="text-blue-600 mr-3" />
              <span className="text-gray-900">Friends & Rivals</span>
            </Link>
            <Link to="/analytics" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <FaChartLine className="text-green-600 mr-3" />
              <span className="text-gray-900">Performance Analytics</span>
            </Link>
            <Link to="/historical-matches" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <FaCalendar className="text-purple-600 mr-3" />
              <span className="text-gray-900">Match History</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
