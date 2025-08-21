// User profiles data for all users mentioned in the app
export const userProfiles = {
  // Alex Johnson (current user)
  'alexjohnson': {
    id: 'alexjohnson',
    name: 'Alex Johnson',
    avatar: 'AJ',
    handle: '@alexjohnson',
    bio: 'Passionate sports enthusiast | Cricket & Tennis lover | Always up for a good match! 🏏🎾',
    location: 'New York, NY',
    joinedDate: 'March 2023',
    verified: true,
    overall: {
      totalMatches: 156,
      wins: 89,
      losses: 67,
      winRate: 57.1,
      totalPoints: 2847,
      averageScore: 18.2,
      tournamentsWon: 12,
      currentStreak: 5
    },
    sportsStats: [
      {
        sport: 'cricket',
        matches: 45,
        wins: 28,
        losses: 17,
        winRate: 62.2,
        highestScore: 89,
        averageScore: 24.5,
        tournamentsWon: 4,
        achievements: ['Century Club', 'Fastest Fifty', 'Best Bowler'],
        // Cricket-specific stats
        batting: {
          totalRuns: 1102,
          centuries: 0,
          halfCenturies: 8,
          fours: 156,
          sixes: 23,
          strikeRate: 142.5,
          bestScore: 89,
          averageRuns: 24.5
        },
        bowling: {
          wickets: 67,
          bowlingAverage: 18.3,
          economyRate: 6.2,
          bestBowling: '5/23',
          fiveWicketHauls: 2,
          hatTricks: 0,
          maidenOvers: 12
        },
        fielding: {
          catches: 34,
          stumpings: 0,
          runOuts: 8,
          directHits: 3
        }
      },
      {
        sport: 'tennis',
        matches: 38,
        wins: 22,
        losses: 16,
        winRate: 57.9,
        highestScore: 6,
        averageScore: 4.2,
        tournamentsWon: 3,
        achievements: ['Ace Master', 'Comeback King', 'Doubles Champion'],
        // Tennis-specific stats
        serving: {
          aces: 156,
          doubleFaults: 89,
          firstServePercentage: 68.5,
          serviceGamesWon: 78.2,
          breakPointsSaved: 65.4
        },
        returning: {
          breakPointsConverted: 42.3,
          returnGamesWon: 28.7,
          firstServeReturnWon: 35.2,
          secondServeReturnWon: 52.1
        },
        rally: {
          winners: 234,
          unforcedErrors: 189,
          netPointsWon: 67.8,
          baselinePointsWon: 58.3
        },
        doubles: {
          doublesMatches: 12,
          doublesWins: 8,
          doublesWinRate: 66.7
        }
      },
      {
        sport: 'football',
        matches: 32,
        wins: 18,
        losses: 14,
        winRate: 56.3,
        highestScore: 3,
        averageScore: 1.8,
        tournamentsWon: 2,
        achievements: ['Goal Scorer', 'Assist Leader', 'Defensive Wall'],
        // Football-specific stats
        attacking: {
          goals: 24,
          assists: 18,
          shots: 89,
          shotsOnTarget: 45,
          conversionRate: 26.9,
          keyPasses: 67,
          crosses: 123
        },
        defending: {
          tackles: 156,
          interceptions: 89,
          clearances: 234,
          blocks: 45,
          duelsWon: 67.8,
          aerialDuelsWon: 58.3
        },
        passing: {
          passes: 1234,
          passAccuracy: 78.5,
          longBalls: 89,
          throughBalls: 23,
          crossesCompleted: 45
        },
        goalkeeping: {
          saves: 0,
          cleanSheets: 0,
          goalsConceded: 0
        }
      },
      {
        sport: 'basketball',
        matches: 25,
        wins: 12,
        losses: 13,
        winRate: 48.0,
        highestScore: 28,
        averageScore: 15.6,
        tournamentsWon: 1,
        achievements: ['Three Point King', 'Rebound Master', 'Clutch Player'],
        // Basketball-specific stats
        scoring: {
          points: 390,
          fieldGoals: 156,
          fieldGoalPercentage: 42.3,
          threePointers: 67,
          threePointPercentage: 38.5,
          freeThrows: 111,
          freeThrowPercentage: 78.9
        },
        rebounding: {
          rebounds: 234,
          offensiveRebounds: 89,
          defensiveRebounds: 145,
          reboundsPerGame: 9.4
        },
        playmaking: {
          assists: 123,
          assistsPerGame: 4.9,
          turnovers: 67,
          assistToTurnoverRatio: 1.8
        },
        defense: {
          steals: 45,
          blocks: 23,
          personalFouls: 89,
          defensiveRating: 105.6
        }
      },
      {
        sport: 'badminton',
        matches: 16,
        wins: 9,
        losses: 7,
        winRate: 56.3,
        highestScore: 21,
        averageScore: 18.4,
        tournamentsWon: 2,
        achievements: ['Smash Master', 'Net Player', 'Endurance King'],
        // Badminton-specific stats
        serving: {
          serviceAces: 23,
          serviceFaults: 12,
          serviceGamesWon: 78.5,
          serviceAccuracy: 85.2
        },
        attacking: {
          smashes: 156,
          smashAccuracy: 68.3,
          drops: 89,
          dropAccuracy: 72.1,
          clears: 234,
          clearAccuracy: 78.9
        },
        defense: {
          returns: 345,
          returnAccuracy: 65.4,
          blocks: 67,
          lifts: 123,
          netPlay: 89,
          netPlayAccuracy: 76.5
        },
        doubles: {
          doublesMatches: 8,
          doublesWins: 5,
          doublesWinRate: 62.5,
          communicationRating: 8.5
        }
      }
    ]
  },

  // Cricket Fanatic
  'cricketfanatic': {
    id: 'cricketfanatic',
    name: 'Cricket Fanatic',
    avatar: 'CF',
    handle: '@cricketfanatic',
    bio: 'Cricket enthusiast | IPL lover | Following the game since childhood 🏏 | Cricket analyst & commentator',
    location: 'Mumbai, India',
    joinedDate: 'January 2022',
    verified: true,
    overall: {
      totalMatches: 89,
      wins: 52,
      losses: 37,
      winRate: 58.4,
      totalPoints: 1847,
      averageScore: 20.8,
      tournamentsWon: 8,
      currentStreak: 3
    },
    sportsStats: [
      {
        sport: 'cricket',
        matches: 89,
        wins: 52,
        losses: 37,
        winRate: 58.4,
        highestScore: 127,
        averageScore: 20.8,
        tournamentsWon: 8,
        achievements: ['Century Maker', 'IPL Expert', 'Cricket Guru', 'Match Winner'],
        // Cricket-specific stats
        batting: {
          totalRuns: 1852,
          centuries: 1,
          halfCenturies: 12,
          fours: 234,
          sixes: 45,
          strikeRate: 156.7,
          bestScore: 127,
          averageRuns: 20.8
        },
        bowling: {
          wickets: 123,
          bowlingAverage: 22.1,
          economyRate: 7.8,
          bestBowling: '6/45',
          fiveWicketHauls: 3,
          hatTricks: 1,
          maidenOvers: 23
        },
        fielding: {
          catches: 67,
          stumpings: 0,
          runOuts: 12,
          directHits: 5
        }
      }
    ]
  },

  // Football Forever
  'footballforever': {
    id: 'footballforever',
    name: 'Football Forever',
    avatar: 'FF',
    handle: '@footballforever',
    bio: 'Football is life! ⚽ | Premier League fanatic | Manchester United supporter | Tactical analyst',
    location: 'Manchester, UK',
    joinedDate: 'September 2021',
    verified: false,
    overall: {
      totalMatches: 67,
      wins: 38,
      losses: 29,
      winRate: 56.7,
      totalPoints: 1234,
      averageScore: 18.4,
      tournamentsWon: 5,
      currentStreak: 2
    },
    sportsStats: [
      {
        sport: 'football',
        matches: 67,
        wins: 38,
        losses: 29,
        winRate: 56.7,
        highestScore: 4,
        averageScore: 1.8,
        tournamentsWon: 5,
        achievements: ['Goal Machine', 'Playmaker', 'Defensive Leader', 'Captain Material'],
        // Football-specific stats
        attacking: {
          goals: 45,
          assists: 34,
          shots: 156,
          shotsOnTarget: 78,
          conversionRate: 28.8,
          keyPasses: 123,
          crosses: 234
        },
        defending: {
          tackles: 289,
          interceptions: 156,
          clearances: 445,
          blocks: 78,
          duelsWon: 72.3,
          aerialDuelsWon: 65.7
        },
        passing: {
          passes: 2345,
          passAccuracy: 82.1,
          longBalls: 156,
          throughBalls: 45,
          crossesCompleted: 89
        },
        goalkeeping: {
          saves: 0,
          cleanSheets: 0,
          goalsConceded: 0
        }
      }
    ]
  },

  // Tennis Pro
  'tennispro': {
    id: 'tennispro',
    name: 'Tennis Pro',
    avatar: 'TP',
    handle: '@tennispro',
    bio: 'Professional tennis player | Grand Slam enthusiast | Tennis coach | Love the game! 🎾',
    location: 'London, UK',
    joinedDate: 'June 2020',
    verified: true,
    overall: {
      totalMatches: 124,
      wins: 78,
      losses: 46,
      winRate: 62.9,
      totalPoints: 2156,
      averageScore: 17.4,
      tournamentsWon: 15,
      currentStreak: 7
    },
    sportsStats: [
      {
        sport: 'tennis',
        matches: 124,
        wins: 78,
        losses: 46,
        winRate: 62.9,
        highestScore: 6,
        averageScore: 4.8,
        tournamentsWon: 15,
        achievements: ['Grand Slam Winner', 'Ace King', 'Serve Master', 'Tennis Legend'],
        // Tennis-specific stats
        serving: {
          aces: 456,
          doubleFaults: 234,
          firstServePercentage: 72.3,
          serviceGamesWon: 82.1,
          breakPointsSaved: 71.8
        },
        returning: {
          breakPointsConverted: 48.7,
          returnGamesWon: 34.2,
          firstServeReturnWon: 38.9,
          secondServeReturnWon: 58.7
        },
        rally: {
          winners: 678,
          unforcedErrors: 445,
          netPointsWon: 72.3,
          baselinePointsWon: 63.8
        },
        doubles: {
          doublesMatches: 34,
          doublesWins: 28,
          doublesWinRate: 82.4
        }
      }
    ]
  },

  // Basketball Lover
  'basketballlover': {
    id: 'basketballlover',
    name: 'Basketball Lover',
    avatar: 'BL',
    handle: '@basketballlover',
    bio: 'Basketball is everything! 🏀 | NBA fanatic | Lakers supporter | Street ball player',
    location: 'Los Angeles, CA',
    joinedDate: 'March 2021',
    verified: false,
    overall: {
      totalMatches: 93,
      wins: 51,
      losses: 42,
      winRate: 54.8,
      totalPoints: 1678,
      averageScore: 18.0,
      tournamentsWon: 6,
      currentStreak: 4
    },
    sportsStats: [
      {
        sport: 'basketball',
        matches: 93,
        wins: 51,
        losses: 42,
        winRate: 54.8,
        highestScore: 42,
        averageScore: 18.0,
        tournamentsWon: 6,
        achievements: ['Three Point King', 'Dunk Master', 'Point Guard', 'Clutch Player'],
        // Basketball-specific stats
        scoring: {
          points: 1674,
          fieldGoals: 678,
          fieldGoalPercentage: 45.2,
          threePointers: 234,
          threePointPercentage: 42.1,
          freeThrows: 234,
          freeThrowPercentage: 82.3
        },
        rebounding: {
          rebounds: 567,
          offensiveRebounds: 234,
          defensiveRebounds: 333,
          reboundsPerGame: 6.1
        },
        playmaking: {
          assists: 456,
          assistsPerGame: 4.9,
          turnovers: 234,
          assistToTurnoverRatio: 1.9
        },
        defense: {
          steals: 123,
          blocks: 67,
          personalFouls: 234,
          defensiveRating: 108.7
        }
      }
    ]
  },

  // Badminton Champ
  'badmintonchamp': {
    id: 'badmintonchamp',
    name: 'Badminton Champ',
    avatar: 'BC',
    handle: '@badmintonchamp',
    bio: 'Badminton champion | Olympic hopeful | Smash master | Love the shuttle! 🏸',
    location: 'Copenhagen, Denmark',
    joinedDate: 'November 2021',
    verified: true,
    overall: {
      totalMatches: 76,
      wins: 48,
      losses: 28,
      winRate: 63.2,
      totalPoints: 1345,
      averageScore: 17.7,
      tournamentsWon: 9,
      currentStreak: 6
    },
    sportsStats: [
      {
        sport: 'badminton',
        matches: 76,
        wins: 48,
        losses: 28,
        winRate: 63.2,
        highestScore: 21,
        averageScore: 17.7,
        tournamentsWon: 9,
        achievements: ['Smash King', 'Net Master', 'Endurance Champion', 'Olympic Hopeful'],
        // Badminton-specific stats
        serving: {
          serviceAces: 89,
          serviceFaults: 34,
          serviceGamesWon: 82.3,
          serviceAccuracy: 88.7
        },
        attacking: {
          smashes: 456,
          smashAccuracy: 72.8,
          drops: 234,
          dropAccuracy: 78.6,
          clears: 567,
          clearAccuracy: 82.1
        },
        defense: {
          returns: 789,
          returnAccuracy: 71.3,
          blocks: 234,
          lifts: 345,
          netPlay: 234,
          netPlayAccuracy: 81.2
        },
        doubles: {
          doublesMatches: 23,
          doublesWins: 18,
          doublesWinRate: 78.3,
          communicationRating: 9.2
        }
      }
    ]
  },

  // MI Supporter
  'misupporter': {
    id: 'misupporter',
    name: 'MI Supporter',
    avatar: 'MS',
    handle: '@misupporter',
    bio: 'Mumbai Indians die-hard fan | Blue & Gold forever! 💙💛 | Cricket lover',
    location: 'Mumbai, India',
    joinedDate: 'April 2022',
    verified: false,
    overall: {
      totalMatches: 34,
      wins: 19,
      losses: 15,
      winRate: 55.9,
      totalPoints: 567,
      averageScore: 16.7,
      tournamentsWon: 2,
      currentStreak: 1
    },
    sportsStats: [
      {
        sport: 'cricket',
        matches: 34,
        wins: 19,
        losses: 15,
        winRate: 55.9,
        highestScore: 67,
        averageScore: 16.7,
        tournamentsWon: 2,
        achievements: ['MI Fan', 'Cricket Enthusiast', 'Team Player'],
        // Cricket-specific stats
        batting: {
          totalRuns: 567,
          centuries: 0,
          halfCenturies: 3,
          fours: 78,
          sixes: 12,
          strikeRate: 125.6,
          bestScore: 67,
          averageRuns: 16.7
        },
        bowling: {
          wickets: 23,
          bowlingAverage: 28.9,
          economyRate: 8.1,
          bestBowling: '3/45',
          fiveWicketHauls: 0,
          hatTricks: 0,
          maidenOvers: 3
        },
        fielding: {
          catches: 12,
          stumpings: 0,
          runOuts: 3,
          directHits: 1
        }
      }
    ]
  },

  // Cricket Analyst
  'cricketanalyst': {
    id: 'cricketanalyst',
    name: 'Cricket Analyst',
    avatar: 'CA',
    handle: '@cricketanalyst',
    bio: 'Professional cricket analyst | Former player | Cricket commentator | Stats guru 📊',
    location: 'Delhi, India',
    joinedDate: 'January 2020',
    verified: true,
    overall: {
      totalMatches: 156,
      wins: 89,
      losses: 67,
      winRate: 57.1,
      totalPoints: 2847,
      averageScore: 18.2,
      tournamentsWon: 12,
      currentStreak: 5
    },
    sportsStats: [
      {
        sport: 'cricket',
        matches: 156,
        wins: 89,
        losses: 67,
        winRate: 57.1,
        highestScore: 156,
        averageScore: 18.2,
        tournamentsWon: 12,
        achievements: ['Cricket Guru', 'Stats Master', 'Commentator', 'Former Pro'],
        // Cricket-specific stats
        batting: {
          totalRuns: 2847,
          centuries: 2,
          halfCenturies: 18,
          fours: 345,
          sixes: 67,
          strikeRate: 145.8,
          bestScore: 156,
          averageRuns: 18.2
        },
        bowling: {
          wickets: 234,
          bowlingAverage: 24.7,
          economyRate: 6.8,
          bestBowling: '7/34',
          fiveWicketHauls: 5,
          hatTricks: 2,
          maidenOvers: 45
        },
        fielding: {
          catches: 89,
          stumpings: 0,
          runOuts: 23,
          directHits: 8
        }
      }
    ]
  },

  // Red Devils
  'reddevils': {
    id: 'reddevils',
    name: 'Red Devils',
    avatar: 'RD',
    handle: '@reddevils',
    bio: 'Manchester United supporter | Red Devils forever! 🔴 | Football fanatic',
    location: 'Manchester, UK',
    joinedDate: 'August 2021',
    verified: false,
    overall: {
      totalMatches: 45,
      wins: 24,
      losses: 21,
      winRate: 53.3,
      totalPoints: 789,
      averageScore: 17.5,
      tournamentsWon: 3,
      currentStreak: 2
    },
    sportsStats: [
      {
        sport: 'football',
        matches: 45,
        wins: 24,
        losses: 21,
        winRate: 53.3,
        highestScore: 3,
        averageScore: 1.7,
        tournamentsWon: 3,
        achievements: ['United Fan', 'Football Lover', 'Team Supporter'],
        // Football-specific stats
        attacking: {
          goals: 23,
          assists: 18,
          shots: 89,
          shotsOnTarget: 45,
          conversionRate: 25.8,
          keyPasses: 67,
          crosses: 123
        },
        defending: {
          tackles: 156,
          interceptions: 78,
          clearances: 234,
          blocks: 34,
          duelsWon: 65.4,
          aerialDuelsWon: 58.7
        },
        passing: {
          passes: 1234,
          passAccuracy: 76.8,
          longBalls: 67,
          throughBalls: 23,
          crossesCompleted: 45
        },
        goalkeeping: {
          saves: 0,
          cleanSheets: 0,
          goalsConceded: 0
        }
      }
    ]
  },

  // Lakers Nation
  'lakersnation': {
    id: 'lakersnation',
    name: 'Lakers Nation',
    avatar: 'LN',
    handle: '@lakersnation',
    bio: 'Lakers Nation! 💜💛 | Purple & Gold forever | NBA fanatic | Basketball lover',
    location: 'Los Angeles, CA',
    joinedDate: 'October 2020',
    verified: true,
    overall: {
      totalMatches: 78,
      wins: 42,
      losses: 36,
      winRate: 53.8,
      totalPoints: 1234,
      averageScore: 15.8,
      tournamentsWon: 4,
      currentStreak: 3
    },
    sportsStats: [
      {
        sport: 'basketball',
        matches: 78,
        wins: 42,
        losses: 36,
        winRate: 53.8,
        highestScore: 35,
        averageScore: 15.8,
        tournamentsWon: 4,
        achievements: ['Lakers Fan', 'Basketball Expert', 'NBA Enthusiast'],
        // Basketball-specific stats
        scoring: {
          points: 1232,
          fieldGoals: 456,
          fieldGoalPercentage: 43.8,
          threePointers: 156,
          threePointPercentage: 38.9,
          freeThrows: 164,
          freeThrowPercentage: 79.2
        },
        rebounding: {
          rebounds: 345,
          offensiveRebounds: 123,
          defensiveRebounds: 222,
          reboundsPerGame: 4.4
        },
        playmaking: {
          assists: 234,
          assistsPerGame: 3.0,
          turnovers: 156,
          assistToTurnoverRatio: 1.5
        },
        defense: {
          steals: 67,
          blocks: 34,
          personalFouls: 178,
          defensiveRating: 112.3
        }
      }
    ]
  },

  // Warriors Fan
  'warriorsfan': {
    id: 'warriorsfan',
    name: 'Warriors Fan',
    avatar: 'WF',
    handle: '@warriorsfan',
    bio: 'Golden State Warriors fan | Dub Nation! 💙💛 | Basketball enthusiast',
    location: 'San Francisco, CA',
    joinedDate: 'December 2021',
    verified: false,
    overall: {
      totalMatches: 56,
      wins: 29,
      losses: 27,
      winRate: 51.8,
      totalPoints: 890,
      averageScore: 15.9,
      tournamentsWon: 2,
      currentStreak: 1
    },
    sportsStats: [
      {
        sport: 'basketball',
        matches: 56,
        wins: 29,
        losses: 27,
        winRate: 51.8,
        highestScore: 28,
        averageScore: 15.9,
        tournamentsWon: 2,
        achievements: ['Warriors Fan', 'Basketball Lover', 'Team Supporter'],
        // Basketball-specific stats
        scoring: {
          points: 890,
          fieldGoals: 345,
          fieldGoalPercentage: 41.2,
          threePointers: 123,
          threePointPercentage: 36.8,
          freeThrows: 77,
          freeThrowPercentage: 76.5
        },
        rebounding: {
          rebounds: 234,
          offensiveRebounds: 89,
          defensiveRebounds: 145,
          reboundsPerGame: 4.2
        },
        playmaking: {
          assists: 156,
          assistsPerGame: 2.8,
          turnovers: 123,
          assistToTurnoverRatio: 1.3
        },
        defense: {
          steals: 45,
          blocks: 23,
          personalFouls: 134,
          defensiveRating: 115.6
        }
      }
    ]
  }
};

// Helper function to get user profile by handle
export const getUserProfileByHandle = (handle) => {
  const userId = handle.replace('@', '');
  return userProfiles[userId] || null;
};

// Helper function to get user profile by ID
export const getUserProfileById = (id) => {
  return userProfiles[id] || null;
};
