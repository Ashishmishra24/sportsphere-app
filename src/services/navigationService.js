// src/services/navigationService.js
// Logical Connection Service for Tournament, Matches, and Profiles

class NavigationService {
  constructor() {
    this.connectionPatterns = {
      // Home -> Tournament -> Matches -> Profiles
      homeToTournament: (tournamentId) => `/tournament/${tournamentId}`,
      tournamentToMatches: (tournamentId) => `/matches?tournament=${tournamentId}`,
      matchToTournament: (tournamentId) => `/tournament/${tournamentId}`,
      matchToProfile: (userId) => `/profile/${userId}`,
      tournamentToProfile: (userId) => `/profile/${userId}`,
      
      // Profile -> Matches -> Tournament
      profileToMatches: (userId) => `/matches?user=${userId}`,
      profileToTournament: (tournamentId) => `/tournament/${tournamentId}`,
      
      // Threads -> Match -> Tournament -> Profile
      threadToMatch: (matchId) => `/matches?match=${matchId}`,
      threadToTournament: (tournamentId) => `/tournament/${tournamentId}`,
      threadToProfile: (userId) => `/profile/${userId}`
    };
  }

  // Navigation patterns based on user interaction
  navigateToTournament(navigate, tournamentId, source = 'home') {
    navigate(`/tournament/${tournamentId}`, { 
      state: { source, timestamp: Date.now() } 
    });
  }

  navigateToMatch(navigate, matchId, tournamentId = null) {
    // Navigate to match detail page
    navigate(`/match/${matchId}`, { 
      state: { source: 'navigation', timestamp: Date.now() } 
    });
  }

  navigateToProfile(navigate, userId, source = 'match') {
    navigate(`/profile/${userId}`, { 
      state: { source, timestamp: Date.now() } 
    });
  }

  // Context-aware navigation
  navigateWithContext(navigate, type, id, context = {}) {
    const { source, relatedId, userAction } = context;
    
    switch (type) {
      case 'tournament':
        this.navigateToTournament(navigate, id, source);
        break;
      case 'match':
        // Navigate directly to match detail page
        navigate(`/match/${id}`, { 
          state: { source, timestamp: Date.now() } 
        });
        break;
      case 'profile':
        this.navigateToProfile(navigate, id, source);
        break;
      default:
        console.warn('Unknown navigation type:', type);
    }
  }

  // Get breadcrumb trail
  getBreadcrumbTrail(currentPath, state) {
    const breadcrumbs = [];
    
    if (state?.source) {
      breadcrumbs.push({ label: 'Home', path: '/' });
      
      if (state.source === 'tournament') {
        breadcrumbs.push({ label: 'Tournament', path: `/tournament/${state.tournamentId}` });
      } else if (state.source === 'match') {
        breadcrumbs.push({ label: 'Matches', path: '/matches' });
      } else if (state.source === 'profile') {
        breadcrumbs.push({ label: 'Profile', path: `/profile/${state.userId}` });
      }
    }
    
    return breadcrumbs;
  }
}

export const navigationService = new NavigationService();
export default NavigationService;
