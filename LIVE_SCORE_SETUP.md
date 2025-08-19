# Live Score API Integration Setup Guide

This guide will help you integrate real live score APIs into your SportSphere application.

## 🚀 Quick Start

### 1. Choose Your API

**Recommended APIs:**

#### **API-Football** (Best for Football)
- **Pros**: Comprehensive football data, good documentation
- **Cons**: Football only
- **Pricing**: Free tier available, paid plans from $10/month
- **Link**: https://www.api-football.com/

#### **LiveScore API** (Best for Multiple Sports)
- **Pros**: Multiple sports, real-time data
- **Cons**: Rate limits on free tier
- **Pricing**: Free tier available, paid plans from $25/month
- **Link**: https://rapidapi.com/apidojo/api/livescore6/

#### **ESPN API** (Best Free Option)
- **Pros**: Free, multiple sports, good documentation
- **Cons**: Limited data compared to paid APIs
- **Pricing**: Free
- **Link**: https://developer.espn.com/

#### **Sportradar** (Professional Grade)
- **Pros**: Most comprehensive data, multiple sports
- **Cons**: Expensive, requires approval
- **Pricing**: Contact sales
- **Link**: https://www.sportradar.com/

### 2. Get API Keys

1. **API-Football**:
   - Go to https://www.api-football.com/
   - Sign up for free account
   - Get your API key from dashboard

2. **LiveScore API**:
   - Go to https://rapidapi.com/apidojo/api/livescore6/
   - Sign up for RapidAPI account
   - Subscribe to LiveScore API
   - Get your API key

3. **ESPN API**:
   - Go to https://developer.espn.com/
   - No API key required (free)

4. **Sportradar**:
   - Contact sales team
   - Get approved for trial/paid access

### 3. Configure Environment Variables

Create a `.env` file in your project root:

```env
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
```

### 4. Update Service Configuration

Edit `src/services/liveScoreService.js`:

```javascript
// Choose your preferred API
const selectedApi = 'liveScore'; // or 'apiFootball', 'espn', 'sportradar'

// Update the constructor
constructor() {
  const config = API_CONFIGS[selectedApi];
  this.apiKey = config.apiKey;
  this.baseUrl = config.baseUrl;
  this.headers = config.headers;
}
```

### 5. Test the Integration

1. Start your development server: `npm start`
2. Navigate to Live Scores in the app
3. Check browser console for any API errors
4. Verify that real data is being fetched

## 🔧 Advanced Configuration

### Custom API Integration

If you want to use a different API, update the `makeRequest` method in `liveScoreService.js`:

```javascript
async makeRequest(endpoint, params = {}) {
  try {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    // Add your API-specific parameters
    url.searchParams.append('api_key', this.apiKey);
    Object.keys(params).forEach(key => {
      url.searchParams.append(key, params[key]);
    });

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.headers
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
```

### Data Transformation

Update the `transformMatchData` method to match your API's response format:

```javascript
transformMatchData(apiData) {
  // Transform your API response to match our app's format
  if (!apiData || !apiData.matches) {
    return [];
  }

  return apiData.matches.map(match => ({
    id: match.id,
    homeTeam: match.home_team,
    awayTeam: match.away_team,
    homeScore: match.home_score,
    awayScore: match.away_score,
    status: match.status,
    time: match.time,
    league: match.league,
    venue: match.venue,
    highlights: match.highlights || [],
    sport: match.sport,
    date: match.date
  }));
}
```

## 📊 API Response Examples

### API-Football Response
```json
{
  "response": [
    {
      "fixture": {
        "id": 123456,
        "status": "Live",
        "timestamp": 1640995200
      },
      "teams": {
        "home": {"name": "Manchester United"},
        "away": {"name": "Liverpool"}
      },
      "goals": {
        "home": 2,
        "away": 1
      },
      "league": {"name": "Premier League"}
    }
  ]
}
```

### LiveScore API Response
```json
{
  "matches": [
    {
      "id": "123456",
      "home_team": "Manchester United",
      "away_team": "Liverpool",
      "home_score": "2",
      "away_score": "1",
      "status": "live",
      "time": "67'",
      "league": "Premier League"
    }
  ]
}
```

## 🛠 Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Use a proxy server
   - Or use RapidAPI (handles CORS)

2. **Rate Limiting**:
   - Implement caching
   - Use the rate limiting helper in `apiConfig.js`

3. **API Key Issues**:
   - Verify API key is correct
   - Check if API key has required permissions
   - Ensure environment variables are loaded

4. **Data Format Issues**:
   - Check API documentation
   - Update `transformMatchData` method
   - Add console.log to debug response format

### Debug Mode

Enable debug mode in `liveScoreService.js`:

```javascript
constructor() {
  this.debug = true; // Add this line
  // ... rest of constructor
}

async makeRequest(endpoint, params = {}) {
  if (this.debug) {
    console.log('API Request:', endpoint, params);
  }
  // ... rest of method
}
```

## 📱 Features Available

### Current Features
- ✅ Live match scores
- ✅ Scheduled matches
- ✅ Finished matches
- ✅ Multiple sports support
- ✅ League filtering
- ✅ Auto-refresh (30 seconds)
- ✅ Manual refresh
- ✅ Match highlights
- ✅ Venue information
- ✅ Status indicators (Live, Scheduled, Finished)

### Planned Features
- 🔄 Match statistics
- 🔄 Player information
- 🔄 Team standings
- 🔄 Match commentary
- 🔄 Push notifications
- 🔄 Favorite teams/leagues
- 🔄 Match predictions

## 💰 Cost Considerations

### Free Tiers
- **ESPN API**: Completely free
- **API-Football**: 100 requests/day free
- **LiveScore API**: 100 requests/month free

### Paid Plans
- **API-Football**: $10-50/month
- **LiveScore API**: $25-100/month
- **Sportradar**: Contact sales

### Recommendations
- **Development/Testing**: Use ESPN API (free)
- **Production (Football)**: Use API-Football
- **Production (Multi-sport)**: Use LiveScore API
- **Enterprise**: Use Sportradar

## 🔒 Security Best Practices

1. **Never expose API keys in client-side code**
2. **Use environment variables**
3. **Implement rate limiting**
4. **Cache responses when possible**
5. **Use HTTPS for all API calls**
6. **Monitor API usage**

## 📞 Support

If you need help with API integration:

1. Check the API documentation
2. Review the console for error messages
3. Test with the mock data first
4. Contact the API provider's support

## 🎯 Next Steps

1. Choose and configure your preferred API
2. Test with real data
3. Customize the UI to match your needs
4. Add additional features like favorites
5. Implement caching for better performance
6. Add error handling and fallbacks

---

**Happy coding! 🚀**
