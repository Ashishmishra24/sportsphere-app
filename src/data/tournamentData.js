export const tournamentData = {
  // Cricket Tournaments
  'ipl-2024': {
    id: 'ipl-2024',
    name: 'Indian Premier League 2024',
    sport: 'cricket',
    status: 'ongoing',
    startDate: '2024-03-22',
    endDate: '2024-05-26',
    venue: 'Multiple Venues',
    prizePool: '₹46.5 Crore',
    entryFee: 'Free',
    maxTeams: 10,
    currentTeams: 10,
    description: 'The biggest T20 cricket league in the world featuring top international and domestic players.',
    format: 'Round Robin + Playoffs',
    currentStage: 'League Stage',
    matches: [
      {
        id: 1,
        team1: { name: 'Mumbai Indians', logo: 'MI', score: '156/4' },
        team2: { name: 'Chennai Super Kings', logo: 'CSK', score: '142/8' },
        status: 'completed',
        date: '2024-04-15',
        venue: 'Wankhede Stadium',
        result: 'MI won by 14 runs'
      },
      {
        id: 2,
        team1: { name: 'Royal Challengers Bangalore', logo: 'RCB', score: '189/5' },
        team2: { name: 'Kolkata Knight Riders', logo: 'KKR', score: '185/7' },
        status: 'live',
        date: '2024-04-16',
        venue: 'M. Chinnaswamy Stadium',
        result: 'RCB won by 4 runs'
      }
    ],
    standings: [
      { position: 1, team: 'Mumbai Indians', played: 8, won: 6, lost: 2, points: 12 },
      { position: 2, team: 'Chennai Super Kings', played: 8, won: 5, lost: 3, points: 10 },
      { position: 3, team: 'Royal Challengers Bangalore', played: 8, won: 5, lost: 3, points: 10 },
      { position: 4, team: 'Kolkata Knight Riders', played: 8, won: 4, lost: 4, points: 8 }
    ],
    rules: [
      '20 overs per innings',
      'Powerplay: First 6 overs',
      'Strategic timeout: 2 per innings',
      'DRS available'
    ]
  },

  // Football Tournaments
  'premier-league-2024': {
    id: 'premier-league-2024',
    name: 'Premier League 2023/24',
    sport: 'football',
    status: 'ongoing',
    startDate: '2023-08-11',
    endDate: '2024-05-19',
    venue: 'Multiple Venues',
    prizePool: '£2.5 Billion',
    entryFee: 'Free',
    maxTeams: 20,
    currentTeams: 20,
    description: 'The top tier of English football featuring the best clubs and players.',
    format: 'Round Robin',
    currentStage: 'Season',
    matches: [
      {
        id: 1,
        team1: { name: 'Manchester United', logo: 'MU', score: '2' },
        team2: { name: 'Liverpool', logo: 'LIV', score: '1' },
        status: 'completed',
        date: '2024-04-15',
        venue: 'Old Trafford',
        result: 'MU won 2-1'
      }
    ],
    standings: [
      { position: 1, team: 'Arsenal', played: 32, won: 23, drawn: 5, lost: 4, points: 74 },
      { position: 2, team: 'Manchester City', played: 32, won: 22, drawn: 7, lost: 3, points: 73 },
      { position: 3, team: 'Liverpool', played: 32, won: 21, drawn: 8, lost: 3, points: 71 },
      { position: 4, team: 'Aston Villa', played: 32, won: 19, drawn: 6, lost: 7, points: 63 }
    ],
    rules: [
      '90 minutes per match',
      '3 points for win, 1 for draw',
      'VAR available',
      '5 substitutions allowed'
    ]
  },

  // Tennis Tournaments
  'wimbledon-2024': {
    id: 'wimbledon-2024',
    name: 'Wimbledon Championships 2024',
    sport: 'tennis',
    status: 'upcoming',
    startDate: '2024-07-01',
    endDate: '2024-07-14',
    venue: 'All England Club',
    prizePool: '£50 Million',
    entryFee: 'Free',
    maxTeams: 128,
    currentTeams: 128,
    description: 'The oldest and most prestigious tennis tournament in the world.',
    format: 'Single Elimination',
    currentStage: 'Registration',
    matches: [],
    standings: [],
    rules: [
      'Best of 5 sets (Men), Best of 3 sets (Women)',
      'Tiebreak at 6-6 (except final set)',
      'Grass court surface',
      'White clothing required'
    ]
  },

  // Basketball Tournaments
  'nba-playoffs-2024': {
    id: 'nba-playoffs-2024',
    name: 'NBA Playoffs 2024',
    sport: 'basketball',
    status: 'ongoing',
    startDate: '2024-04-20',
    endDate: '2024-06-20',
    venue: 'Multiple Venues',
    prizePool: '$15 Million',
    entryFee: 'Free',
    maxTeams: 16,
    currentTeams: 16,
    description: 'The NBA postseason tournament to determine the league champion.',
    format: 'Single Elimination',
    currentStage: 'First Round',
    matches: [
      {
        id: 1,
        team1: { name: 'Los Angeles Lakers', logo: 'LAL', score: '108' },
        team2: { name: 'Golden State Warriors', logo: 'GSW', score: '102' },
        status: 'completed',
        date: '2024-04-15',
        venue: 'Crypto.com Arena',
        result: 'LAL won 108-102'
      }
    ],
    standings: [
      { position: 1, team: 'Boston Celtics', played: 82, won: 64, lost: 18, winRate: '78.0%' },
      { position: 2, team: 'Milwaukee Bucks', played: 82, won: 58, lost: 24, winRate: '70.7%' },
      { position: 3, team: 'Philadelphia 76ers', played: 82, won: 54, lost: 28, winRate: '65.9%' },
      { position: 4, team: 'Cleveland Cavaliers', played: 82, won: 51, lost: 31, winRate: '62.2%' }
    ],
    rules: [
      'Best of 7 series',
      '48 minutes per game',
      'Overtime if tied',
      'Home court advantage'
    ]
  },

  // Badminton Tournaments
  'all-england-2024': {
    id: 'all-england-2024',
    name: 'All England Open 2024',
    sport: 'badminton',
    status: 'completed',
    startDate: '2024-03-12',
    endDate: '2024-03-17',
    venue: 'Utilita Arena Birmingham',
    prizePool: '$1.2 Million',
    entryFee: 'Free',
    maxTeams: 64,
    currentTeams: 64,
    description: 'One of the most prestigious badminton tournaments in the world.',
    format: 'Single Elimination',
    currentStage: 'Completed',
    matches: [
      {
        id: 1,
        team1: { name: 'Viktor Axelsen', logo: 'VA', score: '21-19, 21-17' },
        team2: { name: 'Kento Momota', logo: 'KM', score: '19-21, 17-21' },
        status: 'completed',
        date: '2024-03-17',
        venue: 'Utilita Arena Birmingham',
        result: 'Axelsen won 2-0'
      }
    ],
    standings: [
      { position: 1, player: 'Viktor Axelsen', country: 'Denmark', points: 120000 },
      { position: 2, player: 'Kento Momota', country: 'Japan', points: 102000 },
      { position: 3, player: 'Anders Antonsen', country: 'Denmark', points: 84000 },
      { position: 4, player: 'Jonatan Christie', country: 'Indonesia', points: 66000 }
    ],
    rules: [
      'Best of 3 games',
      '21 points to win (2 point lead required)',
      '30-29 cap',
      'Service court rotation'
    ]
  },

  // Additional Tournaments
  't20-world-cup-2024': {
    id: 't20-world-cup-2024',
    name: 'T20 World Cup 2024',
    sport: 'cricket',
    status: 'upcoming',
    startDate: '2024-06-01',
    endDate: '2024-06-29',
    venue: 'Multiple Venues',
    prizePool: '$10 Million',
    entryFee: 'Free',
    maxTeams: 20,
    currentTeams: 20,
    description: 'The biggest T20 cricket tournament featuring top international teams.',
    format: 'Group Stage + Knockout',
    currentStage: 'Registration',
    matches: [],
    standings: [],
    rules: [
      '20 overs per innings',
      'Super Over for tied matches',
      'DRS available',
      'Powerplay: First 6 overs'
    ]
  },

  'champions-league-2024': {
    id: 'champions-league-2024',
    name: 'UEFA Champions League 2023/24',
    sport: 'football',
    status: 'ongoing',
    startDate: '2023-09-19',
    endDate: '2024-06-01',
    venue: 'Multiple Venues',
    prizePool: '€2 Billion',
    entryFee: 'Free',
    maxTeams: 32,
    currentTeams: 32,
    description: 'The most prestigious club football competition in Europe.',
    format: 'Group Stage + Knockout',
    currentStage: 'Quarter Finals',
    matches: [
      {
        id: 1,
        team1: { name: 'Real Madrid', logo: 'RMA', score: '2' },
        team2: { name: 'Bayern Munich', logo: 'BAY', score: '1' },
        status: 'completed',
        date: '2024-04-15',
        venue: 'Santiago Bernabéu',
        result: 'Real Madrid won 2-1'
      }
    ],
    standings: [
      { position: 1, team: 'Real Madrid', played: 8, won: 6, drawn: 1, lost: 1, points: 19 },
      { position: 2, team: 'Bayern Munich', played: 8, won: 5, drawn: 2, lost: 1, points: 17 },
      { position: 3, team: 'Manchester City', played: 8, won: 5, drawn: 1, lost: 2, points: 16 },
      { position: 4, team: 'PSG', played: 8, won: 4, drawn: 2, lost: 2, points: 14 }
    ],
    rules: [
      '90 minutes per match',
      'Extra time and penalties for knockout ties',
      'VAR available',
      '5 substitutions allowed'
    ]
  }
};

export const getTournamentById = (id) => {
  return tournamentData[id] || null;
};

export const getTournamentsBySport = (sport) => {
  return Object.values(tournamentData).filter(tournament => tournament.sport === sport);
};

export const getAllTournaments = () => {
  return Object.values(tournamentData);
};
