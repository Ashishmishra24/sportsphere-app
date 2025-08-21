import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCreditCard } from 'react-icons/fa';
import { showSuccess, handleError } from '../utils/errorHandler';

const VenueBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [bookingData, setBookingData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    players: '',
    purpose: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchVenueDetails = useCallback(async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setVenue({
        id: id,
        name: 'Wankhede Stadium',
        sport: 'Cricket',
        address: 'D Road, Churchgate, Mumbai',
        price: '₹5000/hour',
        image: 'https://via.placeholder.com/300x200',
        description: 'Professional cricket stadium with world-class facilities'
      });
    } catch (error) {
      handleError(error, 'Venue Booking');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchVenueDetails();
  }, [fetchVenueDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      showSuccess('Venue booked successfully!');
      navigate('/venues');
    } catch (error) {
      handleError(error, 'Venue Booking');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading venue details...</p>
        </div>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Venue not found</p>
          <button
            onClick={() => navigate('/venues')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

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
              <h1 className="text-xl font-bold text-gray-900">Book Venue</h1>
              <p className="text-sm text-gray-500">{venue.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Venue Info */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <img 
            src={venue.image} 
            alt={venue.name}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 className="font-semibold text-gray-900 text-lg mb-2">{venue.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{venue.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{venue.sport}</span>
            <span className="text-sm font-medium text-blue-600">{venue.price}</span>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Booking Details</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={bookingData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Time Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time *
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={bookingData.startTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time *
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={bookingData.endTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Number of Players */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Players
              </label>
              <input
                type="number"
                name="players"
                value={bookingData.players}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 11"
                min="1"
              />
            </div>

            {/* Purpose */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purpose
              </label>
              <textarea
                name="purpose"
                value={bookingData.purpose}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Practice session, Tournament match, etc."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <FaCreditCard />
              <span>{submitting ? 'Processing...' : 'Confirm Booking'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VenueBooking;
