import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlay, FaPause, FaStop, FaClock, FaUsers } from 'react-icons/fa';
import { handleError } from '../utils/errorHandler';

const LiveMatch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setMatch({
          id: id,
          sport: 'cricket',
          tournament: 'IPL 2024',
          team1: { name: 'Mumbai Indians', logo: 'MI', score: '156/4', overs: '18.2' },
          team2: { name: 'Chennai Super Kings', logo: 'CSK', score: '142/8', overs: '20.0' },
          status: 'live',
          venue: 'Wankhede Stadium',
          currentBatsmen: ['Virat Kohli', 'Hardik Pandya'],
          currentBowler: 'Deepak Chahar',
          lastBall: '1',
          commentary: 'Kohli on strike, Chahar to bowl...'
        });
      } catch (error) {
        handleError(error, 'Live Match');
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [id]);

  useEffect(() => {
    let interval;
    if (isLive) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartLive = () => {
    setIsLive(true);
  };

  const handlePauseLive = () => {
    setIsLive(false);
  };

  const handleStopLive = () => {
    setIsLive(false);
    setTimer(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading match...</p>
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Match not found</p>
          <button
            onClick={() => navigate(-1)}
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <FaArrowLeft className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Live Match</h1>
                <p className="text-sm text-gray-500">{match.tournament}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <FaUsers className="text-xs" />
                <span>2.4M</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-red-600">
                <FaClock className="text-xs" />
                <span>LIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Live Timer */}
        <div className="bg-red-600 text-white rounded-lg p-4 mb-6 text-center">
          <div className="text-2xl font-bold mb-2">{formatTime(timer)}</div>
          <div className="text-sm opacity-90">Live Stream Duration</div>
        </div>

        {/* Score Display */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-bold text-lg">{match.team1.logo}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{match.team1.name}</h3>
              <p className="text-2xl font-bold text-gray-900">{match.team1.score}</p>
              <p className="text-sm text-gray-500">{match.team1.overs} overs</p>
            </div>
            
            <div className="mx-6 text-center">
              <span className="text-gray-400 text-lg font-medium">vs</span>
            </div>
            
            <div className="flex-1 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-red-600 font-bold text-lg">{match.team2.logo}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{match.team2.name}</h3>
              <p className="text-2xl font-bold text-gray-900">{match.team2.score}</p>
              <p className="text-sm text-gray-500">{match.team2.overs} overs</p>
            </div>
          </div>
        </div>

        {/* Live Commentary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Live Commentary</h3>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-gray-700">{match.commentary}</p>
          </div>
        </div>

        {/* Current Players */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Current Players</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">On Strike</h4>
              <div className="space-y-2">
                {match.currentBatsmen.map((batsman, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{batsman}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">Bowling</h4>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-700">{match.currentBowler}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Last Ball */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Last Ball</h3>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-blue-600 font-bold text-2xl">{match.lastBall}</span>
            </div>
            <p className="text-sm text-gray-600">Runs scored</p>
          </div>
        </div>

        {/* Live Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Live Controls</h3>
          
          <div className="flex space-x-3">
            {!isLive ? (
              <button
                onClick={handleStartLive}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <FaPlay />
                <span>Start Live</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handlePauseLive}
                  className="flex-1 bg-yellow-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <FaPause />
                  <span>Pause</span>
                </button>
                <button
                  onClick={handleStopLive}
                  className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <FaStop />
                  <span>Stop</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMatch;
