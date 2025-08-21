import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { showSuccess, handleError } from '../utils/errorHandler';

const TournamentCreation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    sport: '',
    maxTeams: '',
    startDate: '',
    endDate: '',
    venue: '',
    description: '',
    entryFee: '',
    prizePool: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const sports = [
    { id: 'cricket', name: 'Cricket' },
    { id: 'football', name: 'Football' },
    { id: 'tennis', name: 'Tennis' },
    { id: 'basketball', name: 'Basketball' },
    { id: 'badminton', name: 'Badminton' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      showSuccess('Tournament created successfully!');
      navigate('/home');
    } catch (error) {
      handleError(error, 'Tournament Creation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <FaArrowLeft className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Create Tournament</h1>
              <p className="text-sm text-gray-500">Organize a new competition</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tournament Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tournament Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter tournament name"
              required
            />
          </div>

          {/* Sport Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sport *
            </label>
            <select
              name="sport"
              value={formData.sport}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select a sport</option>
              {sports.map(sport => (
                <option key={sport.id} value={sport.id}>
                  {sport.name}
                </option>
              ))}
            </select>
          </div>

          {/* Team Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Teams *
            </label>
            <input
              type="number"
              name="maxTeams"
              value={formData.maxTeams}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 8, 16, 32"
              min="2"
              required
            />
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date *
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date *
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Venue */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Venue
            </label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter venue name or address"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe your tournament..."
            />
          </div>

          {/* Entry Fee and Prize Pool */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Entry Fee
              </label>
              <input
                type="number"
                name="entryFee"
                value={formData.entryFee}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prize Pool
              </label>
              <input
                type="number"
                name="prizePool"
                value={formData.prizePool}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating Tournament...' : 'Create Tournament'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TournamentCreation;
