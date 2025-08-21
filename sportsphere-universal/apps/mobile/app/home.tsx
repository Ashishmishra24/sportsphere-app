import React, { useState } from 'react'
import { View, Text, ScrollView, RefreshControl } from 'react-native'
import { useRouter } from 'expo-router'
import { 
  LiveScoreCard, 
  CommunityCard, 
  FloatingActionButton,
  YStack,
  H1,
  Paragraph,
  Card
} from '@sportsphere/ui'

// Mock data for demonstration
const mockLiveMatches = [
  {
    id: '1',
    homeTeam: { id: '1', name: 'Mumbai Indians', logo: '🏏', score: 156 },
    awayTeam: { id: '2', name: 'Chennai Super Kings', logo: '🏏', score: 142 },
    status: 'live' as const,
    time: '45th over',
    reactions: { fire: 234, heart: 156, thumbsUp: 89 }
  },
  {
    id: '2',
    homeTeam: { id: '3', name: 'Manchester United', logo: '⚽', score: 2 },
    awayTeam: { id: '4', name: 'Liverpool', logo: '⚽', score: 1 },
    status: 'live' as const,
    time: '78th minute',
    reactions: { fire: 567, heart: 234, thumbsUp: 123 }
  }
]

const mockCommunities = [
  {
    id: '1',
    name: 'Cricket Enthusiasts',
    icon: '🏏',
    memberCount: 15420,
    isActive: true,
    recentActivities: [
      { id: '1', type: 'post', text: 'New match discussion started', time: '2m ago' },
      { id: '2', type: 'match', text: 'Live match updates', time: '5m ago' },
      { id: '3', type: 'event', text: 'Weekend tournament announced', time: '10m ago' }
    ],
    isJoined: true
  },
  {
    id: '2',
    name: 'Local Football League',
    icon: '⚽',
    memberCount: 3240,
    isActive: true,
    recentActivities: [
      { id: '4', type: 'post', text: 'Team formation for next match', time: '1m ago' },
      { id: '5', type: 'match', text: 'Match highlights shared', time: '15m ago' }
    ],
    isJoined: false
  }
]

export default function HomeScreen() {
  const router = useRouter()
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = () => {
    setRefreshing(true)
    // Simulate data refresh
    setTimeout(() => setRefreshing(false), 2000)
  }

  const handleMatchPress = (matchId: string) => {
    router.push(`/match/${matchId}`)
  }

  const handleCommunityPress = (communityId: string) => {
    router.push(`/community/${communityId}`)
  }

  const handleReaction = (matchId: string, type: string) => {
    console.log(`Reaction ${type} on match ${matchId}`)
  }

  const handleJoinCommunity = (communityId: string) => {
    console.log(`Joining community ${communityId}`)
  }

  const fabActions = [
    {
      id: 'create-match',
      icon: '⚽',
      label: 'Create Match',
      onPress: () => router.push('/create-match'),
      color: '#10B981'
    },
    {
      id: 'find-players',
      icon: '👥',
      label: 'Find Players',
      onPress: () => router.push('/discover'),
      color: '#3B82F6'
    },
    {
      id: 'join-community',
      icon: '💬',
      label: 'Join Community',
      onPress: () => router.push('/communities'),
      color: '#8B5CF6'
    }
  ]

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={{ padding: 20, backgroundColor: 'white' }}>
          <H1>Welcome back! 👋</H1>
          <Paragraph color="$gray11">
            Here's what's happening in your sports world today
          </Paragraph>
        </View>

        {/* Live Matches Section */}
        <View style={{ paddingVertical: 20 }}>
          <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>
              🔴 Live Matches
            </Text>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>
              {mockLiveMatches.length} matches happening now
            </Text>
          </View>

          {mockLiveMatches.map((match) => (
            <LiveScoreCard
              key={match.id}
              matchId={match.id}
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
              status={match.status}
              time={match.time}
              reactions={match.reactions}
              onReaction={(type) => handleReaction(match.id, type)}
              onPress={() => handleMatchPress(match.id)}
            />
          ))}
        </View>

        {/* Quick Actions */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Card>
            <YStack space="$4">
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                Quick Actions
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={{ alignItems: 'center' }}>
                  <View style={{ 
                    width: 50, 
                    height: 50, 
                    borderRadius: 25, 
                    backgroundColor: '#3B82F6', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    marginBottom: 8
                  }}>
                    <Text style={{ fontSize: 24 }}>👥</Text>
                  </View>
                  <Text style={{ fontSize: 12, textAlign: 'center' }}>Find Players</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <View style={{ 
                    width: 50, 
                    height: 50, 
                    borderRadius: 25, 
                    backgroundColor: '#10B981', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    marginBottom: 8
                  }}>
                    <Text style={{ fontSize: 24 }}>⚽</Text>
                  </View>
                  <Text style={{ fontSize: 12, textAlign: 'center' }}>Create Match</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <View style={{ 
                    width: 50, 
                    height: 50, 
                    borderRadius: 25, 
                    backgroundColor: '#8B5CF6', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    marginBottom: 8
                  }}>
                    <Text style={{ fontSize: 24 }}>🏆</Text>
                  </View>
                  <Text style={{ fontSize: 12, textAlign: 'center' }}>Tournaments</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <View style={{ 
                    width: 50, 
                    height: 50, 
                    borderRadius: 25, 
                    backgroundColor: '#F59E0B', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    marginBottom: 8
                  }}>
                    <Text style={{ fontSize: 24 }}>📊</Text>
                  </View>
                  <Text style={{ fontSize: 12, textAlign: 'center' }}>My Stats</Text>
                </View>
              </View>
            </YStack>
          </Card>
        </View>

        {/* Communities Section */}
        <View style={{ paddingVertical: 20 }}>
          <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>
              💬 Your Communities
            </Text>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>
              Stay connected with your favorite sports communities
            </Text>
          </View>

          {mockCommunities.map((community) => (
            <CommunityCard
              key={community.id}
              id={community.id}
              name={community.name}
              icon={community.icon}
              memberCount={community.memberCount}
              isActive={community.isActive}
              recentActivities={community.recentActivities}
              isJoined={community.isJoined}
              onJoin={() => handleJoinCommunity(community.id)}
              onPress={() => handleCommunityPress(community.id)}
            />
          ))}
        </View>

        {/* Upcoming Matches */}
        <View style={{ paddingVertical: 20 }}>
          <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>
              📅 Upcoming Matches
            </Text>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>
              Matches you're following or participating in
            </Text>
          </View>

          <Card style={{ marginHorizontal: 16, marginBottom: 16 }}>
            <YStack space="$3">
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 24, marginRight: 12 }}>🏏</Text>
                  <View>
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>Weekend Cricket League</Text>
                    <Text style={{ fontSize: 14, color: '#6B7280' }}>Tomorrow at 2:00 PM</Text>
                  </View>
                </View>
                <View style={{ 
                  paddingHorizontal: 12, 
                  paddingVertical: 6, 
                  backgroundColor: '#FEF3C7', 
                  borderRadius: 12 
                }}>
                  <Text style={{ fontSize: 12, color: '#92400E', fontWeight: '600' }}>JOINED</Text>
                </View>
              </View>
            </YStack>
          </Card>
        </View>

        {/* Bottom padding for FAB */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Action Button */}
      <FloatingActionButton
        actions={fabActions}
        context="home"
      />
    </View>
  )
}
