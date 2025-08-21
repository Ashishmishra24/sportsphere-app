import React, { useState, useEffect } from 'react'
import { View, Text, Animated, TouchableOpacity } from 'react-native'
import { styled } from '@tamagui/core'

const ScoreCardContainer = styled(View, {
  backgroundColor: 'white',
  borderRadius: 16,
  padding: 16,
  marginVertical: 8,
  marginHorizontal: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 5,
})

const MatchHeader = styled(View, {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 12,
})

const TeamContainer = styled(View, {
  flex: 1,
  alignItems: 'center',
})

const TeamLogo = styled(View, {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: '$gray5',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 8,
})

const TeamName = styled(Text, {
  fontSize: 14,
  fontWeight: '600',
  textAlign: 'center',
})

const ScoreContainer = styled(View, {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginVertical: 8,
})

const Score = styled(Animated.Text, {
  fontSize: 32,
  fontWeight: 'bold',
  color: '$blue10',
  marginHorizontal: 8,
})

const VS = styled(Text, {
  fontSize: 16,
  fontWeight: '600',
  color: '$gray10',
  marginHorizontal: 8,
})

const MatchInfo = styled(View, {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 12,
  paddingTop: 12,
  borderTopWidth: 1,
  borderTopColor: '$gray5',
})

const MatchStatus = styled(View, {
  flexDirection: 'row',
  alignItems: 'center',
})

const StatusIndicator = styled(View, {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: '$red10',
  marginRight: 6,
})

const StatusText = styled(Text, {
  fontSize: 12,
  fontWeight: '500',
  color: '$gray11',
})

const TimeText = styled(Text, {
  fontSize: 12,
  color: '$gray10',
})

const ReactionContainer = styled(View, {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginTop: 12,
  paddingTop: 12,
  borderTopWidth: 1,
  borderTopColor: '$gray5',
})

const ReactionButton = styled(TouchableOpacity, {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 16,
  backgroundColor: '$gray5',
})

const ReactionText = styled(Text, {
  fontSize: 12,
  fontWeight: '500',
  marginLeft: 4,
})

interface Team {
  id: string
  name: string
  logo: string
  score: number
}

interface LiveScoreCardProps {
  matchId: string
  homeTeam: Team
  awayTeam: Team
  status: 'live' | 'upcoming' | 'finished'
  time: string
  reactions: {
    fire: number
    heart: number
    thumbsUp: number
  }
  onReaction: (type: string) => void
  onPress: () => void
}

export const LiveScoreCard: React.FC<LiveScoreCardProps> = ({
  homeTeam,
  awayTeam,
  status,
  time,
  reactions,
  onReaction,
  onPress,
}) => {
  const [scoreAnimation] = useState(new Animated.Value(0))
  const [isLive, setIsLive] = useState(status === 'live')

  useEffect(() => {
    if (isLive) {
      // Pulse animation for live matches
      Animated.loop(
        Animated.sequence([
          Animated.timing(scoreAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scoreAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start()
    }
  }, [isLive])

  const handleReaction = (type: string) => {
    onReaction(type)
    // Add haptic feedback here
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <ScoreCardContainer>
        <MatchHeader>
          <TeamContainer>
            <TeamLogo>
              <Text style={{ fontSize: 16 }}>{homeTeam.logo}</Text>
            </TeamLogo>
            <TeamName>{homeTeam.name}</TeamName>
          </TeamContainer>

          <ScoreContainer>
            <Score
              style={{
                transform: [
                  {
                    scale: scoreAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.05],
                    }),
                  },
                ],
              }}
            >
              {homeTeam.score}
            </Score>
            <VS>VS</VS>
            <Score
              style={{
                transform: [
                  {
                    scale: scoreAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.05],
                    }),
                  },
                ],
              }}
            >
              {awayTeam.score}
            </Score>
          </ScoreContainer>

          <TeamContainer>
            <TeamLogo>
              <Text style={{ fontSize: 16 }}>{awayTeam.logo}</Text>
            </TeamLogo>
            <TeamName>{awayTeam.name}</TeamName>
          </TeamContainer>
        </MatchHeader>

        <MatchInfo>
          <MatchStatus>
            {isLive && <StatusIndicator />}
            <StatusText>
              {status === 'live' ? 'LIVE' : status === 'upcoming' ? 'UPCOMING' : 'FINISHED'}
            </StatusText>
          </MatchStatus>
          <TimeText>{time}</TimeText>
        </MatchInfo>

        <ReactionContainer>
          <ReactionButton onPress={() => handleReaction('fire')}>
            <Text>🔥</Text>
            <ReactionText>{reactions.fire}</ReactionText>
          </ReactionButton>
          <ReactionButton onPress={() => handleReaction('heart')}>
            <Text>❤️</Text>
            <ReactionText>{reactions.heart}</ReactionText>
          </ReactionButton>
          <ReactionButton onPress={() => handleReaction('thumbsUp')}>
            <Text>👍</Text>
            <ReactionText>{reactions.thumbsUp}</ReactionText>
          </ReactionButton>
        </ReactionContainer>
      </ScoreCardContainer>
    </TouchableOpacity>
  )
}
