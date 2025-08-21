import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarkerAlt, FaStar, FaPhone, FaGlobe } from 'react-icons/fa';
import { handleError } from '../utils/errorHandler';

const VenueDirectory = () => {
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setVenues([
        {
          id: 1,
          name: 'Wankhede Stadium',
          sport: 'Cricket',
          address: 'D Road, Churchgate, Mumbai',
          rating: 4.5,
          price: '₹5000/hour',
          available: true,
          image: 'https://via.placeholder.com/300x200',
          phone: '+91 98765 43210',
          website: 'www.wankhede.com'
        },
        {
          id: 2,
          name: 'DY Patil Stadium',
          sport: 'Cricket',
          address: 'Nerul, Navi Mumbai',
          rating: 4.2,
          price: '₹4000/hour',
          available: true,
          image: 'https://via.placeholder.com/300x200',
          phone: '+91 98765 43211',
          website: 'www.dypatil.com'
        },
        {
          id: 3,
          name: 'MIG Cricket Ground',
          sport: 'Cricket',
          address: 'Bandra West, Mumbai',
          rating: 4.0,
          price: '₹3000/hour',
          available: false,
          image: 'https://via.placeholder.com/300x200',
          phone: '+91 98765 43212',
          website: 'www.migcricket.com'
        }
      ]);
    } catch (error) {
      handleError(error, 'Venue Directory');
    } finally {
      setLoading(false);
    }
  };

  const handleVenuePress = (venue) => {
    navigate(`/venue/${venue.id}/booking`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading venues...</p>
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
              <h1 className="text-xl font-bold text-gray-900">Venue Directory</h1>
              <p className="text-sm text-gray-500">Find sports venues near you</p>
            </div>
          </div>
        </div>
      </div>

      {/* Venues List */}
      <div className="px-4 py-6">
        <div className="space-y-4">
          {venues.map((venue) => (
            <div key={venue.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Venue Image */}
              <div className="relative">
                <img 
                  src={venue.image} 
                  alt={venue.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    venue.available 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {venue.available ? 'Available' : 'Booked'}
                  </span>
                </div>
              </div>

              {/* Venue Details */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg">{venue.name}</h3>
                  <div className="flex items-center space-x-1">
                    <FaStar className="text-yellow-500 text-sm" />
                    <span className="text-sm font-medium text-gray-700">{venue.rating}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                  <FaMapMarkerAlt className="text-xs" />
                  <span>{venue.address}</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">{venue.sport}</span>
                  <span className="text-sm font-medium text-blue-600">{venue.price}</span>
                </div>

                {/* Contact Info */}
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <FaPhone className="text-xs" />
                    <span>{venue.phone}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaGlobe className="text-xs" />
                    <span>{venue.website}</span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleVenuePress(venue)}
                  disabled={!venue.available}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                    venue.available
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {venue.available ? 'Book Now' : 'Not Available'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {venues.length === 0 && (
          <div className="text-center py-8">
            <FaMapMarkerAlt className="text-4xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Venues Found</h3>
            <p className="text-gray-500">No sports venues available in your area</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VenueDirectory;
