import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaCalendar, 
  FaClock, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaVideo, 
  FaTrophy,
  FaSave,
  FaPlus
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const MatchCreation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    sport: '',
    date: '',
    time: '',
    venue: '',
    maxPlayers: '',
    description: '',
    isPublic: true,
    enableLiveStream: false,
    entryFee: '',
    rules: ''
  });
  const [teams, setTeams] = useState([
    { id: 1, name: '', players: [] }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sports = [
    'Basketball', 'Soccer', 'Tennis', 'Volleyball', 'Badminton', 
    'Table Tennis', 'Cricket', 'Baseball', 'Hockey', 'Rugby'
  ];

  const venues = [
    'Central Arena', 'Local Court', 'Sports Complex', 'Community Center',
    'University Gym', 'Park Recreation Center', 'Indoor Stadium'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTeamChange = (teamId, field, value) => {
    setTeams(prev => prev.map(team => 
      team.id === teamId ? { ...team, [field]: value } : team
    ));
  };

  const addTeam = () => {
    const newTeam = {
      id: teams.length + 1,
      name: '',
      players: []
    };
    setTeams([...teams, newTeam]);
  };

  const removeTeam = (teamId) => {
    if (teams.length > 1) {
      setTeams(prev => prev.filter(team => team.id !== teamId));
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error('Match title is required');
      return false;
    }
    if (!formData.sport) {
      toast.error('Please select a sport');
      return false;
    }
    if (!formData.date) {
      toast.error('Please select a date');
      return false;
    }
    if (!formData.time) {
      toast.error('Please select a time');
      return false;
    }
    if (!formData.venue) {
      toast.error('Please select a venue');
      return false;
    }
    if (teams.some(team => !team.name.trim())) {
      toast.error('All teams must have names');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // In a real app, this would save to Firebase
      const matchData = {
        ...formData,
        teams,
        createdAt: new Date().toISOString(),
        status: 'scheduled'
      };
      
      console.log('Creating match:', matchData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Match created successfully!');
      navigate('/home');
    } catch (error) {
      console.error('Error creating match:', error);
      toast.error('Failed to create match. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/home" className="mr-4">
              <FaArrowLeft className="text-gray-600 text-xl" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Create Match</h1>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-6 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FaTrophy className="mr-2 text-blue-600" />
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Match Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Weekend Basketball League"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sport *
                </label>
                <select
                  name="sport"
                  value={formData.sport}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Sport</option>
                  {sports.map(sport => (
                    <option key={sport} value={sport}>{sport}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <div className="relative">
                  <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time *
                </label>
                <div className="relative">
                  <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Venue *
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    name="venue"
                    value={formData.venue}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Venue</option>
                    {venues.map(venue => (
                      <option key={venue} value={venue}>{venue}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Players
                </label>
                <input
                  type="number"
                  name="maxPlayers"
                  value={formData.maxPlayers}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 10"
                  min="2"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe the match, rules, or any special requirements..."
              />
            </div>
          </div>

          {/* Teams */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <FaUsers className="mr-2 text-green-600" />
                Teams
              </h2>
              <button
                type="button"
                onClick={addTeam}
                className="flex items-center px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FaPlus className="mr-1" />
                Add Team
              </button>
            </div>

            <div className="space-y-4">
              {teams.map((team, index) => (
                <div key={team.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Team {index + 1} Name *
                    </label>
                    <input
                      type="text"
                      value={team.name}
                      onChange={(e) => handleTeamChange(team.id, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Team ${index + 1}`}
                      required
                    />
                  </div>
                  {teams.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTeam(team.id)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FaVideo className="mr-2 text-purple-600" />
              Match Settings
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Public Match</h3>
                  <p className="text-sm text-gray-600">Anyone can join this match</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Enable Live Stream</h3>
                  <p className="text-sm text-gray-600">Stream this match live to followers</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="enableLiveStream"
                    checked={formData.enableLiveStream}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Entry Fee (Optional)
                </label>
                <input
                  type="number"
                  name="entryFee"
                  value={formData.entryFee}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 10"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rules & Guidelines
                </label>
                <textarea
                  name="rules"
                  value={formData.rules}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter match rules, guidelines, or special instructions..."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4">
            <Link
              to="/home"
              className="flex-1 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-colors text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <FaSave className="mr-2" />
              {isLoading ? 'Creating...' : 'Create Match'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MatchCreation;
