// Live Score API Service
// This service can be connected to various live score APIs

class LiveScoreService {
  constructor() {
    // Replace with your actual API keys and endpoints
    this.apiKey = process.env.REACT_APP_LIVE_SCORE_API_KEY || 'your-api-key-here';
    this.baseUrl = process.env.REACT_APP_LIVE_SCORE_BASE_URL || 'https://api.livescore.com/v1';
    
    // Alternative APIs you can use:
    // - API-Football: https://www.api-football.com/
    // - LiveScore API: https://rapidapi.com/apidojo/api/livescore6/
    // - Sportradar: https://www.sportradar.com/
    // - ESPN API: https://developer.espn.com/
  }

  // Generic API request method
  async makeRequest(endpoint, params = {}) {
    try {
      const url = new URL(`${this.baseUrl}${endpoint}`);
      
      // Add API key and parameters
      url.searchParams.append('key', this.apiKey);
      Object.keys(params).forEach(key => {
        url.searchParams.append(key, params[key]);
      });

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any required headers for your API
          // 'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Live Score API Error:', error);
      throw error;
    }
  }

  // Get live matches for a specific sport
  async getLiveMatches(sport, league = null) {
    try {
      const params = {
        sport: sport,
        live: 'true'
      };
      
      if (league && league !== 'all') {
        params.league = league;
      }

      const data = await this.makeRequest('/matches/live', params);
      return this.transformMatchData(data);
    } catch (error) {
      console.error('Error fetching live matches:', error);
      // Return mock data as fallback
      return this.getMockLiveMatches(sport, league);
    }
  }

  // Get scheduled matches
  async getScheduledMatches(sport, league = null, date = null) {
    try {
      const params = {
        sport: sport,
        status: 'scheduled'
      };
      
      if (league && league !== 'all') {
        params.league = league;
      }
      
      if (date) {
        params.date = date;
      }

      const data = await this.makeRequest('/matches/scheduled', params);
      return this.transformMatchData(data);
    } catch (error) {
      console.error('Error fetching scheduled matches:', error);
      return this.getMockScheduledMatches(sport, league);
    }
  }

  // Get finished matches
  async getFinishedMatches(sport, league = null, date = null) {
    try {
      const params = {
        sport: sport,
        status: 'finished'
      };
      
      if (league && league !== 'all') {
        params.league = league;
      }
      
      if (date) {
        params.date = date;
      }

      const data = await this.makeRequest('/matches/finished', params);
      return this.transformMatchData(data);
    } catch (error) {
      console.error('Error fetching finished matches:', error);
      return this.getMockFinishedMatches(sport, league);
    }
  }

  // Get match details
  async getMatchDetails(matchId) {
    try {
      const data = await this.makeRequest(`/matches/${matchId}`);
      return this.transformMatchDetails(data);
    } catch (error) {
      console.error('Error fetching match details:', error);
      return this.getMockMatchDetails(matchId);
    }
  }

  // Get leagues for a sport
  async getLeagues(sport) {
    try {
      const data = await this.makeRequest('/leagues', { sport });
      return data.leagues || [];
    } catch (error) {
      console.error('Error fetching leagues:', error);
      return this.getMockLeagues(sport);
    }
  }

  // Transform API data to our app format
  transformMatchData(apiData) {
    // This method should transform the API response to match our app's data structure
    // The exact transformation depends on your chosen API
    
    if (!apiData || !apiData.matches) {
      return [];
    }

    return apiData.matches.map(match => ({
      id: match.id || match.match_id,
      homeTeam: match.home_team || match.homeTeam,
      awayTeam: match.away_team || match.awayTeam,
      homeScore: match.home_score || match.homeScore,
      awayScore: match.away_score || match.awayScore,
      status: match.status || 'scheduled',
      time: match.time || match.match_time,
      league: match.league || match.competition,
      venue: match.venue || match.stadium,
      highlights: match.highlights || [],
      sport: match.sport,
      date: match.date,
      // Add more fields as needed
    }));
  }

  transformMatchDetails(apiData) {
    // Transform detailed match data
    return {
      ...this.transformMatchData({ matches: [apiData] })[0],
      // Add additional details
      statistics: apiData.statistics || {},
      events: apiData.events || [],
      lineups: apiData.lineups || {},
      commentary: apiData.commentary || []
    };
  }

  // Mock data methods (fallback when API is not available)
  getMockLiveMatches(sport, league) {
    const mockData = {
      football: [
        {
          id: 1,
          homeTeam: 'Manchester United',
          awayTeam: 'Liverpool',
          homeScore: 2,
          awayScore: 1,
          status: 'live',
          time: '67\'',
          league: 'Premier League',
          venue: 'Old Trafford',
          highlights: ['⚽ Rashford 23\'', '⚽ Salah 45\'', '⚽ Fernandes 67\'']
        }
      ],
      basketball: [
        {
          id: 4,
          homeTeam: 'Lakers',
          awayTeam: 'Warriors',
          homeScore: 108,
          awayScore: 102,
          status: 'live',
          time: 'Q4 2:34',
          league: 'NBA',
          venue: 'Staples Center',
          highlights: ['🏀 James 25 pts', '🏀 Curry 28 pts', '🏀 Davis 22 pts']
        }
      ]
    };

    let matches = mockData[sport] || [];
    
    if (league && league !== 'all') {
      matches = matches.filter(match => match.league === league);
    }

    return matches;
  }

  getMockScheduledMatches(sport, league) {
    const mockData = {
      football: [
        {
          id: 2,
          homeTeam: 'Arsenal',
          awayTeam: 'Chelsea',
          homeScore: 0,
          awayScore: 0,
          status: 'scheduled',
          time: '20:45',
          league: 'Premier League',
          venue: 'Emirates Stadium',
          highlights: []
        }
      ]
    };

    let matches = mockData[sport] || [];
    
    if (league && league !== 'all') {
      matches = matches.filter(match => match.league === league);
    }

    return matches;
  }

  getMockFinishedMatches(sport, league) {
    const mockData = {
      football: [
        {
          id: 3,
          homeTeam: 'Barcelona',
          awayTeam: 'Real Madrid',
          homeScore: 3,
          awayScore: 2,
          status: 'finished',
          time: 'FT',
          league: 'La Liga',
          venue: 'Camp Nou',
          highlights: ['⚽ Messi 15\'', '⚽ Benzema 32\'', '⚽ Suarez 45\'', '⚽ Ronaldo 67\'', '⚽ Griezmann 89\'']
        }
      ]
    };

    let matches = mockData[sport] || [];
    
    if (league && league !== 'all') {
      matches = matches.filter(match => match.league === league);
    }

    return matches;
  }

  getMockLeagues(sport) {
    const leagues = {
      football: ['Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Champions League'],
      basketball: ['NBA', 'EuroLeague', 'CBA'],
      tennis: ['Wimbledon', 'US Open', 'French Open', 'Australian Open'],
      cricket: ['Test Series', 'ODI Series', 'T20 Series', 'IPL']
    };

    return leagues[sport] || [];
  }

  getMockMatchDetails(matchId) {
    return {
      id: matchId,
      homeTeam: 'Manchester United',
      awayTeam: 'Liverpool',
      homeScore: 2,
      awayScore: 1,
      status: 'live',
      time: '67\'',
      league: 'Premier League',
      venue: 'Old Trafford',
      highlights: ['⚽ Rashford 23\'', '⚽ Salah 45\'', '⚽ Fernandes 67\''],
      statistics: {
        possession: { home: 45, away: 55 },
        shots: { home: 12, away: 8 },
        shotsOnTarget: { home: 5, away: 3 }
      },
      events: [
        { time: '23\'', type: 'goal', player: 'Rashford', team: 'home' },
        { time: '45\'', type: 'goal', player: 'Salah', team: 'away' },
        { time: '67\'', type: 'goal', player: 'Fernandes', team: 'home' }
      ]
    };
  }

  // API Configuration methods
  setApiKey(apiKey) {
    this.apiKey = apiKey;
  }

  setBaseUrl(baseUrl) {
    this.baseUrl = baseUrl;
  }

  // Get API status
  async checkApiStatus() {
    try {
      await this.makeRequest('/status');
      return { status: 'connected', message: 'API is working' };
    } catch (error) {
      return { status: 'error', message: 'API connection failed' };
    }
  }
}

// Create and export a singleton instance
export const liveScoreService = new LiveScoreService();

// Export the class for testing or custom instances
export default LiveScoreService;
