import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { 
  PlayerDiscoveryMap,
  FloatingActionButton,
  Card,
  YStack,
  H1,
  Paragraph,
  Button
} from '@sportsphere/ui'

// Mock data for demonstration
const mockPlayers = [
  {
    id: '1',
    name: 'Alex Johnson',
    sport: 'cricket',
    skillLevel: 'intermediate' as const,
    distance: 2.5,
    availability: 'Weekends',
    rating: 4.2,
    x: 50,
    y: 80
  },
  {
    id: '2',
    name: 'Sarah Chen',
    sport: 'football',
    skillLevel: 'advanced' as const,
    distance: 1.8,
    availability: 'Evenings',
    rating: 4.8,
    x: 120,
    y: 150
  },
  {
    id: '3',
    name: 'Mike Rodriguez',
    sport: 'basketball',
    skillLevel: 'beginner' as const,
    distance: 3.2,
    availability: 'Weekdays',
    rating: 3.5,
    x: 200,
    y: 100
  },
  {
    id: '4',
    name: 'Emma Wilson',
    sport: 'cricket',
    skillLevel: 'advanced' as const,
    distance: 0.8,
    availability: 'Flexible',
    rating: 4.6,
    x: 80,
    y: 200
  }
]

const mockTeams = [
  {
    id: '1',
    name: 'Thunder Strikers',
    sport: 'Cricket',
    memberCount: 8,
    skillLevel: 'Intermediate',
    nextMatch: 'Tomorrow 3:00 PM',
    location: 'Central Park Ground'
  },
  {
    id: '2',
    name: 'City Warriors',
    sport: 'Football',
    memberCount: 11,
    skillLevel: 'Advanced',
    nextMatch: 'Saturday 2:00 PM',
    location: 'Sports Complex'
  }
]

export default function DiscoverScreen() {
  const router = useRouter()
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null)

  const handlePlayerSelect = (player: any) => {
    setSelectedPlayer(player)
    console.log('Selected player:', player.name)
  }

  const handleInvitePlayer = (player: any) => {
    console.log('Inviting player:', player.name)
    // Show invitation modal or navigate to team creation
  }

  const fabActions = [
    {
      id: 'create-team',
      icon: '👥',
      label: 'Create Team',
      onPress: () => router.push('/create-team'),
      color: '#3B82F6'
    },
    {
      id: 'join-team',
      icon: '🤝',
      label: 'Join Team',
      onPress: () => router.push('/teams'),
      color: '#10B981'
    },
    {
      id: 'organize-match',
      icon: '⚽',
      label: 'Organize Match',
      onPress: () => router.push('/create-match'),
      color: '#F59E0B'
    }
  ]

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <ScrollView>
        {/* Header */}
        <View style={{ padding: 20, backgroundColor: 'white' }}>
          <H1>Discover Players & Teams</H1>
          <Paragraph color="$gray11">
            Find players nearby and join exciting teams
          </Paragraph>
        </View>

        {/* Player Discovery Map */}
        <View style={{ paddingVertical: 20 }}>
          <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>
              🗺️ Players Nearby
            </Text>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>
              {mockPlayers.length} players found in your area
            </Text>
          </View>

          <PlayerDiscoveryMap
            players={mockPlayers}
            onPlayerSelect={handlePlayerSelect}
            onInvitePlayer={handleInvitePlayer}
            userLocation={{ latitude: 40.7128, longitude: -74.0060 }}
          />
        </View>

        {/* Available Teams */}
        <View style={{ paddingVertical: 20 }}>
          <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>
              👥 Teams Looking for Players
            </Text>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>
              Join teams that match your interests and skill level
            </Text>
          </View>

          {mockTeams.map((team) => (
            <Card key={team.id} style={{ marginHorizontal: 16, marginBottom: 16 }}>
              <YStack space="$4">
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{team.name}</Text>
                    <Text style={{ fontSize: 14, color: '#6B7280' }}>{team.sport}</Text>
                  </View>
                  <View style={{ 
                    paddingHorizontal: 12, 
                    paddingVertical: 6, 
                    backgroundColor: '#DBEAFE', 
                    borderRadius: 12 
                  }}>
                    <Text style={{ fontSize: 12, color: '#1E40AF', fontWeight: '600' }}>
                      {team.skillLevel}
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View>
                    <Text style={{ fontSize: 14, color: '#6B7280' }}>
                      👥 {team.memberCount} members
                    </Text>
                    <Text style={{ fontSize: 14, color: '#6B7280' }}>
                      📍 {team.location}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 14, color: '#6B7280' }}>
                      ⚽ Next match: {team.nextMatch}
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button
                    onPress={() => router.push(`/team/${team.id}`)}
                    variant="outline"
                    size="small"
                  >
                    View Details
                  </Button>
                  <Button
                    onPress={() => console.log('Joining team:', team.name)}
                    size="small"
                  >
                    Join Team
                  </Button>
                </View>
              </YStack>
            </Card>
          ))}
        </View>

        {/* Quick Stats */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Card>
            <YStack space="$4">
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                📊 Discovery Stats
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#3B82F6' }}>
                    {mockPlayers.length}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#6B7280' }}>Players Nearby</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#10B981' }}>
                    {mockTeams.length}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#6B7280' }}>Available Teams</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#F59E0B' }}>
                    5
                  </Text>
                  <Text style={{ fontSize: 12, color: '#6B7280' }}>Sports Covered</Text>
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
        context="team"
      />
    </View>
  )
}
