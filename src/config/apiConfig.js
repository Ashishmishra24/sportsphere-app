// API Configuration for Live Score Integration
// This file contains configuration examples for various live score APIs

export const API_CONFIGS = {
  // API-Football (Recommended for football)
  apiFootball: {
    name: 'API-Football',
    baseUrl: 'https://v3.football.api-sports.io',
    apiKey: process.env.REACT_APP_API_FOOTBALL_KEY,
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': process.env.REACT_APP_API_FOOTBALL_KEY
    },
    endpoints: {
      liveMatches: '/fixtures',
      scheduledMatches: '/fixtures',
      finishedMatches: '/fixtures',
      matchDetails: '/fixtures',
      leagues: '/leagues'
    },
    documentation: 'https://www.api-football.com/documentation-v3'
  },

  // LiveScore API (Good for multiple sports)
  liveScore: {
    name: 'LiveScore API',
    baseUrl: 'https://livescore6.p.rapidapi.com',
    apiKey: process.env.REACT_APP_LIVESCORE_KEY,
    headers: {
      'x-rapidapi-host': 'livescore6.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_LIVESCORE_KEY
    },
    endpoints: {
      liveMatches: '/matches/v2/list-live',
      scheduledMatches: '/matches/v2/list-by-date',
      finishedMatches: '/matches/v2/list-by-date',
      matchDetails: '/matches/v2/get-scoreboard',
      leagues: '/leagues/v2/list'
    },
    documentation: 'https://rapidapi.com/apidojo/api/livescore6/'
  },

  // ESPN API (Free tier available)
  espn: {
    name: 'ESPN API',
    baseUrl: 'https://site.api.espn.com/apis/site/v2/sports',
    apiKey: process.env.REACT_APP_ESPN_KEY,
    headers: {
      'Content-Type': 'application/json'
    },
    endpoints: {
      liveMatches: '/{sport}/scoreboard',
      scheduledMatches: '/{sport}/scoreboard',
      finishedMatches: '/{sport}/scoreboard',
      matchDetails: '/{sport}/summary',
      leagues: '/{sport}/leagues'
    },
    documentation: 'https://developer.espn.com/'
  },

  // Sportradar (Professional grade)
  sportradar: {
    name: 'Sportradar',
    baseUrl: 'https://api.sportradar.us',
    apiKey: process.env.REACT_APP_SPORTRADAR_KEY,
    headers: {
      'Content-Type': 'application/json'
    },
    endpoints: {
      liveMatches: '/soccer/trial/v4/en/schedules/live/results.json',
      scheduledMatches: '/soccer/trial/v4/en/schedules/{date}/results.json',
      finishedMatches: '/soccer/trial/v4/en/schedules/{date}/results.json',
      matchDetails: '/soccer/trial/v4/en/matches/{match_id}/summary.json',
      leagues: '/soccer/trial/v4/en/tournaments.json'
    },
    documentation: 'https://www.sportradar.com/'
  }
};

// Environment variables template
export const ENV_TEMPLATE = `
# Live Score API Keys
# Choose one or more APIs to integrate

# API-Football (Football focused)
REACT_APP_API_FOOTBALL_KEY=your_api_football_key_here

# LiveScore API (Multiple sports)
REACT_APP_LIVESCORE_KEY=your_livescore_key_here

# ESPN API (Free tier available)
REACT_APP_ESPN_KEY=your_espn_key_here

# Sportradar (Professional)
REACT_APP_SPORTRADAR_KEY=your_sportradar_key_here

# Base URLs (optional - use defaults if not specified)
REACT_APP_LIVE_SCORE_BASE_URL=https://api.livescore.com/v1
`;

// API Selection helper
export const getApiConfig = (apiName) => {
  return API_CONFIGS[apiName] || API_CONFIGS.liveScore; // Default to LiveScore
};

// API Status checker
export const checkApiStatus = async (apiConfig) => {
  try {
    const response = await fetch(`${apiConfig.baseUrl}/status`, {
      headers: apiConfig.headers
    });
    return response.ok;
  } catch (error) {
    console.error('API status check failed:', error);
    return false;
  }
};

// Rate limiting helper
export const rateLimitHelper = {
  requests: {},
  
  canMakeRequest: (apiName, limit = 100, windowMs = 60000) => {
    const now = Date.now();
    const key = `${apiName}_${Math.floor(now / windowMs)}`;
    
    if (!rateLimitHelper.requests[key]) {
      rateLimitHelper.requests[key] = 0;
    }
    
    if (rateLimitHelper.requests[key] >= limit) {
      return false;
    }
    
    rateLimitHelper.requests[key]++;
    return true;
  },
  
  reset: () => {
    rateLimitHelper.requests = {};
  }
};

export default API_CONFIGS;
