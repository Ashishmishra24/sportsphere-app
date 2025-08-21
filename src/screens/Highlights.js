import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlay, FaEye, FaHeart, FaShare } from 'react-icons/fa';
import { handleError } from '../utils/errorHandler';

const Highlights = () => {
  const navigate = useNavigate();
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHighlights();
  }, []);

  const fetchHighlights = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setHighlights([
        {
          id: 1,
          title: 'Kohli\'s Century vs Australia',
          description: 'Virat Kohli scores a brilliant century in the T20 World Cup',
          thumbnail: 'https://via.placeholder.com/300x200',
          duration: '2:45',
          views: '1.2M',
          likes: '45K',
          sport: 'cricket',
          match: 'India vs Australia',
          date: '2024-03-15'
        },
        {
          id: 2,
          title: 'Messi\'s Free Kick Goal',
          description: 'Lionel Messi scores an incredible free kick from 30 yards',
          thumbnail: 'https://via.placeholder.com/300x200',
          duration: '1:30',
          views: '890K',
          likes: '32K',
          sport: 'football',
          match: 'Barcelona vs Real Madrid',
          date: '2024-03-14'
        },
        {
          id: 3,
          title: 'Djokovic vs Nadal Epic Rally',
          description: 'An incredible 25-shot rally between two tennis legends',
          thumbnail: 'https://via.placeholder.com/300x200',
          duration: '3:15',
          views: '650K',
          likes: '28K',
          sport: 'tennis',
          match: 'Wimbledon Final',
          date: '2024-03-13'
        }
      ]);
    } catch (error) {
      handleError(error, 'Highlights');
    } finally {
      setLoading(false);
    }
  };

  const handlePlay = (highlight) => {
    // In a real app, this would open a video player
    console.log('Playing highlight:', highlight.title);
  };

  const handleLike = (highlightId) => {
    setHighlights(prev => 
      prev.map(h => 
        h.id === highlightId 
          ? { ...h, likes: (parseInt(h.likes.replace('K', '000')) + 1000).toLocaleString() }
          : h
      )
    );
  };

  const handleShare = (highlight) => {
    // In a real app, this would open share options
    console.log('Sharing highlight:', highlight.title);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading highlights...</p>
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
              <h1 className="text-xl font-bold text-gray-900">Highlights</h1>
              <p className="text-sm text-gray-500">Best moments from matches</p>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights Grid */}
      <div className="px-4 py-6">
        <div className="space-y-4">
          {highlights.map((highlight) => (
            <div key={highlight.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Thumbnail */}
              <div className="relative">
                <img 
                  src={highlight.thumbnail} 
                  alt={highlight.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                  <button
                    onClick={() => handlePlay(highlight)}
                    className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200"
                  >
                    <FaPlay className="text-gray-800 text-xl ml-1" />
                  </button>
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                  {highlight.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{highlight.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{highlight.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span>{highlight.match}</span>
                  <span>{highlight.date}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <FaEye className="text-xs" />
                      <span>{highlight.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaHeart className="text-xs" />
                      <span>{highlight.likes}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleLike(highlight.id)}
                      className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <FaHeart className="text-sm" />
                    </button>
                    <button
                      onClick={() => handleShare(highlight)}
                      className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
                    >
                      <FaShare className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {highlights.length === 0 && (
          <div className="text-center py-8">
            <FaPlay className="text-4xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Highlights Available</h3>
            <p className="text-gray-500">Check back later for amazing moments!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Highlights;
