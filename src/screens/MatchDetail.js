import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSpinner } from 'react-icons/fa';
import CricketMatchDetail from './CricketMatchDetail';
import FootballMatchDetail from './FootballMatchDetail';
import TennisMatchDetail from './TennisMatchDetail';
import BasketballMatchDetail from './BasketballMatchDetail';
import BadmintonMatchDetail from './BadmintonMatchDetail';

const MatchDetail = () => {
  const { id: matchId } = useParams();
  const navigate = useNavigate();
  const [sport, setSport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const determineSport = async () => {
      try {
        setLoading(true);
        // In a real app, you'd fetch the match data from an API
        // For now, we'll simulate this with a delay and determine sport from matchId
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock sport determination based on matchId
        // In a real app, this would come from the match data
        const sportMap = {
          1: 'cricket',    // IPL match
          2: 'football',   // Premier League match
          3: 'tennis',     // Wimbledon match
          4: 'basketball', // NBA match
          5: 'badminton',  // Badminton match
          6: 'cricket',    // Another cricket match
          7: 'football',   // Another football match
          8: 'tennis',     // Another tennis match
          9: 'basketball', // Another basketball match
          10: 'badminton'  // Another badminton match
        };
        
        const determinedSport = sportMap[matchId] || 'cricket';
        setSport(determinedSport);
      } catch (err) {
        setError('Failed to load match information');
        console.error('Error determining sport:', err);
      } finally {
        setLoading(false);
      }
    };
    
    determineSport();
  }, [matchId]);
  
  const onBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading match details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  // Route to the appropriate sport-specific component
  switch (sport) {
    case 'cricket':
      return <CricketMatchDetail matchId={matchId} onBack={onBack} />;
    case 'football':
      return <FootballMatchDetail matchId={matchId} onBack={onBack} />;
    case 'tennis':
      return <TennisMatchDetail matchId={matchId} onBack={onBack} />;
    case 'basketball':
      return <BasketballMatchDetail matchId={matchId} onBack={onBack} />;
    case 'badminton':
      return <BadmintonMatchDetail matchId={matchId} onBack={onBack} />;
    default:
      // Fallback for unknown sports or missing sport parameter
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">
              {sport ? `Sport "${sport}" not supported yet` : 'Sport type not specified'}
            </p>
            <button
              onClick={onBack}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      );
  }
};

export default MatchDetail;
