// Mock data for threads and user interactions

// Mock threads from followed users
export const mockThreads = [
  {
    id: 1,
    content: "What an incredible century by Virat Kohli! The way he built his innings and then exploded in the final overs was pure class. This is why he's considered one of the greatest batsmen of our generation. 🏏 #Cricket #ViratKohli #IPL2024",
    author: {
      id: 'cricketfanatic',
      name: 'Cricket Fanatic',
      handle: '@cricketfanatic',
      avatar: null,
      isVerified: true
    },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    privacy: 'public',
    sport: 'cricket',
    likes: 156,
    replies: 23,
    reposts: 45,
    views: 1250,
    isLiked: false,
    isReposted: false,
    matchReference: {
      id: 1,
      tournament: 'IPL 2024',
      team1: 'Mumbai Indians',
      team2: 'Chennai Super Kings',
      status: 'Live',
      venue: 'Wankhede Stadium'
    }
  },
  {
    id: 2,
    content: "Watching this Lakers vs Warriors game and the level of basketball is insane! LeBron at 39 still playing like he's 25. Curry's three-point shooting is from another planet. What a time to be a basketball fan! 🏀",
    author: {
      id: 'basketballpro',
      name: 'Basketball Pro',
      handle: '@basketballpro',
      avatar: null,
      isVerified: false
    },
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    privacy: 'public',
    sport: 'basketball',
    likes: 89,
    replies: 12,
    reposts: 18,
    views: 892,
    isLiked: true,
    isReposted: false
  },
  {
    id: 3,
    content: "Just finished my morning tennis practice session. Working on my backhand slice and it's finally starting to click! 🎾 The key is in the wrist action and follow-through. Any other tennis players here struggling with the same shot?",
    author: {
      id: 'tennisace',
      name: 'Tennis Ace',
      handle: '@tennisace',
      avatar: null,
      isVerified: false
    },
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    privacy: 'followers',
    sport: 'tennis',
    likes: 34,
    replies: 8,
    reposts: 3,
    views: 287,
    isLiked: false,
    isReposted: false
  },
  {
    id: 4,
    content: "The Manchester United vs Liverpool match today was absolutely epic! That last-minute goal by Rashford sent the entire stadium into frenzy. These are the moments that make football the beautiful game it is. ⚽ #MUFC #LFC #PremierLeague",
    author: {
      id: 'footballfan',
      name: 'Football Fan',
      handle: '@footballfan',
      avatar: null,
      isVerified: true
    },
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    privacy: 'public',
    sport: 'football',
    likes: 267,
    replies: 56,
    reposts: 78,
    views: 2145,
    isLiked: true,
    isReposted: true,
    matchReference: {
      id: 2,
      tournament: 'Premier League',
      team1: 'Manchester United',
      team2: 'Liverpool',
      status: 'Finished',
      venue: 'Old Trafford'
    }
  },
  {
    id: 5,
    content: "Hot take: T20 cricket is making the game more exciting but also losing some of the strategic depth that makes Test cricket beautiful. What do you all think? Can both formats coexist and thrive?",
    author: {
      id: 'cricketanalyst',
      name: 'Cricket Analyst',
      handle: '@cricketanalyst',
      avatar: null,
      isVerified: true
    },
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    privacy: 'public',
    sport: 'cricket',
    likes: 112,
    replies: 34,
    reposts: 21,
    views: 976,
    isLiked: false,
    isReposted: false
  },
  {
    id: 6,
    content: "Shoutout to all my fellow sports enthusiasts who understand that it's not just about winning or losing - it's about the passion, the community, and the shared moments that bring us together. Sports unite us all! 🏆",
    author: {
      id: 'sportsunity',
      name: 'Sports Unity',
      handle: '@sportsunity',
      avatar: null,
      isVerified: false
    },
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    privacy: 'public',
    sport: null,
    likes: 201,
    replies: 45,
    reposts: 67,
    views: 1789,
    isLiked: true,
    isReposted: false
  },
  {
    id: 7,
    content: "Attending my first live cricket match at Lord's tomorrow! Been a fan for years but never experienced the atmosphere in person. Any tips for a first-timer? So excited! 🏏 #Lords #Cricket",
    author: {
      id: 'newcricketfan',
      name: 'New Cricket Fan',
      handle: '@newcricketfan',
      avatar: null,
      isVerified: false
    },
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18 hours ago
    privacy: 'public',
    sport: 'cricket',
    likes: 67,
    replies: 19,
    reposts: 8,
    views: 543,
    isLiked: false,
    isReposted: false
  }
];

// Mock data for users that the current user follows
export const followedUsers = [
  {
    id: 'cricketfanatic',
    name: 'Cricket Fanatic',
    handle: '@cricketfanatic',
    bio: 'Cricket enthusiast | IPL lover | Following the game since childhood 🏏',
    followers: 12500,
    following: 234,
    isVerified: true,
    favoriteSport: 'cricket'
  },
  {
    id: 'basketballpro',
    name: 'Basketball Pro',
    handle: '@basketballpro',
    bio: 'Former college player | NBA analyst | Lakers fan 🏀',
    followers: 8900,
    following: 156,
    isVerified: false,
    favoriteSport: 'basketball'
  },
  {
    id: 'tennisace',
    name: 'Tennis Ace',
    handle: '@tennisace',
    bio: 'Tennis coach | Wimbledon enthusiast | Helping others improve their game 🎾',
    followers: 5600,
    following: 89,
    isVerified: false,
    favoriteSport: 'tennis'
  },
  {
    id: 'footballfan',
    name: 'Football Fan',
    handle: '@footballfan',
    bio: 'Manchester United supporter | Premier League analyst | Football is life ⚽',
    followers: 15200,
    following: 345,
    isVerified: true,
    favoriteSport: 'football'
  },
  {
    id: 'cricketanalyst',
    name: 'Cricket Analyst',
    handle: '@cricketanalyst',
    bio: 'Professional cricket analyst | Former player | Stats guru 📊',
    followers: 22100,
    following: 167,
    isVerified: true,
    favoriteSport: 'cricket'
  },
  {
    id: 'sportsunity',
    name: 'Sports Unity',
    handle: '@sportsunity',
    bio: 'Bringing sports fans together | All sports welcome | Unity through sports 🏆',
    followers: 18700,
    following: 1200,
    isVerified: false,
    favoriteSport: null
  },
  {
    id: 'newcricketfan',
    name: 'New Cricket Fan',
    handle: '@newcricketfan',
    bio: 'New to cricket but loving every moment | Learning the game 🏏',
    followers: 234,
    following: 45,
    isVerified: false,
    favoriteSport: 'cricket'
  }
];

// Mock data for current user's own threads
export const userThreads = [
  {
    id: 101,
    content: "Just watched an amazing badminton match! The speed and precision required for this sport is incredible. Much respect to all badminton players out there. 🏸",
    author: {
      id: 'current-user',
      name: 'Sports Enthusiast',
      handle: '@sportsuser',
      avatar: null,
      isVerified: false
    },
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    privacy: 'public',
    sport: 'badminton',
    likes: 12,
    replies: 3,
    reposts: 1,
    views: 89,
    isLiked: false,
    isReposted: false
  },
  {
    id: 102,
    content: "Anyone else think we need more women's sports coverage? There are so many talented female athletes who deserve more recognition and media attention. Let's support women in sports! 👩‍⚽️",
    author: {
      id: 'current-user',
      name: 'Sports Enthusiast',
      handle: '@sportsuser',
      avatar: null,
      isVerified: false
    },
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    privacy: 'public',
    sport: null,
    likes: 78,
    replies: 15,
    reposts: 23,
    views: 456,
    isLiked: false,
    isReposted: false
  }
];

// Function to get threads from followed users
export const getFollowedUsersThreads = () => {
  return mockThreads.filter(thread => 
    followedUsers.some(user => user.id === thread.author.id)
  ).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

// Function to get user's own threads
export const getUserThreads = (userId = 'current-user') => {
  return userThreads.filter(thread => thread.author.id === userId)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

// Function to add a new thread
export const addThread = (threadData) => {
  const newThread = {
    id: Date.now(),
    ...threadData,
    timestamp: new Date().toISOString(),
    likes: 0,
    replies: 0,
    reposts: 0,
    views: 0,
    isLiked: false,
    isReposted: false
  };

  if (threadData.author.id === 'current-user') {
    userThreads.unshift(newThread);
  } else {
    mockThreads.unshift(newThread);
  }

  return newThread;
};

// Function to like a thread
export const likeThread = (threadId) => {
  const thread = [...mockThreads, ...userThreads].find(t => t.id === threadId);
  if (thread) {
    thread.isLiked = !thread.isLiked;
    thread.likes += thread.isLiked ? 1 : -1;
  }
  return thread;
};

// Function to repost a thread
export const repostThread = (threadId) => {
  const thread = [...mockThreads, ...userThreads].find(t => t.id === threadId);
  if (thread) {
    thread.isReposted = !thread.isReposted;
    thread.reposts += thread.isReposted ? 1 : -1;
  }
  return thread;
};

const threadsData = {
  mockThreads,
  followedUsers,
  userThreads,
  getFollowedUsersThreads,
  getUserThreads,
  addThread,
  likeThread,
  repostThread
};

export default threadsData;
