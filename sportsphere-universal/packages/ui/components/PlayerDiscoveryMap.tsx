import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import { styled } from '@tamagui/core'

const MapContainer = styled(View, {
  height: 300,
  backgroundColor: '$gray5',
  borderRadius: 16,
  margin: 16,
  overflow: 'hidden',
  position: 'relative',
})

const MapOverlay = styled(View, {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  justifyContent: 'center',
  alignItems: 'center',
})

const MapPlaceholder = styled(View, {
  backgroundColor: '$gray10',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
})

const MapText = styled(Text, {
  fontSize: 16,
  color: '$gray11',
  textAlign: 'center',
})

const PlayerMarker = styled(TouchableOpacity, {
  position: 'absolute',
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: '$blue10',
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
})

const PlayerInfo = styled(View, {
  position: 'absolute',
  bottom: 50,
  left: 16,
  right: 16,
  backgroundColor: 'white',
  borderRadius: 12,
  padding: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 5,
})

const PlayerHeader = styled(View, {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 8,
})

const PlayerAvatar = styled(View, {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: '$blue10',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 12,
})

const PlayerName = styled(Text, {
  fontSize: 16,
  fontWeight: 'bold',
  color: '$gray12',
})

const PlayerDetails = styled(View, {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const PlayerStats = styled(View, {
  flex: 1,
})

const StatText = styled(Text, {
  fontSize: 12,
  color: '$gray10',
  marginBottom: 2,
})

const ActionButton = styled(TouchableOpacity, {
  backgroundColor: '$blue10',
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 16,
})

const ActionText = styled(Text, {
  color: 'white',
  fontSize: 14,
  fontWeight: '600',
})

const FilterContainer = styled(View, {
  flexDirection: 'row',
  justifyContent: 'space-around',
  paddingHorizontal: 16,
  paddingVertical: 12,
  backgroundColor: 'white',
  borderBottomWidth: 1,
  borderBottomColor: '$gray5',
})

const FilterButton = styled(TouchableOpacity, {
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 16,
  backgroundColor: '$gray5',
})

const FilterText = styled(Text, {
  fontSize: 12,
  fontWeight: '500',
  color: '$gray11',
})

interface Player {
  id: string
  name: string
  sport: string
  skillLevel: 'beginner' | 'intermediate' | 'advanced'
  distance: number
  availability: string
  rating: number
  x: number
  y: number
}

interface PlayerDiscoveryMapProps {
  players: Player[]
  onPlayerSelect: (player: Player) => void
  onInvitePlayer: (player: Player) => void
  userLocation: { latitude: number; longitude: number }
}

export const PlayerDiscoveryMap: React.FC<PlayerDiscoveryMapProps> = ({
  players,
  onPlayerSelect,
  onInvitePlayer,
  userLocation,
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'cricket', label: 'Cricket' },
    { id: 'football', label: 'Football' },
    { id: 'basketball', label: 'Basketball' },
  ]

  const handlePlayerPress = (player: Player) => {
    setSelectedPlayer(player)
    onPlayerSelect(player)
  }

  const handleInvite = (player: Player) => {
    onInvitePlayer(player)
    setSelectedPlayer(null)
  }

  const filteredPlayers = players.filter((player) => {
    if (activeFilter === 'all') return true
    return player.sport.toLowerCase() === activeFilter
  })

  return (
    <View>
      <FilterContainer>
        {filters.map((filter) => (
          <FilterButton
            key={filter.id}
            onPress={() => setActiveFilter(filter.id)}
            backgroundColor={activeFilter === filter.id ? '$blue10' : '$gray5'}
          >
            <FilterText
              color={activeFilter === filter.id ? 'white' : '$gray11'}
            >
              {filter.label}
            </FilterText>
          </FilterButton>
        ))}
      </FilterContainer>

      <MapContainer>
        <MapPlaceholder>
          <MapText>Interactive Map View</MapText>
          <MapText>Players nearby: {filteredPlayers.length}</MapText>
        </MapPlaceholder>

        {filteredPlayers.map((player) => (
          <PlayerMarker
            key={player.id}
            style={{
              left: player.x,
              top: player.y,
            }}
            onPress={() => handlePlayerPress(player)}
          >
            <Text style={{ color: 'white', fontSize: 16 }}>👤</Text>
          </PlayerMarker>
        ))}

        {selectedPlayer && (
          <PlayerInfo>
            <PlayerHeader>
              <PlayerAvatar>
                <Text style={{ color: 'white', fontSize: 16 }}>
                  {selectedPlayer.name.charAt(0)}
                </Text>
              </PlayerAvatar>
              <View style={{ flex: 1 }}>
                <PlayerName>{selectedPlayer.name}</PlayerName>
                <Text style={{ fontSize: 12, color: '$gray10' }}>
                  {selectedPlayer.sport} • {selectedPlayer.skillLevel}
                </Text>
              </View>
            </PlayerHeader>

            <PlayerDetails>
              <PlayerStats>
                <StatText>Distance: {selectedPlayer.distance}km</StatText>
                <StatText>Rating: {selectedPlayer.rating}/5</StatText>
                <StatText>Available: {selectedPlayer.availability}</StatText>
              </PlayerStats>
              <ActionButton onPress={() => handleInvite(selectedPlayer)}>
                <ActionText>Invite</ActionText>
              </ActionButton>
            </PlayerDetails>
          </PlayerInfo>
        )}
      </MapContainer>
    </View>
  )
}
